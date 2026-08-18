"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetch("http://localhost:5050/api/auth/me", { credentials: "include" })
      .then(res => {
        if (res.ok) router.push("/profile");
      })
      .catch(() => {});
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { email, password };
      
      const res = await fetch(`http://localhost:5050/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Authentication failed");
      
      toast.success("Successfully logged in!");
      window.dispatchEvent(new Event("auth-change"));
      router.push("/profile");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-[calc(100vh-73px)] bg-surface flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 max-w-2xl mx-auto w-full py-12">
        <Link href="/" className="text-[14px] font-medium text-steel hover:text-ink flex items-center gap-2 mb-12 w-max transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <div className="w-full">
          <h2 className="text-4xl font-bold font-editorial mb-3 text-ink">Welcome Back</h2>
          <p className="text-slate mb-10 text-lg">Sign in to continue exploring local frontier roles.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Email address</label>
              <input required type="email" placeholder="you@example.com" className="text-input w-full py-3 px-4 text-base bg-white" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Password</label>
              <input required type="password" placeholder="••••••••" className="text-input w-full py-3 px-4 text-base bg-white" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            
            <button 
              type="submit" 
              disabled={!email || !password}
              className="button-primary w-full mt-8 py-3.5 text-base shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-10 text-center text-slate">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-semibold hover:text-primary-deep transition-colors">
              Create an account
            </Link>
          </div>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-ink">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"></div>
        <div className="absolute bottom-24 left-20 right-20 text-white">
          <h3 className="font-editorial text-[42px] mb-6 leading-[1.1] tracking-tight">Join the ecosystem of local builders.</h3>
          <p className="text-xl text-white/70 max-w-md">Connect with the best startups and tech companies right in your backyard.</p>
        </div>
      </div>
    </div>
  );
}
