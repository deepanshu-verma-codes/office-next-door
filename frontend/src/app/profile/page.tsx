"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { ArrowLeft, User, Briefcase, MapPin, Code, Star } from "lucide-react";
import { ProfileSkeleton } from "../../components/Skeleton";

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Profile State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState<number | "">("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [router]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/auth/me", {
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        setName(data.name || "");
        setEmail(data.email || "");
        setJobTitle(data.jobTitle || "");
        setYearsOfExperience(data.yearsOfExperience || "");
        setCompany(data.company || "");
        setSkills(data.skills ? data.skills.join(", ") : "");
        setLocation(data.location || "");
        setBio(data.bio || "");
        setIsLoading(false);
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
      router.push("/login");
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const res = await fetch("http://localhost:5050/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          jobTitle,
          yearsOfExperience: yearsOfExperience === "" ? 0 : Number(yearsOfExperience),
          company,
          skills: skills.split(",").map(s => s.trim()).filter(Boolean),
          location,
          bio
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      
      setIsSaving(false);
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      setIsSaving(false);
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-canvas border-b border-hairline-soft py-12 px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-[14px] font-medium text-steel hover:text-ink flex items-center gap-2 mb-8 w-max">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="font-editorial text-[42px] leading-[1.1] tracking-[-0.5px] text-ink mb-4 flex items-center gap-4">
            <User className="h-10 w-10 text-primary" /> Professional Profile
          </h1>
          <p className="text-[18px] text-slate">
            Update your professional details to get discovered by local companies and recruiters.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-12">
        <div className="card-base border-primary/20 shadow-sm relative overflow-hidden">
          
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone h-4 w-4" />
                  <input required type="text" className="text-input w-full !pl-11" value={name} onChange={e => setName(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Email</label>
                <input disabled type="email" className="text-input w-full bg-surface-cream text-stone cursor-not-allowed" value={email} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Current Job Title</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-stone h-4 w-4" />
                  <input type="text" placeholder="e.g. Frontend Developer" className="text-input w-full !pl-11" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Current Company</label>
                <input type="text" placeholder="e.g. Acme Corp" className="text-input w-full" value={company} onChange={e => setCompany(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Years of Experience</label>
                <div className="relative">
                  <Star className="absolute left-3 top-1/2 -translate-y-1/2 text-stone h-4 w-4" />
                  <input type="number" min="0" max="50" placeholder="e.g. 5" className="text-input w-full !pl-11" value={yearsOfExperience} onChange={e => setYearsOfExperience(e.target.value === "" ? "" : Number(e.target.value))} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-stone h-4 w-4" />
                  <input type="text" placeholder="e.g. Mohali, Punjab" className="text-input w-full !pl-11" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1">Skills (comma separated)</label>
              <div className="relative">
                <Code className="absolute left-3 top-1/2 -translate-y-1/2 text-stone h-4 w-4" />
                <input type="text" placeholder="e.g. React, Node.js, TypeScript" className="text-input w-full !pl-11" value={skills} onChange={e => setSkills(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1">Professional Summary / Bio</label>
              <textarea rows={4} placeholder="Tell us about your professional journey..." className="text-input w-full py-3" value={bio} onChange={e => setBio(e.target.value)} />
            </div>
            
            <div className="pt-4 border-t border-hairline-soft flex items-center justify-between">
              <button 
                type="submit" 
                disabled={status === "loading"}
                className={`button-primary px-8 ${status === "loading" ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {status === "loading" ? "Saving Profile..." : "Save Profile"}
              </button>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={async () => {
                    await fetch("http://localhost:5050/api/auth/logout", { method: "POST", credentials: "include" });
                    window.location.href = "/";
                  }}
                  className="px-4 py-2 text-sm font-medium text-slate hover:text-ink transition-colors"
                >
                  Sign Out
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                      try {
                        const res = await fetch("http://localhost:5050/api/auth/me", {
                          method: "DELETE",
                          credentials: "include"
                        });
                        if (res.ok) {
                          window.location.href = "/";
                        }
                      } catch (err) {
                        console.error(err);
                      }
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
