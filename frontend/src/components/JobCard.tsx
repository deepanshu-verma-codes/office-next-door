import { Briefcase, Banknote, Clock } from "lucide-react";

interface JobProps {
  job: {
    _id: string;
    title: string;
    companyId: {
      name: string;
      logoUrl?: string;
    };
    role: string;
    experienceLevel: string;
    salaryRange?: string;
    applyUrl?: string;
    createdAt: string;
  };
}

import { memo } from "react";

export default memo(function JobCard({ job }: JobProps) {
  const daysAgo = Math.floor((new Date().getTime() - new Date(job.createdAt).getTime()) / (1000 * 3600 * 24));

  return (
    <div className="card-base hover:shadow-[0px_4px_12px_rgba(0,0,0,0.04)] transition-shadow duration-200 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-[22px] font-medium leading-[1.30] text-ink">{job.title}</h3>
          <p className="text-[16px] leading-[1.55] text-slate mt-1">{job.companyId?.name}</p>
        </div>
        <span className="bg-primary text-on-primary text-[13px] font-bold px-[10px] py-[4px] rounded-full shrink-0">
          {job.role}
        </span>
      </div>

      <div className="flex flex-col gap-2 mb-6 mt-4">
        <div className="flex items-center gap-2 text-[14px] text-slate">
          <Briefcase className="h-4 w-4 text-stone" />
          {job.experienceLevel} Level
        </div>
        {job.salaryRange && (
          <div className="flex items-center gap-2 text-[14px] text-slate">
            <Banknote className="h-4 w-4 text-stone" />
            {job.salaryRange}
          </div>
        )}
        <div className="flex items-center gap-2 text-[14px] text-slate">
          <Clock className="h-4 w-4 text-stone" />
          {daysAgo === 0 ? 'Posted today' : `Posted ${daysAgo}d ago`}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-hairline-soft flex items-center justify-between">
        <button className="text-[14px] font-medium text-ink hover:text-primary transition-colors">
          View Details
        </button>
        {job.applyUrl ? (
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary text-[14px]"
          >
            Apply Now
          </a>
        ) : (
          <button className="button-cream text-[14px]">
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
});
