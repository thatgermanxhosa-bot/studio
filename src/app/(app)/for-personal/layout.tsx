
import ForPersonalWithBackgroundLayoutClient from './layout-client';

export default function ForPersonalWithBackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ForPersonalWithBackgroundLayoutClient>
      {children}
    </ForPersonalWithBackgroundLayoutClient>
  );
}
