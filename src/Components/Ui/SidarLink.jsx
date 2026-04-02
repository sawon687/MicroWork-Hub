import Link from "next/link";
import { usePathname } from 'next/navigation';

const SidarLink = ({ children, href, open, icon }) => {
  const pathname=usePathname()
  const isActive=pathname.startsWith(href)
  return (
    <Link
      href={href}
      className={`${isActive?'bg-gray-700 text-emerald-400':'text-white'} flex items-center gap-3  p-3 hover:bg-gray-700 rounded-md`}
    >
      {icon}
      {open && <span>{children}</span>}
    </Link>
  );
};

export default SidarLink;