import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

type DataItem = { id: number; value: number; color: string };
type Filter = { value: number | null; color: string | null };

const values = [0, 1, 2, 3, 4];
const colors = ["red", "green", "pink", "purple"];

let id = 1;
const data: DataItem[] = [];

for (const value of values) {
  for (const color of colors) {
    for (let i = 0; i < 100; i++) {
      data.push({ id: id++, value, color });
    }
  }
}

interface GalleryContextProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  filteredData: DataItem[];
  restart: () => void;
}

const GalleryContext = createContext<GalleryContextProps | undefined>(
  undefined
);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filter, setFilter] = useState<Filter>({ value: null, color: null });

  const filteredData = useMemo(() => {
    const filteredArray = data.filter(
      (item) =>
        (filter.value === null || item.value === filter.value) &&
        (filter.color === null || item.color === filter.color)
    );

    return filteredArray || data;
  }, [filter]);

  const restart = useCallback(() => {
    setFilter({ value: null, color: null });
  }, []);

  return (
    <GalleryContext.Provider
      value={{ filter, setFilter, filteredData, restart }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGallery = () => {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error("useGallery must be used within a GalleryProvider");
  return ctx;
};
