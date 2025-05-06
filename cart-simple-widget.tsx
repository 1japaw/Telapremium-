import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getCurrentUserId, getCartFromLocalStorage } from "@/lib/cartUtils";
import { Service } from "@shared/schema";
import { AUTH_STORAGE_KEY, USER_STORAGE_KEY } from "@/context/auth-simple-context";

// Função para verificar autenticação diretamente do localStorage
function getAuthStatus(): { isAuthenticated: boolean; userId: number | null } {
  try {
    // Verificar token
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedAuth) return { isAuthenticated: false, userId: null };
    
    const authData = JSON.parse(storedAuth);
    if (!authData || !authData.savedToken) return { isAuthenticated: false, userId: null };
    
    // Verificar dados do usuário
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (!storedUser) return { isAuthenticated: false, userId: null };
    
    const userData = JSON.parse(storedUser);
    return { 
      isAuthenticated: true, 
      userId: userData.id 
    };
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    return { isAuthenticated: false, userId: null };
  }
}

export function CartSimpleWidget() {
  const [authState, setAuthState] = useState({ 
    isAuthenticated: false, 
    userId: null as number | null 
  });
  const [cartItems, setCartItems] = useState<Service[]>([]);
  
  // Atualizar carrinho quando mudar autenticação ou localStorage
  const updateCart = () => {
    const auth = getAuthStatus();
    setAuthState(auth);
    
    if (auth.isAuthenticated && auth.userId) {
      const items = getCartFromLocalStorage(auth.userId);
      setCartItems(items);
    } else {
      setCartItems([]);
    }
  };
  
  // Carregar itens do carrinho
  useEffect(() => {
    updateCart();
    
    // Configurar listener para mudanças no localStorage
    const handleStorageChange = () => {
      updateCart();
    };
    
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('authChange', handleStorageChange as EventListener);
    document.addEventListener('cartUpdated', handleStorageChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('authChange', handleStorageChange as EventListener);
      document.removeEventListener('cartUpdated', handleStorageChange as EventListener);
    };
  }, []);
  
  // Calcular total do carrinho
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);
  
  // Renderizar conteúdo do carrinho
  const CartContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-primary">Carrinho</h2>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-center text-muted-foreground">Seu carrinho está vazio</p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/services">Ver serviços</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-auto py-2">
            <div className="space-y-2 px-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description.substring(0, 50)}...</p>
                  </div>
                  <div className="text-right ml-4">
                    <span className="font-medium text-primary">R$ {item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center justify-between py-2">
              <span className="font-medium">Total:</span>
              <span className="font-bold text-primary">R$ {cartTotal.toFixed(2)}</span>
            </div>
            <Button asChild className="w-full mt-2 mb-2">
              <Link href="/unified-checkout">Checkout rápido (PIX)</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/checkout">Checkout normal</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-muted mr-3 text-muted-foreground hover:text-foreground relative"
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
              {cartItems.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0">
        <CartContent />
      </SheetContent>
    </Sheet>
  );
}