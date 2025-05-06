import { Link, useLocation } from "wouter";
import { ShoppingCart, Home, User, Users, Phone, LogOut, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getCurrentUserId, getCartFromLocalStorage } from "@/lib/cartUtils";
import { AUTH_STORAGE_KEY, USER_STORAGE_KEY } from "@/context/auth-simple-context";
import { useState, useEffect } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  nickname: string | null;
  avatar: string | null;
  phone: string | null;
}

// Função para verificar autenticação diretamente do localStorage
function getAuthStatus(): { isAuthenticated: boolean; user: User | null } {
  try {
    // Verificar token
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedAuth) return { isAuthenticated: false, user: null };
    
    const authData = JSON.parse(storedAuth);
    if (!authData || !authData.savedToken) return { isAuthenticated: false, user: null };
    
    // Verificar dados do usuário
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (!storedUser) return { isAuthenticated: false, user: null };
    
    const userData = JSON.parse(storedUser);
    return { 
      isAuthenticated: true, 
      user: userData 
    };
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    return { isAuthenticated: false, user: null };
  }
}

// Função para fazer logout
function performLogout() {
  try {
    // Remover dados do localStorage
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    
    // Notificar outros componentes
    window.dispatchEvent(new Event('storage'));
    document.dispatchEvent(new CustomEvent('authChange'));
    
    // Chamar API de logout (opcional)
    fetch('/api/logout', { method: 'POST' });
    
    // Recarregar a página para garantir atualização completa
    window.location.href = '/';
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
}

export default function MobileMenuSimple() {
  const [location, navigate] = useLocation();
  const [authState, setAuthState] = useState({ 
    isAuthenticated: false, 
    user: null as User | null 
  });
  const [cartCount, setCartCount] = useState(0);
  
  // Efeito para verificar autenticação
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = getAuthStatus();
      setAuthState(authStatus);
      
      // Atualizar contagem do carrinho
      const userId = getCurrentUserId();
      if (userId) {
        const items = getCartFromLocalStorage(userId);
        setCartCount(items.length);
      } else {
        setCartCount(0);
      }
    };
    
    checkAuth();
    
    // Verificar novamente quando o localStorage mudar
    const handleStorageChange = () => {
      checkAuth();
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
  
  // Função para fazer logout
  const handleLogout = () => {
    performLogout();
    navigate("/");
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Cabeçalho */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-primary">Menu</h2>
      </div>
      
      {/* Informações do usuário */}
      {authState.isAuthenticated && authState.user ? (
        <div className="p-4 border-b flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            {authState.user.avatar ? (
              <img src={authState.user.avatar} alt={authState.user.username} />
            ) : (
              <AvatarFallback className={`text-white ${
                authState.user.isAdmin 
                  ? 'bg-purple-600' 
                  : authState.user.email?.charAt(0).toLowerCase() <= 'h'
                    ? 'bg-green-600'
                    : authState.user.email?.charAt(0).toLowerCase() <= 'p'
                      ? 'bg-blue-600'
                      : 'bg-amber-600'
              }`}>
                {authState.user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-medium">{authState.user.username}</p>
            <p className="text-sm text-muted-foreground">{authState.user.email}</p>
          </div>
        </div>
      ) : (
        <div className="p-4 border-b">
          <Button variant="default" asChild className="w-full">
            <Link href="/login-simple">Fazer Login</Link>
          </Button>
        </div>
      )}
      
      {/* Links de navegação */}
      <div className="flex-1 overflow-auto py-2">
        <nav className="flex flex-col space-y-1">
          <Link 
            href="/" 
            className={`flex items-center px-4 py-3 text-sm ${
              location === "/" 
                ? "bg-primary/10 text-primary font-medium" 
                : "text-foreground hover:bg-muted"
            }`}
          >
            <Home className="mr-3 h-4 w-4" />
            Página Inicial
          </Link>
          
          <Link 
            href="/services" 
            className={`flex items-center px-4 py-3 text-sm ${
              location === "/services" 
                ? "bg-primary/10 text-primary font-medium" 
                : "text-foreground hover:bg-muted"
            }`}
          >
            <PanelLeft className="mr-3 h-4 w-4" />
            Serviços
          </Link>
          
          <Link 
            href="/#como-funciona" 
            className={`flex items-center px-4 py-3 text-sm ${
              location === "/#como-funciona" 
                ? "bg-primary/10 text-primary font-medium" 
                : "text-foreground hover:bg-muted"
            }`}
          >
            <Users className="mr-3 h-4 w-4" />
            Como Funciona
          </Link>
          
          <Link 
            href="/contact" 
            className={`flex items-center px-4 py-3 text-sm ${
              location === "/contact" 
                ? "bg-primary/10 text-primary font-medium" 
                : "text-foreground hover:bg-muted"
            }`}
          >
            <Phone className="mr-3 h-4 w-4" />
            Suporte
          </Link>
          
          {authState.isAuthenticated && (
            <>
              <div className="border-t my-2"></div>
              
              <Link 
                href="/profile"
                className={`flex items-center px-4 py-3 text-sm ${
                  location === "/profile" 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <User className="mr-3 h-4 w-4" />
                Meu Perfil
              </Link>
              
              {authState.user?.isAdmin && (
                <Link 
                  href="/admin"
                  className={`flex items-center px-4 py-3 text-sm ${
                    location === "/admin" 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <PanelLeft className="mr-3 h-4 w-4" />
                  Painel Admin
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
      
      {/* Rodapé */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <Link 
            href="/cart"
            className="flex items-center space-x-2 text-foreground hover:text-primary"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Carrinho</span>
            {cartCount > 0 && (
              <span className="bg-primary text-primary-foreground rounded-full text-xs px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
          
          {authState.isAuthenticated && (
            <Button 
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-100"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}