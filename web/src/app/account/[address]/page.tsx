import { AccountView } from "@/components/AccountView";

interface Props {
  params: Promise<{ address: string }>;
}

export default async function AccountPage({ params }: Props) {
  const { address } = await params;

  return <AccountView address={address} />;
}
