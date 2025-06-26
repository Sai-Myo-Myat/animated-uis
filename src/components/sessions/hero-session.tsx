import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeSession = () => {
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLParagraphElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  useGSAP(() => {
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
  }, [setOpen]);

  const handleClick = useCallback(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            navigate("/gallery");
          },
        }
      );
    }
  }, [navigate]);

  return (
    <div ref={containerRef}>
      {open && (
        <>
          <div className="flex flex-col items-center justify-center h-[80vh]">
            <h1 className="text-4xl font-bold mb-4 text-blue-900">
              Welcome Home!
            </h1>
            <p className="text-lg text-gray-700">
              This is the home page of my animated UI project.
            </p>
          </div>
          <p
            ref={buttonRef}
            className="fixed bottom-14 right-10 z-50 text-white"
            onClick={handleClick}
          >
            view collections
          </p>
        </>
      )}
    </div>
  );
};

export default HomeSession;
