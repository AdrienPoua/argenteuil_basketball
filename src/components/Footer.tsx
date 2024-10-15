import Link from "next/link";
import Underline from "@/components/UnderlineDecorator";

export default function Footer() {
  return (
    <footer className="border-t-2 bg-black pt-4 pb-7 border-primary flex justify-center">
      <div className="flex justify-center">
        <Link
          href="https://www.linkedin.com/in/adrien-poua"
          target="_blank"
          className="text-gray-500 flex justify-center items-center no-underline relative"
        >
          <Underline />
          <p className="text-white">
            Made with
            <span className="text-primary mx-1">❤</span>
            by
            <span className="ml-1 hover:text-primary">Adrien POUA</span>
          </p>
        </Link>
      </div>
    </footer>
  );
}
