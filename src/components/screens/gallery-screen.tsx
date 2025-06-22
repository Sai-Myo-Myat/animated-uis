import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import GalleryList from "../gallery-list";
import { GalleryProvider } from "../../contexts/gallery-context";
import FilterBar from "../filter-bar";

const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            delay: 0.5,
            onComplete: () => setOpen(true),
          }
        );
      }
    }, 0);
  }, [setOpen]);

  return (
    <div ref={containerRef} className="w-full min-h-[80vh]">
      {open && (
        <>
          <GalleryProvider>
            <div className="flex gap">
              <FilterBar />
              <GalleryList />
            </div>
          </GalleryProvider>
        </>
      )}
    </div>
  );
};

export default Gallery;
