import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { getCartItemCount, getCartTotal } from "@/lib/cart-direct";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";

export function CartWidgetDirect() {
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);
  
  // Atualizar estado quando o carrinho mudar
  useEffect(() => {
    const updateCart = () => {
      setItemCount(getCartItemCount());
      setTotal(getCartTotal());
    };
    
    // Atualizar no carregamento
    updateCart();
    
    // Ouvir eventos de mudança no carrinho
    document.addEventListener('cartChanged', updateCart);
    
    return () => {
      document.removeEventListener('cartChanged', updateCart);
    };
  }, []);
  
  return (
    <Link href="/checkout">
      <Button 
        variant="outline" 
        className="relative h-9 overflow-visible"
        aria-label="Carrinho de compras"
      >
        <ShoppingCart className="h-4 w-4" />
        {itemCount > 0 && (
          <>
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {itemCount}
            </span>
            <span className="ml-2 hidden md:inline-flex">
              {formatCurrency(total)}
            </span>
          </>
        )}
      </Button>
    </Link>
  );
}