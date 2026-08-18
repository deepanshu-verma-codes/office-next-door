"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Briefcase, Loader2 } from "lucide-react";
import dynamic from 'next/dynamic';

const JobCard = dynamic(() => import("@/components/JobCard"), {
  loading: () => <div className="card-base h-full flex items-center justify-center min-h-[200px]"><Loader2 className="h-6 w-6 animate-spin text-stone" /></div>,
  ssr: false
});

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [totalJobs, setTotalJobs] = useState(0);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5050/api/jobs?limit=9`);
      if (res.ok) {
        const data = await res.json();
        setJobs(data.data || []);
        setNextCursor(data.nextCursor || null);
        setTotalJobs(data.total);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreJobs = async () => {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(`http://localhost:5050/api/jobs?limit=9&cursor=${nextCursor}`);
      if (res.ok) {
        const data = await res.json();
        setJobs(prev => [...prev, ...(data.data || [])]);
        setNextCursor(data.nextCursor || null);
      }
    } catch (err) {
      console.error("Failed to load more jobs", err);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <main className="flex flex-col bg-surface">
      <div className="bg-canvas border-b border-hairline-soft py-12 px-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-[14px] font-medium text-steel hover:text-ink flex items-center gap-2 mb-8 transition-colors w-max">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          
          <div className="mb-12">
            <h1 className="font-editorial text-[52px] leading-[1.15] tracking-[-0.5px] text-ink flex items-center gap-4">
              <Briefcase className="h-10 w-10 text-primary" /> Live Job Listings
            </h1>
            <p className="text-[18px] text-slate mt-2">Discover {totalJobs > 0 ? totalJobs : ''} open roles across all verified tech companies.</p>
          </div>

          {loading ? (
            <div className="text-center py-20 text-slate">Loading fresh jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 text-slate">No job postings found right now.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>

              {nextCursor && (
                <div className="flex justify-center items-center py-8 border-t border-hairline-soft">
                  <button 
                    onClick={loadMoreJobs}
                    disabled={loadingMore}
                    className="px-6 py-2.5 rounded border border-hairline font-medium text-[14px] text-ink hover:bg-surface-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? 'Loading...' : 'Load More Jobs'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
