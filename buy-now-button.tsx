import { ShoppingBag } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "@/hooks/use-toast";
import { Service } from "@shared/schema";
import { Button } from "@/components/ui/button";

// Interfaces
interface BuyNowButtonProps {
  service: Service;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  showText?: boolean;
}

// Componente de botão Comprar Agora
export function BuyNowButton({ 
  service, 
  size = 'default', 
  variant = 'secondary',
  showText = true
}: BuyNowButtonProps) {
  const [, navigate] = useLocation();
  
  const handleBuyNow = () => {
    // Verificação de autenticação através do localStorage
    const authData = localStorage.getItem('telapremium_auth_simple');
    
    if (!authData) {
      console.log("⚠️ Usuário não autenticado");
      toast({
        title: "Erro ao comprar",
        description: "Você precisa estar logado para comprar.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Verificar o ID do usuário
      const userData = localStorage.getItem('telapremium_user_data');
      if (!userData) {
        throw new Error("Dados do usuário não encontrados");
      }
      
      const user = JSON.parse(userData);
      const userId = user.id;
      
      if (!userId) {
        throw new Error("ID do usuário não encontrado");
      }
      
      // Adicionar apenas este item ao carrinho - usar o formato correto
      // que o checkout espera (com quantidade)
      const cartItem = [{
        id: service.id,
        name: service.name,
        price: service.price,
        description: service.description,
        bgColor: service.bgColor,
        logoColor: service.logoColor,
        tag: service.tag,
        originalPrice: service.originalPrice,
        stock: service.stock,
        quantity: 1
      }];
      
      console.log("Item que será adicionado ao carrinho:", cartItem);
      
      // Salvar em todas as chaves possíveis para garantir compatibilidade
      localStorage.setItem(`telapremium_cart_simple_${userId}`, JSON.stringify(cartItem));
      localStorage.setItem('telapremium_cart_simple', JSON.stringify(cartItem));
      localStorage.setItem('telapremium_cart_direct', JSON.stringify(cartItem));
      
      // Disparar evento para notificar outros componentes
      document.dispatchEvent(new CustomEvent('cartUpdated'));
      
      toast({
        title: "Processando...",
        description: "Redirecionando para pagamento",
      });
      
      // Redirecionar para checkout unificado
      setTimeout(() => {
        navigate('/unified-checkout');
      }, 500);
      
    } catch (error) {
      console.error("Erro ao processar compra:", error);
      toast({
        title: "Erro",
        description: "Não foi possível processar a compra. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleBuyNow}
      className="w-full mt-2"
    >
      <ShoppingBag className={`h-4 w-4 ${showText ? 'mr-2' : ''}`} />
      {showText && 'Comprar agora'}
    </Button>
  );
}