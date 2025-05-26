import { Head, router, useForm } from '@inertiajs/react'
import React, { FormEvent, useState } from 'react'

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { data, setData, post, reset, errors } = useForm({
    name: '',
    email: '',
    message: '',
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    
    post('/inertia/feedbacks', {
      onSuccess: () => {
        reset()
        setIsSubmitting(false)
      },
      onError: () => {
        setIsSubmitting(false)
      },
      preserveState: false,
    })
  }

  return (
    <div className="glass-form mr-6">
      <h2 className="text-lg font-bold text-white mb-4">
        Share Your Feedback
      </h2>
      
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="name" className="block text-xs font-medium text-white/90">
            Name <span className="text-red-300">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            className="glass-input p-2 text-sm"
            required
          />
          {errors.name && (
            <p className="glass-error">{errors.name}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-xs font-medium text-white/90">
            Email <span className="text-red-300">*</span>
            <span className="ml-2 text-white/60 text-xs">(for follow-up only)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            className="glass-input p-2 text-sm"
            required
          />
          {errors.email && (
            <p className="glass-error">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="message" className="block text-xs font-medium text-white/90">
            Message <span className="text-red-300">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Share your thoughts..."
            value={data.message}
            onChange={e => setData('message', e.target.value)}
            className="glass-input p-2 text-sm resize-none"
            required
          />
          {errors.message && (
            <p className="glass-error">{errors.message}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="glass-button w-full text-sm py-2"
          >
            {isSubmitting ? 'Sending…' : 'Send Feedback'}
          </button>
        </div>
      </form>
    </div>
  )
}
