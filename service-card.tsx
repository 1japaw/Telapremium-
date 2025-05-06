import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShoppingCart, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import { formatCurrency, getStockStatus, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/context/cart-context-new";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Service } from "@shared/schema";
import { useAuth } from "@/context/auth-context";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { addToCart, isInCart } = useCart();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const { isAuthenticated, user } = useAuth();
  
  const stockStatus = getStockStatus(service.stock);
  const discountPercentage = service.originalPrice ? calculateDiscount(service.originalPrice, service.price) : 0;
  const isAlreadyInCart = isInCart(service.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!stockStatus.isAvailable) return;
    
    // Verificar se o usuário está autenticado
    if (!isAuthenticated || !user) {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar",
        description: "Você precisa estar logado para adicionar itens ao carrinho.",
      });
      // Redirecionar para a página de login
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }
    
    // Adicionar ao carrinho usando o context
    // O toast já é mostrado dentro da função addToCart
    addToCart(service);
  };
  
  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!stockStatus.isAvailable) return;
    
    // Verificar se o usuário está autenticado
    if (!isAuthenticated || !user) {
      toast({
        variant: "destructive",
        title: "Erro ao comprar",
        description: "Você precisa estar logado para fazer uma compra.",
      });
      // Redirecionar para a página de login
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }
    
    // Se não estiver no carrinho, adicionar primeiro
    if (!isAlreadyInCart) {
      addToCart(service);
    }
    
    // Navegar para o checkout
    console.log("Redirecionando para checkout do card");
    navigate("/checkout?fromBuyNow=true");
  };

  return (
    <Link href={`/service/${service.id}`}>
      <div className="service-card bg-black rounded-xl overflow-hidden border border-white/10 hover:border-primary/40 cursor-pointer h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
        <div className="relative">
          <div className={`h-44 bg-gradient-to-b ${service.bgColor || 'from-primary/20 to-transparent'} flex items-center justify-center`}>
            <div className={`${service.logoColor || 'text-primary'} p-5 rounded-lg`}>
              <span className="font-bold text-3xl">{service.name.split(' ')[0]}</span>
            </div>
          </div>
          
          {service.tag && (
            <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              {service.tag}
            </div>
          )}
          
          {discountPercentage > 0 && (
            <div className="absolute -left-6 top-4 rotate-[-45deg] bg-green-500 text-white text-xs font-bold px-8 py-1 shadow-md">
              {discountPercentage}% DESCONTO
            </div>
          )}
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">{service.name}</h3>
          
          <div className="mt-3 mb-3">
            <Badge 
              variant="outline" 
              className={`text-xs font-medium ${stockStatus.className}`}
            >
              {stockStatus.text}
            </Badge>
          </div>
          
          {/* Características do serviço */}
          <div className="space-y-2 my-3">
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-xs text-gray-300">Acesso completo a todas as categorias</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-xs text-gray-300">Suporte técnico disponível 24/7</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-xs text-gray-300">30 dias de garantia</span>
            </div>
          </div>
          
          {/* Preço */}
          <div className="mt-auto pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through text-sm">
                {formatCurrency(service.originalPrice)}
              </span>
              {discountPercentage > 0 && (
                <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                  {discountPercentage}% de desconto
                </Badge>
              )}
            </div>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold text-white">
                {formatCurrency(service.price)}
              </span>
              <span className="text-sm font-normal text-gray-400 ml-1">/mês</span>
            </div>
            
            {/* Botões */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button 
                variant="outline"
                size="sm"
                className="w-full border-white/10 hover:border-primary/50 hover:bg-primary/10"
                onClick={handleAddToCart}
                disabled={!stockStatus.isAvailable || isAlreadyInCart}
              >
                {isAlreadyInCart ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    No carrinho
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Carrinho
                  </>
                )}
              </Button>
              <Button 
                size="sm"
                className="w-full"
                onClick={handleBuyNow}
                disabled={!stockStatus.isAvailable}
              >
                <ArrowRight className="h-4 w-4 mr-1" />
                Comprar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
