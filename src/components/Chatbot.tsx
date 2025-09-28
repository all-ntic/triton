import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, HelpCircle } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Knowledge base for RAG
  const knowledgeBase = {
    "salutation": "Bonjour ! Je suis l'assistant virtuel de Triton West Africa SARL. Comment puis-je vous aider aujourd'hui ?",
    "produits alimentaires": "Nous proposons une large gamme de produits alimentaires : confiseries (Hershey's, Chivito, Freegells), biscuits, snacks, boissons et conserves. Tous nos produits respectent les normes internationales de qualité.",
    "pneumatiques": "Nous sommes distributeurs exclusifs de Double King et partenaires de Kapsen. Notre gamme couvre voitures particulières, utilitaires et poids lourds avec conseil technique personnalisé.",
    "livraison": "Délais de livraison : Abidjan 24-48h, Côte d'Ivoire 3-5 jours, Afrique de l'Ouest 7-14 jours. Livraisons express disponibles.",
    "contact": "Vous pouvez nous joindre au (+225) 27 21 35 96 72 ou (+225) 07 07 16 18 30, par email à tritontreichville@gmail.com ou nous rendre visite Avenue 19, Rue 7, Zone 2, Treichville, Abidjan.",
    "devis": "Pour obtenir un devis personnalisé, contactez-nous en précisant vos besoins spécifiques. Nous vous répondrons sous 24h avec une proposition adaptée.",
    "qualite": "Nous appliquons des contrôles qualité stricts : certifications HACCP et ISO, respect de la chaîne du froid, sélection rigoureuse des fournisseurs.",
    "paiement": "Nous acceptons virements bancaires, chèques d'entreprise et lettres de crédit. Facilités de paiement pour clients réguliers.",
    "partenariat": "Pour devenir distributeur partenaire, contactez notre service commercial avec vos références d'entreprise et zone de couverture souhaitée."
  };

  const quickSuggestions = [
    "Voir nos services",
    "Demander un devis", 
    "Informations contact",
    "FAQ"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setMessages([{
        id: Date.now().toString(),
        type: 'bot',
        content: knowledgeBase.salutation,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length]);

  const findBestMatch = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Simple keyword matching for RAG
    if (lowerQuery.includes('produit') || lowerQuery.includes('alimentaire') || lowerQuery.includes('nourriture')) {
      return knowledgeBase["produits alimentaires"];
    }
    if (lowerQuery.includes('pneu') || lowerQuery.includes('pneumatique') || lowerQuery.includes('roue')) {
      return knowledgeBase["pneumatiques"];
    }
    if (lowerQuery.includes('livraison') || lowerQuery.includes('délai') || lowerQuery.includes('transport')) {
      return knowledgeBase["livraison"];
    }
    if (lowerQuery.includes('contact') || lowerQuery.includes('téléphone') || lowerQuery.includes('adresse')) {
      return knowledgeBase["contact"];
    }
    if (lowerQuery.includes('devis') || lowerQuery.includes('prix') || lowerQuery.includes('tarif')) {
      return knowledgeBase["devis"];
    }
    if (lowerQuery.includes('qualité') || lowerQuery.includes('certification') || lowerQuery.includes('contrôle')) {
      return knowledgeBase["qualite"];
    }
    if (lowerQuery.includes('paiement') || lowerQuery.includes('facture') || lowerQuery.includes('règlement')) {
      return knowledgeBase["paiement"];
    }
    if (lowerQuery.includes('partenaire') || lowerQuery.includes('distributeur') || lowerQuery.includes('collaboration')) {
      return knowledgeBase["partenariat"];
    }
    
    return "Je ne suis pas sûr de bien comprendre votre question. Pourriez-vous la reformuler ou souhaitez-vous que je vous redirige vers notre équipe pour une assistance personnalisée ?";
  };

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputValue.trim();
    if (!content) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate thinking time
    setTimeout(() => {
      const botResponse = findBestMatch(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    switch (suggestion) {
      case "Voir nos services":
        handleSendMessage("Quels sont vos services ?");
        break;
      case "Demander un devis":
        handleSendMessage("Comment obtenir un devis ?");
        break;
      case "Informations contact":
        handleSendMessage("Comment vous contacter ?");
        break;
      case "FAQ":
        setIsOpen(false);
        document.querySelector('#faq')?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
            isOpen ? 'bg-gray-500 hover:bg-gray-600' : 'btn-accent animate-pulse-glow'
          }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-96 bg-background border border-border rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold">Assistant Triton</h4>
                <p className="text-xs text-white/80">En ligne</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start max-w-[80%] space-x-2">
                  {message.type === 'bot' && (
                    <div className="w-6 h-6 bg-turquoise rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-turquoise text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.type === 'user' && (
                    <div className="w-6 h-6 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 max-w-[80%]">
                  <div className="w-6 h-6 bg-turquoise rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Suggestions (only show at start) */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center">Suggestions :</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickSuggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs h-8"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tapez votre message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="btn-accent px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* WhatsApp Alternative */}
            <div className="flex items-center justify-center mt-3 pt-3 border-t border-border/50">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  window.open('https://wa.me/2250707161830?text=Bonjour, je souhaite obtenir des informations sur vos services', '_blank');
                }}
                className="text-xs bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Préférez WhatsApp ?
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;