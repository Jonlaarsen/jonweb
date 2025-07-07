import { LuCodesandbox } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="w-full bg-[#ffdfda] border-t-4 dark:border-cyan-200 border-black dark:bg-[#272221] py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="flex gap-1 text-3xl font-bold border-b-4">
            JL-Studios
            <LuCodesandbox className="h-10 w-10" />
          </p>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025 All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
