import { useAuth } from '@/context/auth-context';
import { useLocation } from 'wouter';
import { Button } from './ui/button';
import { User, LogOut } from 'lucide-react';

export function AuthStatus() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary rounded-full p-2 flex items-center">
          <User className="h-4 w-4" />
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-medium">{user.email}</p>
          <p className="text-xs text-muted-foreground">
            {user.isAdmin ? 'Administrador' : 'Usuário'}
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700 hover:bg-red-100"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button 
      variant="outline"
      onClick={() => navigate('/login')}
      className="flex items-center gap-2"
    >
      <User className="h-4 w-4" />
      <span className="hidden md:inline">Entrar</span>
    </Button>
  );
}

// Componente para acesso condicional (exibe conteúdo apenas se logado)
interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return fallback ? <>{fallback}</> : null;
}

// Componente para acesso administrativo (exibe conteúdo apenas para admins)
interface AdminGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AdminGuard({ children, fallback }: AdminGuardProps) {
  const { user } = useAuth();

  if (user?.isAdmin) {
    return <>{children}</>;
  }

  return fallback ? <>{fallback}</> : null;
}