import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "Quels types de produits alimentaires fournissez-vous ?",
      answer: "Nous proposons une large gamme de produits alimentaires : confiseries (Hershey's, Chivito, Freegells), biscuits, snacks, boissons, conserves et produits d'épicerie fine. Tous nos produits respectent les normes internationales de qualité et de sécurité alimentaire."
    },
    {
      question: "Quelles marques de pneus proposez-vous et pour quels véhicules ?",
      answer: "Nous sommes distributeurs exclusifs de la marque Double King et partenaires de Kapsen. Notre gamme couvre tous types de véhicules : voitures particulières, utilitaires, camions et poids lourds. Nous proposons également un conseil technique personnalisé selon vos besoins spécifiques."
    },
    {
      question: "Livrez-vous uniquement à Abidjan ou dans toute la Côte d'Ivoire / Afrique de l'Ouest ?",
      answer: "Notre réseau de distribution couvre l'ensemble de la Côte d'Ivoire avec notre siège basé à Treichville, Abidjan. Nous livrons également dans plusieurs pays d'Afrique de l'Ouest grâce à nos partenaires logistiques régionaux et notre expertise du marché local."
    },
    {
      question: "Quels sont les délais de livraison habituels ?",
      answer: "Pour Abidjan et sa périphérie : 24-48h. Pour l'intérieur de la Côte d'Ivoire : 3-5 jours ouvrables. Pour les autres pays de la région : 7-14 jours selon la destination. Nous proposons également des livraisons express pour les commandes urgentes."
    },
    {
      question: "Puis-je obtenir un devis personnalisé pour mes besoins ?",
      answer: "Absolument ! Nous proposons des devis gratuits et personnalisés selon vos besoins spécifiques. Contactez-nous par téléphone, email ou via notre formulaire de contact en précisant votre secteur d'activité et vos volumes pour une réponse sous 24h."
    },
    {
      question: "Comment garantir la qualité de vos produits alimentaires (certifications, contrôle) ?",
      answer: "Nous appliquons des contrôles qualité stricts : sélection rigoureuse de nos fournisseurs, certifications HACCP et ISO, respect de la chaîne du froid, contrôles réguliers des dates de péremption et conditions de stockage optimales dans nos entrepôts climatisés."
    },
    {
      question: "Quelles sont les conditions de paiement acceptées ?",
      answer: "Nous acceptons plusieurs modes de paiement : virement bancaire, chèque d'entreprise, lettre de crédit pour les gros volumes. Pour nos clients réguliers, nous proposons des facilités de paiement avec conditions préférentielles selon l'historique de collaboration."
    },
    {
      question: "Avez-vous un catalogue produit en ligne ou imprimé à télécharger ?",
      answer: "Oui, nous mettons à disposition nos catalogues produits actualisés régulièrement. Vous pouvez télécharger nos brochures par secteur d'activité (alimentaire et pneumatiques) via notre site ou en faire la demande directement auprès de nos équipes commerciales."
    },
    {
      question: "Comment procéder pour devenir partenaire / distributeur local ?",
      answer: "Pour devenir partenaire distributeur, contactez notre service commercial avec vos références d'entreprise, zone de couverture souhaitée et capacités logistiques. Nous étudions chaque candidature et proposons des accords de partenariat adaptés avec formation et support marketing inclus."
    },
    {
      question: "Que faire en cas d'anomalie ou de retour produit / SAV ?",
      answer: "Notre service après-vente traite toute réclamation sous 48h. En cas d'anomalie : contactez-nous immédiatement avec photos et références produit. Nous gérons les retours, échanges ou remboursements selon notre politique de garantie et les conditions contractuelles en vigueur."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-turquoise mr-3" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy">
              Questions Fréquentes
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Retrouvez les réponses aux questions les plus courantes sur nos services, 
            produits et conditions de collaboration.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="card-elegant overflow-hidden transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-turquoise/20 rounded-lg"
              >
                <h3 className="text-lg font-serif font-semibold text-navy pr-4 group-hover:text-turquoise transition-colors">
                  {item.question}
                </h3>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-turquoise/10 flex items-center justify-center group-hover:bg-turquoise/20 transition-all duration-300">
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-turquoise transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-turquoise transition-transform duration-300" />
                  )}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openItems.includes(index) 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="w-full h-px bg-gradient-to-r from-turquoise/20 to-transparent mb-4"></div>
                  <p className="text-foreground/80 leading-relaxed animate-fade-in">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="card-elegant p-8 bg-gradient-to-r from-turquoise/5 to-navy/5 border-turquoise/20">
            <h3 className="text-2xl font-serif font-bold text-navy mb-4">
              Vous avez d'autres questions ?
            </h3>
            <p className="text-foreground/70 mb-6">
              Notre équipe est à votre disposition pour vous fournir toutes les informations 
              complémentaires dont vous avez besoin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-accent"
              >
                Nous contacter
              </button>
              <button 
                onClick={() => window.open('https://wa.me/2250707161830?text=Bonjour, j\'ai une question concernant vos services', '_blank')}
                className="btn-secondary bg-green-600 hover:bg-green-700 text-white"
              >
                WhatsApp direct
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;