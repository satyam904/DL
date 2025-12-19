import logo from "../assets/platform/SvmNTuV7VzimdhbkzolVlaLz6Ig.svg"

const Footer = () => {
  return (
    <footer className="relative bg-[#F3F4FF] py-24">
      {/* subtle top & bottom fade */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/60 to-transparent" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* LOGO */}
        <img
          src={logo}
          alt="Delightloop"
          className="h-10 opacity-90"
        />

        {/* LINKEDIN ICON */}
        <a
          href="#"
          className="text-gray-600 hover:text-purple-600 transition"
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.027-3.058-1.864-3.058-1.864 0-2.15 1.454-2.15 2.958v5.704h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.038 0 3.6 2.001 3.6 4.604v5.591z" />
          </svg>
        </a>

        {/* COPYRIGHT */}
        <p className="text-sm text-gray-500">
          © 2025 DelightLoop.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
