'use client'
import { Coins, Loader2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'

const LiveCoin = () => {
const pathname=usePathname()
  const { data: coin, isLoading } = useQuery({
    queryKey: ['userCoin'], 
    queryFn: async () => {
      const res = await fetch('/api/sing-up') 
      const result = await res.json()
      return result.coin
    },
    
  })

  console.log('coin',coin)
  const isDashboard = pathname?.startsWith('/dashboard')

  if (isLoading) return <Loader2 className=' animate-spin w-8 h-8 text-emerald-400'></Loader2>

  return (
    <div className={`
      flex justify-center items-center gap-2 px-4 py-1.5 rounded-full font-bold transition-all
      ${isDashboard 
        ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-white shadow-sm' 
        : 'bg-slate-900/50 border border-teal-500/50 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400'
      }
    `}>
      <Coins 
        size={18} 
        className={isDashboard ? 'text-white' : 'text-teal-400'} 
      />
      
      <span className={isDashboard ? 'text-white' : ''}>
        {coin ?? 0}
      </span>
    </div>
  )
}

export default LiveCoin