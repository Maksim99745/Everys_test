import type { ReactNode } from 'react';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';

interface DefaultLayoutProps {
  children: ReactNode;
}

/** Шаблон по умолчанию: Header + контент + Footer. Можно добавить другие Layout для разных страниц. */
export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
