import { ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Service } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-simple-context";
import { useCart } from "@/context/cart-simple-context";
import { canAddToCart, getCurrentUserId } from "@/lib/cartUtils";

interface AddToCartButtonProps {
  service: Service;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  showText?: boolean;
}

export function AddToCartSimpleButton({ 
  service, 
  size = 'default', 
  variant = 'default',
  showText = true
}: AddToCartButtonProps) {
  const { isAuthenticated, user } = useAuth();
  const { addItem, items } = useCart();
  
  // Verificar se o usuário está autenticado de forma mais robusta
  const handleAddToCart = () => {
    // Verificação tripla para garantir que usuário está autenticado
    if (!isAuthenticated || !user) {
      console.log("✅ Verificação 1: usuário não autenticado via context");
      toast({
        title: "Erro ao adicionar",
        description: "Você precisa estar logado para adicionar itens ao carrinho.",
        variant: "destructive",
      });
      return;
    }
    
    // Segunda verificação usando a função externa
    const userId = getCurrentUserId();
    if (!userId) {
      console.log("✅ Verificação 2: userId não encontrado via localStorage");
      toast({
        title: "Erro ao adicionar",
        description: "Você precisa estar logado para adicionar itens ao carrinho.",
        variant: "destructive",
      });
      return;
    }
    
    // Terceira verificação usando a função helper
    if (!canAddToCart()) {
      console.log("✅ Verificação 3: canAddToCart retornou false");
      toast({
        title: "Erro ao adicionar",
        description: "Você precisa estar logado para adicionar itens ao carrinho.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Verificar se o serviço já está no carrinho
      const serviceExists = items.some(item => item.id === service.id);
      
      if (serviceExists) {
        toast({
          title: "Serviço já no carrinho",
          description: `${service.name} já está no seu carrinho`,
          variant: "default",
        });
        return;
      }
      
      // Adicionar ao carrinho usando a função do contexto
      addItem(service);
      
      toast({
        title: "Adicionado ao carrinho",
        description: `${service.name} foi adicionado ao seu carrinho`,
        variant: "default",
      });
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar ao carrinho. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleAddToCart}
      className="w-full mt-2"
    >
      <ShoppingCart className={`h-4 w-4 ${showText ? 'mr-2' : ''}`} />
      {showText && 'Adicionar ao carrinho'}
    </Button>
  );
}