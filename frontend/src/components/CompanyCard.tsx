import { Building2, ExternalLink } from "lucide-react";

interface CompanyProps {
  company: {
    _id: string;
    name: string;
    description: string;
    techStack: string[];
    website?: string;
    logoUrl?: string;
  };
}

export default function CompanyCard({ company }: CompanyProps) {
  return (
    <div className="card-base hover:shadow-[0px_4px_12px_rgba(0,0,0,0.04)] transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-md bg-surface border border-hairline-soft flex items-center justify-center shrink-0">
            {company.logoUrl ? (
              <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover rounded-md" />
            ) : (
              <Building2 className="text-slate h-6 w-6" />
            )}
          </div>
          <div>
            <h3 className="text-[28px] font-medium leading-[1.25] text-ink">{company.name}</h3>
            {company.website && (
              <a href={company.website} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:text-primary-deep flex items-center gap-1 mt-1 transition-colors">
                Visit Website <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-[16px] leading-[1.55] text-slate mb-6 line-clamp-3">
        {company.description || "Leading tech company providing innovative solutions in the local ecosystem."}
      </p>

      {company.techStack && company.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-hairline-soft">
          {company.techStack.map((tech, i) => (
            <span key={i} className="px-[10px] py-[4px] text-[13px] font-bold bg-cream-deeper text-ink rounded-full">
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
