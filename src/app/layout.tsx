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
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster position="top-center" />
            </ThemeProvider>
          </TanstackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
