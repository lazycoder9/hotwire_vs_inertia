import { Head } from '@inertiajs/react'
import React from 'react'
import FeedbackForm from './FeedbackForm'

type Feedback = {
  id: number
  name: string
  email: string
  message: string
  created_at: string
}

type Props = {
  feedbacks: Feedback[]
}

export default function Index({ feedbacks }: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      time: date.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
    }
  }

  return (
    <>
      <Head title="Inertia Feedbacks" />
      
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
          Inertia Feedbacks
        </h1>
        <p className="text-white/70 text-sm sm:text-base">Share your thoughts with seamless interactions</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 min-h-[calc(100vh-12rem)] sm:min-h-[calc(100vh-10rem)]">
        {/* Form Section */}
        <div className="space-y-4 order-2 xl:order-1">
          <FeedbackForm />
        </div>
        
        {/* Feedbacks Section */}
        <div className="space-y-4 order-1 xl:order-2">
          <div className="glass-card p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center flex-wrap gap-2">
              <span>Recent Feedback</span>
              <span className="px-2 py-1 text-xs bg-white/10 rounded-full border border-white/20">
                {feedbacks.length}
              </span>
            </h2>
            
            <div id="feedbacks" className="space-y-3 max-h-[40vh] sm:max-h-[50vh] xl:max-h-[calc(100vh-16rem)] overflow-y-auto pr-1 sm:pr-2">
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback: Feedback) => {
                  const { date, time } = formatDate(feedback.created_at)
                  
                  return (
                    <div key={feedback.id} className="glass-feedback-item">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2 sm:gap-0">
                        <div className="flex items-center space-x-2 min-w-0 flex-1">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 flex-shrink-0">
                            <span className="text-white font-semibold text-xs">
                              {feedback.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-xs sm:text-sm font-semibold text-white truncate">{feedback.name}</h3>
                            <p className="text-white/70 text-xs truncate">{feedback.email}</p>
                          </div>
                        </div>
                        <div className="text-left sm:text-right flex-shrink-0 self-start">
                          <time
                            className="text-white/60 text-xs whitespace-nowrap block"
                            dateTime={feedback.created_at}
                          >
                            {date}
                          </time>
                          <time
                            className="text-white/50 text-xs whitespace-nowrap block mt-0.5"
                            dateTime={feedback.created_at}
                          >
                            {time}
                          </time>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
                        <p className="text-white/90 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {feedback.message}
                        </p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <span className="text-base sm:text-lg text-white/60">◯</span>
                  </div>
                  <p className="text-white/60 text-sm sm:text-base">No feedback yet</p>
                  <p className="text-white/40 text-xs sm:text-sm">Be the first to share your thoughts</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

