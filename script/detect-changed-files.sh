#!/bin/bash

# Detect changed files in PR and output JSON manifest
# Usage: ./script/detect-changed-files.sh [base_sha] [head_sha]

set -e

BASE_SHA=${1:-origin/main}
HEAD_SHA=${2:-HEAD}

# File patterns that should generate documentation
PATTERNS=(
  "app/controllers/*.rb"
  "app/models/*.rb" 
  "app/services/*.rb"
  "app/mutators/*.rb"
  "app/managers/*.rb"
  "app/forms/*.rb"
  "lib/**/*.rb"
)

echo "Detecting changed files between $BASE_SHA and $HEAD_SHA..." >&2

# Get all changed files
CHANGED_FILES=$(git diff --name-status $BASE_SHA..$HEAD_SHA)

# Create output directory
mkdir -p tmp/ci

# Initialize JSON array
echo '{"files": [' > tmp/ci/changed-files.json

FIRST=true

while IFS=$'\t' read -r status file; do
  # Skip if file doesn't exist (deleted files)
  if [[ "$status" == "D" ]]; then
    continue
  fi
  
  # Check if file matches our patterns
  SHOULD_DOCUMENT=false
  for pattern in "${PATTERNS[@]}"; do
    if [[ "$file" == $pattern ]]; then
      SHOULD_DOCUMENT=true
      break
    fi
  done
  
  if [[ "$SHOULD_DOCUMENT" == "true" ]]; then
    if [[ "$FIRST" == "false" ]]; then
      echo ',' >> tmp/ci/changed-files.json
    fi
    
    # Add file to JSON
    cat >> tmp/ci/changed-files.json << EOF
  {
    "path": "$file",
    "status": "$status",
    "should_document": true
  }
EOF
    FIRST=false
  fi
done <<< "$CHANGED_FILES"

# Close JSON array
echo '' >> tmp/ci/changed-files.json
echo ']}' >> tmp/ci/changed-files.json

# Output summary
FILE_COUNT=$(jq '.files | length' tmp/ci/changed-files.json)
echo "Found $FILE_COUNT files requiring documentation updates" >&2
echo "Manifest saved to tmp/ci/changed-files.json" >&2

# Output the JSON for GitHub Actions
cat tmp/ci/changed-files.json

