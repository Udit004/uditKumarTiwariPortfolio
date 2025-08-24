'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  // Check if project ID is configured
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Sanity Studio Not Configured</h1>
          <p className="text-gray-300 mb-4">
            Please set up your Sanity project ID in the environment variables.
          </p>
          <p className="text-sm text-gray-400">
            Add NEXT_PUBLIC_SANITY_PROJECT_ID to your .env.local file
          </p>
        </div>
      </div>
    )
  }

  return <NextStudio config={config} />
}

export const dynamic = 'force-static'
