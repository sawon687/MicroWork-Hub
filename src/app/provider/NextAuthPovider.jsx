'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react';
const NextAuthPovider = ({ children }) => {
  return (
    <SessionProvider>{children}</SessionProvider>

  )
}

export default NextAuthPovider