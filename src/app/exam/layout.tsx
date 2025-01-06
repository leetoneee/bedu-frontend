import { ExamProvider } from '@/providers';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ExamProvider>
      <div>{children}</div>
    </ExamProvider>
  );
}
