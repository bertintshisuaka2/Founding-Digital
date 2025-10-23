import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ExternalLink, TrendingUp, Users, DollarSign, Briefcase, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface NewsUpdate {
  id: number;
  title: string;
  organization: string;
  date: string;
  category: string;
  amount?: string;
  beneficiaries?: string;
  projects_funded?: number;
  innovators_selected?: number;
  projects?: string[];
  description: string;
  source_url: string;
}

interface ImpactStats {
  total_funding_2025: string;
  projects_funded: string;
  people_benefited: string;
  countries_reached: number;
  institutions_supported: number;
  last_updated: string;
}

interface UpcomingOpportunity {
  id: number;
  title: string;
  organization: string;
  deadline: string;
  estimated_amount: string;
  focus: string;
  status: string;
}

interface NewsData {
  news_updates: NewsUpdate[];
  impact_statistics: ImpactStats;
  upcoming_opportunities: UpcomingOpportunity[];
}

export default function NewsActivities() {
  const [newsData, setNewsData] = useState<NewsData | null>(null);

  useEffect(() => {
    fetch("/news-activities.json")
      .then((res) => res.json())
      .then((data) => setNewsData(data))
      .catch((err) => console.error("Failed to load news:", err));
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "New Funding":
        return "bg-green-950 text-green-300 border-green-700";
      case "Grants Awarded":
        return "bg-blue-950 text-blue-300 border-blue-700";
      case "Success Story":
        return "bg-yellow-950 text-yellow-300 border-yellow-700";
      case "New Initiative":
        return "bg-purple-950 text-purple-300 border-purple-700";
      case "Trend Report":
        return "bg-orange-950 text-orange-300 border-orange-700";
      case "Research Report":
        return "bg-cyan-950 text-cyan-300 border-cyan-700";
      default:
        return "bg-gray-800 text-gray-300 border-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    if (status.includes("Open")) return "bg-green-950 text-green-300 border-green-700";
    if (status.includes("Soon")) return "bg-yellow-950 text-yellow-300 border-yellow-700";
    if (status.includes("Ongoing")) return "bg-blue-950 text-blue-300 border-blue-700";
    return "bg-gray-800 text-gray-300 border-gray-700";
  };

  if (!newsData) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-300">Loading latest updates...</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-900 py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Real-Time Funding Activities & Impact
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Track the latest funding announcements, success stories, and upcoming opportunities in African digitalization
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="pt-6">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">{newsData.impact_statistics.total_funding_2025}</div>
              <div className="text-sm text-gray-400">Total Funding 2025</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="pt-6">
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{newsData.impact_statistics.projects_funded}</div>
              <div className="text-sm text-gray-400">Projects Funded</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">{newsData.impact_statistics.people_benefited}</div>
              <div className="text-sm text-gray-400">People Benefited</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl font-bold text-white">{newsData.impact_statistics.countries_reached}</div>
              <div className="text-sm text-gray-400">Countries Reached</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="pt-6">
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-orange-400" />
              <div className="text-2xl font-bold text-white">{newsData.impact_statistics.institutions_supported}</div>
              <div className="text-sm text-gray-400">Institutions Supported</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for News and Upcoming Opportunities */}
        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-gray-800">
            <TabsTrigger value="news" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              Latest News ({newsData.news_updates.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              Upcoming Opportunities ({newsData.upcoming_opportunities.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {newsData.news_updates.map((news) => (
                <Card key={news.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge className={`text-xs ${getCategoryColor(news.category)}`}>
                        {news.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <CardTitle className="text-lg text-white leading-tight">{news.title}</CardTitle>
                    <CardDescription className="text-gray-400">{news.organization}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {news.amount && (
                      <div className="flex items-center gap-2 text-green-400 font-semibold">
                        <DollarSign className="w-4 h-4" />
                        {news.amount}
                      </div>
                    )}
                    
                    {news.projects_funded && (
                      <div className="text-sm text-gray-300">
                        <strong className="text-white">{news.projects_funded}</strong> projects funded
                      </div>
                    )}
                    
                    {news.beneficiaries && (
                      <div className="text-sm text-gray-300">
                        <strong className="text-white">Beneficiaries:</strong> {news.beneficiaries}
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-300">{news.description}</p>
                    
                    <a 
                      href={news.source_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Read more <ExternalLink className="w-3 h-3" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {newsData.upcoming_opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="bg-gray-800 border-gray-700 hover:border-yellow-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge className={`text-xs ${getStatusColor(opportunity.status)}`}>
                        {opportunity.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        Deadline: {new Date(opportunity.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <CardTitle className="text-lg text-white leading-tight">{opportunity.title}</CardTitle>
                    <CardDescription className="text-gray-400">{opportunity.organization}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-green-400 font-semibold">
                      <DollarSign className="w-4 h-4" />
                      {opportunity.estimated_amount}
                    </div>
                    
                    <div className="text-sm">
                      <strong className="text-white">Focus Areas:</strong>
                      <p className="text-gray-300 mt-1">{opportunity.focus}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8 text-sm text-gray-400">
          Last updated: {new Date(newsData.impact_statistics.last_updated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>
    </section>
  );
}

