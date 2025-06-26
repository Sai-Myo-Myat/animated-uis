import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const HomeSession = () => {
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLParagraphElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(true);

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

  useGSAP(() => {
    gsap.set(containerRef.current, {
      clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });

    tl.from(containerRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    }).to(
      ".hero-title",
      {
        scale: 3,
        rotateX: -45,
        translateY: 200,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
      "<" // start at the same time as previous
    );
  }, []);

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
    <div ref={containerRef} className="bg-blue-300 w-screen h-dvh">
      {open && (
        <>
          <div className="flex flex-col items-center justify-center h-[80vh]">
            <h1 className="hero-title z-10 text-4xl font-bold mb-4 text-blue-900">
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
