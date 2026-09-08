import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '두 가족이 만나는 날',
  description: '상견례를 위한 신랑·신부 소개와 결혼 준비 이야기',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
