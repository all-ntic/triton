import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Message envoyé !",
        description: "Nous vous contacterons dans les plus brefs délais.",
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: ""
      });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      details: ["Avenue 19, Rue 7, Zone 2", "Treichville, Abidjan", "Côte d'Ivoire"],
      color: "text-turquoise"
    },
    {
      icon: Phone,
      title: "Téléphones",
      details: ["(+225) 27 21 35 96 72", "(+225) 07 07 16 18 30"],
      color: "text-navy"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["tritontreichville@gmail.com"],
      color: "text-orange"
    },
    {
      icon: Clock,
      title: "Horaires",
      details: ["Lun - Ven : 8h00 - 17h30", "Sam : 8h00 - 12h00"],
      color: "text-turquoise"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
            Contactez-nous
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Notre équipe est à votre disposition pour répondre à vos questions 
            et vous accompagner dans vos projets d'approvisionnement.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card-elegant p-8">
            <h3 className="text-2xl font-serif font-bold text-navy mb-6">
              Envoyez-nous un message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nom complet *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="Votre nom et prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Entreprise
                  </label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Nom de votre entreprise"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Sujet *
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="Objet de votre demande"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full resize-none"
                  placeholder="Décrivez votre demande en détail..."
                />
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="btn-accent w-full group"
              >
                {isLoading ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    Envoyer le message
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div 
                key={info.title}
                className="card-elegant p-6 flex items-start space-x-4 group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-full bg-current/10 flex items-center justify-center flex-shrink-0 ${info.color}`}>
                  <info.icon className={`w-6 h-6 ${info.color}`} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold text-navy mb-2">{info.title}</h4>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-foreground/70 mb-1">{detail}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* WhatsApp Direct Contact */}
            <div className="card-elegant p-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <h4 className="text-lg font-serif font-bold text-navy mb-3">Contact WhatsApp</h4>
              <p className="text-foreground/70 mb-4">
                Pour une réponse immédiate, contactez-nous directement sur WhatsApp
              </p>
              <Button 
                onClick={() => window.open('https://wa.me/2250707161830', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Ouvrir WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-16">
          <h3 className="text-2xl font-serif font-bold text-navy text-center mb-8">
            Notre Localisation
          </h3>
          <div className="card-elegant p-2 overflow-hidden">
            <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.0589899999995!2d-4.0167!3d5.2892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ebcb1b3333333%3A0x1234567890abcdef!2sZone%202%2C%20Treichville%2C%20Abidjan%2C%20C%C3%B4te%20d'Ivoire!5e0!3m2!1sen!2s!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-4">
            Avenue 19, Rue 7, Zone 2 - Treichville, Abidjan, Côte d'Ivoire
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;