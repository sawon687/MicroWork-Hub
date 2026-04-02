
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div>
        <Link href={'/'} className="text-2xl font-bold text-emerald-400">
          TaskFlow
        </Link>
    </div>
  )
}

export default Logo