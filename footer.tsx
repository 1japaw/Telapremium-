import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex-shrink-0">
              <span className="text-primary text-3xl font-bold">Tela<span className="text-secondary">premium</span></span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Oferecendo os melhores serviços de streaming com preços acessíveis desde 2020.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Serviços</h3>
            <ul className="space-y-3">
              <li><Link href="/#servicos" className="text-muted-foreground hover:text-primary transition-colors">Netflix</Link></li>
              <li><Link href="/#servicos" className="text-muted-foreground hover:text-primary transition-colors">Spotify</Link></li>
              <li><Link href="/#servicos" className="text-muted-foreground hover:text-primary transition-colors">Disney+</Link></li>
              <li><Link href="/#servicos" className="text-muted-foreground hover:text-primary transition-colors">HBO Max</Link></li>
              <li><Link href="/#servicos" className="text-muted-foreground hover:text-primary transition-colors">Amazon Prime</Link></li>
              <li><Link href="/#servicos" className="text-muted-foreground hover:text-primary transition-colors">Ver todos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Links Úteis</h3>
            <ul className="space-y-3">
              <li><Link href="/#como-funciona" className="text-muted-foreground hover:text-primary transition-colors">Como funciona</Link></li>
              <li><Link href="/contact#faq" className="text-muted-foreground hover:text-primary transition-colors">Perguntas frequentes</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Termos de serviço</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Política de privacidade</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Reembolso</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-muted-foreground">
                <Mail className="mr-3 h-5 w-5 text-primary" />
                contato@telapremium.com
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="mr-3 h-5 w-5 text-primary" />
                +55 (11) 99999-9999
              </li>
              <li className="flex items-center text-muted-foreground">
                <Clock className="mr-3 h-5 w-5 text-primary" />
                Atendimento 24/7
              </li>
            </ul>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Formas de pagamento</h3>
              <div className="flex space-x-3 mt-3">
                <div className="bg-white p-2 rounded">
                  <svg width="48" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="6" fill="white"/>
                    <path d="M24 8L13 19H35L24 8Z" fill="#32BCAD"/>
                    <path d="M13 29L24 40L35 29H13Z" fill="#32BCAD"/>
                    <path d="M13 19V29H8V19H13Z" fill="#32BCAD"/>
                    <path d="M40 19V29H35V19H40Z" fill="#32BCAD"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Telapremium. Todos os direitos reservados.</p>
          <p className="text-muted-foreground text-sm mt-3 md:mt-0">
            Desenvolvido com <span className="text-accent">❤</span> por Telapremium
          </p>
        </div>
      </div>
    </footer>
  );
}
