import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileMenuSimple from "./mobile-menu-simple";
import { CartSimpleWidget } from "./cart-simple-widget";
import { AUTH_STORAGE_KEY, USER_STORAGE_KEY } from "@/context/auth-simple-context";

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

export default function Navbar() {
  const [location] = useLocation();
  const [authState, setAuthState] = useState({ 
    isAuthenticated: false, 
    user: null as User | null 
  });
  const [showSearch, setShowSearch] = useState(false);
  
  // Efeito para verificar autenticação
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = getAuthStatus();
      setAuthState(authStatus);
    };
    
    checkAuth();
    
    // Verificar novamente quando o localStorage mudar
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('authChange', handleStorageChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('authChange', handleStorageChange as EventListener);
    };
  }, []);
  
  // Função para fazer logout
  const handleLogout = () => {
    performLogout();
  };

  return (
    <nav className="bg-card shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary text-2xl font-bold">Tela<span className="text-secondary">premium</span></span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/" className={`${location === '/' ? 'text-foreground border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground border-transparent border-b-2 hover:border-secondary'} px-1 pt-1 inline-flex items-center text-sm font-medium`}>
                Início
              </Link>
              <Link href="/services" className={`${location === '/services' ? 'text-foreground border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground border-transparent border-b-2 hover:border-secondary'} px-1 pt-1 inline-flex items-center text-sm font-medium`}>
                Serviços
              </Link>
              <Link href="/#como-funciona" className={`${location === '/#como-funciona' ? 'text-foreground border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground border-transparent border-b-2 hover:border-secondary'} px-1 pt-1 inline-flex items-center text-sm font-medium`}>
                Como Funciona
              </Link>
              <Link href="/contact" className={`${location === '/contact' ? 'text-foreground border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground border-transparent border-b-2 hover:border-secondary'} px-1 pt-1 inline-flex items-center text-sm font-medium`}>
                Suporte
              </Link>
            </div>
          </div>
          
          {/* Status do usuário - Visível apenas em dispositivos móveis */}
          {authState.isAuthenticated && authState.user ? (
            <div className="md:hidden flex items-center ml-2">
              <div className="flex items-center gap-1 bg-primary/20 rounded-full px-2 py-1">
                <User className="h-4 w-4 text-primary" />
                <Avatar className="h-5 w-5">
                  <AvatarFallback 
                    className={`text-white text-xs ${
                      authState.user.isAdmin 
                        ? 'bg-purple-600' 
                        : authState.user.email?.charAt(0).toLowerCase() <= 'h'
                          ? 'bg-green-600'
                          : authState.user.email?.charAt(0).toLowerCase() <= 'p'
                            ? 'bg-blue-600'
                            : 'bg-amber-600'
                    }`}
                  >
                    {authState.user.email ? authState.user.email.substring(0, 1).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          ) : (
            <div className="md:hidden flex items-center ml-2">
              <div className="flex items-center gap-1 bg-zinc-800 rounded-full px-2 py-1">
                <User className="h-4 w-4 text-zinc-400" />
                <span className="text-xs font-medium text-zinc-400">?</span>
              </div>
            </div>
          )}

          <div className="flex items-center">
            {showSearch ? (
              <div className="relative mr-2">
                <Input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="h-9 w-48"
                  autoFocus
                  onBlur={() => setShowSearch(false)} 
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowSearch(false)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="bg-muted mr-3 text-muted-foreground hover:text-foreground"
                onClick={() => setShowSearch(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Carrinho de Compras Simplificado */}
            <CartSimpleWidget />

            {/* Menu de usuário */}
            <div className="hidden md:block">
              {authState.isAuthenticated && authState.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 rounded-full">
                      <Avatar className="h-8 w-8">
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
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{authState.user.username}</p>
                        <p className="text-sm text-muted-foreground">{authState.user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Meu Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/my-purchases">Minhas Compras</Link>
                    </DropdownMenuItem>
                    {authState.user.isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Painel Admin</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600 focus:bg-red-100 focus:text-red-700" 
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="default" asChild>
                  <Link href="/login-simple">Entrar</Link>
                </Button>
              )}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <MobileMenuSimple />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
