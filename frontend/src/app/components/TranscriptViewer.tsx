import React from 'react'
import { BookmarkIcon, ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react'
type MessageType = {
  id: string
  speaker: string
  speakerColor: string
  time: string
  content: string
  isHighlighted?: boolean
}
export function TranscriptViewer() {
  const messages: MessageType[] = [
    {
      id: '1',
      speaker: 'Alex Johnson',
      speakerColor: 'bg-blue-500',
      time: '00:00',
      content:
        "Good morning everyone! Let's get started with our product team standup. Today we'll be discussing the Q2 roadmap updates, reviewing recent user feedback, and planning for the new feature launch.",
    },
    {
      id: '2',
      speaker: 'Sarah Chen',
      speakerColor: 'bg-purple-500',
      time: '00:18',
      content:
        "Thanks Alex. I've compiled all the user feedback from the last two weeks. There are some recurring themes we should address.",
    },
    {
      id: '3',
      speaker: 'Michael Rodriguez',
      speakerColor: 'bg-green-500',
      time: '00:25',
      content:
        "Before we dive into that, can we quickly go over the current sprint status? I want to make sure we're on track with the existing deliverables.",
    },
    {
      id: '4',
      speaker: 'Alex Johnson',
      speakerColor: 'bg-blue-500',
      time: '00:32',
      content:
        "Sure, Michael. According to our sprint board, we're about 80% complete with the current sprint. The authentication flow improvements are done, and the dashboard redesign is in QA now.",
    },
    {
      id: '5',
      speaker: 'Taylor Kim',
      speakerColor: 'bg-orange-500',
      time: '00:45',
      content:
        'I can confirm that. QA has already approved most of the dashboard changes. There are just a couple of minor issues with the responsive layout on smaller screens that we need to address.',
    },
    {
      id: '6',
      speaker: 'Sarah Chen',
      speakerColor: 'bg-purple-500',
      time: '01:03',
      content:
        "Great! Now, regarding user feedback, we're seeing a lot of requests for better notification controls. Users want more granular options for what they get notified about.",
      isHighlighted: true,
    },
    {
      id: '7',
      speaker: 'Michael Rodriguez',
      speakerColor: 'bg-green-500',
      time: '01:20',
      content:
        'That makes sense. The current notification system is pretty basic. Are there any specific examples from users?',
    },
    {
      id: '8',
      speaker: 'Sarah Chen',
      speakerColor: 'bg-purple-500',
      time: '01:28',
      content:
        'Yes, several enterprise customers mentioned they want to be able to set different notification preferences for different team members based on their roles. And they want to be able to mute notifications during specific hours.',
    },
    {
      id: '9',
      speaker: 'Alex Johnson',
      speakerColor: 'bg-blue-500',
      time: '01:45',
      content:
        'This aligns with our Q2 goal of improving enterprise features. I think we should prioritize this for the next sprint.',
      isHighlighted: true,
    },
    {
      id: '10',
      speaker: 'Taylor Kim',
      speakerColor: 'bg-orange-500',
      time: '01:57',
      content:
        'I agree. I can start working on the design for more advanced notification controls this week. Should we include it in the next product update or wait for the bigger release in July?',
    },
    {
      id: '11',
      speaker: 'Alex Johnson',
      speakerColor: 'bg-blue-500',
      time: '02:10',
      content:
        "Let's aim for the next update if possible. Our enterprise customers have been asking for this for a while, and I'd like to show progress on their requests.",
    },
    {
      id: '12',
      speaker: 'Michael Rodriguez',
      speakerColor: 'bg-green-500',
      time: '02:25',
      content:
        "That's a tight timeline, but I think we can make it work if we focus on the most requested controls first and then expand later.",
    },
    {
      id: '13',
      speaker: 'Sarah Chen',
      speakerColor: 'bg-purple-500',
      time: '02:40',
      content:
        "Moving on to the new analytics dashboard feature - I've completed the initial backend work for data processing. We're seeing good performance with the new aggregation methods.",
    },
  ]
  return (
    <div className="bg-white text-black rounded-lg shadow-sm border border-gray-200">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-semibold">Meeting Transcript</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`px-6 py-4 ${message.isHighlighted ? 'bg-yellow-50' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full ${message.speakerColor} flex items-center justify-center text-white font-medium`}
                >
                  {message.speaker.charAt(0)}
                </div>
                <span className="ml-3 font-medium">{message.speaker}</span>
              </div>
              <div className="text-sm text-gray-500">{message.time}</div>
            </div>
            <div className="pl-11 text-gray-800">{message.content}</div>
            <div className="pl-11 mt-2 flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-600 flex items-center text-sm">
                <BookmarkIcon size={16} className="mr-1" />
                <span>Save</span>
              </button>
              <button className="text-gray-400 hover:text-gray-600 flex items-center text-sm">
                <ThumbsUpIcon size={16} className="mr-1" />
                <span>Helpful</span>
              </button>
              <button className="text-gray-400 hover:text-gray-600 flex items-center text-sm">
                <ThumbsDownIcon size={16} className="mr-1" />
                <span>Not helpful</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
