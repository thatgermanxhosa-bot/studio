
'use client';

export default function ForBusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-20 flex flex-col min-h-screen">
        <main className="flex-1 pt-16">{children}</main>
    </div>
  );
}
