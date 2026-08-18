"use client";

import { useState, use, useEffect, Suspense, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Star, ExternalLink, Building2 } from "lucide-react";

function DashboardContent({ city }: { city: string }) {
  const formattedCity = useMemo(() => city.charAt(0).toUpperCase() + city.slice(1), [city]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCompanies, setTotalCompanies] = useState<number>(0);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchCompany, setSearchCompany] = useState("");
  const [debouncedSearchCompany, setDebouncedSearchCompany] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any>(null);
  
  useEffect(() => {
    fetch("http://localhost:5050/api/auth/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.email === "deepanshu.verma@yopmail.com") {
          setIsAdmin(true);
        }
      })
      .catch(() => {});
  }, []);

  const handleDeleteCompany = useCallback(async (id: string) => {
    if (!confirm("Are you sure you want to delete this company?")) return;
    try {
      const res = await fetch(`http://localhost:5050/api/companies/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (res.ok) {
        setCompanies(prev => prev.filter(c => c._id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleUpdateCompany = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCompany) return;
    try {
      const payload = {
        ...editingCompany
      };
      
      const res = await fetch(`http://localhost:5050/api/companies/${editingCompany._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const updated = await res.json();
        setCompanies(prev => prev.map(c => c._id === updated._id ? updated : c));
        setEditingCompany(null);
      } else {
        alert("Failed to update");
      }
    } catch (e) {
      console.error(e);
    }
  }, [editingCompany]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchCompany(searchCompany);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchCompany]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const companiesRes = await fetch(`http://localhost:5050/api/cities/${city}/companies${debouncedSearchCompany ? `?search=${encodeURIComponent(debouncedSearchCompany)}` : ''}`);
        
        if (companiesRes.ok) {
          const companiesData = await companiesRes.json();
          if (companiesData.data) {
            setCompanies(companiesData.data);
            setNextCursor(companiesData.nextCursor || null);
            setTotalCompanies(companiesData.totalCount || companiesData.data.length);
          } else {
            setCompanies(companiesData);
            setTotalCompanies(companiesData.length);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [city, debouncedSearchCompany]);

  const loadMoreCompanies = async () => {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(`http://localhost:5050/api/cities/${city}/companies?cursor=${nextCursor}${debouncedSearchCompany ? `&search=${encodeURIComponent(debouncedSearchCompany)}` : ''}`);
      if (res.ok) {
        const data = await res.json();
        setCompanies(prev => [...prev, ...(data.data || [])]);
        setNextCursor(data.nextCursor || null);
      }
    } catch (error) {
      console.error("Failed to load more:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <>
      {editingCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white p-8 rounded-xl w-full max-w-2xl text-ink shadow-2xl">
            <h2 className="text-2xl font-bold font-editorial mb-6">Edit Company Details</h2>
            <form onSubmit={handleUpdateCompany} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Company Name</label>
                  <input required type="text" placeholder="e.g. Acme Corp" className="text-input w-full" value={editingCompany.name || ''} onChange={e => setEditingCompany({...editingCompany, name: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1">Official Website</label>
                <input required type="url" placeholder="https://www.company.com" className="text-input w-full" value={editingCompany.website || ''} onChange={e => setEditingCompany({...editingCompany, website: e.target.value})} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Company Type</label>
                  <select className="text-input w-full bg-white appearance-none" value={editingCompany.companyType || 'Service Based'} onChange={e => setEditingCompany({...editingCompany, companyType: e.target.value})}>
                    <option value="Product Based">Product Based</option>
                    <option value="Service Based">Service Based</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Contact Email</label>
                  <input type="email" placeholder="e.g. hello@company.com" className="text-input w-full" value={editingCompany.email || ''} onChange={e => setEditingCompany({...editingCompany, email: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1">Company Scale</label>
                <select className="text-input w-full bg-white appearance-none" value={editingCompany.scale || 'startup'} onChange={e => setEditingCompany({...editingCompany, scale: e.target.value})}>
                  <option value="startup">Startup (1-50)</option>
                  <option value="small">Small Agency (50-250)</option>
                  <option value="mid">Mid Market (250-1000)</option>
                  <option value="big">Big Tech (1000-5000)</option>
                  <option value="mnc">MNC (5000+)</option>
                </select>
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-hairline-soft">
                <button type="button" onClick={() => setEditingCompany(null)} className="px-6 py-2.5 font-medium text-slate hover:text-ink transition-colors">Cancel</button>
                <button type="submit" className="button-primary px-8">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="bg-canvas border-b border-hairline-soft py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-[14px] font-medium text-steel hover:text-ink flex items-center gap-2 mb-8 transition-colors w-max">
            <ArrowLeft className="h-4 w-4" /> Back to Search
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="font-editorial text-[52px] leading-[1.15] tracking-[-0.5px] text-ink">
                {formattedCity} Companies
              </h1>
              <p className="text-[18px] text-slate mt-2">Discover {totalCompanies} local tech companies.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
              <div className="space-y-8">
                <div className="flex gap-4 max-w-lg">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone h-5 w-5" />
                    <input 
                      type="text" 
                      placeholder="Search companies by name..." 
                      className="text-input w-full" 
                      style={{ paddingLeft: '44px' }}
                      value={searchCompany}
                      onChange={(e) => setSearchCompany(e.target.value)}
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                <div className={`bg-canvas border border-hairline-soft rounded-lg overflow-hidden shadow-sm transition-opacity duration-200 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface border-b border-hairline-soft text-slate text-[13px] uppercase tracking-wide">
                        <th className="px-6 py-4 font-medium">Company</th>
                        <th className="px-6 py-4 font-medium">Scale</th>
                        <th className="px-6 py-4 font-medium">Company Type</th>
                        <th className="px-6 py-4 font-medium text-right">Contact & Links</th>
   {isAdmin && <th className="px-6 py-4 font-medium text-right">Admin</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-hairline-soft">
                      {companies.length === 0 ? (
                        <tr>
                          <td colSpan={isAdmin ? 5 : 4} className="px-6 py-8 text-center text-slate">
                            No companies found in {formattedCity}.
                          </td>
                        </tr>
                      ) : (
                        companies.map((company) => (
                          <tr key={company._id} className="hover:bg-surface transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-md bg-surface border border-hairline flex items-center justify-center shrink-0">
                                  {company.logoUrl ? (
                                    <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover rounded-md" />
                                  ) : (
                                    <Building2 className="text-stone h-5 w-5" />
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium text-ink text-[16px]">{company.name}</div>
                                  <div className="text-slate text-[13px] truncate max-w-[250px]">{company.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="capitalize px-2 py-1 bg-surface-cream text-primary text-[12px] font-medium rounded border border-beige-deep">
                                {company.scale || company.companyType || 'mid'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-hairline-soft text-slate text-[12px] font-medium rounded-full">
                                {company.companyType || 'Service Based'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex flex-col items-end gap-1">
                                {company.website ? (
                                  <a href={company.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:text-primary-deep transition-colors">
                                    Visit Website <ExternalLink className="h-3 w-3" />
                                  </a>
                                ) : (
                                  <span className="text-stone text-[13px]">No Website</span>
                                )}
                                {company.email ? (
                                  <a href={`mailto:${company.email}`} className="text-[13px] text-slate hover:text-ink transition-colors">
                                    {company.email}
                                  </a>
                                ) : null}
                              </div>
                            </td>
                            {isAdmin && (
                              <td className="px-6 py-4 text-right">
                                <div className="flex flex-col items-end gap-2">
                                  <button onClick={() => { setEditingCompany(company); }} className="text-[12px] text-blue-500 hover:underline">Edit</button>
                                  <button onClick={() => handleDeleteCompany(company._id)} className="text-[12px] text-red-500 hover:underline">Delete</button>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {nextCursor && (
                  <div className="p-4 border-t border-hairline-soft flex justify-center bg-surface-cream">
                    <button 
                      onClick={loadMoreCompanies} 
                      disabled={loadingMore}
                      className="px-6 py-2 bg-primary text-white rounded font-medium text-[13px] hover:bg-primary-deep transition-colors disabled:opacity-50"
                    >
                      {loadingMore ? 'Loading...' : 'Load More Companies'}
                    </button>
                  </div>
                )}
              </div>
            </div>
      </div>
    </>
  );
}

export default function CityDashboardWrapper({ params }: { params: Promise<{ cityName: string }> }) {
  const resolvedParams = use(params);
  const city = decodeURIComponent(resolvedParams.cityName);

  return (
    <main className="min-h-screen bg-surface">
      <Suspense fallback={<div className="p-8">Loading dashboard...</div>}>
        <DashboardContent city={city} />
      </Suspense>
    </main>
  );
}
