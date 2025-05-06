import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/cart-context-new';
import { Service } from '@shared/schema';

interface AddToCartButtonProps {
  service: Service;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  showText?: boolean;
}

export function AddToCartButton({ 
  service,
  size = 'default',
  variant = 'default',
  showText = true
}: AddToCartButtonProps) {
  const [, navigate] = useLocation();
  const { addToCart, isInCart } = useCart();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [alreadyInCart, setAlreadyInCart] = useState(isInCart(service.id));

  // Atualiza o estado quando o isInCart muda
  useEffect(() => {
    setAlreadyInCart(isInCart(service.id));
  }, [isInCart, service.id]);

  const handleAddToCart = () => {
    console.log("Status de login:", isAuthenticated);
    
    // Verifica se está logado
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login para adicionar itens ao carrinho.",
      });
      
      // Redireciona para a página de login simplificada
      navigate("/login-simple");
      return;
    }

    // Se já estiver no carrinho, não faz nada
    if (alreadyInCart) {
      toast({
        title: "Item já no carrinho",
        description: `${service.name} já está no seu carrinho.`,
      });
      return;
    }

    // Adiciona ao carrinho
    addToCart(service);
    setAlreadyInCart(true);
  };

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleAddToCart}
      className={alreadyInCart ? "bg-green-600 hover:bg-green-700" : ""}
      // Nunca desativa o botão para permitir o redirecionamento para login
    >
      {alreadyInCart ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          {showText && "No carrinho"}
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {showText && "Adicionar ao carrinho"}
        </>
      )}
    </Button>
  );
}