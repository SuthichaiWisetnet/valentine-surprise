import "./globals.css";

export const metadata = {
  title: "💕 Valentine Surprise - สำหรับคนพิเศษ",
  description: "เว็บไซต์เซอร์ไพรส์วันวาเลนไทน์สำหรับคนที่คุณรัก",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Prompt:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden font-prompt">
        {children}
      </body>
    </html>
  );
}
