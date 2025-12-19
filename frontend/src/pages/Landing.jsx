import { Link } from "react-router-dom";
import Projects from "../components/Projects";
import Clients from "../components/Clients";
import ContactForm from "../components/ContactForm";
import Newsletter from "../components/Newsletter";

const Landing = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Modern Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter text-blue-600">
            PRO<span className="text-gray-900">JECT.</span>
          </div>
          <Link
            to="/admin"
            className="group flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-blue-600 transition-all shadow-lg shadow-gray-200"
          >
            <span>Admin Panel</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </nav>

      {/* Hero-like spacing for components */}
      <main className="space-y-0">
        <Projects />
        <div className="bg-gray-50">
          <Clients />
        </div>
        <ContactForm />
        <Newsletter />
      </main>

      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-sm">© 2025 Professional Services Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;