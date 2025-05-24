import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-background py-16">
      <div className="mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 max-w-screen-xl mx-auto">
          {/* 1 — Revnet */}
          <div className="space-y-4">
            <h3 className="font-medium">Revnet</h3>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link
                target="_blank"
                href="https://www.revnet.app"
                className="hover:underline"
              >
                Website
              </Link>
              <Link
                target="_blank"
                href="https://app.revnet.eth.sucks"
                className="hover:underline"
              >
                Dapp
              </Link>
              <Link
                target="_blank"
                href="https://rev.eth.sucks/memo"
                className="hover:underline"
              >
                Memo
              </Link>
              <Link
                target="_blank"
                href="https://blog.revnet.app"
                className="hover:underline"
              >
                Blog
              </Link>
            </nav>
          </div>

          {/* 2 — Juicebox */}
          <div className="space-y-4">
            <h3 className="font-medium">Juicebox</h3>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link
                target="_blank"
                href="https://juicebox.money"
                className="hover:underline"
              >
                Website
              </Link>
              <Link
                target="_blank"
                href="https://docs.juicebox.money"
                className="hover:underline"
              >
                Docs
              </Link>
              <Link
                target="_blank"
                href="https://discord.com/invite/juicebox"
                className="hover:underline"
              >
                Discord
              </Link>
              <Link
                target="_blank"
                href="https://github.com/jbx-protocol"
                className="hover:underline"
              >
                GitHub
              </Link>
            </nav>
          </div>

          {/* 3 — Community */}
          <div className="space-y-4">
            <h3 className="font-medium">Community</h3>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link
                target="_blank"
                href="https://discord.com/invite/vhVxwh8aD9"
                className="hover:underline"
              >
                Revnet Discord
              </Link>
              <Link
                target="_blank"
                href="https://t.me/revnet_eth"
                className="hover:underline"
              >
                Telegram
              </Link>
              <Link
                target="_blank"
                href="https://warpcast.com/~/channel/revnet"
                className="hover:underline"
              >
                Farcaster
              </Link>
            </nav>
          </div>

          {/* 4 — Developers */}
          <div className="space-y-4">
            <h3 className="font-medium">Developers</h3>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link
                target="_blank"
                href="https://github.com/rev-net/revnet-core"
                className="hover:underline"
              >
                Core Contracts
              </Link>
              <Link
                target="_blank"
                href="https://github.com/rev-net/revnet-app"
                className="hover:underline"
              >
                Frontend
              </Link>
              <Link
                target="_blank"
                href="https://github.com/cobuildwithus/revnet-dashboard"
                className="hover:underline"
              >
                Dashboard
              </Link>
              <Link
                target="_blank"
                href="https://github.com/rev-net"
                className="hover:underline"
              >
                Org Repos
              </Link>
            </nav>
          </div>

          {/* 5 — Support & Help */}
          <div className="space-y-4">
            <h3 className="font-medium">Help</h3>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link
                target="_blank"
                href="https://github.com/cobuildwithus/revnet-dashboard/issues"
                className="hover:underline"
              >
                Report an Issue
              </Link>
              <Link
                target="_blank"
                href="https://warpcast.com/rocketman"
                className="hover:underline"
              >
                Contact @rocketman
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
