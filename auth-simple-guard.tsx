import { Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { AUTH_STORAGE_KEY, USER_STORAGE_KEY } from "@/context/auth-simple-context";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Função para verificar autenticação diretamente do localStorage
// Isso evita dependência circular no contexto de autenticação
function checkIsAuthenticated(): { isAuthenticated: boolean; isAdmin: boolean } {
  try {
    // Verificar token
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedAuth) return { isAuthenticated: false, isAdmin: false };
    
    const authData = JSON.parse(storedAuth);
    if (!authData || !authData.savedToken) return { isAuthenticated: false, isAdmin: false };
    
    // Verificar dados do usuário
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (!storedUser) return { isAuthenticated: false, isAdmin: false };
    
    const userData = JSON.parse(storedUser);
    return { 
      isAuthenticated: true, 
      isAdmin: !!userData.isAdmin 
    };
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    return { isAuthenticated: false, isAdmin: false };
  }
}

export function AuthSimpleGuard({ children, fallback }: AuthGuardProps) {
  const [authState, setAuthState] = useState({ 
    isAuthenticated: false, 
    isAdmin: false, 
    isLoading: true 
  });
  const [, setLocation] = useLocation();
  const [checkCount, setCheckCount] = useState(0);
  
  // Efeito para verificar autenticação
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = checkIsAuthenticated();
      setAuthState({ 
        ...authStatus, 
        isLoading: false 
      });
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
  
  // Contador para verificar autenticação múltiplas vezes (evitar falsos negativos)
  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated && checkCount < 3) {
      const timer = setTimeout(() => {
        const authStatus = checkIsAuthenticated();
        setAuthState({ 
          ...authStatus, 
          isLoading: false 
        });
        setCheckCount(prev => prev + 1);
      }, 500); // Pequeno delay entre verificações
      
      return () => clearTimeout(timer);
    }
  }, [authState.isLoading, authState.isAuthenticated, checkCount]);
  
  // Se ainda estiver carregando ou verificando, mostra spinner
  if (authState.isLoading || (checkCount < 3 && !authState.isAuthenticated)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // Se não estiver autenticado após verificações, retorna o fallback
  if (!authState.isAuthenticated) {
    // Se não tem fallback, redireciona para login
    if (!fallback) {
      setLocation("/login-simple");
      return null;
    }
    
    // Caso contrário, mostra o fallback (geralmente página de login)
    return <>{fallback}</>;
  }
  
  // Se autenticado, mostra o conteúdo normal
  return <>{children}</>;
}

interface AdminGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AdminSimpleGuard({ children, fallback }: AdminGuardProps) {
  const [authState, setAuthState] = useState({ 
    isAuthenticated: false, 
    isAdmin: false, 
    isLoading: true 
  });
  const [, setLocation] = useLocation();
  const [checkCount, setCheckCount] = useState(0);
  
  // Efeito para verificar autenticação
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = checkIsAuthenticated();
      setAuthState({ 
        ...authStatus, 
        isLoading: false 
      });
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
  
  // Contador para verificar autenticação múltiplas vezes (evitar falsos negativos)
  useEffect(() => {
    if (!authState.isLoading && (!authState.isAuthenticated || !authState.isAdmin) && checkCount < 3) {
      const timer = setTimeout(() => {
        const authStatus = checkIsAuthenticated();
        setAuthState({ 
          ...authStatus, 
          isLoading: false 
        });
        setCheckCount(prev => prev + 1);
      }, 500); // Pequeno delay entre verificações
      
      return () => clearTimeout(timer);
    }
  }, [authState.isLoading, authState.isAuthenticated, authState.isAdmin, checkCount]);
  
  // Se ainda estiver carregando ou verificando, mostra spinner
  if (authState.isLoading || (checkCount < 3 && (!authState.isAuthenticated || !authState.isAdmin))) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // Se não estiver autenticado como admin, retorna o fallback
  if (!authState.isAuthenticated || !authState.isAdmin) {
    // Se não tem fallback, redireciona para login
    if (!fallback) {
      setLocation("/login-simple");
      return null;
    }
    
    // Caso contrário, mostra o fallback (geralmente página de erro ou login)
    return <>{fallback}</>;
  }
  
  // Se autenticado como admin, mostra o conteúdo normal
  return <>{children}</>;
}