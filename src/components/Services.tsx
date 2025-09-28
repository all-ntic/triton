import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, Award, Download } from "lucide-react";
import productBanner from "@/assets/product-banner.jpg";
import logisticsTrucks from "@/assets/logistics-trucks.jpg";

const Services = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: ShoppingCart,
      title: "Produits Alimentaires",
      subtitle: "Importation & Distribution",
      description: "Large gamme de produits alimentaires de qualité : confiseries, biscuits, boissons, conserves et produits d'épicerie fine. Nos marques partenaires incluent Hershey's, Chivito, Freegells, et bien d'autres références internationales.",
      features: [
        "Contrôle qualité strict selon les normes internationales",
        "Chaîne du froid respectée pour les produits sensibles", 
        "Certifications HACCP et ISO pour la sécurité alimentaire",
        "Réseau de distribution couvrant toute la Côte d'Ivoire",
        "Support marketing et merchandising pour nos partenaires"
      ],
      image: productBanner,
      cta: "Voir nos produits alimentaires"
    },
    {
      icon: Truck,
      title: "Pneumatiques",
      subtitle: "Importation & Distribution",
      description: "Distribution exclusive de pneumatiques Double King et autres marques reconnues pour véhicules légers, utilitaires et poids lourds. Solutions complètes pour particuliers, entreprises et professionnels du transport.",
      features: [
        "Gamme complète : tourisme, utilitaire, poids lourd",
        "Marques reconnues : Double King, Kapsen et partenaires",
        "Conseil technique personnalisé selon vos besoins",
        "Service après-vente et garantie constructeur",
        "Formation technique pour nos distributeurs"
      ],
      image: logisticsTrucks,
      cta: "Découvrir nos pneumatiques"
    }
  ];

  const advantages = [
    {
      icon: Award,
      title: "Qualité Garantie",
      description: "Sélection rigoureuse de nos fournisseurs et contrôle qualité à chaque étape"
    },
    {
      icon: Truck,
      title: "Logistique Optimisée",
      description: "Réseau de distribution efficace couvrant la Côte d'Ivoire et l'Afrique de l'Ouest"
    },
    {
      icon: ShoppingCart,
      title: "Stock Permanent",
      description: "Disponibilité garantie grâce à notre gestion prévisionnelle des stocks"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
            Nos Domaines d'Activité
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Spécialistes de l'importation et de la distribution, nous couvrons deux secteurs 
            stratégiques avec expertise et professionnalisme.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-20 mb-20">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-turquoise/10 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-turquoise" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-navy">{service.title}</h3>
                    <p className="text-turquoise font-medium">{service.subtitle}</p>
                  </div>
                </div>

                <p className="text-lg text-foreground/80 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-navy">Nos atouts :</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-turquoise mt-2 flex-shrink-0"></div>
                        <span className="text-foreground/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    onClick={() => scrollToSection('#contact')}
                    className="btn-accent"
                  >
                    {service.cta}
                  </Button>
                  <Button 
                    variant="outline"
                    className="group"
                  >
                    <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
                    Télécharger la brochure
                  </Button>
                </div>
              </div>

              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-navy/20 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Advantages */}
        <div className="bg-neutral-light rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl font-serif font-bold text-navy text-center mb-12">
            Pourquoi Choisir Triton West Africa ?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div 
                key={advantage.title}
                className="text-center group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-turquoise/10 flex items-center justify-center group-hover:bg-turquoise/20 transition-colors">
                  <advantage.icon className="w-8 h-8 text-turquoise" />
                </div>
                <h4 className="text-xl font-serif font-bold text-navy mb-3">{advantage.title}</h4>
                <p className="text-foreground/70">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-serif font-bold mb-4">
              Prêt à découvrir nos solutions ?
            </h3>
            <p className="text-xl mb-8 text-white/90">
              Contactez-nous dès maintenant pour un devis personnalisé ou une présentation de nos services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => scrollToSection('#contact')}
                className="btn-accent bg-orange hover:bg-orange/90"
              >
                Demander un devis
              </Button>
              <Button 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Voir le catalogue complet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;