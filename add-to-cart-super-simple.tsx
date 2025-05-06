import { ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Service } from "@shared/schema";
import { Button } from "@/components/ui/button";

// Interfaces
interface AddToCartButtonProps {
  service: Service;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  showText?: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Funções utilitárias locais para o carrinho
function getCartItems(): CartItem[] {
  try {
    // Tentar todos os formatos de carrinho possíveis
    const cartKeys = [
      'telapremium_cart_direct',
      'telapremium_cart_simple',
      'telapremium_cart_simple_1' // Para usuário com ID 1
    ];
    
    // Verificar cada chave
    for (const key of cartKeys) {
      const cartJson = localStorage.getItem(key);
      if (cartJson) {
        const parsedCart = JSON.parse(cartJson);
        console.log(`🛒 Encontrado carrinho na chave ${key}:`, parsedCart);
        
        // Converter para o formato CartItem se for array de Service
        if (Array.isArray(parsedCart)) {
          if (parsedCart.length > 0 && 'price' in parsedCart[0]) {
            // Se parece com um array de objetos Service
            return parsedCart.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: 1
            }));
          }
          return parsedCart; // Já está no formato CartItem
        }
      }
    }
  } catch (error) {
    console.error("Erro ao carregar carrinho:", error);
  }
  return [];
}

function saveCartItems(items: CartItem[]): void {
  try {
    // Salvar em todas as chaves conhecidas para garantir compatibilidade
    localStorage.setItem('telapremium_cart_direct', JSON.stringify(items));
    localStorage.setItem('telapremium_cart_simple', JSON.stringify(items));
    localStorage.setItem('telapremium_cart_simple_1', JSON.stringify(items));
    
    // Disparar evento para notificar outros componentes
    document.dispatchEvent(new CustomEvent('cartUpdated'));
    
    console.log("✅ Carrinho salvo em todas as chaves:", items);
  } catch (error) {
    console.error("Erro ao salvar carrinho:", error);
  }
}

function addToCart(service: Service): void {
  const items = getCartItems();
  
  // Verifica se o item já existe no carrinho
  const existingItemIndex = items.findIndex(item => item.id === service.id);
  
  if (existingItemIndex >= 0) {
    // Item já existe, incrementa a quantidade
    items[existingItemIndex].quantity += 1;
  } else {
    // Item não existe, adiciona novo
    items.push({
      id: service.id,
      name: service.name,
      price: service.price,
      quantity: 1
    });
  }
  
  saveCartItems(items);
}

function isInCart(serviceId: number): boolean {
  const items = getCartItems();
  return items.some(item => item.id === serviceId);
}

// Componente de botão
export function AddToCartSuperSimple({ 
  service, 
  size = 'default', 
  variant = 'default',
  showText = true
}: AddToCartButtonProps) {
  
  const handleAddToCart = () => {
    // Verificação de autenticação através do localStorage
    const authData = localStorage.getItem('telapremium_auth_simple');
    
    if (!authData) {
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
      const serviceExists = isInCart(service.id);
      
      if (serviceExists) {
        toast({
          title: "Serviço já no carrinho",
          description: `${service.name} já está no seu carrinho`,
          variant: "default",
        });
        return;
      }
      
      // Adicionar ao carrinho usando as funções locais
      addToCart(service);
      
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