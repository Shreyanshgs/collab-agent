'use client'

import React, { useState } from 'react'
import { Header } from './components/Header'
import { TranscriptViewer } from './components/TranscriptViewer'
import { Sidebar } from './components/Sidebar'
import { AISummary } from './components/AISummary'
import { ActionItems } from './components/ActionItems'
import { Transcriber } from './components/Transcriber'

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    'transcript' | 'summary' | 'actions'
  >('transcript')
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Transcriber />
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-4 py-2 font-medium rounded-md ${activeTab === 'transcript' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('transcript')}
              >
                Transcript
              </button>
              <button
                className={`px-4 py-2 font-medium rounded-md ${activeTab === 'summary' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('summary')}
              >
                AI Summary
              </button>
              <button
                className={`px-4 py-2 font-medium rounded-md ${activeTab === 'actions' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('actions')}
              >
                Action Items
              </button>
            </div>
            {activeTab === 'transcript' && <TranscriptViewer />}
            {activeTab === 'summary' && <AISummary />}
            {activeTab === 'actions' && <ActionItems />}
          </div>
        </main>
      </div>
    </div>
  );
}
