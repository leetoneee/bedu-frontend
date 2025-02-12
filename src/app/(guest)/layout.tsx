import { Footer, NavHeader } from '@/components';
import TypeProvider from '@/providers/TypeProvider';

export default function GuestLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TypeProvider>
      <div>
        <NavHeader />
        <div className="mt-0.5 flex">
          <div className="w-full overflow-x-auto bg-b-primary">
            <div className="overflow-auto sm:h-[calc(99vh-60px)]">
              <div className="h-[calc(100vh - 120px)] relative mx-auto flex w-full justify-center overflow-auto overflow-y-auto">
                <div className="w-full">
                  {children} <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TypeProvider>
  );
}
