export default function Footer() {
  return (
    <footer className="backdrop-blur-xl bg-white/30 border-t border-orange-200/40 shadow-inner py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-lg font-semibold text-orange-900">
          <p>&copy; 2025 MySite. All rights reserved.</p>
        </div>

        <div className="flex space-x-6">
          <a
            href="#"
            className="text-orange-700 hover:text-orange-900 font-semibold transition"
          >
            Facebook
          </a>
          <a
            href="#"
            className="text-orange-700 hover:text-orange-900 font-semibold transition"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-orange-700 hover:text-orange-900 font-semibold transition"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

