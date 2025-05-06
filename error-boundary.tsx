import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Componente de limite de erro que captura erros em qualquer componente filho
 * e exibe uma interface amigável para o usuário em vez de quebrar a aplicação inteira.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  static getDerivedStateFromError(error: Error): State {
    // Atualiza o state para que a próxima renderização mostre a UI alternativa
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Adiciona logs do erro para análise posterior
    console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  // Método para tentar novamente 
  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  // Método para voltar para a página inicial
  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Renderiza um fallback personalizado ou o padrão
      if (fallback) {
        return fallback;
      }

      // UI padrão de erro
      return (
        <div className="flex items-center justify-center min-h-[50vh] p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="bg-destructive/10 rounded-t-lg">
              <CardTitle className="flex items-center text-destructive">
                <AlertCircle className="h-5 w-5 mr-2" />
                Oops! Algo deu errado
              </CardTitle>
              <CardDescription>
                Encontramos um problema ao carregar esta parte do site.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Você pode tentar recarregar esta parte ou voltar para a página inicial.
              </p>
              {process.env.NODE_ENV === 'development' && error && (
                <div className="bg-muted p-3 rounded-md text-xs font-mono overflow-auto max-h-32">
                  {error.toString()}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
              <Button variant="outline" onClick={this.handleGoHome}>
                Voltar ao início
              </Button>
              <Button onClick={this.handleRetry}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar novamente
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;