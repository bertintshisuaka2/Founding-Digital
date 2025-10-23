import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FundingCard from "@/components/FundingCard";
import { Search, Filter, Globe, TrendingUp, Users, Sparkles } from "lucide-react";

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
  const [fundingData, setFundingData] = useState<FundingData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedDeadline, setSelectedDeadline] = useState<string>("all");

  useEffect(() => {
    fetch("/funding_database.json")
      .then((res) => res.json())
      .then((data) => setFundingData(data))
      .catch((err) => console.error("Failed to load funding data:", err));
  }, []);

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white">
        <div className="container py-16 md:py-24">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-green-600 hover:bg-green-700 text-white border-0">
              <Sparkles className="w-3 h-3 mr-1" />
              15 Funding Sources Available
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Funding for African Digitalization Projects
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
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
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white dark:bg-gray-900 border-b">
        <div className="container py-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
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
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
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

            <div className="text-sm text-muted-foreground">
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
            <p className="mt-4 text-muted-foreground">Loading funding opportunities...</p>
          </div>
        ) : filteredFunding.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No funding opportunities found matching your criteria.</p>
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

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-950 border-t mt-12">
        <div className="container py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Africa Digitalization Funding Finder</strong> - Empowering nonprofits with funding information
            </p>
            <p>
              Created to support <strong>Diva Laser Foundation</strong> and other organizations working on digital transformation in Africa
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

