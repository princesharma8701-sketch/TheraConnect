import React, { useState } from 'react';
import { Menu, X, ShieldCheck, Calendar } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, isAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'services', label: 'Clinical Services' },
    { id: 'about', label: 'About the Institute' },
    { id: 'booking', label: 'Appointments' },
    { id: 'resources', label: 'Clinical Resources' },
    { id: 'blog', label: 'Journal & Insights' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F2]/95 backdrop-blur-md border-b border-[#EFEDE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single clean text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-2xl sm:text-3xl font-editorial font-semibold tracking-tight text-[#173D35] hover:text-[#0E2722] transition-colors whitespace-nowrap shrink-0 text-left"
          >
            TheraConnect
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#242B29]/80">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#173D35] ${
                    isActive ? 'text-[#173D35] font-semibold' : 'text-[#242B29]/75'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#173D35]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + subtle admin portal link */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => handleNavClick('admin')}
              className={`hidden md:inline-flex items-center gap-1.5 text-xs text-[#242B29]/65 hover:text-[#173D35] transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'admin' ? 'text-[#173D35] font-semibold' : ''
              }`}
              title="Clinical Management Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B99A64]" />
              <span>{isAdmin ? 'Admin Portal' : 'Staff Portal'}</span>
            </button>

            <button
              onClick={() => handleNavClick('booking')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#173D35] hover:bg-[#0E2722] active:scale-[0.98] transition-all rounded-md shadow-xs whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4 text-[#A8B9A3]" />
              <span>Book Consultation</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#173D35] hover:bg-[#EFEDE4]/60 rounded-md transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EFEDE4] bg-[#F8F7F2] px-4 pt-3 pb-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left py-2 px-3 rounded-md text-base transition-colors ${
                activeTab === item.id
                  ? 'bg-[#EFEDE4] text-[#173D35] font-semibold'
                  : 'text-[#242B29]/80 hover:bg-[#EFEDE4]/50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#EFEDE4] flex items-center justify-between px-3">
            <button
              onClick={() => handleNavClick('admin')}
              className="text-xs text-[#242B29]/70 hover:text-[#173D35] flex items-center gap-1.5 py-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-[#B99A64]" />
              <span>Clinical Admin Portal</span>
            </button>
            <button
              onClick={() => handleNavClick('confirmation')}
              className="text-xs text-[#242B29]/70 hover:text-[#173D35] py-1.5 underline"
            >
              Lookup Booking
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
