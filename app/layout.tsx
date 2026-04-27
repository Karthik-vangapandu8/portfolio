import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Karthik | Developer",
  description: "Portfolio of Karthik - Software Engineer & Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 pt-20 pb-10">
            {children}
          </main>
          <footer className="container-narrow py-10 border-t text-sm text-muted-foreground flex justify-between items-center">
            <p>© {new Date().getFullYear()} Karthik</p>
            <div className="flex gap-4">
              <a href="https://x.com" className="hover:text-foreground">X</a>
              <a href="https://github.com" className="hover:text-foreground">GitHub</a>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
