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
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // controls scroll distance
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      });

      tl.to(".yangon", { opacity: 0, duration: 1 });
      tl.to(".content", { opacity: 0, duration: 1 }, "=");
      tl.to(".bagan", { opacity: 1, duration: 1 }, "<");
      tl.to(
        ".inle",
        {
          y: "-100%",
        },
        ">=0.5"
      );
      tl.to(".bagan", { opacity: 0 }, "-=0.5");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <section className="yangon relative opacity-100 transition-opacity duration-500  h-screen flex items-center justify-center bg-black">
        <img
          src="/yangon.jpg"
          alt="Yangon Background"
          className="object-cover"
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
      </section>
      <section className="bagan absolute inset-0 w-full h-screen opacity-0 transition-opacity duration-500  flex items-center justify-center p-0">
        <img src="/bagan.jpg" alt="Bagan Background" className="object-cover" />
      </section>
      <section className="inle h-screen bg-green-700"></section>
    </div>
  );
}
