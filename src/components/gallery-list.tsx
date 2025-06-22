import { useGallery } from "../contexts/gallery-context";
import { cn } from "../utils";

interface GalleryImageType {
  value: number;
  color: string;
}

const GalleryList = () => {
  const { filteredData } = useGallery();

  return (
    <div className="w-[120vw] flex flex-wrap gap-3">
      {filteredData?.map((image) => (
        <GalleryImage image={image} />
      ))}
    </div>
  );
};

interface GalleryImageProps {
  image: GalleryImageType;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ image }) => {
  return (
    <div
      className={cn(
        "w-32 h-32 cursor-pointer flex items-center justify-center font-bold  text-xl"
      )}
      style={{ backgroundColor: image.color }}
    >
      {image.value}
    </div>
  );
};

export default GalleryList;
