import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FundingCard from "@/components/FundingCard";
import NewsActivities from "@/components/NewsActivities";
import WorldStats from "@/components/WorldStats";
import AfricaRegions from "@/components/AfricaRegions";
import FounderSection from "@/components/FounderSection";
import ContactForm from "@/components/ContactForm";
import Login from "@/components/Login";
import { Search, Filter, Globe, TrendingUp, Users, Sparkles, LogOut } from "lucide-react";

interface FundingSource {
  id: number;
  name: string;
  organization: string;
  type: string;
  region: string;
  website: string;
  grant_range_min?: number;
  grant_range_max?: number;
  total_investment?: number;
  total_fund?: number;
  currency?: string;
  focus_areas: string[];
  eligible_applicants: string[];
  application_process: string;
  selection_criteria: string[];
  success_tips: string[];
  deadline_type: string;
}

interface FundingData {
  funding_sources: FundingSource[];
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fundingData, setFundingData] = useState<FundingData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedDeadline, setSelectedDeadline] = useState<string>("all");

  // Check authentication from localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    fetch("/funding_database.json")
      .then((res) => res.json())
      .then((data) => setFundingData(data))
      .catch((err) => console.error("Failed to load funding data:", err));
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  // All hooks must be called before any conditional returns
  const filteredFunding = useMemo(() => {
    if (!fundingData) return [];

    return fundingData.funding_sources.filter((funding) => {
      const matchesSearch =
        searchTerm === "" ||
        funding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        funding.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        funding.focus_areas.some((area) =>
          area.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType = selectedType === "all" || funding.type === selectedType;
      const matchesRegion = selectedRegion === "all" || funding.region === selectedRegion;
      const matchesDeadline = selectedDeadline === "all" || funding.deadline_type === selectedDeadline;

      return matchesSearch && matchesType && matchesRegion && matchesDeadline;
    });
  }, [fundingData, searchTerm, selectedType, selectedRegion, selectedDeadline]);

  const types = useMemo(() => {
    if (!fundingData) return [];
    return Array.from(new Set(fundingData.funding_sources.map((f) => f.type)));
  }, [fundingData]);

  const regions = useMemo(() => {
    if (!fundingData) return [];
    return Array.from(new Set(fundingData.funding_sources.map((f) => f.region)));
  }, [fundingData]);

  const deadlineTypes = useMemo(() => {
    if (!fundingData) return [];
    return Array.from(new Set(fundingData.funding_sources.map((f) => f.deadline_type)));
  }, [fundingData]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedRegion("all");
    setSelectedDeadline("all");
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} isAuthenticated={isAuthenticated} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Logout Button */}
      {isAuthenticated && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-red-900 hover:bg-red-800 text-white border-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      )}
      
      {/* Header */}
      <header className="bg-gradient-to-r from-green-900 via-black to-green-900 border-b border-yellow-700">
        <div className="container py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: University of Phoenix Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/uophoenix-logo.png" 
                alt="University of Phoenix" 
                className="h-12 w-auto object-contain"
              />
            </div>
            
            {/* Center: Profile and Info */}
            <div className="flex items-center gap-4 flex-1 justify-center">
              <img 
                src="/bertin-profile.png" 
                alt="Bertin Tshisuaka" 
                className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
              />
              <div>
                <h2 className="text-xl font-bold text-yellow-400">
                  Diva Laser Software Solutions
                </h2>
                <p className="text-sm text-yellow-200">Developed by Bertin Tshisuaka</p>
                <p className="text-xs text-yellow-300">Software Engineer and Full Stack Web Developer</p>
                <p className="text-xs text-yellow-200 mt-1">
                  Need assistance? Text Bertin Tshisuaka at <a href="tel:+16789796811" className="text-yellow-400 hover:underline">+1 (678) 979-6811</a>
                </p>
              </div>
            </div>
            
            {/* Right: Georgia Tech Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/gatech-logo.png" 
                alt="Georgia Tech" 
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white relative overflow-hidden">
        <div className="container py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-600 hover:bg-green-700 text-white border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                15 Funding Sources Available
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find Funding for African Digitalization Projects
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                Comprehensive database of grants, banks, and financial institutions supporting digital transformation across Africa. Discover opportunities for Diva Laser Foundation and other nonprofits.
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-400" />
                  <span>Pan-African Coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span>$100M+ in Funding</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <span>For Nonprofits & NGOs</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="/hero-digitalization.jpg" 
                alt="African people learning digital skills" 
                className="rounded-lg shadow-2xl w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News and Activities Section */}
      <NewsActivities />

      {/* Listen to Digital Leaders Section */}
      <section className="bg-gray-900 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Listen to the Leaders of Digital Innovation
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Gain insights from visionary leaders and inventors shaping the future of AI and digital transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Video 1: Digital Transformation */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/364k7duI2m4"
                  title="Digital Transformation in 5 Minutes"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Digital Transformation Explained
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  5 minutes • Digital Innovation
                </p>
                <p className="text-sm text-gray-300">
                  Understanding digital transformation and its three core principles for organizations and nonprofits.
                </p>
              </div>
            </div>

            {/* Video 2: AI Leadership */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/id4YRO7G0wE"
                  title="The AI Revolution - Eric Schmidt"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  The AI Revolution - Eric Schmidt
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  TED Talk • Former Google CEO
                </p>
                <p className="text-sm text-gray-300">
                  Former Google CEO Eric Schmidt discusses the arrival of non-human intelligence and its profound implications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-gray-800 border-b border-gray-700">
        <div className="container py-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, organization, or focus area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-white">Filters:</span>
              </div>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDeadline} onValueChange={setSelectedDeadline}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Deadline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Deadlines</SelectItem>
                  {deadlineTypes.map((deadline) => (
                    <SelectItem key={deadline} value={deadline}>
                      {deadline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(searchTerm || selectedType !== "all" || selectedRegion !== "all" || selectedDeadline !== "all") && (
                <Button variant="outline" onClick={resetFilters} size="sm">
                  Clear Filters
                </Button>
              )}
            </div>

            <div className="text-sm text-gray-300">
              Showing {filteredFunding.length} of {fundingData?.funding_sources.length || 0} funding opportunities
            </div>
          </div>
        </div>
      </section>

      {/* Funding Cards Grid */}
      <section className="container py-12">
        {!fundingData ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-300">Loading funding opportunities...</p>
          </div>
        ) : filteredFunding.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-300 mb-4">No funding opportunities found matching your criteria.</p>
            <Button onClick={resetFilters}>Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFunding.map((funding) => (
              <FundingCard key={funding.id} funding={funding} />
            ))}
          </div>
        )}
      </section>

      {/* Africa Regions Section */}
      <AfricaRegions />

      {/* World Statistics Section */}
      <WorldStats />

      {/* Founder Section */}
      <FounderSection />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-8 border-t border-gray-800">
        <div className="container py-8">
          <div className="text-center text-sm text-gray-400">
            <p className="mb-2">
              <strong className="text-white">Africa Digitalization Funding Finder</strong> - Empowering nonprofits with funding information
            </p>
            <p>
              Created to support <strong className="text-white">Diva Laser Foundation</strong> and other organizations working on digital transformation in Africa
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

