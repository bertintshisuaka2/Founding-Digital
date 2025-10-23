import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, DollarSign, Calendar, MapPin, CheckCircle2 } from "lucide-react";

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

interface FundingCardProps {
  funding: FundingSource;
}

export default function FundingCard({ funding }: FundingCardProps) {
  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  const getGrantRange = () => {
    if (funding.grant_range_min && funding.grant_range_max) {
      return `${formatAmount(funding.grant_range_min)} - ${formatAmount(funding.grant_range_max)}`;
    }
    if (funding.total_fund) {
      return `${formatAmount(funding.total_fund)} Total`;
    }
    if (funding.total_investment) {
      return `${formatAmount(funding.total_investment)} Investment`;
    }
    return "Contact for details";
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {funding.type}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {funding.deadline_type}
          </Badge>
        </div>
        <CardTitle className="text-xl leading-tight text-white">{funding.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-gray-300">
          <span className="font-medium">{funding.organization}</span>
          <span className="text-gray-400">•</span>
          <MapPin className="w-3 h-3" />
          <span>{funding.region}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold text-green-400">
          <DollarSign className="w-5 h-5" />
          {getGrantRange()}
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2 text-white">Focus Areas</h4>
          <div className="flex flex-wrap gap-1.5">
            {funding.focus_areas.slice(0, 4).map((area, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {area}
              </Badge>
            ))}
            {funding.focus_areas.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{funding.focus_areas.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              View Details
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">{funding.name}</DialogTitle>
              <DialogDescription className="text-base text-gray-300">
                {funding.organization} • {funding.region}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold text-lg text-white">Funding Amount</h3>
                </div>
                <p className="text-2xl font-bold text-green-400">{getGrantRange()}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 text-white">Focus Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {funding.focus_areas.map((area, idx) => (
                    <Badge key={idx} variant="secondary">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 text-white">Eligible Applicants</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                  {funding.eligible_applicants.map((applicant, idx) => (
                    <li key={idx}>{applicant}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 text-white">Application Process</h3>
                <p className="text-sm leading-relaxed text-gray-300">{funding.application_process}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 text-white">Selection Criteria</h3>
                <ul className="space-y-2">
                  {funding.selection_criteria.map((criteria, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-950 p-4 rounded-lg border border-green-800">
                <h3 className="font-semibold text-lg mb-2 text-green-300">
                  Success Tips
                </h3>
                <ul className="space-y-2">
                  {funding.success_tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-green-200">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button asChild className="flex-1">
                  <a href={funding.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline" size="icon" asChild>
          <a href={funding.website} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

