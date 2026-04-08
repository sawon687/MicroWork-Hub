"use client";
import { Coins, PanelLeft, Bell, User as UserIcon, LogOut } from "lucide-react";
import { useState } from "react";
import Logo from "../../Components/Ui/Logo";
import {
  LayoutDashboard,
  ListTodo,
  FileCheck,
  PlusCircle,
  FolderOpen,
  Users,
  Wallet,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import SidarLink from "../../Components/Ui/SidarLink";
import NextAuthPovider from '../../provider/NextAuthPovider';
import UseQueryProvider from '../../provider/UseQueryProvider';
import NotificationModal from '../../Components/NotificationModal/NotificationModal';

// Role ভিত্তিক links
const workerLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Available Tasks", url: "/dashboard/tasks", icon: ListTodo },
  { title: "My Submissions", url: "/dashboard/my-submission", icon: FileCheck },
  { title: "Withdraw", url: "/dashboard/withdraw", icon: Wallet },
];

const buyerLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Add Task", url: "/dashboard/add-task", icon: PlusCircle },
  { title: "My Tasks", url: "/dashboard/my-task", icon: FolderOpen },
];

const adminLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Manage Users", url: "/dashboard/manage-users", icon: Users },
  { title: "All Tasks", url: "/dashboard/tasks", icon: ListTodo },
];

const commonLinks = [
  { title: "Purchase Coins", url: "/dashboard/purchase-coin", icon: Coins },
];

const getLinks = (role) => {
  let baseLinks = [];
  if (role === "Buyer") baseLinks = buyerLinks;
  else if (role === "Admin") baseLinks = adminLinks;
  else baseLinks = workerLinks;
  
  return [...baseLinks, ...commonLinks];
};

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(true); // Default open রাখলে দেখতে ভালো লাগে
  const { data: session } = useSession();
  
  const role = session?.user?.role;
  const links = getLinks(role);

  return (
    <NextAuthPovider>
      <UseQueryProvider>
      <div className="min-h-screen bg-slate-50">
        
        {/* --- Sidebar --- */}
        <aside
          className={`bg-[#0f172a] h-screen fixed left-0 top-0 z-[60] transition-all duration-300 overflow-y-auto
          ${open ? "w-64" : "w-20"} flex flex-col border-r border-white/5 shadow-2xl`}
        >
          <div className="p-5 border-b border-white/10 flex items-center justify-center">
            {open ? <Logo /> : <div className="w-10 h-10 bg-emerald-400 rounded-lg flex justify-center font-bold items-center text-white">TF</div>}
               
          </div>

          <nav className="mt-6 flex-1 px-3 space-y-1">
            {open && (
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2">
                {role} Menu
              </p>
            )}
            {links?.map(({ title, url, icon: Icon }, i) => (
              <SidarLink
                key={i}
                href={url}
                icon={<Icon size={20} />}
                open={open}
              >
                {title}
              </SidarLink>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10">
             <button className="flex items-center gap-3 p-3 w-full text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                <LogOut size={20} />
                {open && <span className="font-medium" onClick={() => signOut()}>Logout</span>}
             </button>
          </div>
        </aside>

        {/* --- Navbar --- */}
        <header
          className={`fixed top-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-6 transition-all duration-300
          ${open ? "left-64" : "left-20"}`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <PanelLeft size={22} />
            </button>
            <h2 className="hidden md:block font-bold text-slate-800 tracking-tight capitalize">
              {role} Panel
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Coins Display */}
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full shadow-sm">
                <div className="bg-emerald-500 p-1 rounded-full">
                    <Coins size={14} className="text-white" />
                </div>
                <span className="text-emerald-700 font-black text-sm">
                    {session?.user?.coin || 0}
                </span>
            </div>

            {/* Notification */}
            <NotificationModal></NotificationModal>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-900 leading-none">{session?.user?.name}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">{role}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 overflow-hidden shadow-sm ring-2 ring-emerald-50">
                    {session?.user?.photo ? (
                        <img src={session.user.photo} alt="User" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <UserIcon size={20} />
                        </div>
                    )}
                </div>
            </div>
          </div>
        </header>

        {/* --- Main Content --- */}
        <main
          className={`transition-all duration-300 pt-20 px-6 min-h-screen
          ${open ? "ml-64" : "ml-20"}`}
        >
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
      </UseQueryProvider>
    </NextAuthPovider>
  );
};

export default DashboardLayout;