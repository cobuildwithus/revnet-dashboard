import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CopyableAddress } from "@/components/copyable-address";

interface AccountHeaderProps {
  address: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
}

export function AccountHeader({
  address,
  displayName,
  avatarUrl,
  bio,
}: AccountHeaderProps) {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <Avatar className={bio ? "size-20" : "size-16"}>
        {avatarUrl && <AvatarImage src={avatarUrl} alt="Avatar" />}
        <AvatarFallback className={bio ? "text-xl" : "text-lg"}>
          {displayName.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          {displayName}
        </h1>
        <CopyableAddress
          address={address}
          className="text-sm text-muted-foreground"
        />
        {bio && (
          <p className="text-sm text-muted-foreground mt-1 break-words max-w-md">
            {bio}
          </p>
        )}
      </div>
    </div>
  );
}
