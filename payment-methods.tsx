import { Card, CardContent } from "@/components/ui/card";

export default function PaymentMethods() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-3 rounded-md">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="6" fill="white"/>
              <path d="M24 8L13 19H35L24 8Z" fill="#32BCAD"/>
              <path d="M13 29L24 40L35 29H13Z" fill="#32BCAD"/>
              <path d="M13 19V29H8V19H13Z" fill="#32BCAD"/>
              <path d="M40 19V29H35V19H40Z" fill="#32BCAD"/>
            </svg>
          </div>
          <div>
            <h4 className="font-medium">Pix</h4>
            <p className="text-sm text-muted-foreground">Pagamento instantâneo</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
