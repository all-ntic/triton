import { CheckCircle, Target, Heart, Zap, Shield, Handshake } from "lucide-react";
import teamEvent from "@/assets/team-event.jpg";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Fiabilité",
      description: "Des partenariats solides et une constance dans la qualité de nos services"
    },
    {
      icon: Heart,
      title: "Intégrité",
      description: "Transparence et honnêteté dans toutes nos relations commerciales"
    },
    {
      icon: Zap,
      title: "Réactivité",
      description: "Réponses rapides aux besoins de nos clients et adaptation au marché"
    },
    {
      icon: CheckCircle,
      title: "Qualité",
      description: "Sélection rigoureuse de nos produits et contrôle de nos standards"
    },
    {
      icon: Handshake,
      title: "Proximité",
      description: "Accompagnement personnalisé et relation de confiance durable"
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Amélioration continue de nos services et dépassement des attentes"
    }
  ];

  const milestones = [
    { year: "2009", event: "Création de Triton West Africa SARL" },
    { year: "2012", event: "Expansion dans la distribution alimentaire" },
    { year: "2016", event: "Développement de la branche pneumatiques" },
    { year: "2020", event: "Modernisation de nos infrastructures" },
    { year: "2024", event: "Plus de 500 références produits" }
  ];

  return (
    <section id="apropos" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
            À propos de Triton West Africa
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Depuis plus de 15 ans, nous sommes le partenaire de confiance des entreprises 
            ivoiriennes et ouest-africaines pour leurs approvisionnements stratégiques.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif font-bold text-navy mb-4">Notre Mission</h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Faciliter l'accès aux produits alimentaires et pneumatiques de qualité 
                en Afrique de l'Ouest en offrant des solutions d'importation et de 
                distribution fiables, adaptées aux besoins spécifiques du marché local.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-serif font-bold text-navy mb-4">Notre Vision</h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Devenir le leader régional de la distribution spécialisée, reconnu 
                pour son expertise, sa réactivité et son engagement envers l'excellence 
                opérationnelle et le développement économique de l'Afrique de l'Ouest.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-navy mb-4">Notre Engagement</h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Contribuer au développement économique de la Côte d'Ivoire et de la région 
                en garantissant un approvisionnement constant, des prix compétitifs et 
                un service client d'exception.
              </p>
            </div>
          </div>

          <div className="relative">
            <img 
              src={teamEvent} 
              alt="Équipe Triton West Africa lors d'un événement"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-navy/20 to-transparent"></div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-serif font-bold text-navy text-center mb-12">
            Nos Valeurs Fondamentales
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="card-elegant p-6 text-center group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-turquoise/10 flex items-center justify-center group-hover:bg-turquoise/20 transition-colors">
                  <value.icon className="w-8 h-8 text-turquoise" />
                </div>
                <h4 className="text-xl font-serif font-bold text-navy mb-3">{value.title}</h4>
                <p className="text-foreground/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-serif font-bold text-navy text-center mb-12">
            Notre Parcours
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-turquoise/30 hidden md:block"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className="relative flex items-center space-x-8 animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-turquoise rounded-full flex items-center justify-center text-white font-bold hidden md:flex">
                    {milestone.year}
                  </div>
                  
                  {/* Content */}
                  <div className="card-elegant p-6 flex-1 ml-0 md:ml-0">
                    <div className="flex items-center mb-2 md:hidden">
                      <span className="bg-turquoise text-white px-3 py-1 rounded-full text-sm font-bold mr-4">
                        {milestone.year}
                      </span>
                    </div>
                    <p className="text-lg font-medium text-foreground">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;