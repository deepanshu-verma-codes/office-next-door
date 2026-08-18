"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ArrowLeft, Plus } from "lucide-react";
import { FormSkeleton } from "../../components/Skeleton";

export default function SubmitCompanyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Submit Form State
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [cityName, setCityName] = useState("");
  const [scale, setScale] = useState("mid");
  const [companyType, setCompanyType] = useState("Service Based");
  const [email, setEmail] = useState("");
  
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading">("idle");

  useEffect(() => {
    fetch("http://localhost:5050/api/auth/me", { credentials: "include" })
      .then(res => {
        if (!res.ok) {
          router.push("/login");
        } else {
          setIsLoading(false);
        }
      })
      .catch(() => router.push("/login"));
  }, [router]);

  const handleSubmitCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    
    try {
      const payload = {
        name: companyName,
        website,
        cityName,
        scale,
        companyType,
        email
      };

      const res = await fetch("http://localhost:5050/api/verify-and-add-missing-company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add company");
      
      toast.success("Company added successfully!");
      router.push("/");
    } catch (err: any) {
      setSubmitStatus("idle");
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return <FormSkeleton />;
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-canvas border-b border-hairline-soft py-12 px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-[14px] font-medium text-steel hover:text-ink flex items-center gap-2 mb-8 w-max">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="font-editorial text-[42px] leading-[1.1] tracking-[-0.5px] text-ink mb-4">
            Contribute to the Ecosystem
          </h1>
          <p className="text-[18px] text-slate">
            Help us map the local tech landscape. If your company is missing, submit it below. Our system will automatically verify its live status before adding it to the public directory.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="card-base border-primary/20 shadow-sm relative overflow-hidden">
          <div className="absolute top-6 right-6 text-sm text-slate flex items-center gap-4">
            <span>Authenticated Contributor</span>
            <Link href="/profile" className="text-primary hover:underline font-medium">My Profile</Link>
          </div>

            <h2 className="text-2xl font-bold font-editorial mb-8 flex items-center gap-3">
              <Plus className="text-primary" /> Add Missing Company
            </h2>
            
            <form onSubmit={handleSubmitCompany} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Company Name</label>
                  <input required type="text" placeholder="e.g. Acme Corp" className="text-input w-full" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">City Name</label>
                  <input required type="text" placeholder="e.g. Mohali" className="text-input w-full" value={cityName} onChange={e => setCityName(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1">Official Website</label>
                <input required type="url" placeholder="https://www.company.com" className="text-input w-full" value={website} onChange={e => setWebsite(e.target.value)} />
                <p className="text-xs text-stone mt-1">Our backend agent will immediately ping this URL. If it fails, the submission will be rejected.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Company Type</label>
                  <select className="text-input w-full bg-white appearance-none" value={companyType} onChange={e => setCompanyType(e.target.value)}>
                    <option value="Product Based">Product Based</option>
                    <option value="Service Based">Service Based</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Contact Email</label>
                  <input required type="email" placeholder="e.g. hello@company.com" className="text-input w-full" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1">Company Scale</label>
                <select className="text-input w-full bg-white appearance-none" value={scale} onChange={e => setScale(e.target.value)}>
                  <option value="startup">Startup (1-50)</option>
                  <option value="small">Small Agency (50-250)</option>
                  <option value="mid">Mid Market (250-1000)</option>
                  <option value="big">Big Tech (1000-5000)</option>
                  <option value="mnc">MNC (5000+)</option>
                </select>
              </div>
              
              <button 
                type="submit" 
                disabled={submitStatus === "loading" || !companyName || !website || !cityName || !companyType || !email}
                className={`button-primary w-full md:w-auto px-8 transition-all ${(submitStatus === "loading" || !companyName || !website || !cityName || !companyType || !email) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {submitStatus === "loading" ? "Verifying Domain..." : "Verify & Add Company"}
              </button>
            </form>
          </div>
      </div>
    </div>
  );
}
