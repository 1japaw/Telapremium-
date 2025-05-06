import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CTASection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Pronto para economizar?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl">
                Comece agora mesmo a aproveitar seus serviços de streaming favoritos por uma fração do preço original.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/#servicos" className="flex items-center">
                    Ver planos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="bg-transparent border-white/20 hover:bg-white/10">
                  <Link href="/contact">
                    Falar com suporte
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              <div className="bg-white p-3 rounded-xl">
                <span className="font-bold text-2xl text-red-600">NETFLIX</span>
              </div>
              <div className="bg-black p-3 rounded-xl">
                <span className="font-bold text-2xl text-green-500">Spotify</span>
              </div>
              <div className="bg-blue-900 p-3 rounded-xl">
                <span className="font-bold text-2xl text-white">Disney+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
