import { Card, CardContent } from "@/components/ui/card";

interface AccountStatsProps {
  totalCashOutValue: number;
  totalBorrowableAmount: number;
  totalRevnets: number;
}

export function AccountStats({
  totalCashOutValue,
  totalBorrowableAmount,
  totalRevnets,
}: AccountStatsProps) {
  const cashOutValueEth = totalCashOutValue / 1e18;
  const borrowableAmountEth = totalBorrowableAmount / 1e18;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <Card>
        <CardContent>
          <div className="text-sm font-medium text-muted-foreground">
            Net worth
          </div>
          <div className="mt-1 text-2xl font-bold text-primary">
            Ξ {cashOutValueEth.toFixed(4)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="text-sm font-medium text-muted-foreground">
            Borrowable
          </div>
          <div className="mt-1 text-2xl font-bold text-primary">
            Ξ {borrowableAmountEth.toFixed(4)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="text-sm font-medium text-muted-foreground">
            Revnets
          </div>
          <div className="mt-1 text-2xl font-bold text-primary">
            {totalRevnets}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
