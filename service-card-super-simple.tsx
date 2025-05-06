import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import { AddToCartSuperSimple } from "@/components/add-to-cart-super-simple";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCardSuperSimple({ service }: ServiceCardProps) {
  const stockStatus = service.stock && service.stock > 0 
    ? { isAvailable: true, text: "Disponível", className: "text-green-500" }
    : { isAvailable: false, text: "Esgotado", className: "text-red-500" };
    
  const discountPercentage = service.originalPrice && service.price 
    ? Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)
    : 0;

  return (
    <div className="service-card bg-black rounded-xl overflow-hidden border border-white/10 hover:border-primary/40 cursor-pointer h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
      <div className="relative">
        <div className={`h-44 bg-gradient-to-b ${service.bgColor || 'from-primary/20 to-transparent'} flex items-center justify-center`}>
          <div className={`${service.logoColor || 'text-primary'} p-5 rounded-lg`}>
            <span className="font-bold text-3xl">{service.name.split(' ')[0]}</span>
          </div>
        </div>
        
        {service.tag && (
          <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
            {service.tag}
          </div>
        )}
        
        {discountPercentage > 0 && (
          <div className="absolute -left-6 top-4 rotate-[-45deg] bg-green-500 text-white text-xs font-bold px-8 py-1 shadow-md">
            {discountPercentage}% DESCONTO
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">{service.name}</h3>
        
        <div className="mt-3 mb-3">
          <Badge 
            variant="outline" 
            className={`text-xs font-medium ${stockStatus.className}`}
          >
            {stockStatus.text}
          </Badge>
        </div>
        
        {/* Características do serviço */}
        <div className="space-y-2 my-3">
          <div className="flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-xs text-gray-300">Acesso completo a todas as categorias</span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-xs text-gray-300">Suporte técnico disponível 24/7</span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-xs text-gray-300">30 dias de garantia</span>
          </div>
        </div>
        
        {/* Preço */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm">
              {formatCurrency(service.originalPrice || 0)}
            </span>
            {discountPercentage > 0 && (
              <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                {discountPercentage}% de desconto
              </Badge>
            )}
          </div>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-bold text-white">
              {formatCurrency(service.price)}
            </span>
            <span className="text-sm font-normal text-gray-400 ml-1">/mês</span>
          </div>
          
          {/* Botão de Adicionar ao Carrinho Super Simples */}
          <div className="mt-4" onClick={(e) => e.stopPropagation()}>
            <AddToCartSuperSimple service={service} />
          </div>
          
          {/* Link para detalhes */}
          <div className="mt-2 text-center">
            <Link href={`/service/${service.id}`} className="text-sm text-primary hover:underline">
              Ver detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}