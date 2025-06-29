"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/store/store";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <main role="main">{children}</main>
    </Provider>
  );
}
