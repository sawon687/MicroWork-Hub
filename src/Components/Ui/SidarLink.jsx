import Link from "next/link";
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
const SidarLink = ({ children, href, open, icon }) => {
  const pathname=usePathname()
  const isActive=pathname === href
  return (
    <Link
      href={href}
      className={`${isActive?'bg-gray-700 text-emerald-400':'text-white'} flex items-center gap-3  p-3 hover:bg-gray-700 rounded-md`}
    >
      {icon}
      {open && <span>{children}</span>}
       {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className={`absolute inset-0 rounded-xl z-0`}
                    />
                  )}
    </Link>
  );
};

export default SidarLink;