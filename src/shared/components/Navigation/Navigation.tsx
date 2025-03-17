import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useVisibilityStore } from "../../../features/shared/store/visibilityStore";
import { motionVariants } from "../../../lib/motion";

const MotionNav = motion.nav;
const MotionLink = motion(Link);
const MotionDiv = motion.div;

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useUser();
  const { isPublicDataEnabled, error, initialize, setPublicDataEnabled } = useVisibilityStore();

  const isAdmin = user?.publicMetadata?.role === 'admin';
  const isOrganization = user?.publicMetadata?.role === 'organization';
  const isPublic = !isAdmin && !isOrganization;

  useEffect(() => {
    initialize();
  }, [initialize]);

  const togglePublicVisibility = async () => {
    try {
      const role = isAdmin ? 'admin' : isOrganization ? 'organization' : 'public';
      await setPublicDataEnabled(!isPublicDataEnabled, role);
    } catch (err) {
      // Error is handled by the store
    }
  };

  if (!user) return null;

  const navItems = [
    { path: "/data-collection", label: "Data Collection" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <>
      <MotionNav 
        className="fixed top-0 left-0 right-0 z-50 bg-[#1a2942]/90 backdrop-blur-md border-b border-[#4d5b8c]/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
      >
        <MotionDiv
          className="container mx-auto px-4 relative"
          variants={motionVariants.fadeIn}
          initial="initial"
          animate="animate"
        >
          <div className="flex h-16 justify-between items-center">
            {/* Logo/Home Link */}
            <MotionLink
              to="/"
              className="flex items-center"
              whileHover={motionVariants.hoverEnergize}
            >
              <span className="text-xl font-bold text-[#a8c6ff] tracking-wider font-display">
                <span className="md:hidden">PEP</span>
                <span className="hidden md:inline">Public Engagement Portal</span>
              </span>
            </MotionLink>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "hover:shadow-[0_0_10px_rgba(168,198,255,0.2)] transition-shadow duration-200"
                  }
                }}
              />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#8ba2cc] hover:text-[#a8c6ff] p-2 ml-2"
                aria-label="Toggle menu"
              >
                {!isOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              {/* Main Navigation */}
              <div className="flex items-center space-x-4 mr-6">
                {navItems.map((item) => (
                  <MotionLink
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-sm text-sm font-medium tracking-wide transition-all duration-200 ${
                      location.pathname === item.path
                        ? "bg-[#2d3f59]/50 text-[#a8c6ff] shadow-[0_0_10px_rgba(168,198,255,0.1)]"
                        : "text-[#8ba2cc] hover:text-[#a8c6ff] hover:bg-[#2d3f59]/30"
                    }`}
                    whileHover={motionVariants.hoverEnergize}
                    variants={motionVariants.fadeIn}
                  >
                    {item.label}
                  </MotionLink>
                ))}
              </div>

              {/* Public Data Toggle & User Menu */}
              <div className="flex items-center space-x-4 border-l border-[#4d5b8c]/30 pl-6">
                {/* Data Visibility Toggle with role-based tooltip */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={togglePublicVisibility}
                    className={`
                      group relative inline-flex h-8 w-14 items-center rounded-sm
                      transition-all duration-300 focus:outline-none
                      ${isPublicDataEnabled 
                        ? 'bg-[#2d3f59]/50 shadow-[0_0_10px_rgba(168,198,255,0.1)]'
                        : 'bg-[#1a2942]/80'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    title={`Click to make data ${isPublicDataEnabled ? 'private' : 'public'}`}
                  >
                    <motion.span
                      className={`
                        inline-block h-6 w-6 transform rounded-sm bg-[#8ba2cc] shadow-lg transition-transform
                        ${isPublicDataEnabled ? 'translate-x-7' : 'translate-x-1'}
                      `}
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  </motion.button>
                  <span className={`text-sm font-medium ${
                    isPublicDataEnabled ? 'text-[#a8c6ff]' : 'text-[#8ba2cc]'
                  }`}>
                    {isPublicDataEnabled ? 'Public' : 'Private'}
                  </span>
                </div>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "hover:shadow-[0_0_10px_rgba(168,198,255,0.2)] transition-shadow duration-200"
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isOpen ? 1 : 0,
              height: isOpen ? "auto" : 0
            }}
            transition={{ duration: 0.2 }}
            className={`md:hidden absolute top-16 left-0 right-0 bg-[#1a2942]/95 backdrop-blur-md border-b border-[#4d5b8c]/30 overflow-hidden`}
          >
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <MotionLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-sm text-sm font-medium tracking-wide transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-[#2d3f59]/50 text-[#a8c6ff] shadow-[0_0_10px_rgba(168,198,255,0.1)]"
                      : "text-[#8ba2cc] hover:text-[#a8c6ff] hover:bg-[#2d3f59]/30"
                  }`}
                >
                  {item.label}
                </MotionLink>
              ))}
              
              {/* Mobile Public Data Toggle */}
              <div className="flex items-center space-x-2 px-3 py-2">
                <motion.button
                  onClick={togglePublicVisibility}
                  className={`
                    group relative inline-flex h-8 w-14 items-center rounded-sm
                    transition-all duration-300 focus:outline-none
                    ${isPublicDataEnabled 
                      ? 'bg-[#2d3f59]/50 shadow-[0_0_10px_rgba(168,198,255,0.1)]'
                      : 'bg-[#1a2942]/80'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className={`
                      inline-block h-6 w-6 transform rounded-sm bg-[#8ba2cc] shadow-lg transition-transform
                      ${isPublicDataEnabled ? 'translate-x-7' : 'translate-x-1'}
                    `}
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                </motion.button>
                <span className={`text-sm font-medium ${
                  isPublicDataEnabled ? 'text-[#a8c6ff]' : 'text-[#8ba2cc]'
                }`}>
                  {isPublicDataEnabled ? 'Public' : 'Private'}
                </span>
              </div>
            </div>
          </motion.div>
          
          {/* Error Message */}
          {error && (
            <motion.div 
              className="absolute top-full left-0 right-0 mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="bg-red-900/20 border border-red-500/20 text-red-300/90 px-4 py-2 rounded-sm mx-4 text-sm backdrop-blur-sm">
                {error}
              </div>
            </motion.div>
          )}
        </MotionDiv>
      </MotionNav>
      <div className="h-16" /> {/* Spacer for fixed navbar */}
    </>
  );
}
