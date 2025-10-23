import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, Users, Wifi, DollarSign, GraduationCap, TrendingUp, 
  Building, Smartphone, Globe, AlertCircle, CheckCircle, Clock 
} from "lucide-react";
import { useEffect, useState } from "react";

interface Country {
  code: string;
  name: string;
  population: number;
  youth_percent: number;
  women_percent: number;
  elderly_percent: number;
  universities: number;
  internet_users_percent: number;
  digital_investment_usd: number;
  digital_gap_score: number;
  gdp_usd: number;
  mobile_money_users: number;
  startups: number;
  key_sectors: string[];
}

interface RegionData {
  region_name: string;
  description: string;
  countries: Country[];
  regional_stats: {
    total_population: number;
    avg_internet_penetration: number;
    total_investment: number;
    total_universities: number;
    total_startups: number;
  };
}

interface DRCSpecial {
  country_name: string;
  capital: string;
  population: number;
  provinces: number;
  major_cities: string[];
  demographics: any;
  education: any;
  digital_landscape: any;
  digital_economy: any;
  digital_gap_analysis: any;
  opportunities: any[];
  key_challenges: string[];
  government_initiatives: any[];
  international_support: any[];
}

interface AfricaData {
  east_africa: RegionData;
  central_africa: RegionData;
  southern_africa: RegionData;
  drc_special: DRCSpecial;
}

export default function AfricaRegions() {
  const [africaData, setAfricaData] = useState<AfricaData | null>(null);

  useEffect(() => {
    fetch("/africa-regions.json")
      .then((res) => res.json())
      .then((data) => setAfricaData(data))
      .catch((err) => console.error("Failed to load Africa regions data:", err));
  }, []);

  if (!africaData) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-300">Loading African regions data...</p>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(0);
  };

  const formatCurrency = (num: number) => `$${formatNumber(num)}`;

  const getGapColor = (gap: number) => {
    if (gap < 30) return "text-green-400";
    if (gap < 60) return "text-yellow-400";
    return "text-red-400";
  };

  const RegionSection = ({ region }: { region: RegionData }) => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{region.region_name}</h3>
        <p className="text-gray-300">{region.description}</p>
      </div>

      {/* Regional Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card className="bg-gray-900 border-gray-800 text-center">
          <CardContent className="pt-6">
            <Users className="w-6 h-6 mx-auto mb-2 text-purple-400" />
            <div className="text-lg font-bold text-white">{formatNumber(region.regional_stats.total_population)}</div>
            <div className="text-xs text-gray-400">Population</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 text-center">
          <CardContent className="pt-6">
            <Wifi className="w-6 h-6 mx-auto mb-2 text-green-400" />
            <div className="text-lg font-bold text-white">{region.regional_stats.avg_internet_penetration.toFixed(1)}%</div>
            <div className="text-xs text-gray-400">Internet Access</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 text-center">
          <CardContent className="pt-6">
            <DollarSign className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
            <div className="text-lg font-bold text-white">{formatCurrency(region.regional_stats.total_investment)}</div>
            <div className="text-xs text-gray-400">Investment</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 text-center">
          <CardContent className="pt-6">
            <GraduationCap className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
            <div className="text-lg font-bold text-white">{region.regional_stats.total_universities}</div>
            <div className="text-xs text-gray-400">Universities</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 text-center">
          <CardContent className="pt-6">
            <Building className="w-6 h-6 mx-auto mb-2 text-orange-400" />
            <div className="text-lg font-bold text-white">{region.regional_stats.total_startups}</div>
            <div className="text-xs text-gray-400">Startups</div>
          </CardContent>
        </Card>
      </div>

      {/* Countries Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {region.countries.map((country) => (
          <Card key={country.code} className="bg-gray-900 border-gray-800 hover:border-yellow-600 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-lg text-white">{country.name}</CardTitle>
                <Badge className="bg-gray-800 text-gray-300 border-gray-700 text-xs">{country.code}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-gray-400 text-xs">Population</div>
                  <div className="text-white font-semibold">{formatNumber(country.population)}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Universities</div>
                  <div className="text-cyan-400 font-semibold">{country.universities}</div>
                </div>
              </div>

              <div>
                <div className="text-gray-400 text-xs mb-1">Internet Users</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-800 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${country.internet_users_percent}%` }}></div>
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
                        country.digital_gap_score < 30 ? 'bg-green-500' :
                        country.digital_gap_score < 60 ? 'bg-yellow-500' : 'bg-red-500'
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
                    <span className="text-gray-400">Startups:</span>
                    <div className="text-orange-400 font-semibold">{country.startups}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-800">
                <div className="text-xs text-gray-400 mb-1">Key Sectors</div>
                <div className="flex gap-1 flex-wrap">
                  {country.key_sectors.map((sector, idx) => (
                    <Badge key={idx} className="bg-blue-950 text-blue-300 border-blue-700 text-xs">
                      {sector}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-800">
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-gray-400">Youth</div>
                    <div className="text-white font-semibold">{country.youth_percent}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Women</div>
                    <div className="text-white font-semibold">{country.women_percent}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Mobile $</div>
                    <div className="text-white font-semibold">{formatNumber(country.mobile_money_users)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const DRCSection = () => {
    const drc = africaData.drc_special;
    
    return (
      <div className="space-y-8">
        <div className="text-center mb-8 bg-gradient-to-r from-blue-900 to-yellow-900 p-8 rounded-lg">
          <h3 className="text-3xl font-bold text-white mb-2">🇨🇩 {drc.country_name}</h3>
          <p className="text-xl text-yellow-300 mb-4">Heart of Africa - Digital Transformation Hub</p>
          <div className="flex justify-center gap-4 text-sm mb-6">
            <Badge className="bg-blue-950 text-blue-300 border-blue-700">Capital: {drc.capital}</Badge>
            <Badge className="bg-green-950 text-green-300 border-green-700">{drc.provinces} Provinces</Badge>
            <Badge className="bg-purple-950 text-purple-300 border-purple-700">Population: {formatNumber(drc.population)}</Badge>
          </div>
          
          {/* Leadership Section */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
            <Card className="bg-gray-900 border-blue-700">
              <CardContent className="pt-6 text-center">
                <div className="mb-4">
                  <img 
                    src="/tshisekedi.jpg" 
                    alt="President Félix Tshisekedi" 
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-500"
                  />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Félix Tshisekedi</h4>
                <p className="text-sm text-blue-300 mb-2">President of the Democratic Republic of Congo</p>
                <p className="text-xs text-gray-400">Leading DRC's digital transformation vision</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-green-700">
              <CardContent className="pt-6 text-center">
                <div className="mb-4">
                  <img 
                    src="/minister-digital.jpg" 
                    alt="Minister of Digital Economy" 
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-500"
                  />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Désiré-Cashmir Kolongele</h4>
                <p className="text-sm text-green-300 mb-2">Minister of Digital Economy & Telecommunications</p>
                <p className="text-xs text-gray-400">Driving digital infrastructure development</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-700">
            <CardContent className="pt-6 text-center">
              <Wifi className="w-6 h-6 mx-auto mb-2 text-blue-300" />
              <div className="text-xl font-bold text-white">{drc.digital_landscape.internet_users_percent}%</div>
              <div className="text-xs text-blue-200">Internet Users</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900 to-green-950 border-green-700">
            <CardContent className="pt-6 text-center">
              <Smartphone className="w-6 h-6 mx-auto mb-2 text-green-300" />
              <div className="text-xl font-bold text-white">{formatNumber(drc.digital_economy.mobile_money_users)}</div>
              <div className="text-xs text-green-200">Mobile Money Users</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900 to-yellow-950 border-yellow-700">
            <CardContent className="pt-6 text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
              <div className="text-xl font-bold text-white">{formatCurrency(drc.digital_economy.digital_investment_2025_usd)}</div>
              <div className="text-xs text-yellow-200">2025 Investment</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900 to-purple-950 border-purple-700">
            <CardContent className="pt-6 text-center">
              <Building className="w-6 h-6 mx-auto mb-2 text-purple-300" />
              <div className="text-xl font-bold text-white">{drc.digital_economy.tech_startups}</div>
              <div className="text-xs text-purple-200">Tech Startups</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900 to-cyan-950 border-cyan-700">
            <CardContent className="pt-6 text-center">
              <GraduationCap className="w-6 h-6 mx-auto mb-2 text-cyan-300" />
              <div className="text-xl font-bold text-white">{drc.education.universities}</div>
              <div className="text-xs text-cyan-200">Universities</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900 to-orange-950 border-orange-700">
            <CardContent className="pt-6 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-orange-300" />
              <div className="text-xl font-bold text-white">{drc.digital_gap_analysis.overall_gap_score}%</div>
              <div className="text-xs text-orange-200">Digital Gap</div>
            </CardContent>
          </Card>
        </div>

        {/* Major Cities */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-400" />
              Major Cities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {drc.major_cities.map((city, idx) => (
                <Badge key={idx} className="bg-yellow-950 text-yellow-300 border-yellow-700">
                  {city}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Opportunities */}
        <div>
          <h4 className="text-2xl font-bold text-white mb-4">Digital Economy Opportunities</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drc.opportunities.map((opp, idx) => (
              <Card key={idx} className="bg-gray-900 border-gray-800 hover:border-green-600 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg text-white">{opp.sector}</CardTitle>
                  <CardDescription className="text-gray-400">
                    Market Size: {formatCurrency(opp.market_size_usd)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Growth Rate</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-800 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(opp.growth_rate, 100)}%` }}></div>
                      </div>
                      <span className="text-green-400 text-xs font-semibold">{opp.growth_rate}%</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400 mb-1">Opportunity Score</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-800 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${opp.opportunity_score * 10}%` }}></div>
                      </div>
                      <span className="text-yellow-400 text-xs font-semibold">{opp.opportunity_score}/10</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-800">
                    <div className="text-xs text-gray-400 mb-1">Key Players</div>
                    <div className="text-sm text-white">{opp.key_players.join(", ")}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Challenges & Solutions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-red-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                Key Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {drc.key_challenges.map((challenge, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-green-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Government Initiatives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {drc.government_initiatives.map((initiative, idx) => (
                  <div key={idx} className="border-b border-gray-800 pb-3 last:border-0">
                    <div className="font-semibold text-white text-sm">{initiative.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{initiative.focus}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-green-950 text-green-300 border-green-700 text-xs">
                        {formatCurrency(initiative.budget_usd)}
                      </Badge>
                      <Badge className="bg-blue-950 text-blue-300 border-blue-700 text-xs">
                        {initiative.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* International Support */}
        <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-300" />
              International Support & Partnerships
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {drc.international_support.map((support, idx) => (
                <div key={idx} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <div className="font-bold text-white mb-2">{support.organization}</div>
                  <div className="text-sm text-gray-300 mb-2">{support.project}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge className="bg-green-950 text-green-300 border-green-700">
                      {formatCurrency(support.funding_usd)}
                    </Badge>
                    <Badge className="bg-blue-950 text-blue-300 border-blue-700 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {support.timeline}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investment Needed */}
        <Card className="bg-gradient-to-r from-red-900 to-orange-900 border-orange-700">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Digital Gap Analysis & Investment Needs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-orange-200">Infrastructure Gap</div>
                <div className="text-2xl font-bold text-white">{drc.digital_gap_analysis.infrastructure_gap}%</div>
              </div>
              <div>
                <div className="text-xs text-orange-200">Affordability Gap</div>
                <div className="text-2xl font-bold text-white">{drc.digital_gap_analysis.affordability_gap}%</div>
              </div>
              <div>
                <div className="text-xs text-orange-200">Skills Gap</div>
                <div className="text-2xl font-bold text-white">{drc.digital_gap_analysis.skills_gap}%</div>
              </div>
              <div>
                <div className="text-xs text-orange-200">Content Gap</div>
                <div className="text-2xl font-bold text-white">{drc.digital_gap_analysis.content_gap}%</div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-orange-700">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">Total Investment Needed</div>
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  {formatCurrency(drc.digital_gap_analysis.investment_needed_usd)}
                </div>
                <div className="text-sm text-gray-300">
                  Timeline: {drc.digital_gap_analysis.timeline_years} years to close the gap
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            African Regions Digital Transformation
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Comprehensive analysis of digitalization across East, Central, and Southern Africa, with special focus on DRC
          </p>
        </div>

        <Tabs defaultValue="east" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8 bg-gray-800">
            <TabsTrigger value="east" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              East Africa
            </TabsTrigger>
            <TabsTrigger value="central" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              Central Africa
            </TabsTrigger>
            <TabsTrigger value="southern" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              Southern Africa
            </TabsTrigger>
            <TabsTrigger value="drc" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">
              🇨🇩 DRC Special
            </TabsTrigger>
          </TabsList>

          <TabsContent value="east">
            <RegionSection region={africaData.east_africa} />
          </TabsContent>

          <TabsContent value="central">
            <RegionSection region={africaData.central_africa} />
          </TabsContent>

          <TabsContent value="southern">
            <RegionSection region={africaData.southern_africa} />
          </TabsContent>

          <TabsContent value="drc">
            <DRCSection />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

