import Link from 'next/link'
import React from 'react'

const Logo = ({ page = "/" }: { page?: string }) => {
    return (
        <>
            {/* Logo */}
            <Link href={page} className="inline-flex items-baseline gap-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {/* <span className="text-2xl font-bold text-gray-900">Crack</span>
                <span className="text-2xl font-bold text-violet-600">Job</span>
                <div className="w-1.5 h-1.5 bg-violet-600 rounded-full mb-1.5"></div> */}
                <img src="logo.svg" alt="crackJob" className='w-44 ' />
            </Link>
        </>
    )
}

export default Logo