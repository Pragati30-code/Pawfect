"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ConfettiButton } from "@/components/ui/confetti";
import Image from "next/image";
import {
  CheckCircle2,
  Target,
  Flame,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Twitter,
  Menu,
  X,
  Github,
} from "lucide-react";

// ── Data ───────────────────────────────────────────────

const features = [
  {
    icon: CheckCircle2,
    title: "User Friendly",
    desc: "So easy and hassle-free to use, even your pet could do it.",
  },
  {
    icon: Target,
    title: "Keep Health in check",
    desc: "With our Vet AI, get cure and diagnosis for any pet's problem.",
  },
  {
    icon: Flame,
    title: "Matchmaker",
    desc: "We have the perfect matchmaking algorithm.",
  },
];

const testimonials = [
  {
    quote: "Got instant answers for my cat at 2A.M. 😭🐱 Lifesaver!",
    name: "Khushi",
    location: "Delhi",
    emoji: "🐈",
  },
  {
    quote: "With Pawfect's help, My dog found the love 💕 of his life!!",
    name: "Shilpa",
    location: "Mumbai",
    emoji: "🐕",
  },
];

const plans = [
  {
    name: "American Wirehair",
    image: "/catmatch1.jpeg",
    animalName: "Luna",
    age: "2 yrs",
    gender: "Female",
  },
  {
    name: "Siberian Husky",
    image: "/huskymatch.jpeg",
    animalName: "Storm",
    age: "3 yrs",
    gender: "Male",
  },
  {
    name: "Holland Lop",
    image: "/rabbitmatch.jpeg",
    animalName: "Mochi",
    age: "1 yr",
    gender: "Female",
  },
];

// const pressLogos = [
//   { name: "TNW", abbr: "TNW" },
//   { name: "Business Insider", abbr: "BI" },
//   { name: "Mashable", abbr: "M" },
// ];

// ── Components ─────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 h-16 relative z-50">
      {/* Brand */}
      <Link
        href="/"
        className="text-2xl font-bold tracking-tight"
        style={{ color: "#d9084a", fontFamily: "Ubuntu Condensed, sans-serif" }}
      >
        Pawfect 🐾
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {["#features", "#footer"].map((href, i) => (
          <a
            key={href}
            href={href}
            className="text-sm font-medium text-rose-950/70 hover:text-rose-900 transition-colors"
          >
            {["Features", "Contact"][i]}
          </a>
        ))}
        <a
          href={"https://github.com/Pragati30-code/Pawfect/"}
          className="text-sm font-medium text-rose-950/70 hover:text-rose-900 transition-colors"
        >
          Github
        </a>
        <Link href="/login">
          <Button
            size="sm"
            variant="outline"
            className="border-rose-200 text-rose-900 hover:bg-rose-50"
          >
            Sign in
          </Button>
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden p-2 rounded-md text-rose-900"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="fixed z-50 top-16 left-0 right-0 bg-rose-50 border-b border-rose-100 px-6 py-4 flex flex-col gap-4 md:hidden">
          {["#features", "#footer"].map((href, i) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-rose-900"
              onClick={() => setOpen(false)}
            >
              {["Features", "Contact"][i]}
            </a>
          ))}
          <a
            href={"https://github.com/Pragati30-code/Pawfect/"}
            className="text-sm font-medium text-rose-950/70 hover:text-rose-900 transition-colors"
          >
            Github
          </a>
          <Link
            className="cursor-pointer"
            href="/login"
            onClick={() => setOpen(false)}
          >
            <Button
              size="sm"
              className="w-full cursor-pointer"
              style={{ background: "#d9084a" }}
            >
              Sign in
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  return (
    <div className="relative max-w-3xl mx-auto px-12">
      <button
        onClick={() =>
          setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)
        }
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-rose-100 transition-colors"
      >
        <ChevronLeft className="h-5 w-5 text-rose-900" />
      </button>

      <div className="text-center py-12 px-4">
        <div className="text-5xl mb-6">{t.emoji}</div>
        <blockquote className="text-xl md:text-2xl font-semibold text-rose-950 leading-relaxed mb-6">
          "{t.quote}"
        </blockquote>
        <p className="text-sm text-rose-700 font-medium">
          — {t.name}, <span className="font-normal">{t.location}</span>
        </p>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                i === idx ? "bg-rose-600 w-4" : "bg-rose-300",
              )}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-rose-100 transition-colors"
      >
        <ChevronRight className="h-5 w-5 text-rose-900" />
      </button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────

export default function HomePage() {
  return (
    <div
      style={{ fontFamily: "Montserrat, sans-serif" }}
      className="overflow-x-hidden"
    >
      {/* ── Hero ── */}
      <section
        id="title"
        className="relative overflow-hidden min-h-[90vh] flex flex-col justify-between"
        style={{ background: "rgb(226, 176, 160)" }}
      >
        <Navbar />

        <div className="relative flex-1 flex items-center px-6 md:px-16 pt-16 pb-20">
          {/* ───────── Mobile Background Image (Zoomed) ───────── */}
          <div className="md:hidden absolute inset-0 flex justify-end items-center pointer-events-none">
            <img
              src="/cat.png"
              alt="cat"
              className="w-[100%] opacity-40 blur-[2px] rounded-[30px]"
              style={{
                transform: "rotate(-4deg) scale(1.11) translateY(-30px)",
                transformOrigin: "center",
              }}
            />
          </div>

          {/* ───────── Left Text (Shifted Right on Desktop) ───────── */}
          <div className="relative z-10 w-full md:w-1/2 md:pl-65">
            <Badge
              className="mb-6 border-rose-200 text-rose-800 bg-rose-50/80 px-4 py-1.5 text-sm md:text-base"
              variant="outline"
            >
              🩺 AI-Powered Pet Care
            </Badge>

            <h1
              className="font-black leading-tight mb-8 text-rose-950"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.8rem)",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Your Pet's Doctor.
              <br />
              Your Pet's Soulmate.
            </h1>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/login">
                <Button
                  size="lg"
                  className="gap-2 font-semibold"
                  style={{ background: "rgb(130, 25, 25)", color: "#fff" }}
                >
                  Get Started 🐾
                </Button>
              </Link>
            </div>

            <Link
              href="/chat"
              className="text-sm text-rose-900 underline underline-offset-4 hover:text-rose-950 transition-colors font-bold"
            >
              Try Pawfect AI Vet Assistant →
            </Link>
          </div>

          {/* ───────── Desktop Floating Image (Left + Slightly Down) ───────── */}
          <div className="hidden md:block absolute right-24 bottom-0 z-20 md:right-50">
            <img
              src="/cat.png"
              alt="cat"
              className="drop-shadow-2xl rounded-[40px]"
              style={{
                height: "82vh",
                maxHeight: "720px",
                transform: "rotate(-10deg) translateX(-120px) translateY(20px)",
                transformOrigin: "bottom center",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        id="features"
        className="py-20 px-6 md:px-16"
        style={{ background: "rgb(245, 232, 227)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="font-bold text-rose-950 mb-3"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontFamily: "Ubuntu Condensed, sans-serif",
              }}
            >
              Why Pawfect?
            </h2>
            <p className="text-rose-700/70 text-sm">
              Everything your Pet deserves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <Card
                key={title}
                className="text-center border-rose-100 bg-white/70 hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: "rgb(226, 176, 160)" }}
                    >
                      <Icon className="h-6 w-6 text-rose-900" />
                    </div>
                  </div>
                  <CardTitle className="text-rose-950 text-base">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-rose-700/70">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section
        id="testimonials"
        style={{ background: "rgba(224, 185, 172, 0.794)" }}
        className="py-16 px-6"
      >
        <div className="text-center mb-4">
          <Badge
            variant="outline"
            className="border-rose-400 text-rose-900 bg-rose-50/50 
             text-sm md:text-base 
             px-4 py-1.5 
             font-semibold"
          >
            Happy customers 🎉
          </Badge>
        </div>
        <TestimonialCarousel />
      </section>

      {/* ── Press ──
      <section
        id="press"
        style={{ background: "rgba(224, 185, 172, 0.794)" }}
        className="pb-16 px-6"
      >
        <Separator className="bg-rose-200 mb-12 max-w-xs mx-auto" />
        <p className="text-center text-xs text-rose-700/60 uppercase tracking-widest mb-8 font-medium">
          As seen in
        </p>
        <div className="flex justify-center items-center gap-8 flex-wrap">
          {pressLogos.map((logo) => (
            <div
              key={logo.name}
              className="px-6 py-3 rounded-xl border border-rose-200 bg-white/50 text-rose-800 font-bold text-lg tracking-tight"
            >
              {logo.name}
            </div>
          ))}
        </div>
      </section> */}

      {/* ── Pricing ── */}
      <section
        id="pricing"
        className="py-24 px-6 md:px-16"
        style={{ background: "rgb(245, 232, 227)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="font-bold text-rose-950 mb-3"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontFamily: "Ubuntu Condensed, sans-serif",
              }}
            >
              Match for Each & Every Pet
            </h2>
            <p className="text-rose-700/70 text-sm italic">
              Every Paw deserves Love
            </p>
            <span> 🤎</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="group relative w-full overflow-hidden rounded-2xl cursor-pointer"
                style={{ height: "210px" }}
              >
                {/* Full card image */}
                <Image
                  src={plan.image}
                  alt={plan.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Default state — breed pill bottom left */}
                <div className="absolute bottom-4 left-4 transition-opacity duration-300 group-hover:opacity-0">
                  <div
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-md"
                    style={{ background: "rgba(0,0,0,0.35)" }}
                  >
                    {plan.name}
                  </div>
                </div>

                {/* Hover state — glassmorphism overlay from bottom */}
                <div
                  className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-in-out rounded-b-2xl px-5 py-5"
                  style={{
                    background: "rgba(255, 255, 255, 0.18)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <p className="text-xs text-white/70 font-medium uppercase tracking-wider mb-0.5">
                    {plan.name}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-white font-bold text-lg">
                      {plan.animalName}
                    </span>
                    <span className="text-white/60 text-sm">·</span>
                    <span className="text-white/80 text-sm">{plan.age}</span>
                    <span className="text-white/60 text-sm">·</span>
                    <span className="text-white/80 text-sm">{plan.gender}</span>
                  </div>
                  <ConfettiButton
                    className="w-full font-semibold text-sm h-9 rounded-xl"
                    style={{
                      background: "rgb(130, 25, 25)",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    Get Match 🎉
                  </ConfettiButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── CTA ── */}
      <section
        id="cta"
        className="py-0 pt-12 px-6 text-center"
        style={{ background: "rgba(224, 185, 172, 0.794)" }}
      >
        <h2
          className="font-bold text-rose-950 mb-8"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontFamily: "Ubuntu Condensed, sans-serif",
          }}
        >
          Get Your #Pawfect Match Now.
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            size="lg"
            className="gap-2 font-semibold"
            style={{ background: "rgb(196, 122, 122)", color: "#fff" }}
          >
            🩺 AI Vet Assistant
          </Button>
        </div>
        <p className="text-sm text-rose-700/70">No download needed.</p>
      </section>

      {/* ── Footer ── */}
      <footer
        id="footer"
        className="py-8 px-6 text-center"
        style={{ background: "rgba(224, 185, 172, 0.794)" }}
      >
        <div className="flex flex-col justify-center gap-2 mb-2">
          <p>Star us on github 🌟</p>

          <div className="flex justify-center gap-2 mb-2">
            {/* GitHub */}
            <a
              href="https://github.com/Pragati30-code/Pawfect/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-rose-400 flex items-center justify-center text-rose-700 hover:text-rose-950 hover:border-rose-400 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>

            {/* Mail */}
            <a
              href="mailto:pragatipanwar30@gmail.com"
              className="w-9 h-9 rounded-full border border-rose-400 flex items-center justify-center text-rose-700 hover:text-rose-950 hover:border-rose-400 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <Separator className="bg-rose-400/50 max-w-xs mx-auto mb-4" />
        <p className="text-xs text-rose-700/60">© Copyright Pawfect</p>
      </footer>
    </div>
  );
}
