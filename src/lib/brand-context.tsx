"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getBrands, getActiveBrandId, setActiveBrandId, type Brand } from "./store";

interface BrandContextType {
  brands: Brand[];
  activeBrand: Brand | null;
  setActiveBrand: (id: string) => void;
  refreshBrands: () => void;
}

const BrandContext = createContext<BrandContextType>({
  brands: [],
  activeBrand: null,
  setActiveBrand: () => {},
  refreshBrands: () => {},
});

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [activeBrand, setActive] = useState<Brand | null>(null);

  const refreshBrands = useCallback(() => {
    const all = getBrands();
    setBrands(all);
    const activeId = getActiveBrandId();
    const found = all.find((b) => b.id === activeId) || all[0] || null;
    setActive(found);
    if (found && !activeId) {
      setActiveBrandId(found.id);
    }
  }, []);

  useEffect(() => {
    refreshBrands();
  }, [refreshBrands]);

  const handleSetActiveBrand = useCallback(
    (id: string) => {
      setActiveBrandId(id);
      const found = brands.find((b) => b.id === id) || null;
      setActive(found);
    },
    [brands]
  );

  return (
    <BrandContext.Provider
      value={{
        brands,
        activeBrand,
        setActiveBrand: handleSetActiveBrand,
        refreshBrands,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  return useContext(BrandContext);
}
