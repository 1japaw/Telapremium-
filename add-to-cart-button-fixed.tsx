import { ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Service } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-simple-context";
import { useCart } from "@/context/cart-simple-context";

interface AddToCartButtonProps {
  service: Service;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  showText?: boolean;
}

export function AddToCartButtonFixed({ 
  service, 
  size = 'default', 
  variant = 'default',
  showText = true
}: AddToCartButtonProps) {
  const { isAuthenticated, user } = useAuth();
  const { addItem, items } = useCart();
  
  const handleAddToCart = () => {
    // Verificação de autenticação
    if (!isAuthenticated || !user) {
      console.log("⚠️ Usuário não autenticado");
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