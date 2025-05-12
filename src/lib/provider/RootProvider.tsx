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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Provider store={store}>{children}</Provider>;
  }

  return (
    <Provider store={store}>
      <DynamicPersistGate loading={null} persistor={persistor}>
        {children}
      </DynamicPersistGate>
    </Provider>
  );
};

export default RootProvider;
