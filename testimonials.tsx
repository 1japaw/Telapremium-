import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, StarHalf } from "lucide-react";

export default function Testimonials() {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-yellow-400 text-yellow-400" />);
    }

    return stars;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  if (error) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">O que nossos clientes dizem</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Mais de 5.000 clientes satisfeitos já aproveitam nossos serviços de streaming com preços acessíveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex text-yellow-400 mb-4">
                    {Array(5).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-4 mr-1" />
                    ))}
                  </div>
                  <Skeleton className="h-20 w-full mb-6" />
                  <div className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full mr-3" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            testimonials?.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardContent className="p-6">
                  <div className="flex text-yellow-400 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-muted-foreground mb-6">{testimonial.content}</p>
                  <div className="flex items-center">
                    <Avatar className="mr-3">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(testimonial.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Cliente desde {testimonial.customerSince}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
