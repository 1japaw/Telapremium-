import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Star, StarHalf, CheckCircle, Clock, ArrowRight, Send, PlayCircle, Plus } from "lucide-react";
import { SiNetflix, SiSpotify, SiHbo, SiYoutube, SiPrime, SiCrunchyroll } from "react-icons/si";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  // Mapeamento de nomes para IDs de serviço corretos
  const serviceMap = {
    'Netflix': 25,       // Netflix no seu Email - Perfil Extra
    'Spotify': 27,       // Spotify Premium 1 Mês
    'Disney+': 22,       // Conta Completa - Disney Plus
    'HBO Max': 1,        // HBO Max Compartilhada
    'YouTube': 17,       // Youtube Premium
    'Prime': 2,          // Prime Video Compartilhada
    'Crunchyroll': 4     // Crunchyroll Compartilhada
  };
  
  // Função para redirecionar para a página de detalhes do serviço
  const goToServiceDetails = (e: React.MouseEvent, serviceName: string) => {
    e.preventDefault();
    const serviceId = serviceMap[serviceName as keyof typeof serviceMap];
    if (serviceId) {
      window.location.href = `/service/${serviceId}`;
    } else {
      window.location.href = "/checkout?keepOpen=true";
    }
  };

  return (
    <section className="py-8 md:py-12 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Main Hero Content */}
        <div className="flex flex-col items-center text-center mb-6">
          <img 
            src="/logo.png" 
            alt="TelaPremium Logo" 
            className="mb-4 w-32 h-32 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/150/333/fff?text=TELAPREMIUM";
            }}
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
            Streaming <span className="text-primary">Premium</span> por Preços Acessíveis
          </h1>
          <p className="text-md md:text-lg text-gray-400 max-w-3xl mb-6">
            Tenha acesso a plataformas de streaming por uma fração do preço original, com pagamento via Pix e entrega automática e imediata.
          </p>
        </div>

        {/* Ratings and Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 pt-2 border-t border-white/10 w-full max-w-2xl mx-auto mb-8">
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-2">
              <Star className="h-5 w-5 fill-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400" />
              <StarHalf className="h-5 w-5 fill-yellow-400" />
            </div>
            <span className="text-white font-medium">4.8</span>
            <span className="text-gray-400 ml-1">(+5.000 clientes)</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-purple-500 mr-2" />
            <span className="text-white">Entrega imediata 24/7</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-white">100% Seguro</span>
          </div>
        </div>

        {/* Streaming Service Grid - New Design */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
          {/* Netflix */}
          <div 
            className="flex flex-col items-center justify-center bg-black rounded-xl border border-[#e50914]/30 p-4 hover:border-[#e50914] transition-all duration-300 cursor-pointer"
            onClick={(e) => goToServiceDetails(e, "Netflix")}
          >
            <div className="bg-[#e50914]/10 p-4 rounded-full mb-3">
              <SiNetflix className="text-[#e50914] h-10 w-10" />
            </div>
            <span className="text-white text-base font-medium mb-1">Netflix</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through text-xs">R$39,90</span>
              <span className="text-white font-bold">R$20,00</span>
            </div>
            <Badge className="mt-1 text-xs bg-green-500/10 text-green-500 border-green-500/30">-50%</Badge>
          </div>

          {/* Spotify */}
          <div 
            className="flex flex-col items-center justify-center bg-black rounded-xl border border-[#1ed760]/30 p-4 hover:border-[#1ed760] transition-all duration-300 cursor-pointer"
            onClick={(e) => goToServiceDetails(e, "Spotify")}
          >
            <div className="bg-[#1ed760]/10 p-4 rounded-full mb-3">
              <SiSpotify className="text-[#1ed760] h-10 w-10" />
            </div>
            <span className="text-white text-base font-medium mb-1">Spotify</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through text-xs">R$11,90</span>
              <span className="text-white font-bold">R$5,00</span>
            </div>
            <Badge className="mt-1 text-xs bg-green-500/10 text-green-500 border-green-500/30">-58%</Badge>
          </div>

          {/* Disney+ */}
          <div 
            className="flex flex-col items-center justify-center bg-black rounded-xl border border-[#0063e5]/30 p-4 hover:border-[#0063e5] transition-all duration-300 cursor-pointer"
            onClick={(e) => goToServiceDetails(e, "Disney+")}
          >
            <div className="bg-[#0063e5]/10 p-4 rounded-full mb-3">
              <PlayCircle className="text-[#0063e5] h-10 w-10" />
            </div>
            <span className="text-white text-base font-medium mb-1">Disney+</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through text-xs">R$22,90</span>
              <span className="text-white font-bold">R$9,00</span>
            </div>
            <Badge className="mt-1 text-xs bg-green-500/10 text-green-500 border-green-500/30">-61%</Badge>
          </div>

          {/* HBO Max */}
          <div 
            className="flex flex-col items-center justify-center bg-black rounded-xl border border-[#5822b4]/30 p-4 hover:border-[#5822b4] transition-all duration-300 cursor-pointer"
            onClick={(e) => goToServiceDetails(e, "HBO Max")}
          >
            <div className="bg-[#5822b4]/10 p-4 rounded-full mb-3">
              <SiHbo className="text-[#5822b4] h-10 w-10" />
            </div>
            <span className="text-white text-base font-medium mb-1">HBO Max</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through text-xs">R$4,90</span>
              <span className="text-white font-bold">R$1,50</span>
            </div>
            <Badge className="mt-1 text-xs bg-green-500/10 text-green-500 border-green-500/30">-70%</Badge>
          </div>

          {/* YouTube */}
          <div 
            className="flex flex-col items-center justify-center bg-black rounded-xl border border-[#FF0000]/30 p-4 hover:border-[#FF0000] transition-all duration-300 cursor-pointer"
            onClick={(e) => goToServiceDetails(e, "YouTube")}
          >
            <div className="bg-[#FF0000]/10 p-4 rounded-full mb-3">
              <SiYoutube className="text-[#FF0000] h-10 w-10" />
            </div>
            <span className="text-white text-base font-medium mb-1">YouTube</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through text-xs">R$9,90</span>
              <span className="text-white font-bold">R$4,00</span>
            </div>
            <Badge className="mt-1 text-xs bg-green-500/10 text-green-500 border-green-500/30">-60%</Badge>
          </div>

          {/* Prime */}
          <div 
            className="flex flex-col items-center justify-center bg-black rounded-xl border border-[#00A8E1]/30 p-4 hover:border-[#00A8E1] transition-all duration-300 cursor-pointer"
            onClick={(e) => goToServiceDetails(e, "Prime")}
          >
            <div className="bg-[#00A8E1]/10 p-4 rounded-full mb-3">
              <SiPrime className="text-[#00A8E1] h-10 w-10" />
            </div>
            <span className="text-white text-base font-medium mb-1">Prime</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through text-xs">R$4,90</span>
              <span className="text-white font-bold">R$1,50</span>
            </div>
            <Badge className="mt-1 text-xs bg-green-500/10 text-green-500 border-green-500/30">-70%</Badge>
          </div>

          {/* Crunchyroll */}
          <div 
            className="flex flex-col items-center justify-center bg-black rounded-xl border border-[#f47521]/30 p-4 hover:border-[#f47521] transition-all duration-300 cursor-pointer"
            onClick={(e) => goToServiceDetails(e, "Crunchyroll")}
          >
            <div className="bg-[#f47521]/10 p-4 rounded-full mb-3">
              <SiCrunchyroll className="text-[#f47521] h-10 w-10" />
            </div>
            <span className="text-white text-base font-medium mb-1">Crunchyroll</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through text-xs">R$4,90</span>
              <span className="text-white font-bold">R$1,50</span>
            </div>
            <Badge className="mt-1 text-xs bg-green-500/10 text-green-500 border-green-500/30">-70%</Badge>
          </div>

          {/* E outros */}
          <div 
            className="flex flex-col items-center justify-center bg-black rounded-xl border border-purple-500/30 p-4 hover:border-purple-500 transition-all duration-300 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/services";
            }}
          >
            <div className="bg-purple-500/10 p-4 rounded-full mb-3">
              <Plus className="text-purple-500 h-10 w-10" />
            </div>
            <span className="text-white text-base font-medium mb-1">E outros</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">Ver mais</span>
            </div>
            <Badge className="mt-1 text-xs bg-purple-500/10 text-purple-500 border-purple-500/30">+10</Badge>
          </div>
        </div>

        {/* WhatsApp Contact Button */}
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            asChild
            size="lg"
            className="text-base font-medium border-white/20 hover:bg-white/5"
          >
            <Link href="#contato">
              <Send className="mr-2 h-5 w-5" />
              Fale pelo WhatsApp
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}