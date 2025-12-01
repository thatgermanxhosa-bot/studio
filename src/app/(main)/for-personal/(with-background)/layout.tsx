
'use client';

export default function ForPersonalWithBackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen text-foreground">
      <main className="flex-1 pt-24">{children}</main>
    </div>
  );
}
