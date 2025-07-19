import gsap from "gsap";
import Sesssion from "../sessions/session";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  const sessionRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline();
    const split = SplitText.create(".title");
    tl.from(".image", {
      opacity: 0,
      ease: "bounce",
    })
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
    // Fade out Session on scroll
    if (sessionRef.current) {
      gsap.to(sessionRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sessionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });
    }
  }, []);

  return (
    <Sesssion
      ref={sessionRef}
      className="relative flex flex-col items-center justify-center"
    >
      <img
        src="/yangon.jpg"
        className="image object-cover object-center w-full h-full"
      />
      <div className="absolute w-full h-full bg-black top-0 left-0 opacity-70" />
      <div className="absolute flex flex-col justify-center items-center">
        <h1 className="title font-bold text-center text-5xl">
          "Travelling In Myanmar"
        </h1>
        <p className="sub-title text-base md:text-2xl py-4">
          A Journey Through Golden Temples, Floating Villages, and Hidden
          Wonders
        </p>
      </div>
    </Sesssion>
  );
};

export default Hero;
