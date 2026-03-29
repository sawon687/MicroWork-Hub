import Image from "next/image";
import Banner from "./Components/Banner/Banner";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full justify-center  font-sans bg-black">
    <Banner></Banner>
    </div>
  );
}
