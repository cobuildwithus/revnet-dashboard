import { AccountView } from "@/components/account-view";
import { generateAccountMetadata } from "./metadata";
import { getAccountData } from "@/lib/queries/account-data";
import { resolveAddressOrEns } from "@/lib/address-utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ addressOrEns: string }>;
}

async function resolveToAddress(addressOrEns: string): Promise<string> {
  const resolvedAddress = await resolveAddressOrEns(addressOrEns);

  if (!resolvedAddress) {
    notFound();
  }

  return resolvedAddress;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { addressOrEns } = await params;
  const address = await resolveToAddress(addressOrEns);
  return generateAccountMetadata(address);
}

export default async function AccountPage({ params }: Props) {
  const { addressOrEns } = await params;
  const address = await resolveToAddress(addressOrEns);

  // Fetch account data server-side
  const accountData = await getAccountData(address);

  return (
    <div className="max-w-screen-xl mx-auto">
      <AccountView address={address} data={accountData} />
    </div>
  );
}
