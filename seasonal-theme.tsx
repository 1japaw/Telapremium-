import { useState, useEffect, createContext, useContext } from 'react';

// Definição de tipos para os temas sazonais
export interface SeasonalTheme {
  id: string;
  name: string;
  cssClass: string;
  icon: string;
  active: boolean;
  startDate: Date;
  endDate: Date;
}

// Interface para o contexto de tema sazonal
interface SeasonalThemeContextType {
  currentTheme: SeasonalTheme | null;
  availableThemes: SeasonalTheme[];
  setActiveTheme: (themeId: string | null) => void;
  getActiveTheme: () => string | null;
}

// Criando o contexto
const SeasonalThemeContext = createContext<SeasonalThemeContextType | null>(null);

// Função para verificar se uma data está dentro de um período
const isDateInRange = (date: Date, startDate: Date, endDate: Date): boolean => {
  return date >= startDate && date <= endDate;
};

// Temas disponíveis
const availableThemes: SeasonalTheme[] = [
  {
    id: 'none',
    name: 'Sem Tema',
    cssClass: '',
    icon: '✨',
    active: true,
    startDate: new Date(2000, 0, 1),
    endDate: new Date(2100, 11, 31),
  },
  {
    id: 'christmas',
    name: 'Natal',
    cssClass: 'seasonal-theme-christmas',
    icon: '🎄',
    active: false,
    startDate: new Date(new Date().getFullYear(), 11, 1), // 1 de dezembro
    endDate: new Date(new Date().getFullYear(), 11, 25), // 25 de dezembro
  },
  {
    id: 'new-year',
    name: 'Ano Novo',
    cssClass: 'seasonal-theme-new-year',
    icon: '🎆',
    active: false,
    startDate: new Date(new Date().getFullYear(), 11, 26), // 26 de dezembro
    endDate: new Date(new Date().getFullYear(), 0, 5), // 5 de janeiro
  },
  {
    id: 'carnival',
    name: 'Carnaval',
    cssClass: 'seasonal-theme-carnival',
    icon: '🎭',
    active: false,
    startDate: new Date(new Date().getFullYear(), 1, 10), // Data aproximada
    endDate: new Date(new Date().getFullYear(), 1, 17), // Data aproximada
  },
  {
    id: 'easter',
    name: 'Páscoa',
    cssClass: 'seasonal-theme-easter',
    icon: '🐰',
    active: false,
    startDate: new Date(new Date().getFullYear(), 2, 20), // Data aproximada
    endDate: new Date(new Date().getFullYear(), 3, 10), // Data aproximada
  },
  {
    id: 'valentines',
    name: 'Dia dos Namorados',
    cssClass: 'seasonal-theme-valentines',
    icon: '❤️',
    active: false,
    startDate: new Date(new Date().getFullYear(), 5, 1), // 1 de junho
    endDate: new Date(new Date().getFullYear(), 5, 12), // 12 de junho
  },
  {
    id: 'sao-joao',
    name: 'São João',
    cssClass: 'seasonal-theme-sao-joao',
    icon: '🎆',
    active: false,
    startDate: new Date(new Date().getFullYear(), 5, 13), // 13 de junho
    endDate: new Date(new Date().getFullYear(), 5, 30), // 30 de junho
  },
  {
    id: 'blackfriday',
    name: 'Black Friday',
    cssClass: 'seasonal-theme-blackfriday',
    icon: '🛒',
    active: false,
    startDate: new Date(new Date().getFullYear(), 10, 20), // 20 de novembro
    endDate: new Date(new Date().getFullYear(), 10, 30), // 30 de novembro
  },
];

// Pegar tema do localStorage ou o padrão
const getStoredTheme = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('telapremium_active_theme');
};

// Salvar tema no localStorage
const saveThemeToStorage = (themeId: string | null): void => {
  if (typeof window === 'undefined') return;
  if (themeId) {
    localStorage.setItem('telapremium_active_theme', themeId);
  } else {
    localStorage.removeItem('telapremium_active_theme');
  }
};

// Provedor de tema sazonal
export function SeasonalThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<SeasonalTheme | null>(null);
  
  // Inicializar tema a partir do localStorage ou determinar com base na data
  useEffect(() => {
    const storedThemeId = getStoredTheme();
    
    if (storedThemeId) {
      // Usar tema salvo nas configurações
      const theme = availableThemes.find(t => t.id === storedThemeId);
      setCurrentTheme(theme || null);
    } else {
      // Determinar tema baseado na data atual
      const now = new Date();
      const automaticTheme = availableThemes.find(theme => 
        theme.active && isDateInRange(now, theme.startDate, theme.endDate)
      );
      
      // Tema padrão (sem tema)
      const defaultTheme = availableThemes.find(t => t.id === 'none');
      setCurrentTheme(automaticTheme || defaultTheme || null);
    }
  }, []);

  // Função para mudar o tema ativo
  const setActiveTheme = (themeId: string | null) => {
    // Remover classe do tema atual
    if (currentTheme) {
      document.body.classList.remove(currentTheme.cssClass);
    }

    // Aplicar novo tema
    if (themeId) {
      const newTheme = availableThemes.find(t => t.id === themeId);
      if (newTheme) {
        setCurrentTheme(newTheme);
        document.body.classList.add(newTheme.cssClass);
      } else {
        setCurrentTheme(null);
      }
    } else {
      setCurrentTheme(null);
    }

    // Salvar no localStorage
    saveThemeToStorage(themeId);
  };

  // Obter ID do tema ativo
  const getActiveTheme = (): string | null => {
    return currentTheme?.id || null;
  };

  // Aplicar classe CSS quando o tema muda
  useEffect(() => {
    if (currentTheme && currentTheme.cssClass) {
      document.body.classList.add(currentTheme.cssClass);
    }

    return () => {
      if (currentTheme && currentTheme.cssClass) {
        document.body.classList.remove(currentTheme.cssClass);
      }
    };
  }, [currentTheme]);

  const contextValue: SeasonalThemeContextType = {
    currentTheme,
    availableThemes: [...availableThemes],
    setActiveTheme,
    getActiveTheme
  };

  return (
    <SeasonalThemeContext.Provider value={contextValue}>
      {children}
    </SeasonalThemeContext.Provider>
  );
}

// Hook para usar o tema sazonal
export function useSeasonalTheme(): SeasonalThemeContextType {
  const context = useContext(SeasonalThemeContext);
  if (!context) {
    throw new Error('useSeasonalTheme deve ser usado dentro de um SeasonalThemeProvider');
  }
  return context;
}

// Componente de banner que exibe uma mensagem temática
export function SeasonalBanner() {
  const { currentTheme } = useSeasonalTheme();

  if (!currentTheme || currentTheme.id === 'none') return null;

  return (
    <div className={`seasonal-banner ${currentTheme.cssClass}`}>
      <span className="seasonal-icon">{currentTheme.icon}</span>
      <p className="seasonal-message">
        {currentTheme.id === 'christmas' && 'Feliz Natal! Aproveite nossas ofertas especiais de fim de ano!'}
        {currentTheme.id === 'new-year' && 'Feliz Ano Novo! Comece 2024 com o melhor do streaming!'}
        {currentTheme.id === 'carnival' && 'É Carnaval! Não perca a folia com nossas promoções!'}
        {currentTheme.id === 'easter' && 'Feliz Páscoa! Aproveite para maratonar seus filmes favoritos!'}
        {currentTheme.id === 'valentines' && 'Dia dos Namorados! Curta os melhores filmes românticos juntos!'}
        {currentTheme.id === 'sao-joao' && 'Festas Juninas! Venha celebrar com os melhores conteúdos!'}
        {currentTheme.id === 'blackfriday' && 'Black Friday! Os melhores preços do ano estão aqui!'}
      </p>
    </div>
  );
}