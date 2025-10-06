"use client";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/AppContext/AppContext";
import ClientLayout from "./ClientLayout";

export default function ClientWrapper({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ClientLayout>{children}</ClientLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}
