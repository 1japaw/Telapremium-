import { Service } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addToCart, isAuthenticated } from "@/lib/cart-direct";
import { useState, useEffect } from "react";

interface CartButtonProps {
  service: Service;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  showText?: boolean;
}

export function CartButtonDirect({
  service,
  size = 'default',
  variant = 'default',
  showText = true
}: CartButtonProps) {
  const { toast } = useToast();
  const [count, setCount] = useState(0);
  
  // Forçar atualização quando carrinho mudar
  useEffect(() => {
    const handleCartChange = () => {
      // Apenas incrementar contador para forçar re-renderização
      setCount(prev => prev + 1);
    };
    
    document.addEventListener('cartChanged', handleCartChange);
    
    return () => {
      document.removeEventListener('cartChanged', handleCartChange);
    };
  }, []);
  
  // Função para adicionar ao carrinho
  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      toast({
        title: "Erro ao adicionar",
        description: "Você precisa estar logado para adicionar itens ao carrinho.",
        variant: "destructive",
      });
      return;
    }
    
    const success = addToCart(service);
    
    if (success) {
      toast({
        title: "Adicionado ao carrinho",
        description: `${service.name} foi adicionado ao seu carrinho.`,
        variant: "default",
      });
    } else {
      toast({
        title: "Erro ao adicionar",
        description: "Ocorreu um erro ao adicionar o item ao carrinho.",
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