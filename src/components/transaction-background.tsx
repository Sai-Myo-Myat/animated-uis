import React, { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import {
  NavigationContext,
  type NavigationContextProps,
} from "../contexts/navigation-context";

const TransactionBackground: React.FC = () => {
  const circleRef = useRef<HTMLDivElement>(null);
  const { prevPath, currentPath } =
    useContext<NavigationContextProps>(NavigationContext);

  useEffect(() => {
    // Only animate if navigating between Home and Gallery (not on reload)
    if (
      (prevPath === "/" && currentPath === "/gallery") ||
      (prevPath === "/gallery" && currentPath === "/")
    ) {
      const forward = prevPath === "/" && currentPath === "/gallery";
      const timeline = gsap.timeline();
      if (forward) {
        setTimeout(() => {
          timeline
            .fromTo(
              circleRef.current,
              { scale: 1, opacity: 0.3 },
              {
                scale: 30,
                opacity: 1,
                backgroundColor: "black",
                duration: 1.5,
                ease: "power3.out",
              }
            )
            .to(circleRef.current, { opacity: 0, duration: 0.3 })
            .to(circleRef.current, { scale: 0 });
        }, 0);
      } else {
        timeline
          .fromTo(
            circleRef.current,
            { scale: 40, backgroundColor: "black" },
            { opacity: 1, duration: 0.5 }
          )
          .to(circleRef.current, {
            scale: 1,
            duration: 1,
            opacity: 1,
            backgroundColor: "#203D99",
            delay: 1,
            ease: "power3.out",
          });
      }
    }
  }, [prevPath, currentPath]);

  return (
    <div
      ref={circleRef}
      className="fixed bottom-2 right-8 w-32 h-32 bg-[#203D99] rounded-full shadow-2xl z-40 pointer-events-none"
      style={{ opacity: 0 }}
    ></div>
  );
};

export default TransactionBackground;
