import React from 'react'
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  TagIcon,
  FolderIcon,
  ChevronDownIcon,
} from 'lucide-react'
export function Sidebar() {
  return (
    <aside className="w-72 text-black border-r border-gray-200 bg-white p-4 hidden md:block overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Product Team Standup</h2>
        <div className="text-sm text-gray-500">June 15, 2023 • 45 minutes</div>
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Meeting Details</h3>
          <button className="text-blue-600 text-sm">Edit</button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <CalendarIcon size={16} className="mr-2 text-gray-500" />
            <span>June 15, 2023</span>
          </div>
          <div className="flex items-center text-sm">
            <ClockIcon size={16} className="mr-2 text-gray-500" />
            <span>10:00 AM - 10:45 AM</span>
          </div>
          <div className="flex items-start text-sm">
            <UsersIcon size={16} className="mr-2 mt-1 text-gray-500" />
            <div>
              <div>Alex Johnson (Lead)</div>
              <div>Sarah Chen</div>
              <div>Michael Rodriguez</div>
              <div>Taylor Kim</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Topics</h3>
          <ChevronDownIcon size={16} />
        </div>
        <div className="space-y-2 pl-2">
          <div className="flex items-center text-sm py-1">
            <TagIcon size={14} className="mr-2 text-gray-500" />
            <span>Q2 Roadmap Updates</span>
          </div>
          <div className="flex items-center text-sm py-1">
            <TagIcon size={14} className="mr-2 text-gray-500" />
            <span>User Feedback Review</span>
          </div>
          <div className="flex items-center text-sm py-1">
            <TagIcon size={14} className="mr-2 text-gray-500" />
            <span>New Feature Planning</span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Related Documents</h3>
          <ChevronDownIcon size={16} />
        </div>
        <div className="space-y-2 pl-2">
          <div className="flex items-center text-sm py-1">
            <FolderIcon size={14} className="mr-2 text-gray-500" />
            <span>Q2 Product Roadmap.pdf</span>
          </div>
          <div className="flex items-center text-sm py-1">
            <FolderIcon size={14} className="mr-2 text-gray-500" />
            <span>User Research Results.xlsx</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
