"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const REGION_ALL = "All";
export const DEPARTMENT_ALL = "All Department";
export const PRODUCT_ALL = "All Products";

export const REGION_OPTIONS = [
  "All",
  "North America",
  "EMEA",
  "APAC",
] as const;

export const DEPARTMENT_OPTIONS = [
  "All Department",
  "Intake",
  "Sales",
  "Engineering",
  "Operations",
  "Collaborative review",
  "Commercial",
] as const;

export const PRODUCT_OPTIONS = [
  "All Products",
  "Quickflange",
  "Techwrap",
] as const;

export type RegionFilter = (typeof REGION_OPTIONS)[number];
export type DepartmentFilter = (typeof DEPARTMENT_OPTIONS)[number];
export type ProductFilter = (typeof PRODUCT_OPTIONS)[number];

type DashboardFiltersValue = {
  region: RegionFilter;
  department: DepartmentFilter;
  product: ProductFilter;
  setRegion: (v: RegionFilter) => void;
  setDepartment: (v: DepartmentFilter) => void;
  setProduct: (v: ProductFilter) => void;
  clearFilters: () => void;
  clearRegion: () => void;
  clearDepartment: () => void;
  clearProduct: () => void;
  activeCount: number;
  scopeLabel: string | null;
  regionActive: boolean;
  departmentActive: boolean;
  productActive: boolean;
};

const DashboardFiltersContext = createContext<DashboardFiltersValue | null>(
  null,
);

export function DashboardFiltersProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<RegionFilter>(REGION_ALL);
  const [department, setDepartment] =
    useState<DepartmentFilter>(DEPARTMENT_ALL);
  const [product, setProduct] = useState<ProductFilter>(PRODUCT_ALL);

  const value = useMemo<DashboardFiltersValue>(() => {
    const regionActive = region !== REGION_ALL;
    const departmentActive = department !== DEPARTMENT_ALL;
    const productActive = product !== PRODUCT_ALL;
    const activeCount =
      Number(regionActive) + Number(departmentActive) + Number(productActive);

    const parts: string[] = [];
    if (regionActive) parts.push(region);
    if (departmentActive) parts.push(department);
    if (productActive) parts.push(product);

    return {
      region,
      department,
      product,
      setRegion,
      setDepartment,
      setProduct,
      clearFilters: () => {
        setRegion(REGION_ALL);
        setDepartment(DEPARTMENT_ALL);
        setProduct(PRODUCT_ALL);
      },
      clearRegion: () => setRegion(REGION_ALL),
      clearDepartment: () => setDepartment(DEPARTMENT_ALL),
      clearProduct: () => setProduct(PRODUCT_ALL),
      activeCount,
      scopeLabel: parts.length ? parts.join(" · ") : null,
      regionActive,
      departmentActive,
      productActive,
    };
  }, [region, department, product]);

  return (
    <DashboardFiltersContext.Provider value={value}>
      {children}
    </DashboardFiltersContext.Provider>
  );
}

export function useDashboardFilters() {
  const ctx = useContext(DashboardFiltersContext);
  if (!ctx) {
    throw new Error(
      "useDashboardFilters must be used within DashboardFiltersProvider",
    );
  }
  return ctx;
}
