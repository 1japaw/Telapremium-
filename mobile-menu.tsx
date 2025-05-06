import { Link, useLocation } from "wouter";
import { LogOut, User, X } from "lucide-react";
import { SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import * as auth from "@/lib/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export default function MobileMenu() {
  const [location] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(auth.isLoggedIn());
  const [user, setUser] = useState(auth.getCurrentUser());
  
  // Função para fazer logout
  const handleLogout = () => {
    auth.logout();
  };
  
  // Assina para mudanças no estado de autenticação
  useEffect(() => {
    const unsubscribe = auth.onAuthChange((status) => {
      console.log("MobileMenu - Estado de autenticação:", status);
      setIsLoggedIn(status.isLoggedIn);
      setUser(status.user);
    });
    
    return unsubscribe;
  }, []);

  return (
    <div className="h-full flex flex-col">
      <SheetHeader className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <SheetTitle className="text-xl">Menu</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </div>
      </SheetHeader>
      
      <div className="flex-1 overflow-auto py-6">
        <nav className="flex flex-col items-center space-y-6">
          <SheetClose asChild>
            <Link 
              href="/" 
              className={`text-xl font-medium ${location === '/' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Início
            </Link>
          </SheetClose>
          
          <SheetClose asChild>
            <Link 
              href="/services" 
              className={`text-xl font-medium ${location === '/services' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Serviços
            </Link>
          </SheetClose>
          
          <SheetClose asChild>
            <Link 
              href="/#como-funciona" 
              className={`text-xl font-medium ${location === '/#como-funciona' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Como Funciona
            </Link>
          </SheetClose>
          
          <SheetClose asChild>
            <Link 
              href="/contact" 
              className={`text-xl font-medium ${location === '/contact' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Suporte
            </Link>
          </SheetClose>
          
          <div className="pt-6 w-full px-4">
            {isLoggedIn && user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <User className="h-6 w-6 text-primary" />
                    <Avatar className="h-10 w-10 border-2 border-primary/30">
                      <AvatarFallback
                        className={`text-white ${
                          user.isAdmin 
                            ? 'bg-purple-600' 
                            : user.email?.charAt(0).toLowerCase() <= 'h'
                              ? 'bg-green-600'
                              : user.email?.charAt(0).toLowerCase() <= 'p'
                                ? 'bg-blue-600'
                                : 'bg-amber-600'
                        }`}
                      >
                        {user.email?.substring(0, 2).toUpperCase() || "TP"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{user.email?.split('@')[0] || "Usuário"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    <Badge variant="outline" className="mt-1 bg-green-500/10 text-green-500 border-green-500/20 text-xs">
                      {user.isAdmin ? "Administrador" : "Usuário Ativo"}
                    </Badge>
                  </div>
                </div>
                
                <SheetClose asChild>
                  <Button asChild variant="default" className="w-full bg-green-600 hover:bg-green-700">
                    <Link href="/profile" className="flex items-center justify-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Meu Perfil</span>
                    </Link>
                  </Button>
                </SheetClose>
                
                {user.isAdmin && (
                  <SheetClose asChild>
                    <Button asChild variant="default" className="w-full bg-purple-700 hover:bg-purple-800">
                      <Link href="/admin" className="flex items-center justify-center gap-2">
                        <span>Painel Administrativo</span>
                      </Link>
                    </Button>
                  </SheetClose>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center p-4 border rounded-lg border-zinc-700 bg-zinc-900">
                  <div className="flex items-center gap-2">
                    <User className="h-6 w-6 text-zinc-400" />
                    <div className="relative">
                      <Avatar className="h-10 w-10 border-2 border-zinc-700">
                        <AvatarFallback className="bg-zinc-800 text-zinc-400">
                          <span className="text-base font-medium">?</span>
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 ml-4">
                    <p className="font-medium text-zinc-400">Não conectado</p>
                    <p className="text-xs text-zinc-500">Faça login para acessar sua conta</p>
                  </div>
                </div>
                
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href="/login-simple">Entrar</Link>
                  </Button>
                </SheetClose>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
