import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { TanstackQueryProvider } from "@/providers/tanstackQuery/tanstackQuery.provider";
import CustomThemeProvider from "@/theme/app/theme.provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <CustomThemeProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
          <ToastContainer />
        </CustomThemeProvider>
      </body>
    </html>
  );
}
