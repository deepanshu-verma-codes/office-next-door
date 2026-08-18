"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";

export default function CitySearch() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch all available cities for autocomplete
    const fetchCities = async () => {
      try {
        const res = await fetch('http://localhost:5050/api/cities');
        if (res.ok) {
          const data = await res.json();
          setCities(data);
        }
      } catch (error) {
        console.error("Failed to fetch cities", error);
      }
    };
    fetchCities();

    // Handle clicks outside of component to close suggestions
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e?: React.FormEvent, selectedCity?: string) => {
    if (e) e.preventDefault();
    const query = selectedCity || city.trim();
    if (query) {
      router.push(`/city/${encodeURIComponent(query.toLowerCase())}`);
    }
  };

  const handleSelectSuggestion = (cityName: string) => {
    setCity(cityName);
    setShowSuggestions(false);
    handleSearch(undefined, cityName);
  };

  const filteredCities = cities.filter(c => c.name.toLowerCase().includes(city.toLowerCase()));

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl">
      <form 
        onSubmit={handleSearch}
        className="bg-canvas p-2 rounded-lg border border-white/20 shadow-xl flex gap-2 relative z-20"
      >
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-stone" />
          </div>
          <input
            type="text"
            className="w-full bg-transparent text-ink border-none outline-none pl-10 pr-4 py-[12px] h-[44px] placeholder:text-stone focus:ring-0"
            placeholder="Enter your city (e.g., Mohali, Bangalore)..."
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            required
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className="button-primary h-[44px] shrink-0 px-6 flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          Find Now
        </button>
      </form>

      {/* Autocomplete Suggestions Dropdown */}
      {showSuggestions && city.trim() && filteredCities.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-canvas border border-hairline shadow-2xl rounded-lg overflow-hidden z-30 max-h-[300px] overflow-y-auto">
          {filteredCities.map((c) => (
            <div 
              key={c._id}
              onClick={() => handleSelectSuggestion(c.name)}
              className="px-4 py-3 hover:bg-surface cursor-pointer border-b border-hairline-soft last:border-b-0 transition-colors flex justify-between items-center"
            >
              <div className="flex items-center gap-2 text-ink font-medium">
                <MapPin className="h-4 w-4 text-stone" />
                {c.name}
                <span className="text-slate text-[13px] font-normal">, {c.state}</span>
              </div>
              {c.totalCompanies > 0 && (
                <span className="text-[12px] bg-surface-cream text-primary px-2 py-1 rounded">
                  {c.totalCompanies} Companies
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
