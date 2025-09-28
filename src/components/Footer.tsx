import { MapPin, Phone, Mail, Facebook, Linkedin, Instagram } from "lucide-react";
import tritonLogo from "@/assets/triton-logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: "Accueil", href: "#accueil" },
    { name: "À propos", href: "#apropos" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
    { name: "FAQ", href: "#faq" }
  ];

  const services = [
    "Produits Alimentaires",
    "Pneumatiques",
    "Distribution",
    "Importation",
    "Conseil Technique"
  ];

  const legalLinks = [
    "Mentions Légales",
    "Politique de Confidentialité",
    "Conditions Générales",
    "Politique de Retour"
  ];

  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={tritonLogo} 
                alt="Triton West Africa SARL" 
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-serif font-bold">Triton West Africa</h3>
                <p className="text-sm text-white/70">SARL</p>
              </div>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Votre partenaire fiable pour l'importation et la distribution de produits 
              alimentaires et pneumatiques en Côte d'Ivoire et Afrique de l'Ouest depuis plus de 15 ans.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-turquoise transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-turquoise transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-turquoise transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/80 hover:text-turquoise transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Nos Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white/80">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-turquoise mt-1 flex-shrink-0" />
                <div className="text-white/80">
                  <p>Avenue 19, Rue 7, Zone 2</p>
                  <p>Treichville, Abidjan</p>
                  <p>Côte d'Ivoire</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-turquoise flex-shrink-0" />
                <div className="text-white/80">
                  <p>(+225) 27 21 35 96 72</p>
                  <p>(+225) 07 07 16 18 30</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-turquoise flex-shrink-0" />
                <a 
                  href="mailto:tritontreichville@gmail.com"
                  className="text-white/80 hover:text-turquoise transition-colors duration-300"
                >
                  tritontreichville@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-white/70">
                © {currentYear} Triton West Africa SARL. Tous droits réservés.
              </p>
              <p className="text-sm text-white/50 mt-1">
                Société à Responsabilité Limitée - RCCM Abidjan
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {legalLinks.map((link, index) => (
                <button
                  key={link}
                  className="text-sm text-white/70 hover:text-turquoise transition-colors duration-300"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Credit */}
      <div className="bg-navy/90 border-t border-white/5">
        <div className="container mx-auto px-4 py-3">
          <p className="text-center text-xs text-white/50">
            Site web conçu avec excellence pour Triton West Africa SARL
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;