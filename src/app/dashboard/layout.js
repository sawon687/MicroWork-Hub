"use client";
import { PanelLeft } from "lucide-react";
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

// Role ভিত্তিক links
const workerLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Available Tasks", url: "/dashboard/tasks", icon: ListTodo },
  { title: "My Submissions", url: "/dashboard/submissions", icon: FileCheck },
  { title: "Withdraw", url: "/dashboard/withdraw", icon: Wallet },
];

const buyerLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Add Task", url: "/dashboard/add-task", icon: PlusCircle },
  { title: "My Tasks", url: "/dashboard/my-tasks", icon: FolderOpen },
];

const adminLinks = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Manage Users", url: "/dashboard/manage-users", icon: Users },
  { title: "All Tasks", url: "/dashboard/tasks", icon: ListTodo },
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

  const role = session?.user?.role;
  const links = getLinks(role);

  return (
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
      </div>

      {/* Main Content */}
      <div
        className={`transition-all bg-gray-100 min-h-screen p-20  duration-300 
        ${open ? "ml-64" : "ml-14"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;