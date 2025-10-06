"use client";

import { usePathname } from "next/navigation";

import PageLayout from "./PageLayout";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideSidebarRoutes = ["/login", "/signup"];
  const shouldHideSidebar = hideSidebarRoutes.includes(pathname);

  return shouldHideSidebar ? (
    <div className="w-full">{children}</div>
  ) : (
    <PageLayout>{children}</PageLayout>
  );
}
