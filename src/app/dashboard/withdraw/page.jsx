'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { 
  Wallet, DollarSign, ArrowRight, Banknote, 
  CreditCard, Loader2, AlertCircle, CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MessageModal from '../../../Components/Ui/MessageModal';

const WithdrawalPage = () => {
  const { data: session } = useSession();
  
  const [userCoins, setUserCoins] = useState(0); 
  const [withdrawCoin, setWithdrawCoin] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("Bkash");
  const [accountNumber, setAccountNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
 const [loading,setLoading]=useState(false)

  const COIN_RATE = 20; // 20 coins = 1 dollar
  const MIN_WITHDRAW_COIN = 200;

  useEffect(() => {
    const amount = withdrawCoin / COIN_RATE;
    setWithdrawAmount(amount);
  }, [withdrawCoin]);
const fetchUserCoins = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sing-up');
      const data = await res.json();
      setUserCoins(data.coin);
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchUserCoins();
  }, []);
  const handleWithdraw = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const withdrawData = {
      worker_email: session?.user?.email,
      worker_name: session?.user?.name,
      withdrawal_coin: Number(withdrawCoin),
      withdrawal_amount: withdrawAmount,
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: new Date(),
      status: "pending"
    };

    try {
      const res = await fetch('/api/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withdrawData)
      });

      if (res.ok) {
         
        setSuccess(true);
        setWithdrawCoin(0);
        setAccountNumber("");
          await fetchUserCoins();
      }
    } catch (error) {
      console.error("Withdraw error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
if(loading) return (<div className='min-h-screen flex justify-center items-center'><Loader2 className='w-20 h-20 animate-spin text-emerald-400'></Loader2></div>)
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 mb-2 font-syne">Withdraw Funds</h1>
          <p className="text-slate-500 font-medium">Convert your hard-earned coins into real money</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Stats Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[35px] p-8 text-white shadow-xl shadow-emerald-200/50">
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                   <Wallet size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full">Available</span>
              </div>
              <p className="text-emerald-100 text-sm font-bold uppercase mb-1">Total Coins</p>
              <h2 className="text-5xl font-black mb-6">{userCoins}</h2>
              <div className="pt-6 border-t border-white/10">
                <p className="text-emerald-100 text-xs font-bold uppercase mb-1">Equivalent Value</p>
                <h3 className="text-2xl font-bold">${(userCoins / COIN_RATE).toFixed(2)}</h3>
              </div>
            </div>

            <div className="bg-white rounded-[30px] p-6 border border-slate-100">
               <div className="flex items-center gap-3 text-amber-600 mb-3">
                  <AlertCircle size={20} />
                  <span className="font-bold text-sm">Withdrawal Policy</span>
               </div>
               <p className="text-slate-500 text-sm leading-relaxed">
                  Minimum withdrawal is <span className="text-slate-900 font-bold">{MIN_WITHDRAW_COIN} coins</span> ($10). 
                  Withdrawals are processed within 24 hours.
               </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-sm border border-slate-50">
              
              {userCoins < MIN_WITHDRAW_COIN ? (
                <div className="py-12 text-center">
                   <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <AlertCircle size={40} className="text-rose-500" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 mb-2">Insufficient Coins</h3>
                   <p className="text-slate-500 mb-8">You need at least {MIN_WITHDRAW_COIN - userCoins} more coins to withdraw.</p>
                   <button disabled className="px-8 py-4 bg-slate-100 text-slate-400 rounded-2xl font-bold cursor-not-allowed">
                      Withdrawal Locked
                   </button>
                </div>
              ) : (
                <form onSubmit={handleWithdraw} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Coin Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Coins to Withdraw</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          required
                          min={MIN_WITHDRAW_COIN}
                          max={userCoins}
                          value={withdrawCoin}
                          onChange={(e) => setWithdrawCoin(e.target.value)}
                          className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                          placeholder="Ex: 200"
                        />
                      </div>
                    </div>

                    {/* Dollar Output (Disabled) */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">You Receive (USD)</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          disabled
                          value={`$${withdrawAmount.toFixed(2)}`}
                          className="w-full bg-emerald-50 border-none rounded-2xl px-5 py-4 font-black text-emerald-600 cursor-not-allowed"
                        />
                        <DollarSign size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-400" />
                      </div>
                    </div>
                  </div>

                  {/* Payment System */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Payment Method</label>
                    <select 
                      value={paymentSystem}
                      onChange={(e) => setPaymentSystem(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="Bkash">Bkash</option>
                      <option value="Nagad">Nagad</option>
                      <option value="Rocket">Rocket</option>
                      <option value="Stripe">Stripe (International)</option>
                    </select>
                  </div>

                  {/* Account Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Account Number / Email</label>
                    <input 
                      type="text" 
                      required
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="Enter your account info"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting || withdrawCoin > userCoins}
                    className="w-full bg-slate-900 text-white rounded-[22px] py-5 font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>Submit Withdrawal <ArrowRight size={20} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Animation Overlay */}
      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-6"
          >
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }}
                className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 size={50} />
              </motion.div>
              <h2 className="text-3xl font-black text-slate-900 mb-2 font-syne">Request Sent!</h2>
              <p className="text-slate-500 mb-8 max-w-xs mx-auto">Your withdrawal request is pending approval. You'll be notified soon.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="px-10 py-4 bg-slate-100 rounded-2xl font-bold text-slate-900 hover:bg-slate-200 transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    
    </div>
  );
};

export default WithdrawalPage;