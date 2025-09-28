import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "2250707161830";
    const message = encodeURIComponent(
      "Bonjour Triton West Africa ! Je souhaite obtenir des informations sur vos services d'importation et distribution."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <Button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group animate-pulse-glow"
        style={{ 
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)' 
        }}
      >
        <MessageCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
        <span className="font-medium">WhatsApp</span>
      </Button>
    </div>
  );
};

export default WhatsAppButton;