import Link from "next/link";
import CitySearch from "@/components/CitySearch";
import { Building2, Briefcase, Map, Search, CheckCircle, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-band-sunset relative overflow-hidden text-on-dark flex flex-col justify-center" style={{ minHeight: "80vh" }}>
        {/* Photographic office background */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sunshine-900/80 to-transparent z-0"></div>

        <div className="max-w-7xl mx-auto w-full px-8 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="pt-24 pb-32">
            <h1 className="font-editorial text-[64px] lg:text-[84px] leading-[1.05] tracking-[-1.5px] mb-6">
              Frontier Roles.<br/>In your city.
            </h1>
            <p className="text-lg lg:text-[18px] leading-[1.5] text-on-dark-muted max-w-xl mb-12">
              Hyper-local job discovery. Connect with top tech companies and startups in your immediate geographic area.
            </p>
            
            <CitySearch />
            

          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto w-full">
        <h2 className="font-editorial text-[52px] leading-[1.15] tracking-[-0.5px] text-ink mb-16">
          The local ecosystem, <br/>built for you.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-cream">
            <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mb-6 border border-beige-deep shadow-sm">
              <Map className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-[28px] font-medium leading-[1.25] text-ink mb-3">Local Focus</h3>
            <p className="text-[16px] leading-[1.55] text-slate">
              Discover opportunities in your immediate geographic area. Cut the commute and build locally.
            </p>
          </div>
          
          <div className="card-cream">
            <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mb-6 border border-beige-deep shadow-sm">
              <Building2 className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-[28px] font-medium leading-[1.25] text-ink mb-3">Curated Companies</h3>
            <p className="text-[16px] leading-[1.55] text-slate">
              Explore verified local startups and established tech firms with modern technology stacks.
            </p>
          </div>
          
          <div className="card-cream">
            <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mb-6 border border-beige-deep shadow-sm">
              <Briefcase className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-[28px] font-medium leading-[1.25] text-ink mb-3">Smart Matching</h3>
            <p className="text-[16px] leading-[1.55] text-slate">
              Find roles perfectly aligned with your MERN and modern stack skills effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-surface py-24 border-y border-hairline">
        <div className="max-w-7xl mx-auto w-full px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-editorial text-[42px] leading-[1.15] text-ink mb-4">
              How OfficeNextDoor Works
            </h2>
            <p className="text-slate text-lg">
              We've streamlined the process of finding your next local role, making it easier than ever to connect with teams nearby.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[2px] bg-beige-deep z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-cream border-2 border-primary flex items-center justify-center text-primary mb-6 shadow-sm">
                <Search className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-ink mb-2">1. Discover</h3>
              <p className="text-slate">Browse curated roles tailored to your city and technical stack.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-cream border-2 border-primary flex items-center justify-center text-primary mb-6 shadow-sm">
                <CheckCircle className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-ink mb-2">2. Match</h3>
              <p className="text-slate">Apply with a single click to verified local startups and tech firms.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-cream border-2 border-primary flex items-center justify-center text-primary mb-6 shadow-sm">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-ink mb-2">3. Connect</h3>
              <p className="text-slate">Interview directly with founders and hiring managers in your area.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Proof Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-editorial text-[42px] leading-[1.15] text-ink mb-6">
              A community of local builders.
            </h2>
            <p className="text-lg text-slate mb-12">
              Join thousands of developers, designers, and product managers who have found their next great opportunity right in their own backyard.
            </p>
            <div className="grid grid-cols-2 gap-y-10 gap-x-8">
              <div>
                <div className="text-[48px] font-editorial text-primary leading-none mb-2">500+</div>
                <div className="text-sm font-medium text-slate uppercase tracking-wider">Local Companies</div>
              </div>
              <div>
                <div className="text-[48px] font-editorial text-primary leading-none mb-2">12k+</div>
                <div className="text-sm font-medium text-slate uppercase tracking-wider">Active Roles</div>
              </div>
              <div>
                <div className="text-[48px] font-editorial text-primary leading-none mb-2">98%</div>
                <div className="text-sm font-medium text-slate uppercase tracking-wider">Response Rate</div>
              </div>
              <div>
                <div className="text-[48px] font-editorial text-primary leading-none mb-2">24h</div>
                <div className="text-sm font-medium text-slate uppercase tracking-wider">Avg. Match Time</div>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl border border-hairline-strong">
             <div 
              className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-1000"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop')" }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 pb-24 max-w-7xl mx-auto w-full">
        <div className="bg-cream rounded-lg p-16 border border-beige-deep text-center">
          <h2 className="font-editorial text-[52px] leading-[1.15] tracking-[-0.5px] text-ink mb-6">
            The next chapter of your career is here.
          </h2>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/signup" className="button-primary">Create Profile</Link>
            <Link href="/cities" className="bg-transparent border border-hairline-strong text-ink px-[20px] py-[10px] rounded-[8px] font-medium hover:bg-hairline-soft transition-colors inline-block text-center">
              View All Cities
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
