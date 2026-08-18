"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, MapPin } from "lucide-react";

export default function CitiesPage() {
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch('http://localhost:5050/api/cities');
        if (res.ok) {
          const data = await res.json();
          setCities(data);
        }
      } catch (error) {
        console.error("Failed to fetch cities", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  return (
    <main className="min-h-screen bg-surface">
      <div className="bg-canvas border-b border-hairline-soft py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-[14px] font-medium text-steel hover:text-ink flex items-center gap-2 mb-8 transition-colors w-max">
            <ArrowLeft className="h-4 w-4" /> Back to Search
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="font-editorial text-[52px] leading-[1.15] tracking-[-0.5px] text-ink">
                All Cities
              </h1>
              <p className="text-[18px] text-slate mt-2">Explore the local tech ecosystem across India.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {loading ? (
          <div className="text-center text-slate py-12">Loading cities...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <Link 
                key={city._id} 
                href={`/city/${encodeURIComponent(city.name.toLowerCase())}`}
                className="group bg-canvas border border-hairline-soft rounded-lg p-6 shadow-sm hover:shadow-md hover:border-beige-deep transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-surface-cream text-primary rounded-md flex items-center justify-center border border-beige-deep">
                      <MapPin className="h-6 w-6" />
                    </div>
                    {city.totalCompanies > 0 && (
                      <span className="bg-hairline-soft text-ink text-[12px] font-medium px-3 py-1 rounded-full flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {city.totalCompanies} Companies
                      </span>
                    )}
                  </div>
                  <h2 className="text-[24px] font-medium text-ink group-hover:text-primary transition-colors">
                    {city.name}
                  </h2>
                  <p className="text-[15px] text-slate mt-1">{city.state}, {city.country}</p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-hairline-soft flex items-center justify-between text-[14px] font-medium text-primary group-hover:text-primary-deep transition-colors">
                  <span>Explore Companies</span>
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
