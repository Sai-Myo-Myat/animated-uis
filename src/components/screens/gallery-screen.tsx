import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

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
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center h-[80vh]"
    >
      {open && (
        <>
          <h1 className="text-4xl font-bold mb-4 text-blue-900">Gallery</h1>
          <p className="text-lg text-gray-500">This is Gallery page.</p>
        </>
      )}
    </div>
  );
};

export default Gallery;
