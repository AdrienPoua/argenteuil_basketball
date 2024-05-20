import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { NavItem } from "@/components/Header/NavItem";
import Contact from "@/components/Header/Contact";
import SubBar from "@/components/Header/SubBar";
import { v4 as uuiv4 } from "uuid";
import { NavItemType } from "@/types";
import { useRouter } from 'next/router';

export default function Header({ data }: Readonly<{ data: NavItemType[] }>) {
  const [activeNav, setActiveNav] = useState<NavItemType>({
    title: "",
    subItems: [],
  });
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!headerRef.current) return;

      const clickedElement = e.target as Node;
      const isClickedInside = headerRef.current.contains(clickedElement);

      console.log(clickedElement);

      if (!isClickedInside || clickedElement.textContent === activeNav.title) {
        setActiveNav({ title: "", subItems: [] });
      }
    };

    document.addEventListener("mouseup", handleMouseDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseDown);
    };
  }, [activeNav]);

  return (
    <header
      ref={headerRef}
      className={`flex flex-col w-full z-10 bg-transparent`}
    >
      <div className='flex w-full px-6 py-2 bg-white'>
        <Link href='/' className='shrink-0'>
          <Image
            src={logo}
            alt='logo'
            className='me-5'
            width='50'
            height='50'
          />
        </Link>
        <nav className='flex grow'>
          <ul className='flex'>
            {data.map((item) => (
              <NavItem key={uuiv4()} data={item} setActiveNav={setActiveNav} />
            ))}
          </ul>
        </nav>
        <Contact />
      </div>
      <SubBar data={activeNav} />
    </header>
  );
}
