import { getProfile } from "@/lib/profile-data";
import type { Metadata } from "next";
import { getShortAddress } from "@/lib/formatting";

export async function generateAccountMetadata(
  address: string
): Promise<Metadata> {
  try {
    const profile = await getProfile(address);
    const name = profile?.name || getShortAddress(address);
    const bio = profile?.bio;
    const avatar = profile?.avatar;

    return {
      title: `${name} - Revnet Portfolio`,
      description:
        bio ||
        `Explore ${name}'s holdings across the Revnet ecosystem. View cash-out values, borrowable amounts, and cross-chain positions.`,
      openGraph: {
        title: `${name} - Revnet Portfolio`,
        description:
          bio ||
          `Discover ${name}'s portfolio of revnets. Track real-time cash-out values and borrowing power across multiple chains.`,
        images: avatar ? [{ url: avatar, alt: `${name}'s avatar` }] : [],
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title: `${name} - Revnet Portfolio | $REV Ecosystem`,
        description:
          bio ||
          `View ${name}'s autonomous revenue tokens and cross-chain holdings in the Revnet ecosystem. 100% transparent, governance-free value creation.`,
        images: avatar ? [avatar] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: `${getShortAddress(
        address
      )} - Revnet Portfolio | Autonomous Revenue Dashboard`,
      description: `Explore tokenized revenue streams and autonomous value creation for ${address} in the Revnet ecosystem`,
    };
  }
}
