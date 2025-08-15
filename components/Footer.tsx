// components/Footer.tsx
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center mt-12 p-6 bg-slate-900 text-slate-200 h-28 w-full">
      {/* Social Icons */}
      <div className="flex gap-6 mb-2">
        <a
          href="https://www.linkedin.com/in/agraw-min/"
          target="_blank"
          rel="noopener noreferrer"
          className="transform transition-transform hover:scale-110"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="text-3xl sm:text-4xl text-[#0077B5]" />
        </a>

        <a
          href="https://github.com/Agraw-Mindaye"
          target="_blank"
          rel="noopener noreferrer"
          className="transform transition-transform hover:scale-110"
          aria-label="GitHub"
        >
          <FaGithub className="text-3xl sm:text-4xl text-white" />
        </a>
      </div>

      {/* Name */}
      <p className="text-sm sm:text-base font-medium">Agraw Mindaye</p>
    </footer>
  );
}
