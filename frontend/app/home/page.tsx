"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
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
    quote:
      "Got instant answers for my cat at 2A.M. 😭🐱 Lifesaver!",
    name: "Khushi",
    location: "Delhi",
    emoji: "🐈",
  },
  {
    quote:
      "With Pawfect's help, My dog found the love 💕 of his life!!",
    name: "Shilpa",
    location: "Mumbai",
    emoji: "🐕",
  },
];

// const plans = [
//   {
//     name: "American Wirehair",
//     price: "Free",
//     perks: ["5 Matches Per Day", "10 Messages Per Day", "Unlimited App Usage"],
//     highlight: false,
//   },
//   {
//     name: "Husky",
//     price: "₹499",
//     period: "/ mo",
//     perks: ["Unlimited Matches", "Unlimited Messages", "Unlimited App Usage"],
//     highlight: true,
//   },
//   {
//     name: "Flemish Giant rabbit",
//     price: "₹999",
//     period: "/ mo",
//     perks: ["Priority Listing", "Unlimited Matches", "Unlimited App Usage"],
//     highlight: false,
//   },
// ];

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
        {["#pricing", "#footer", "#cta"].map((href, i) => (
          <a
            key={href}
            href={href}
            className="text-sm font-medium text-rose-950/70 hover:text-rose-900 transition-colors"
          >
            {["Pricing", "Contact", "Download"][i]}
          </a>
        ))}
        <a href={"https://github.com/Pragati30-code/Pawfect/"}className="text-sm font-medium text-rose-950/70 hover:text-rose-900 transition-colors">Github</a>
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
          {["#pricing", "#footer", "#cta"].map((href, i) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-rose-900"
              onClick={() => setOpen(false)}
            >
              {["Pricing", "Contact", "Download"][i]}
            </a>
          ))}
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
        className="relative"
        style={{ background: "rgb(226, 176, 160)", maxHeight: "87vh" }}
      >
        <Navbar />

        <div className="px-6 md:px-105 pt-10 pb-32 md:pb-40 relative">
          <div className="max-w-xl">
            <Badge
              className="mb-6 border-rose-200 text-rose-800 bg-rose-50/80"
              variant="outline"
            >
              🩺 AI-Powered Pet Care
            </Badge>

            <h1
              className="relative z-20 font-black leading-tight mb-8 text-rose-950"
              style={{
                fontSize: "clamp(2.4rem, 6vw, 3.8rem)",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Your Pet's Doctor. <br></br>Your Pet's Soulmate.
            </h1>

            <div className="flex flex-wrap gap-3">
              <Link href="/login" className="cursor-pointer">
                <Button
                  size="lg"
                  className="gap-2 font-semibold cursor-pointer"
                  style={{ background: "rgb(159, 121, 121)", color: "#fff" }}
                >
                  Get Started 🐾
                </Button>
              </Link>
            </div>

            <div className="mt-8">
              <Link
                href="/chat"
                className="text-sm text-rose-800 underline underline-offset-4 hover:text-rose-950 transition-colors"
              >
                Try Pawfect AI Vet Assistant →
              </Link>
            </div>
          </div>

          {/* Floating cat placeholder */}
          <div
            className="hidden md:block absolute right-75 top-10 w-85 h-full rounded-3xl rotate-[-20deg] shadow-2xl overflow-hidden"
            style={{
              background: "rgba(130,25,25,0.08)",
              border: "2px solid rgba(130,25,25,0.12)",
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-8xl">
              <img src="/cat.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        id="features"
        className="py-24 px-6 md:px-16"
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
      {/* <section
        id="pricing"
        className="py-24 px-6 md:px-16"
        style={{ background: "rgb(245, 232, 227)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="font-bold text-rose-950 mb-3"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontFamily: "Ubuntu Condensed, sans-serif" }}
            >
              A Plan for Every Pet's Needs
            </h2>
            <p className="text-rose-700/70 text-sm italic">
              Simple and affordable price plans for you and your pet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative border transition-shadow",
                  plan.highlight
                    ? "border-rose-400 shadow-xl scale-105"
                    : "border-rose-100 bg-white/70 hover:shadow-md"
                )}
                style={plan.highlight ? { background: "rgb(226, 176, 160)" } : {}}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge style={{ background: "rgb(130, 25, 25)", color: "#fff" }}>
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <p className="text-xs font-medium text-rose-700/70 uppercase tracking-wider mb-1">
                    {plan.name}
                  </p>
                  <div className="flex items-end justify-center gap-1">
                    <span
                      className="font-bold text-rose-950"
                      style={{ fontSize: "2.2rem", fontFamily: "Ubuntu Condensed, sans-serif" }}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-rose-700/60 text-sm mb-1">{plan.period}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-2 pt-2">
                  {plan.perks.map((perk) => (
                    <p key={perk} className="text-sm text-rose-900/80 flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                      {perk}
                    </p>
                  ))}
                  <div className="pt-4">
                    <Button
                      className="w-full"
                      variant={plan.highlight ? "default" : "outline"}
                      style={
                        plan.highlight
                          ? { background: "rgb(130, 25, 25)", color: "#fff" }
                          : { borderColor: "rgb(130, 25, 25)", color: "rgb(130, 25, 25)" }
                      }
                    >
                      Sign Up
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}
      {/* ── CTA ── */}
      <section
        id="cta"
        className="py-0 pt-12 px-6 text-center"
        style={{ background: "rgb(245, 232, 227)" }}
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
        style={{ background: "rgb(245, 232, 227)" }}
      >
        <div className="flex flex-col justify-center gap-2 mb-2">
          <p>Star us on github 🌟</p>

          <div className="flex justify-center gap-2 mb-2">
            {/* GitHub */}
            <a
              href="https://github.com/Pragati30-code/Pawfect/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-rose-200 flex items-center justify-center text-rose-700 hover:text-rose-950 hover:border-rose-400 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>

            {/* Mail */}
            <a
              href="mailto:pragatipanwar30@gmail.com"
              className="w-9 h-9 rounded-full border border-rose-200 flex items-center justify-center text-rose-700 hover:text-rose-950 hover:border-rose-400 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <Separator className="bg-rose-200 max-w-xs mx-auto mb-4" />
        <p className="text-xs text-rose-700/60">© Copyright Pawfect</p>
      </footer>
    </div>
  );
}
