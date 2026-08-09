
import React from 'react'
import SEO from '../components/SEO'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <SEO
        title="About Us"
        description="Learn more about React Foundation Store, our engineering standards, and modern web application features."
      />
      <h1 className="text-3xl font-bold mb-4">About React Foundation Store</h1>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
        Welcome to React Foundation Store, built with modern web technologies including React 19, Redux Toolkit, and Tailwind CSS.
      </p>
    </div>
  )
}
