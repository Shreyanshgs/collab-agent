import React from 'react'
import {
  SearchIcon,
  BellIcon,
  DownloadIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react'
export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-blue-600 mr-8">CollabAgent</h1>
        <div className="relative max-w-md w-96">
          <input
            type="text"
            placeholder="Search transcripts..."
            className="w-full py-2 pl-10 pr-4 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <DownloadIcon size={20} />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <BellIcon size={20} />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <SettingsIcon size={20} />
        </button>
        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
          <UserIcon size={18} />
        </div>
      </div>
    </header>
  )
}
