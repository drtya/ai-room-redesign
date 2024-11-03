import { ReactNode } from 'react';
import Header from './_components/header';

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div className="pt-10 px-10 md:px-20 lg:px-40">{children}</div>
    </div>
  );
}

export default DashboardLayout;
