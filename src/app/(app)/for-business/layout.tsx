
import ForBusinessWithBackgroundLayoutClient from './layout-client';

export default function ForBusinessWithBackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ForBusinessWithBackgroundLayoutClient>
      {children}
    </ForBusinessWithBackgroundLayoutClient>
  );
}
