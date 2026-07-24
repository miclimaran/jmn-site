"use client";

import * as React from "react";

export type InquiryItem = { code: string; name: string };

const STORAGE_KEY = "jmn-inquiry-list";

type InquiryListContextValue = {
  items: InquiryItem[];
  addItem: (item: InquiryItem) => void;
  removeItem: (code: string) => void;
  clear: () => void;
  isInList: (code: string) => boolean;
};

const InquiryListContext = React.createContext<InquiryListContextValue | null>(null);

export function InquiryListProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<InquiryItem[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupt/unavailable storage
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = React.useCallback((item: InquiryItem) => {
    setItems((prev) => (prev.some((i) => i.code === item.code) ? prev : [...prev, item]));
  }, []);

  const removeItem = React.useCallback((code: string) => {
    setItems((prev) => prev.filter((i) => i.code !== code));
  }, []);

  const clear = React.useCallback(() => setItems([]), []);

  const isInList = React.useCallback(
    (code: string) => items.some((i) => i.code === code),
    [items]
  );

  const value = React.useMemo(
    () => ({ items, addItem, removeItem, clear, isInList }),
    [items, addItem, removeItem, clear, isInList]
  );

  return (
    <InquiryListContext.Provider value={value}>{children}</InquiryListContext.Provider>
  );
}

export function useInquiryList() {
  const ctx = React.useContext(InquiryListContext);
  if (!ctx) {
    throw new Error("useInquiryList must be used within InquiryListProvider");
  }
  return ctx;
}
