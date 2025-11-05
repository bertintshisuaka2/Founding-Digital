import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "header.title": "Diva Laser Software Solutions",
    "header.developed": "Developed by Bertin Tshisuaka",
    "header.role": "Software Engineer and Full Stack Web Developer",
    "header.assistance": "Need assistance? Text Bertin Tshisuaka at",
    
    // Login
    "login.title": "Africa Funding Finder",
    "login.subtitle": "Enter your 4-digit PIN to access the platform",
    "login.placeholder": "Enter 4-digit PIN",
    "login.button": "Login",
    "login.error.title": "Incorrect PIN",
    "login.error.message": "The PIN you entered is incorrect. Please try again or contact support for assistance.",
    "login.error.help": "Need Help?",
    "login.error.contact": "Text Bertin Tshisuaka for assistance",
    "login.tagline": "Bridging the Digital Gap in Africa",
    "logout": "Logout",
    
    // Hero
    "hero.badge": "Funding Sources Available",
    "hero.title": "Find Funding for African Digitalization Projects",
    "hero.subtitle": "Comprehensive database of grants, banks, and financial institutions supporting digital transformation across Africa. Discover opportunities for Diva Laser Foundation and other nonprofits.",
    "hero.feature1": "Pan-African Coverage",
    "hero.feature2": "in Funding",
    "hero.feature3": "For Nonprofits & NGOs",
    
    // News Section
    "news.title": "Real-Time Funding Activities & Impact",
    "news.subtitle": "Track the latest funding announcements, success stories, and upcoming opportunities in African digitalization",
    "news.totalFunding": "Total Funding 2025",
    "news.projectsFunded": "Projects Funded",
    "news.peopleBenefited": "People Benefited",
    "news.countriesReached": "Countries Reached",
    "news.institutionsSupported": "Institutions Supported",
    "news.latestNews": "Latest News",
    "news.upcomingOpportunities": "Upcoming Opportunities",
    "news.readMore": "Read more",
    "news.lastUpdated": "Last updated",
    "news.beneficiaries": "Beneficiaries",
    "news.projectsFundedCount": "projects funded",
    
    // Leaders Section
    "leaders.title": "Listen to the Leaders of Digital Innovation",
    "leaders.subtitle": "Gain insights from visionary leaders and inventors shaping the future of AI and digital transformation",
    
    // Search & Filters
    "search.placeholder": "Search funding sources...",
    "search.showing": "Showing",
    "search.of": "of",
    "search.opportunities": "funding opportunities",
    "filters.title": "Filters:",
    "filters.allTypes": "All Types",
    "filters.allRegions": "All Regions",
    "filters.allDeadlines": "All Deadlines",
    "filters.clear": "Clear Filters",
    
    // Funding Cards
    "card.focusAreas": "Focus Areas",
    "card.viewDetails": "View Details",
    "card.grantRange": "Grant Range",
    "card.totalInvestment": "Total Investment",
    "card.totalFund": "Total Fund",
    "card.applicationProcess": "Application Process",
    "card.eligibleApplicants": "Eligible Applicants",
    "card.selectionCriteria": "Selection Criteria",
    "card.successTips": "Success Tips",
    "card.website": "Visit Website",
    "card.close": "Close",
    
    // World Stats
    "worldStats.title": "Global Digitalization Statistics",
    "worldStats.subtitle": "Comprehensive data on digital transformation investments and gaps worldwide",
    "worldStats.globalSummary": "Global Summary",
    "worldStats.totalInvestment": "Total Investment",
    "worldStats.avgInternetPenetration": "Avg Internet Penetration",
    "worldStats.totalPopulation": "Total Population",
    "worldStats.totalUniversities": "Total Universities",
    "worldStats.avgDigitalGap": "Avg Digital Gap",
    "worldStats.opportunityAnalysis": "Opportunity Analysis",
    "worldStats.highOpportunity": "High Opportunity",
    "worldStats.mediumOpportunity": "Medium Opportunity",
    "worldStats.emergingMarkets": "Emerging Markets",
    "worldStats.countries": "countries",
    "worldStats.filterByRegion": "Filter by region:",
    "worldStats.allRegions": "All Regions",
    "worldStats.population": "Population",
    "worldStats.gdp": "GDP",
    "worldStats.internetPenetration": "Internet Penetration",
    "worldStats.digitalInvestment": "Digital Investment",
    "worldStats.digitalGap": "Digital Gap",
    "worldStats.universities": "Universities",
    "worldStats.youth": "Youth",
    "worldStats.women": "Women",
    "worldStats.elderly": "Elderly",
    
    // Africa Regions
    "regions.title": "African Regions Digital Transformation",
    "regions.subtitle": "Comprehensive analysis of digitalization across East, Central, and Southern Africa, with special focus on DRC",
    "regions.eastAfrica": "East Africa",
    "regions.centralAfrica": "Central Africa",
    "regions.southernAfrica": "Southern Africa",
    "regions.drcSpecial": "DRC Special",
    "regions.population": "Population",
    "regions.internetAccess": "Internet Access",
    "regions.investment": "Investment",
    "regions.universities": "Universities",
    "regions.startups": "Startups",
    "regions.internetUsers": "Internet Users",
    "regions.digitalGap": "Digital Gap",
    "regions.keySectors": "Key Sectors",
    "regions.youth": "Youth",
    "regions.women": "Women",
    "regions.mobileSubscribers": "Mobile $",
    "regions.drc.leadership": "DRC Leadership",
    "regions.drc.president": "President of DRC",
    "regions.drc.minister": "Minister of Digital Economy & Telecommunications",
    "regions.drc.overview": "Democratic Republic of Congo - Digital Transformation Overview",
    "regions.drc.description": "The DRC, with a population of 99.01 million, represents one of Africa's largest digital transformation opportunities. Despite only 23.2% internet penetration, the country is investing heavily in digital infrastructure and innovation.",
    "regions.drc.investmentNeeds": "Investment Needs",
    "regions.drc.opportunities": "Digital Economy Opportunities",
    "regions.drc.government": "Government Initiatives",
    "regions.drc.partnerships": "International Partnerships",
    "regions.drc.majorCities": "Major Cities",
    "regions.drc.gapAnalysis": "Gap Analysis",
    "regions.drc.demographics": "Demographics",
    
    // Founder Section
    "founder.title": "Meet the Founder",
    "founder.name": "Bertin Tshisuaka",
    "founder.title2": "Founder and President of Diva Laser",
    "founder.location": "Atlanta, Georgia, United States",
    "founder.education": "Georgia Institute of Technology",
    "founder.mission": "Mission",
    "founder.stats.digitalGap": "Avg Digital Gap",
    "founder.stats.drcInvestment": "DRC Investment Needed",
    "founder.stats.funding2025": "2025 Funding",
    "founder.stats.organizations": "Funding Organizations",
    "founder.english": "English",
    "founder.french": "French",
    
    // Contact
    "contact.title": "Get in Touch",
    "contact.subtitle": "Have questions about funding opportunities? We're here to help.",
    "contact.location": "Location",
    "contact.locationValue": "Atlanta, Georgia, USA",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.formTitle": "Send us a message",
    "contact.name": "Your Name",
    "contact.emailLabel": "Your Email",
    "contact.organization": "Organization",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    
    // Footer
    "footer.rights": "All rights reserved.",
    "footer.software": "Software Solutions",
  },
  fr: {
    // Header
    "header.title": "Diva Laser Solutions Logicielles",
    "header.developed": "Développé par Bertin Tshisuaka",
    "header.role": "Ingénieur Logiciel et Développeur Web Full Stack",
    "header.assistance": "Besoin d'aide ? Envoyez un SMS à Bertin Tshisuaka au",
    
    // Login
    "login.title": "Chercheur de Financement pour l'Afrique",
    "login.subtitle": "Entrez votre code PIN à 4 chiffres pour accéder à la plateforme",
    "login.placeholder": "Entrez le code PIN à 4 chiffres",
    "login.button": "Connexion",
    "login.error.title": "Code PIN incorrect",
    "login.error.message": "Le code PIN que vous avez entré est incorrect. Veuillez réessayer ou contacter le support pour obtenir de l'aide.",
    "login.error.help": "Besoin d'aide ?",
    "login.error.contact": "Envoyez un SMS à Bertin Tshisuaka pour obtenir de l'aide",
    "login.tagline": "Combler le fossé numérique en Afrique",
    "logout": "Déconnexion",
    
    // Hero
    "hero.badge": "Sources de financement disponibles",
    "hero.title": "Trouvez du financement pour les projets de numérisation africains",
    "hero.subtitle": "Base de données complète de subventions, banques et institutions financières soutenant la transformation numérique en Afrique. Découvrez des opportunités pour la Fondation Diva Laser et d'autres organisations à but non lucratif.",
    "hero.feature1": "Couverture panafricaine",
    "hero.feature2": "de financement",
    "hero.feature3": "Pour les ONG et associations",
    
    // News Section
    "news.title": "Activités de financement et impact en temps réel",
    "news.subtitle": "Suivez les dernières annonces de financement, les réussites et les opportunités à venir dans la numérisation africaine",
    "news.totalFunding": "Financement total 2025",
    "news.projectsFunded": "Projets financés",
    "news.peopleBenefited": "Personnes bénéficiaires",
    "news.countriesReached": "Pays touchés",
    "news.institutionsSupported": "Institutions soutenues",
    "news.latestNews": "Dernières nouvelles",
    "news.upcomingOpportunities": "Opportunités à venir",
    "news.readMore": "Lire la suite",
    "news.lastUpdated": "Dernière mise à jour",
    "news.beneficiaries": "Bénéficiaires",
    "news.projectsFundedCount": "projets financés",
    
    // Leaders Section
    "leaders.title": "Écoutez les leaders de l'innovation numérique",
    "leaders.subtitle": "Obtenez des perspectives de leaders visionnaires et d'inventeurs qui façonnent l'avenir de l'IA et de la transformation numérique",
    
    // Search & Filters
    "search.placeholder": "Rechercher des sources de financement...",
    "search.showing": "Affichage de",
    "search.of": "sur",
    "search.opportunities": "opportunités de financement",
    "filters.title": "Filtres :",
    "filters.allTypes": "Tous les types",
    "filters.allRegions": "Toutes les régions",
    "filters.allDeadlines": "Toutes les échéances",
    "filters.clear": "Effacer les filtres",
    
    // Funding Cards
    "card.focusAreas": "Domaines d'intervention",
    "card.viewDetails": "Voir les détails",
    "card.grantRange": "Montant de la subvention",
    "card.totalInvestment": "Investissement total",
    "card.totalFund": "Fonds total",
    "card.applicationProcess": "Processus de candidature",
    "card.eligibleApplicants": "Candidats éligibles",
    "card.selectionCriteria": "Critères de sélection",
    "card.successTips": "Conseils de réussite",
    "card.website": "Visiter le site web",
    "card.close": "Fermer",
    
    // World Stats
    "worldStats.title": "Statistiques mondiales de numérisation",
    "worldStats.subtitle": "Données complètes sur les investissements et les lacunes de la transformation numérique dans le monde",
    "worldStats.globalSummary": "Résumé mondial",
    "worldStats.totalInvestment": "Investissement total",
    "worldStats.avgInternetPenetration": "Pénétration Internet moyenne",
    "worldStats.totalPopulation": "Population totale",
    "worldStats.totalUniversities": "Universités totales",
    "worldStats.avgDigitalGap": "Écart numérique moyen",
    "worldStats.opportunityAnalysis": "Analyse des opportunités",
    "worldStats.highOpportunity": "Opportunité élevée",
    "worldStats.mediumOpportunity": "Opportunité moyenne",
    "worldStats.emergingMarkets": "Marchés émergents",
    "worldStats.countries": "pays",
    "worldStats.filterByRegion": "Filtrer par région :",
    "worldStats.allRegions": "Toutes les régions",
    "worldStats.population": "Population",
    "worldStats.gdp": "PIB",
    "worldStats.internetPenetration": "Pénétration Internet",
    "worldStats.digitalInvestment": "Investissement numérique",
    "worldStats.digitalGap": "Écart numérique",
    "worldStats.universities": "Universités",
    "worldStats.youth": "Jeunes",
    "worldStats.women": "Femmes",
    "worldStats.elderly": "Personnes âgées",
    
    // Africa Regions
    "regions.title": "Transformation numérique des régions africaines",
    "regions.subtitle": "Analyse complète de la numérisation en Afrique de l'Est, centrale et australe, avec un accent particulier sur la RDC",
    "regions.eastAfrica": "Afrique de l'Est",
    "regions.centralAfrica": "Afrique centrale",
    "regions.southernAfrica": "Afrique australe",
    "regions.drcSpecial": "RDC Spécial",
    "regions.population": "Population",
    "regions.internetAccess": "Accès Internet",
    "regions.investment": "Investissement",
    "regions.universities": "Universités",
    "regions.startups": "Startups",
    "regions.internetUsers": "Utilisateurs Internet",
    "regions.digitalGap": "Écart numérique",
    "regions.keySectors": "Secteurs clés",
    "regions.youth": "Jeunes",
    "regions.women": "Femmes",
    "regions.mobileSubscribers": "Abonnés mobiles",
    "regions.drc.leadership": "Direction de la RDC",
    "regions.drc.president": "Président de la RDC",
    "regions.drc.minister": "Ministre de l'Économie numérique et des Télécommunications",
    "regions.drc.overview": "République Démocratique du Congo - Aperçu de la transformation numérique",
    "regions.drc.description": "La RDC, avec une population de 99,01 millions d'habitants, représente l'une des plus grandes opportunités de transformation numérique en Afrique. Malgré seulement 23,2% de pénétration Internet, le pays investit massivement dans les infrastructures numériques et l'innovation.",
    "regions.drc.investmentNeeds": "Besoins d'investissement",
    "regions.drc.opportunities": "Opportunités d'économie numérique",
    "regions.drc.government": "Initiatives gouvernementales",
    "regions.drc.partnerships": "Partenariats internationaux",
    "regions.drc.majorCities": "Grandes villes",
    "regions.drc.gapAnalysis": "Analyse des lacunes",
    "regions.drc.demographics": "Démographie",
    
    // Founder Section
    "founder.title": "Rencontrez le fondateur",
    "founder.name": "Bertin Tshisuaka",
    "founder.title2": "Fondateur et Président de Diva Laser",
    "founder.location": "Atlanta, Géorgie, États-Unis",
    "founder.education": "Institut de Technologie de Géorgie",
    "founder.mission": "Mission",
    "founder.stats.digitalGap": "Écart numérique moyen",
    "founder.stats.drcInvestment": "Investissement nécessaire en RDC",
    "founder.stats.funding2025": "Financement 2025",
    "founder.stats.organizations": "Organisations de financement",
    "founder.english": "Anglais",
    "founder.french": "Français",
    
    // Contact
    "contact.title": "Contactez-nous",
    "contact.subtitle": "Vous avez des questions sur les opportunités de financement ? Nous sommes là pour vous aider.",
    "contact.location": "Localisation",
    "contact.locationValue": "Atlanta, Géorgie, États-Unis",
    "contact.email": "Email",
    "contact.phone": "Téléphone",
    "contact.formTitle": "Envoyez-nous un message",
    "contact.name": "Votre nom",
    "contact.emailLabel": "Votre email",
    "contact.organization": "Organisation",
    "contact.subject": "Sujet",
    "contact.message": "Message",
    "contact.send": "Envoyer le message",
    
    // Footer
    "footer.rights": "Tous droits réservés.",
    "footer.software": "Solutions Logicielles",
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

