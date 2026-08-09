

import React from 'react'
import SEO from '../components/SEO'

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <SEO
        title="Contact Us"
        description="Get in touch with the React Foundation team for support, inquiries, and customer service."
      />
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-slate-600 dark:text-slate-300">
        Have questions? Reach out to our support team anytime.
      </p>
    </div>
  )
}
