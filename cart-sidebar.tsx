import { Fragment } from "react";
import { Link } from "wouter";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart-context-new";
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

export default function CartSidebar() {
  const { cartItems, removeFromCart, clearCart, subtotal } = useCart();

  return (
    <div className="h-full flex flex-col">
      <SheetHeader className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <SheetTitle>
            Seu Carrinho ({cartItems.length})
          </SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </div>
      </SheetHeader>

      {cartItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Seu carrinho está vazio</h3>
          <p className="text-muted-foreground text-center mb-6">
            Adicione itens ao carrinho para continuar com a compra.
          </p>
          <SheetClose asChild>
            <Button asChild>
              <Link href="/services">Ver serviços</Link>
            </Button>
          </SheetClose>
        </div>
      ) : (
        <Fragment>
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b border-border">
                <div className="flex items-center">
                  <div className={`bg-gradient-to-r ${item.bgColor} text-white p-2 rounded-lg mr-3`}>
                    <span className="font-bold">{item.name.split(' ')[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">1 mês</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-foreground mr-4">{formatCurrency(item.price)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-background border-t border-border p-4">
            <div className="flex justify-between mb-3">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-bold">{formatCurrency(subtotal)}</span>
            </div>
            
            <SheetClose asChild>
              <Button asChild className="w-full mb-2">
                <Link href="/checkout" className="flex items-center justify-center">
                  Finalizar compra
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </SheetClose>
            
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                <Link href="/services">
                  Continuar comprando
                </Link>
              </Button>
            </SheetClose>
          </div>
        </Fragment>
      )}
    </div>
  );
}
