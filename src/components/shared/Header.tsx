/**
 * @fileoverview Global header component with navigation.
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Brain, 
  Home, 
  BookOpen, 
  Settings,
  ChevronRight 
} from 'lucide-react';

interface HeaderProps {
  showBreadcrumb?: boolean;
  breadcrumb?: { label: string; path: string }[];
}

const Header: React.FC<HeaderProps> = ({ showBreadcrumb = false, breadcrumb = [] }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
              <Brain size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                VLA Learning Lab
              </h1>
              <p className="text-[10px] text-neutral-500 tracking-wider">
                From Math to Robots
              </p>
            </div>
          </Link>

          {/* Breadcrumb */}
          {showBreadcrumb && breadcrumb.length > 0 && (
            <nav className="hidden md:flex items-center gap-2 text-sm">
              <Link to="/" className="text-neutral-500 hover:text-white transition-colors">
                <Home size={14} />
              </Link>
              {breadcrumb.map((item, i) => (
                <React.Fragment key={item.path}>
                  <ChevronRight size={14} className="text-neutral-600" />
                  <Link 
                    to={item.path}
                    className={`transition-colors ${
                      i === breadcrumb.length - 1 
                        ? 'text-violet-400' 
                        : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </React.Fragment>
              ))}
            </nav>
          )}

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {!isHome && (
              <Link 
                to="/"
                className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <Home size={14} />
                <span className="hidden sm:inline">Home</span>
              </Link>
            )}
            <Link 
              to="/curriculum"
              className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <BookOpen size={14} />
              <span className="hidden sm:inline">Curriculum</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
