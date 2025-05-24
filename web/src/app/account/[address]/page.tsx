import { AccountView } from "@/components/account-view";

interface Props {
  params: Promise<{ address: string }>;
}

export default async function AccountPage({ params }: Props) {
  const { address } = await params;

  return (
    <div className="max-w-screen-xl mx-auto">
      <AccountView address={address} />
    </div>
  );
}
