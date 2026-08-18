"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, Settings } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [profileName, setProfileName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const checkAuth = () => {
    fetch("http://localhost:5050/api/auth/me", { credentials: "include" })
      .then(res => {
        if (res.ok) {
          setToken("valid"); // We use token as a boolean flag now
          return res.json();
        }
        setToken(null);
        setProfileName("");
        return null;
      })
      .then(data => {
        if (data && data.name) {
          setProfileName(data.name);
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    checkAuth();
    
    // Listen for custom auth-change event from login/signup/logout
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5050/api/auth/logout", { method: "POST", credentials: "include" });
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  };

  return (
    <nav className="bg-canvas border-b border-hairline px-8 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.jpg" alt="OfficeNextDoor Logo" className="w-8 h-8 rounded-md shadow-sm" />
          <span className="font-editorial text-xl font-bold tracking-wide text-ink hidden sm:block">OfficeNextDoor</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/cities" className="text-sm font-medium text-slate hover:text-primary transition-colors hidden sm:block mr-4">
            Explore Cities
          </Link>
          <Link href="/jobs" className="text-sm font-medium text-slate hover:text-primary transition-colors hidden sm:block mr-4">
            Job Listings
          </Link>
          <Link href="/learn" className="text-sm font-medium text-slate hover:text-primary transition-colors hidden sm:block mr-4">
            Learn
          </Link>
          <Link href="/practice" className="text-sm font-medium text-slate hover:text-primary transition-colors hidden sm:block mr-4">
            Practice
          </Link>
          
          {!token ? (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-slate hover:text-ink transition-colors">
                Log In
              </Link>
              <Link href="/signup" className="button-primary py-2 px-4 text-sm">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-cream border border-beige-deep hover:bg-hairline-soft transition-colors overflow-hidden"
              >
                {profileName ? (
                  <span className="font-medium text-ink uppercase">{profileName.charAt(0)}</span>
                ) : (
                  <User className="h-5 w-5 text-slate" />
                )}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-hairline-soft z-50">
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-surface transition-colors">
                    <Settings className="h-4 w-4" /> My Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
