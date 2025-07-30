import { useRef } from "react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".content",
        toggleActions: "restart none restart none",
      },
    });
    const split = SplitText.create(".title");
    textTl
      .from(split.chars, {
        y: 150,
        opacity: 0,
        duration: 0.7,
        ease: "power4",
        stagger: 0.04,
      })
      .from(".sub-title", {
        opacity: 0,
        y: 20,
      });
  }, []);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "+=200%", // controls scroll distance
          scrub: true,
          pin: true,
        },
      });

      tl.to(".yangon", { opacity: 0, duration: 1 });
      tl.to(".content", { opacity: 0, duration: 1 }, "-=0.5");
      tl.to(".bagan", { opacity: 1, duration: 1 }, "<");

      tl.to(
        ".box",
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "bounce.out",
          marker: true,
        },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <section className="hero-section h-screen flex items-center justify-center relative bg-black overflow-hidden">
        <img
          src="/yangon.jpg"
          alt="Image 1"
          className="yangon absolute w-full h-full opacity-100 transition-opacity duration-500 object-cover"
        />
        <div className="absolute w-full h-full bg-[rgba(0,0,0,.5)]"></div>
        <div className="absolute content flex flex-col justify-center items-center">
          <h1 className="title font-bold text-center text-5xl">
            "Travelling In Myanmar"
          </h1>
          <p className="sub-title text-base md:text-2xl py-4">
            A Journey Through Golden Temples, Floating Villages, and Hidden
            Wonders
          </p>
        </div>
        <img
          src="/bagan.jpg"
          alt="Image 2"
          className="bagan absolute w-full h-full opacity-0 transition-opacity duration-500 object-cover"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-around gap-4 items-center">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="box w-40 h-20 bg-white text-black font-bold flex items-center justify-center opacity-0 -translate-y-32"
            >
              Block {n}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
