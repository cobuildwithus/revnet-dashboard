import { AccountView } from "@/components/account-view";
import { generateAccountMetadata } from "./metadata";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ address: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { address } = await params;
  return generateAccountMetadata(address);
}

export default async function AccountPage({ params }: Props) {
  const { address } = await params;

  return (
    <div className="max-w-screen-xl mx-auto">
      <AccountView address={address} />
    </div>
  );
}
