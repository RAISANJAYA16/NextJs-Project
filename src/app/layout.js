import "./globals.css";
import Header from "./component/Header";
import Footer from "./component/footer";
import AuthStoreHydration from "./component/AuthStoreHydration";
import ToastProvider from "./component/ToastProvider";
import MainLayout from "@/layouts/MainLayout";

export const metadata = {
  title: "Electro Shop",
  description: "Electro Shop Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <MainLayout>
        <AuthStoreHydration />
        <ToastProvider />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        </MainLayout>
      
      </body>
    </html>
  );
}
