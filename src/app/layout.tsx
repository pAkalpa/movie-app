import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "#/lib/utils";
import { ThemeProvider } from "#/components/providers/themeProvider";
import { Toaster } from "sonner";
import TanstackProvider from "#/components/providers/tanstackProvider";
import "./globals.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthProvider from "#/components/providers/authProvider";
import SearchProvider from "#/lib/context/search-context";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Next.js Movie App",
  description: "Movie App built with Next.js by @pAkalpa",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>
          <TanstackProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <SearchProvider>
                <main className="flex flex-col min-h-screen">
                  <div className="flex flex-col flex-1 bg-muted/50">
                    {children}
                  </div>
                </main>
              </SearchProvider>
              <Toaster position="top-center" />
            </ThemeProvider>
          </TanstackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
