import gsap from "gsap";
import Session from "../sessions/session";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  const sessionRef = useRef<HTMLDivElement>(null);
  const baganRef = useRef<HTMLDivElement>(null);

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
    if (sessionRef.current && baganRef.current) {
      const fadeTl = gsap.timeline();
      fadeTl
        .to(sessionRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: sessionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
          },
        })
        .to(baganRef.current, {
          opacity: 1,
          scrollTrigger: {
            trigger: baganRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
          },
        });
    }
  }, []);

  return (
    <div>
      <Session
        ref={sessionRef}
        className="relative inset-0 flex flex-col items-center justify-center"
      >
        <div className="absolute w-full h-full bg-black top-0 left-0 opacity-70" />
        <img
          src="/yangon.jpg"
          className="image object-cover object-center w-full h-full"
        />
        <div className="absolute flex flex-col justify-center items-center">
          <h1 className="title font-bold text-center text-5xl">
            "Travelling In Myanmar"
          </h1>
          <p className="sub-title text-base md:text-2xl py-4">
            A Journey Through Golden Temples, Floating Villages, and Hidden
            Wonders
          </p>
        </div>
      </Session>
      <Session ref={baganRef} className="absolute inset-0 opacity-0">
        <div className="absolute w-full h-full bg-black top-0 left-0 opacity-45" />
        <img
          src="/bagan.jpg"
          className="object-cover object-center w-full h-full"
        />
      </Session>
    </div>
  );
};

export default Hero;
