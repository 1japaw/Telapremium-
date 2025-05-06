import { ShoppingCart, CreditCard, MailCheck, Mail, Tv, Clock, ShieldCheck, HelpCircle, Smartphone, Settings } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/context/auth-context";

export default function HowItWorks() {
  const { user, isAuthenticated } = useAuth();
  return (
    <section id="como-funciona" className="py-16 px-4 bg-gradient-to-b from-background to-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Como Funciona</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprar seu acesso premium é simples, rápido e seguro. Siga os passos abaixo e comece a aproveitar.
          </p>
        </div>

        {/* Processo em etapas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0 relative mb-16">
          {/* Linha conectora (visível apenas em desktop) */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-primary/30 z-0"></div>
          
          {/* Etapa 1 */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <div className="bg-primary/20 border border-primary/40 text-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Escolha o serviço</h3>
            <p className="text-sm text-muted-foreground">Selecione o streaming que deseja assinar com grande desconto</p>
          </div>
          
          {/* Etapa 2 */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <div className="bg-primary/20 border border-primary/40 text-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Pague via Pix</h3>
            <p className="text-sm text-muted-foreground">Efetue o pagamento rápido e seguro com Pix</p>
          </div>
          
          {/* Etapa 3 */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <div className="bg-primary/20 border border-primary/40 text-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <MailCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Receba acesso</h3>
            <p className="text-sm text-muted-foreground">Seus dados de acesso são enviados automaticamente por email</p>
          </div>
          
          {/* Etapa 4 */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <div className="bg-primary/20 border border-primary/40 text-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Smartphone className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Faça login</h3>
            <p className="text-sm text-muted-foreground">Use as credenciais recebidas para acessar a plataforma</p>
          </div>
          
          {/* Etapa 5 */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <div className="bg-primary/20 border border-primary/40 text-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Tv className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Assista conteúdo</h3>
            <p className="text-sm text-muted-foreground">Aproveite todo o catálogo sem restrições</p>
          </div>
        </div>
        
        {/* Cards com detalhes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-black p-6 rounded-xl border border-white/10 relative">
            <div className="absolute -top-5 -left-5 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold shadow-lg">1</div>
            <ShieldCheck className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Garantia Total</h3>
            <p className="text-muted-foreground mb-3">Todos os serviços contam com garantia de 30 dias. Se ocorrer qualquer problema, resolvemos ou devolvemos seu dinheiro.</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <div className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                  <svg className="h-2 w-2 text-primary" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                </div>
                Reposição gratuita caso ocorra algum problema
              </li>
              <li className="flex items-start">
                <div className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                  <svg className="h-2 w-2 text-primary" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                </div>
                Devolução sem complicações
              </li>
            </ul>
          </div>

          <div className="bg-black p-6 rounded-xl border border-white/10 relative">
            <div className="absolute -top-5 -left-5 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold shadow-lg">2</div>
            <Clock className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Entrega Automática</h3>
            <p className="text-muted-foreground mb-3">Assim que confirmamos seu pagamento, nosso sistema envia automaticamente os dados de acesso para seu email ou WhatsApp.</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <div className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                  <svg className="h-2 w-2 text-primary" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                </div>
                Disponível 24 horas por dia, 7 dias por semana
              </li>
              <li className="flex items-start">
                <div className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                  <svg className="h-2 w-2 text-primary" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                </div>
                Tempo médio de entrega: menos de 5 minutos
              </li>
            </ul>
          </div>

          <div className="bg-black p-6 rounded-xl border border-white/10 relative">
            <div className="absolute -top-5 -left-5 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold shadow-lg">3</div>
            <HelpCircle className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Suporte Rápido</h3>
            <p className="text-muted-foreground mb-3">Nosso time de suporte está disponível para ajudar com quaisquer dúvidas ou problemas que você possa ter.</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <div className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                  <svg className="h-2 w-2 text-primary" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                </div>
                Suporte via WhatsApp com resposta em minutos
              </li>
              <li className="flex items-start">
                <div className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                  <svg className="h-2 w-2 text-primary" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                </div>
                FAQ completo com respostas para perguntas comuns
              </li>
            </ul>
          </div>
        </div>

        {isAuthenticated && user?.isAdmin && (
          <div className="bg-purple-900/30 rounded-xl p-6 md:p-8 mt-16 border border-purple-500/30">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-3/4 md:pr-10">
                <h3 className="text-xl md:text-2xl font-bold text-purple-300">Área de Administração</h3>
                <p className="mt-3 text-purple-200/70">Acesse o painel de administração para gerenciar serviços, contas, pedidos e mais.</p>
                <div className="mt-6">
                  <Link href="/admin">
                    <button className="flex items-center bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg transition-colors">
                      <Settings className="h-5 w-5 mr-2" />
                      Acessar Painel Administrativo
                    </button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/4 mt-8 md:mt-0 flex justify-center">
                <svg className="w-24 h-24 text-purple-300/50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        )}

        <div className="bg-muted rounded-xl p-6 md:p-8 mt-16 border border-border">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-3/4 md:pr-10">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Ainda com dúvidas?</h3>
              <p className="mt-3 text-muted-foreground">Nosso time de suporte está disponível 24/7 para te ajudar com qualquer questão.</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center bg-success/20 hover:bg-success/30 text-success px-4 py-2 rounded-lg transition-colors">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.6 6.31999C16.8 5.49999 15.8 4.89999 14.7 4.49999C13.6 4.09999 12.5 3.99999 11.3 4.09999C10.1 4.19999 9.00001 4.49999 8.00001 5.09999C7.00001 5.59999 6.10001 6.29999 5.40001 7.19999C4.70001 8.09999 4.10001 9.09999 3.80001 10.2C3.50001 11.3 3.40001 12.5 3.60001 13.7C3.80001 14.9 4.10001 16 4.80001 17C5.50001 18 6.30001 18.9 7.30001 19.5L6.20001 23L9.80001 21.9C10.8 22.4 11.9 22.7 13 22.7C14.1 22.7 15.2 22.5 16.3 22.1C17.4 21.7 18.3 21.1 19.1 20.4C19.9 19.7 20.6 18.8 21 17.8C21.4 16.8 21.7 15.7 21.7 14.6C21.7 13.5 21.5 12.4 21.1 11.3C20.7 10.3 20.3 9.39999 19.4 8.59999C18.9 7.89999 18.3 7.09999 17.6 6.31999ZM12 21.3C11.1 21.3 10.1 21.1 9.20001 20.7L8.40001 20.4L6.30001 21L6.90001 19L6.50001 18.2C6.00001 17.3 5.80001 16.4 5.70001 15.4C5.60001 14.4 5.70001 13.5 5.90001 12.6C6.10001 11.7 6.60001 10.9 7.10001 10.1C7.60001 9.39999 8.30001 8.69999 9.10001 8.19999C9.90001 7.69999 10.7 7.29999 11.5 7.09999C12.3 6.89999 13.2 6.89999 14 7.09999C14.8 7.29999 15.6 7.59999 16.3 8.09999C17 8.59999 17.6 9.09999 18.1 9.79999C18.6 10.5 18.9 11.2 19.2 12C19.5 12.8 19.5 13.7 19.5 14.5C19.5 15.3 19.3 16.2 19 17C18.7 17.8 18.2 18.5 17.7 19.1C17.2 19.7 16.5 20.2 15.8 20.6C15.1 21 14.3 21.2 13.5 21.3C13 21.3 12.5 21.3 12 21.3ZM15.9 14.5C15.8 14.4 15.6 14.3 15.4 14.3C15.2 14.3 15 14.2 14.8 14.1C14.6 14 14.4 13.9 14.2 13.8C14 13.7 13.8 13.8 13.6 13.9C13.4 14 13.4 14.2 13.4 14.4C13.4 14.6 13.3 14.8 13.1 15C13 15.2 12.8 15.2 12.6 15.1C12.4 15 12.1 14.9 11.9 14.7C11.6 14.5 11.4 14.3 11.2 14.1C10.9 13.9 10.7 13.6 10.5 13.3C10.3 13 10.3 12.8 10.3 12.5C10.3 12.2 10.4 12.1 10.6 12C10.8 11.9 10.9 11.7 11 11.6C11.1 11.5 11.1 11.3 11.1 11.1C11.1 10.9 11 10.8 10.9 10.6C10.8 10.4 10.6 10.2 10.5 9.99999C10.3 9.79999 10.2 9.69999 10 9.59999C9.80001 9.49999 9.60001 9.49999 9.40001 9.59999C9.20001 9.69999 9.00001 9.79999 8.80001 9.99999C8.60001 10.2 8.50001 10.4 8.40001 10.6C8.30001 10.8 8.20001 11.1 8.20001 11.4C8.20001 11.7 8.20001 12 8.30001 12.2C8.40001 12.5 8.50001 12.7 8.60001 12.9C8.70001 13.1 8.90001 13.4 9.10001 13.6C9.30001 13.8 9.40001 14 9.60001 14.2C9.80001 14.4 10 14.6 10.3 14.8C10.6 15 10.8 15.2 11 15.3C11.2 15.4 11.5 15.6 11.7 15.7C11.9 15.8 12.2 15.9 12.4 16C12.6 16.1 12.9 16.1 13.2 16.1C13.5 16.1 13.7 16.1 14 16C14.3 15.9 14.5 15.8 14.7 15.7C14.9 15.6 15.1 15.4 15.2 15.2C15.3 15 15.5 14.9 15.6 14.7C15.7 14.5 15.8 14.3 15.9 14.1C16 13.9 16 13.7 16 13.5C16 13.7 16 13.6 15.9 14.5Z" fill="currentColor"/>
                    </svg>
                    WhatsApp
                  </button>
                </a>
                <a href="mailto:contato@telapremium.com">
                  <button className="flex items-center bg-card hover:bg-card/90 text-foreground px-4 py-2 rounded-lg transition-colors">
                    <Mail className="h-5 w-5 mr-2" />
                    E-mail
                  </button>
                </a>
                <a href="/contact#faq">
                  <button className="flex items-center bg-card hover:bg-card/90 text-foreground px-4 py-2 rounded-lg transition-colors">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 10.5H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 13.5H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    FAQ
                  </button>
                </a>
              </div>
            </div>
            <div className="md:w-1/4 mt-8 md:mt-0 flex justify-center">
              <svg width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 14V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 9L12 4L7 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 4V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
