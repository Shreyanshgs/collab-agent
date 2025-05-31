'use client'

import React, { useState } from 'react'
import {
  CheckCircleIcon,
  CircleIcon,
  UserIcon,
  CalendarIcon,
  EditIcon,
} from 'lucide-react'
type ActionItemType = {
  id: string
  task: string
  assignee: string
  dueDate: string
  completed: boolean
}
export function ActionItems() {
  const [actionItems, setActionItems] = useState<ActionItemType[]>([
    {
      id: '1',
      task: 'Fix responsive layout issues in dashboard redesign',
      assignee: 'Taylor Kim',
      dueDate: 'Jun 18',
      completed: false,
    },
    {
      id: '2',
      task: 'Start designing advanced notification controls',
      assignee: 'Taylor Kim',
      dueDate: 'Jun 20',
      completed: false,
    },
    {
      id: '3',
      task: 'Compile detailed user feedback on notification preferences',
      assignee: 'Sarah Chen',
      dueDate: 'Jun 17',
      completed: true,
    },
    {
      id: '4',
      task: 'Estimate development effort for notification control updates',
      assignee: 'Michael Rodriguez',
      dueDate: 'Jun 19',
      completed: false,
    },
    {
      id: '5',
      task: 'Schedule meeting with enterprise customers to discuss notification requirements',
      assignee: 'Alex Johnson',
      dueDate: 'Jun 22',
      completed: false,
    },
  ])
  const toggleComplete = (id: string) => {
    setActionItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item,
      ),
    )
  }
  return (
    <div className="bg-white text-black rounded-lg shadow-sm border border-gray-200">
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Action Items</h2>
        <div className="text-sm text-gray-500">5 items • 1 completed</div>
      </div>
      <div className="divide-y divide-gray-100">
        {actionItems.map((item) => (
          <div key={item.id} className="px-6 py-4 flex items-start">
            <button
              className="mt-1 mr-3 text-gray-400 hover:text-blue-500"
              onClick={() => toggleComplete(item.id)}
            >
              {item.completed ? (
                <CheckCircleIcon size={20} className="text-green-500" />
              ) : (
                <CircleIcon size={20} />
              )}
            </button>
            <div className="flex-1">
              <div
                className={`font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
              >
                {item.task}
              </div>
              <div className="flex items-center mt-2 text-sm">
                <div className="flex items-center text-gray-600 mr-4">
                  <UserIcon size={14} className="mr-1" />
                  <span>{item.assignee}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarIcon size={14} className="mr-1" />
                  <span>{item.dueDate}</span>
                </div>
              </div>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <EditIcon size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <button className="w-full py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 flex items-center justify-center">
          <span className="text-xl mr-1">+</span> Add action item
        </button>
      </div>
    </div>
  )
}
