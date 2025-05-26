"use client";
import { persistor, store } from "@/redux/store";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Dynamically import PersistGate to reduce initial bundle size
const DynamicPersistGate = dynamic(() => Promise.resolve(PersistGate), {
  ssr: false,
});

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial client render, only render the Provider
  if (!mounted) {
    return <Provider store={store}>{children}</Provider>;
  }

  // After hydration, render the full provider with PersistGate
  return (
    <Provider store={store}>
      <DynamicPersistGate loading={null} persistor={persistor}>
        {children}
      </DynamicPersistGate>
    </Provider>
  );
};

export default RootProvider;
