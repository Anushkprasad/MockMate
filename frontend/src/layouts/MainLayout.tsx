import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, LogIn } from 'lucide-react';
import { Button } from '../components/common/Button';

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const hasToken = !!localStorage.getItem('mockmate_token');
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg mesh-grid relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-bg-glow-purple pointer-events-none rounded-full animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-bg-glow-cyan pointer-events-none rounded-full animate-pulse-glow" />

      {/* Floating glass navbar */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-500 max-w-7xl mx-auto px-4 md:px-8 ${
        isScrolled ? 'py-2 md:py-3 scale-[0.985]' : 'py-4'
      }`}>
        <div className={`glass-panel px-6 py-3.5 rounded-2xl flex items-center justify-between shadow-md transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/88 backdrop-blur-xl border border-slate-200/70 shadow-lg shadow-violet-500/5' 
            : 'bg-white/75 border border-slate-200/50'
        }`}>
          <Link to="/" className="flex items-center gap-2.5 text-slate-900 hover:opacity-90 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-sky-400 flex items-center justify-center shadow-md border border-violet-100/50">
              <BrainCircuit className="w-5.5 h-5.5 text-white" />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg tracking-wider text-slate-900">
                MOCKMATE <span className="text-sky-600 text-[11px] font-display font-black tracking-normal px-1 py-0.5 rounded border border-sky-200 bg-sky-50 align-middle">X AI</span>
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600 font-semibold">
            {[
              { label: 'Features', href: '#features' },
              { label: 'AI Engine', href: '#demo' },
            ].map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="relative py-1 hover:text-slate-900 transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {hasToken ? (
              <Button variant="primary" size="sm" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Link to="/login" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 font-semibold transition-colors duration-300 px-4 py-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
                <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>
                  Start Free
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main landing container */}
      <main className="flex-grow z-10">
        <Outlet />
      </main>

      {/* Futuristic footer */}
      <footer className="z-10 border-t border-slate-200/60 bg-white/80 backdrop-blur-md py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-sky-400 flex items-center justify-center">
                <BrainCircuit className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-extrabold text-base tracking-wider text-slate-900">
                MOCKMATE X AI
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Adaptive virtual mock interviews powered by multimodal biometric tracking and natural language processing.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">Features</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#" className="hover:text-slate-800 transition-colors">Voice Analytics</a></li>
              <li><a href="#" className="hover:text-slate-800 transition-colors">Face Posture Scanner</a></li>
              <li><a href="#" className="hover:text-slate-800 transition-colors">Confidence Predictor</a></li>
              <li><a href="#" className="hover:text-slate-800 transition-colors">Adaptive Interviewer</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#" className="hover:text-slate-800 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">Company</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              Aiming to bridge the gap between engineering classrooms and real placements.
            </p>
            <div className="text-xs text-sky-600 font-semibold">
              © {new Date().getFullYear()} MockMate. Made for Students.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
