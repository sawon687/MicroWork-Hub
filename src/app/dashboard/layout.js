"use client";
import { Coins, PanelLeft } from "lucide-react";
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
import { useSession } from "next-auth/react";
import SidarLink from "../../Components/Ui/SidarLink";
import NextAuthPovider from '../../provider/NextAuthPovider';

// Role ভিত্তিক links
const workerLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Available Tasks", url: "/dashboard/tasks", icon: ListTodo },
  { title: "My Submissions", url: "/dashboard/submissions", icon: FileCheck },
  { title: "Withdraw", url: "/dashboard/withdraw", icon: Wallet },
  { title: "Purchase Coins", url: "/dashboard/purchase-coin", icon:Coins
   },
];

const buyerLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Add Task", url: "/dashboard/add-task", icon: PlusCircle },
  { title: "My Tasks", url: "/dashboard/my-task", icon: FolderOpen },
  { title: "Purchase Coins", url: "/dashboard/purchase-coin", icon:Coins
   },
];

const adminLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Manage Users", url: "/dashboard/manage-users", icon: Users },
  { title: "All Tasks", url: "/dashboard/tasks", icon: ListTodo },
    { title: "Purchase Coins", url: "/dashboard/purchase-coin", icon:Coins
   },
];

// role অনুযায়ী links select
const getLinks = (role) => {
  if (role === "Buyer") return buyerLinks;
  if (role === "Admin") return adminLinks;
  return workerLinks;
};

const DashboardLayout = ({children}) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const {navItem,setNavItem}=useState();
console.log('session layout',session)
  const role = session?.user?.role
  console.log('session role',role)
  const links = getLinks(role);

  return (
    <>
    <NextAuthPovider>


      <div>
      {/* Sidebar */}
      <div
        className={`bg-gradient-to-r from-[#0f172a] to-[#1e293b] 
        h-screen overflow-y-auto transition-all duration-300 
        ${open ? "w-64" : "w-14"} fixed left-0 top-0 z-40 flex flex-col`}
      >
        <div className="pl-4 border-b border-white/10 py-4 text-white">
          <Logo />
        </div>

        <ul className="mt-4 space-y-2 text-white px-2">
          {open &&( <h4 className='text-base py-2 pl-2 text-gray-300'>{role} Menu</h4>)}
          {links?.map(({ title, url, icon: Icon }, i) => (
            <SidarLink
              key={i}
              href={url}
              icon={<Icon size={18} />}
              open={open}
               
            >
              {title}
            </SidarLink>
          ))}

          {/* Extra */}
          <li>
            <button  className="flex items-center gap-3 p-3 w-full hover:bg-gray-700 rounded-md">
              <span>⚙️</span>
              {open && <span>Settings</span>}
            </button>
          </li>
        </ul>
      </div>

      {/* Navbar */}
      <div
        className={`fixed top-0 right-0 z-50 bg-white border-b border-gray-300 p-3 flex items-center gap-3 transition-all duration-300
        ${open ? "left-64" : "left-14"}`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <PanelLeft />
        </button>

        <h1 className="font-semibold">Navbar Title</h1>
         <div className='px-5 py-1 border border-white/10 rounded-xl flex bg-gray-800 text-emerald-500'
                >
                  {/* user coins */}
                   <Coins></Coins> <span>{session?.user?.coin}</span></div>
        
      </div>

      {/* Main Content */}
      <div
        className={`transition-all bg-gray-100 min-h-screen pt-16   duration-300 
        ${open ? "ml-64" : "ml-14"}`}
      >
        {children}
      </div>
    </div>
    </NextAuthPovider>
    </>
  );
};

export default DashboardLayout;