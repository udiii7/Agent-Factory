import "./globals.css";
import ChatWidget from "./components/ChatWidget";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preload the background image so it starts loading as early as possible */}
        <link rel="preload" href="/agents_factory.png" as="image" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
