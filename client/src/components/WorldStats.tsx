import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Users, TrendingUp, DollarSign, GraduationCap, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

interface CountryData {
  code: string;
  name: string;
  region: string;
  population: number;
  youth_percent: number;
  women_percent: number;
  elderly_percent: number;
  universities: number;
  internet_users_percent: number;
  digital_investment_usd: number;
  digital_gap_score: number;
  gdp_usd: number;
  latitude: number;
  longitude: number;
}

interface WorldStatsData {
  countries: CountryData[];
  global_summary: {
    total_countries: number;
    total_population: number;
    avg_internet_users: number;
    total_digital_investment: number;
    avg_digital_gap: number;
    total_universities: number;
  };
}

export default function WorldStats() {
  const [worldData, setWorldData] = useState<WorldStatsData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  useEffect(() => {
    fetch("/world-stats.json")
      .then((res) => res.json())
      .then((data) => {
        setWorldData(data);
        if (data.countries.length > 0) {
          setSelectedCountry(data.countries[0]);
        }
      })
      .catch((err) => console.error("Failed to load world stats:", err));
  }, []);

  if (!worldData) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-300">Loading global statistics...</p>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(0);
  };

  const formatCurrency = (num: number) => {
    return `$${formatNumber(num)}`;
  };

  const getGapColor = (gap: number) => {
    if (gap < 15) return "text-green-400";
    if (gap < 35) return "text-yellow-400";
    return "text-red-400";
  };

  const regions = ["all", ...Array.from(new Set(worldData.countries.map(c => c.region)))];
  const filteredCountries = selectedRegion === "all" 
    ? worldData.countries 
    : worldData.countries.filter(c => c.region === selectedRegion);

  return (
    <section className="bg-black py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Global Digitalization Statistics
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Comprehensive data on digital transformation, investment, and opportunity gaps across countries worldwide
          </p>
        </div>

        {/* Global Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          <Card className="bg-gray-900 border-gray-800 text-center">
            <CardContent className="pt-6">
              <Globe className="w-6 h-6 mx-auto mb-2 text-blue-400" />
              <div className="text-xl font-bold text-white">{worldData.global_summary.total_countries}</div>
              <div className="text-xs text-gray-400">Countries</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800 text-center">
            <CardContent className="pt-6">
              <Users className="w-6 h-6 mx-auto mb-2 text-purple-400" />
              <div className="text-xl font-bold text-white">{formatNumber(worldData.global_summary.total_population)}</div>
              <div className="text-xs text-gray-400">Population</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800 text-center">
            <CardContent className="pt-6">
              <Wifi className="w-6 h-6 mx-auto mb-2 text-green-400" />
              <div className="text-xl font-bold text-white">{worldData.global_summary.avg_internet_users.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">Avg Internet Users</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800 text-center">
            <CardContent className="pt-6">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
              <div className="text-xl font-bold text-white">{formatCurrency(worldData.global_summary.total_digital_investment)}</div>
              <div className="text-xs text-gray-400">Total Investment</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800 text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-orange-400" />
              <div className="text-xl font-bold text-white">{worldData.global_summary.avg_digital_gap.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">Avg Digital Gap</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800 text-center">
            <CardContent className="pt-6">
              <GraduationCap className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
              <div className="text-xl font-bold text-white">{formatNumber(worldData.global_summary.total_universities)}</div>
              <div className="text-xs text-gray-400">Universities</div>
            </CardContent>
          </Card>
        </div>

        {/* Region Filter */}
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-md">
            <label className="text-sm text-gray-400 mb-2 block">Filter by Region</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {regions.map((region) => (
                  <SelectItem key={region} value={region} className="text-white">
                    {region === "all" ? "All Regions" : region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Country Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCountries.map((country) => (
            <Card 
              key={country.code} 
              className="bg-gray-900 border-gray-800 hover:border-yellow-600 transition-colors cursor-pointer"
              onClick={() => setSelectedCountry(country)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg text-white">{country.name}</CardTitle>
                  <Badge className="bg-gray-800 text-gray-300 border-gray-700 text-xs">
                    {country.code}
                  </Badge>
                </div>
                <CardDescription className="text-gray-400 text-sm">{country.region}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-400 text-xs">Population</div>
                    <div className="text-white font-semibold">{formatNumber(country.population)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">GDP</div>
                    <div className="text-white font-semibold">{formatCurrency(country.gdp_usd)}</div>
                  </div>
                </div>

                <div>
                  <div className="text-gray-400 text-xs mb-1">Internet Users</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${country.internet_users_percent}%` }}
                      ></div>
                    </div>
                    <span className="text-white text-xs font-semibold">{country.internet_users_percent}%</span>
                  </div>
                </div>

                <div>
                  <div className="text-gray-400 text-xs mb-1">Digital Gap</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-800 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          country.digital_gap_score < 15 ? 'bg-green-500' :
                          country.digital_gap_score < 35 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${country.digital_gap_score}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs font-semibold ${getGapColor(country.digital_gap_score)}`}>
                      {country.digital_gap_score}%
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-800">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-400">Investment:</span>
                      <div className="text-yellow-400 font-semibold">{formatCurrency(country.digital_investment_usd)}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Universities:</span>
                      <div className="text-cyan-400 font-semibold">{country.universities}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-800">
                  <div className="text-xs text-gray-400 mb-1">Demographics</div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-blue-950 text-blue-300 border-blue-700 text-xs">
                      Youth: {country.youth_percent}%
                    </Badge>
                    <Badge className="bg-pink-950 text-pink-300 border-pink-700 text-xs">
                      Women: {country.women_percent}%
                    </Badge>
                    <Badge className="bg-purple-950 text-purple-300 border-purple-700 text-xs">
                      Elderly: {country.elderly_percent}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Opportunity Analysis */}
        <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-4">Digital Gap Opportunity Analysis</h3>
          <p className="text-gray-300 mb-6">
            Countries with higher digital gap scores represent greater opportunities for digital transformation investment and impact.
            The gap score indicates the percentage of the population without internet access, highlighting areas for infrastructure development.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-gray-900 border-green-700">
              <CardHeader>
                <CardTitle className="text-green-400 text-sm">Low Gap (&lt; 15%)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">
                  {filteredCountries.filter(c => c.digital_gap_score < 15).length}
                </div>
                <p className="text-xs text-gray-400">Countries with advanced digital infrastructure</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-yellow-700">
              <CardHeader>
                <CardTitle className="text-yellow-400 text-sm">Medium Gap (15-35%)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">
                  {filteredCountries.filter(c => c.digital_gap_score >= 15 && c.digital_gap_score < 35).length}
                </div>
                <p className="text-xs text-gray-400">Countries with growing digital access</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-red-700">
              <CardHeader>
                <CardTitle className="text-red-400 text-sm">High Gap (&gt; 35%)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">
                  {filteredCountries.filter(c => c.digital_gap_score >= 35).length}
                </div>
                <p className="text-xs text-gray-400">Countries with significant investment opportunities</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

