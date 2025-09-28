import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, Package } from "lucide-react";
import heroWarehouse from "@/assets/hero-warehouse.jpg";

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: Package, label: "Produits référencés", value: "500+" },
    { icon: Users, label: "Clients satisfaits", value: "200+" },
    { icon: MapPin, label: "Années d'expérience", value: "15+" },
  ];

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroWarehouse} 
          alt="Entrepôt moderne Triton West Africa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
            <MapPin className="w-4 h-4 mr-2" />
            Abidjan, Côte d'Ivoire - Afrique de l'Ouest
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Votre partenaire fiable pour l'
            <span className="bg-gradient-to-r from-orange to-turquoise bg-clip-text text-transparent">
              approvisionnement
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-light">
            Importation et distribution de produits alimentaires et pneumatiques de qualité 
            en Côte d'Ivoire et dans toute l'Afrique de l'Ouest
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={() => scrollToSection('#services')}
              className="btn-accent text-lg px-8 py-4 group"
            >
              Découvrir nos solutions
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              onClick={() => scrollToSection('#contact')}
              variant="outline"
              className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
            >
              Nous contacter
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="card-elegant bg-white/10 backdrop-blur-sm border-white/20 text-white text-center p-6"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-turquoise" />
                <div className="text-2xl font-bold font-serif mb-1">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;