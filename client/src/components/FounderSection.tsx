import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Globe, Volume2 } from "lucide-react";

export default function FounderSection() {
  const [language, setLanguage] = useState<"en" | "fr">("en");

  const speech = {
    en: {
      title: "Meet the Founder",
      name: "Bertin Tshisuaka",
      role: "Founder and President of Diva Laser",
      subtitle: "Software Engineer and Full Stack Web Developer",
      speech: `Dear friends, partners, and fellow advocates for digital transformation,

I stand before you today not just as a software engineer, but as someone who has witnessed firsthand the transformative power of technology and the devastating consequences of the digital divide. My name is Bertin Tshisuaka, and I founded Diva Laser Software Solutions with a singular mission: to bridge the digital gap that separates millions of Africans from opportunities, education, and economic prosperity.

The statistics we see today are both alarming and motivating. Across Africa, the average digital gap stands at 24.3%, but in many countries, particularly in Central Africa, this gap exceeds 76%. This means that three out of four people lack access to the internet, to digital education, to online banking, to telemedicine, and to the countless opportunities that the digital world offers. In the Democratic Republic of Congo alone, we need $12.5 billion over the next eight years to close this gap. This is not just a number—it represents millions of young people who cannot access online learning, entrepreneurs who cannot reach global markets, and communities that remain isolated from the digital economy.

But here's what drives me every single day: I believe that technology is the great equalizer. When a young person in Kinshasa can access the same online courses as someone in Silicon Valley, when a farmer in rural Tanzania can use mobile money to access credit, when a healthcare worker in Ethiopia can consult with specialists worldwide through telemedicine—that's when we unlock Africa's true potential.

Diva Laser Software Solutions was born from this conviction. We don't just build software; we build bridges. We create platforms that connect African nonprofits with funding opportunities, we develop applications that make digital services accessible even in low-bandwidth environments, and we train the next generation of African developers who will build solutions for African problems.

This funding finder application you're using right now is just one example. We've compiled information on 15 major funding organizations, tracked real-time activities showing $397 million in 2025 funding alone, and mapped digitalization statistics across 20 countries. But more importantly, we've made this information accessible, searchable, and actionable for organizations like yours who are working on the ground to make a difference.

The opportunity before us is unprecedented. With mobile penetration exceeding 42% even in countries with low internet access, with tech startups growing at rates exceeding 25% annually, and with international organizations committing billions to African digital transformation, we are at a pivotal moment. The question is not whether Africa will digitalize—it's whether we will ensure that this digitalization is inclusive, equitable, and truly transformative for all Africans.

I invite you to join us in this mission. Whether you're seeking funding for your digitalization project, looking to invest in African tech, or simply want to be part of this transformation, there is a place for you in this movement. Together, we can turn the digital gap from a barrier into a bridge, from a challenge into an opportunity.

Thank you for your time, your commitment, and your belief in Africa's digital future.`,
    },
    fr: {
      title: "Rencontrez le Fondateur",
      name: "Bertin Tshisuaka",
      role: "Fondateur et Président de Diva Laser",
      subtitle: "Ingénieur Logiciel et Développeur Web Full Stack",
      speech: `Chers amis, partenaires et défenseurs de la transformation numérique,

Je me présente devant vous aujourd'hui non seulement en tant qu'ingénieur logiciel, mais en tant que témoin direct du pouvoir transformateur de la technologie et des conséquences dévastatrices de la fracture numérique. Je m'appelle Bertin Tshisuaka, et j'ai fondé Diva Laser Software Solutions avec une mission singulière : combler le fossé numérique qui sépare des millions d'Africains des opportunités, de l'éducation et de la prospérité économique.

Les statistiques que nous observons aujourd'hui sont à la fois alarmantes et motivantes. À travers l'Afrique, l'écart numérique moyen se situe à 24,3%, mais dans de nombreux pays, particulièrement en Afrique centrale, cet écart dépasse 76%. Cela signifie que trois personnes sur quatre n'ont pas accès à Internet, à l'éducation numérique, aux services bancaires en ligne, à la télémédecine, et aux innombrables opportunités qu'offre le monde numérique. En République Démocratique du Congo seule, nous avons besoin de 12,5 milliards de dollars sur les huit prochaines années pour combler cet écart. Ce n'est pas qu'un chiffre—il représente des millions de jeunes qui ne peuvent accéder à l'apprentissage en ligne, des entrepreneurs qui ne peuvent atteindre les marchés mondiaux, et des communautés qui restent isolées de l'économie numérique.

Mais voici ce qui me motive chaque jour : je crois que la technologie est le grand égalisateur. Quand un jeune de Kinshasa peut accéder aux mêmes cours en ligne qu'une personne de la Silicon Valley, quand un agriculteur en Tanzanie rurale peut utiliser l'argent mobile pour accéder au crédit, quand un travailleur de santé en Éthiopie peut consulter des spécialistes du monde entier via la télémédecine—c'est là que nous libérons le véritable potentiel de l'Afrique.

Diva Laser Software Solutions est née de cette conviction. Nous ne construisons pas seulement des logiciels ; nous construisons des ponts. Nous créons des plateformes qui connectent les organisations à but non lucratif africaines avec des opportunités de financement, nous développons des applications qui rendent les services numériques accessibles même dans des environnements à faible bande passante, et nous formons la prochaine génération de développeurs africains qui construiront des solutions pour les problèmes africains.

Cette application de recherche de financement que vous utilisez en ce moment n'est qu'un exemple. Nous avons compilé des informations sur 15 grandes organisations de financement, suivi les activités en temps réel montrant 397 millions de dollars de financement pour 2025 seulement, et cartographié les statistiques de numérisation dans 20 pays. Mais plus important encore, nous avons rendu ces informations accessibles, consultables et exploitables pour des organisations comme la vôtre qui travaillent sur le terrain pour faire la différence.

L'opportunité qui se présente à nous est sans précédent. Avec une pénétration mobile dépassant 42% même dans les pays à faible accès Internet, avec des startups technologiques croissant à des taux dépassant 25% par an, et avec des organisations internationales engageant des milliards dans la transformation numérique africaine, nous sommes à un moment pivot. La question n'est pas de savoir si l'Afrique se numérisera—c'est de savoir si nous veillerons à ce que cette numérisation soit inclusive, équitable et véritablement transformatrice pour tous les Africains.

Je vous invite à nous rejoindre dans cette mission. Que vous cherchiez du financement pour votre projet de numérisation, que vous souhaitiez investir dans la technologie africaine, ou simplement faire partie de cette transformation, il y a une place pour vous dans ce mouvement. Ensemble, nous pouvons transformer l'écart numérique d'une barrière en un pont, d'un défi en une opportunité.

Merci pour votre temps, votre engagement et votre foi en l'avenir numérique de l'Afrique.`,
    },
  };

  const currentContent = speech[language];

  return (
    <section className="bg-gradient-to-b from-gray-900 via-blue-950 to-black py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {currentContent.title}
          </h2>
          
          {/* Language Toggle */}
          <div className="flex justify-center gap-2 mb-8">
            <Button
              onClick={() => setLanguage("en")}
              variant={language === "en" ? "default" : "outline"}
              className={language === "en" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <Globe className="w-4 h-4 mr-2" />
              English
            </Button>
            <Button
              onClick={() => setLanguage("fr")}
              variant={language === "fr" ? "default" : "outline"}
              className={language === "fr" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <Globe className="w-4 h-4 mr-2" />
              Français
            </Button>
          </div>
        </div>

        <Card className="bg-gray-900 border-yellow-700 max-w-6xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Founder Photo and Info */}
              <div className="text-center md:col-span-1">
                <div className="mb-6">
                  <img
                    src="/founder.png"
                    alt="Bertin Tshisuaka"
                    className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-yellow-500 shadow-xl"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{currentContent.name}</h3>
                <p className="text-yellow-400 font-semibold mb-2">{currentContent.role}</p>
                <p className="text-sm text-gray-300 mb-4">{currentContent.subtitle}</p>
                
                <div className="bg-gradient-to-r from-yellow-900 to-green-900 p-4 rounded-lg border border-yellow-700">
                  <div className="text-2xl font-bold text-yellow-300 mb-1">Diva Laser</div>
                  <div className="text-lg text-white">Software Solutions</div>
                  <div className="text-xs text-gray-300 mt-2">
                    {language === "en" 
                      ? "Bridging the Digital Gap in Africa" 
                      : "Combler le Fossé Numérique en Afrique"}
                  </div>
                </div>
              </div>

              {/* Speech Content */}
              <div className="md:col-span-2">
                {/* Audio Player */}
                <div className="mb-6 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-4 border border-blue-700">
                  <div className="flex items-center gap-4">
                    <Volume2 className="w-6 h-6 text-blue-300" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-300 mb-2">
                        {language === "en" ? "Listen to the speech:" : "Écoutez le discours :"}
                      </p>
                      <audio 
                        controls 
                        className="w-full"
                        key={language}
                      >
                        <source src={language === "en" ? "/speech-english.wav" : "/speech-french.wav"} type="audio/wav" />
                        {language === "en" 
                          ? "Your browser does not support the audio element." 
                          : "Votre navigateur ne prend pas en charge l'élément audio."}
                      </audio>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-gray-200 leading-relaxed whitespace-pre-line text-justify">
                      {currentContent.speech}
                    </div>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-4 rounded-lg border border-blue-700 text-center">
                    <div className="text-2xl font-bold text-blue-300">24.3%</div>
                    <div className="text-xs text-gray-300 mt-1">
                      {language === "en" ? "Avg Digital Gap" : "Écart Numérique Moyen"}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-900 to-green-950 p-4 rounded-lg border border-green-700 text-center">
                    <div className="text-2xl font-bold text-green-300">$12.5B</div>
                    <div className="text-xs text-gray-300 mt-1">
                      {language === "en" ? "DRC Investment Needed" : "Investissement Nécessaire RDC"}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-900 to-yellow-950 p-4 rounded-lg border border-yellow-700 text-center">
                    <div className="text-2xl font-bold text-yellow-300">$397M+</div>
                    <div className="text-xs text-gray-300 mt-1">
                      {language === "en" ? "2025 Funding Tracked" : "Financement 2025 Suivi"}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-900 to-purple-950 p-4 rounded-lg border border-purple-700 text-center">
                    <div className="text-2xl font-bold text-purple-300">15+</div>
                    <div className="text-xs text-gray-300 mt-1">
                      {language === "en" ? "Funding Organizations" : "Organisations de Financement"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <div className="text-center mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-900 via-green-900 to-blue-900 p-8 rounded-lg border border-yellow-700">
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">
              {language === "en" ? "Our Mission" : "Notre Mission"}
            </h3>
            <p className="text-white text-lg leading-relaxed">
              {language === "en"
                ? "To empower African organizations and communities by providing accessible technology solutions, connecting them with funding opportunities, and building the digital infrastructure necessary for sustainable economic growth and social development across the continent."
                : "Autonomiser les organisations et communautés africaines en fournissant des solutions technologiques accessibles, en les connectant avec des opportunités de financement, et en construisant l'infrastructure numérique nécessaire pour une croissance économique durable et un développement social à travers le continent."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

