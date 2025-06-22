import { useCallback } from "react";
import { useGallery } from "../contexts/gallery-context";

const FilterBar = () => {
  const { filter, setFilter, restart } = useGallery();

  const onResart = useCallback(() => {
    restart();
  }, [restart]);

  return (
    <div className="flex flex-col fixed top-1/2 bg-white text-black gap-10 px-2 py-4 rounded-tr-md rounded-br-md">
      <select
        value={filter.value ?? ""}
        onChange={(e) =>
          setFilter({
            ...filter,
            value: e.target.value === "" ? null : Number(e.target.value),
          })
        }
      >
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>
      <select
        value={filter.color ?? ""}
        onChange={(e) =>
          setFilter({
            ...filter,
            color: e.target.value === "" ? null : e.target.value,
          })
        }
      >
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="pink">Pink</option>
        <option value="purple">Purple</option>
      </select>
      <span onClick={onResart}>Restart</span>
    </div>
  );
};

export default FilterBar;
