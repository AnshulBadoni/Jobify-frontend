"use client"
import React from 'react'
import { CgDarkMode } from 'react-icons/cg'

const DarkMode = () => {
    return (
        <div className="fixed right-16 bottom-20 lg:bottom-6 flex flex-col items-end z-40">
            <button
                onClick={() => document.documentElement.classList.toggle('dark')}
                className="flex items-center justify-center rounded-full 
               bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 
               shadow-md hover:shadow-lg transition-all duration-300
               p-3 gap-2"
            >
                <CgDarkMode className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
        </div >
    )
}

export default DarkMode