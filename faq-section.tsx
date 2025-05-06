import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FAQ } from "@shared/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

interface FAQSectionProps {
  compact?: boolean;
}

export default function FAQSection({ compact = false }: FAQSectionProps) {
  const { data: faqs, isLoading, error } = useQuery<FAQ[]>({
    queryKey: ["/api/faqs"],
  });

  if (error) {
    return null;
  }

  return (
    <section className={compact ? "" : "py-16 px-4"}>
      <div className={compact ? "" : "max-w-4xl mx-auto"}>
        {!compact && (
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Perguntas Frequentes</h2>
            <p className="mt-4 text-muted-foreground">
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços.
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-muted border border-border rounded-xl overflow-hidden">
                <div className="p-4">
                  <Skeleton className="h-6 w-full" />
                </div>
                <div className="px-4 pb-4">
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {faqs?.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id.toString()}
                className="bg-muted border border-border rounded-xl overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 text-lg font-medium text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
}
