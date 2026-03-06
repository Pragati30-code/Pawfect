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
import { CheckCircle2, Target, Flame, ChevronLeft, ChevronRight, Mail, Menu, X, Github } from "lucide-react";
import HeroCat from "@/components/ui/HeroCat";

// ── Styles (only non-cat animations) ─────────────────────────────────────────
const styles = `
  @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pop { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
  .hero-badge{animation:pop 0.5s cubic-bezier(.34,1.56,.64,1) .2s both}
  .hero-h1{animation:fadeUp .7s ease .4s both}
  .hero-sub{animation:fadeUp .7s ease .55s both}
  .hero-btn{animation:fadeUp .7s ease .65s both}
  .cta-btn{transition:transform .2s,box-shadow .2s}
  .cta-btn:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 8px 24px rgba(130,25,25,.35)}
  .cta-btn:active{transform:translateY(0) scale(.97)}
`;

// ── Data ──────────────────────────────────────────────────────────────────────
const features = [
  { icon: CheckCircle2, title: "User Friendly", desc: "So easy and hassle-free to use, even your pet could do it." },
  { icon: Target, title: "Keep Health in check", desc: "With our Vet AI, get cure and diagnosis for any pet's problem." },
  { icon: Flame, title: "Matchmaker", desc: "We have the perfect matchmaking algorithm." },
];

const testimonials = [
  { quote: "Got instant answers for my cat at 2A.M. 😭🐱 Lifesaver!", name: "Khushi", location: "Delhi", emoji: "🐈" },
  { quote: "With Pawfect's help, My dog found the love 💕 of his life!!", name: "Shilpa", location: "Mumbai", emoji: "🐕" },
];

const plans = [
  { name: "American Wirehair", image: "/catmatch1.jpeg", animalName: "Luna", age: "2 yrs", gender: "Female" },
  { name: "Siberian Husky", image: "/huskymatch.jpeg", animalName: "Storm", age: "3 yrs", gender: "Male" },
  { name: "Holland Lop", image: "/rabbitmatch.jpeg", animalName: "Mochi", age: "1 yr", gender: "Female" },
];

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href:"#features", label:"Features" },
    { href:"#footer", label:"Contact" },
    { href:"https://github.com/Pragati30-code/Pawfect/", label:"Github" },
  ];
  return (
    <nav className="w-full flex items-center justify-between px-5 sm:px-8 md:px-14 py-4 relative z-50">
      <Link href="/" className="text-2xl font-black tracking-tight select-none" style={{ color:"rgb(151,45,45)", fontFamily:"Montserrat, sans-serif" }}>
        Pawfect 🐾
      </Link>
      <div className="hidden md:flex items-center gap-8">
        {links.map(l => <a key={l.href} href={l.href} className="text-sm font-semibold text-rose-950/70 hover:text-rose-900 transition-colors">{l.label}</a>)}
        <Link href="/login">
          <button className="ml-2 px-5 py-2 rounded-full border-2 font-bold text-sm transition-all hover:bg-rose-950 hover:text-white" style={{ borderColor:"rgb(130,25,25)", color:"rgb(130,25,25)" }}>
            Sign in
          </button>
        </Link>
      </div>
      <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
        {open ? <X className="h-5 w-5" style={{ color:"rgb(130,25,25)" }} /> : <Menu className="h-5 w-5" style={{ color:"rgb(130,25,25)" }} />}
      </button>
      {open && (
        <div className="fixed z-50 top-16 left-0 right-0 border-b border-rose-100 px-6 py-5 flex flex-col gap-4 md:hidden shadow-xl" style={{ background:"rgb(245,232,227)" }}>
          {links.map(l => <a key={l.href} href={l.href} className="text-sm font-bold text-rose-950" onClick={() => setOpen(false)}>{l.label}</a>)}
          <Link href="/login" onClick={() => setOpen(false)}>
            <button className="w-full px-7 py-2 rounded-full font-bold text-white text-sm" style={{ background:"rgb(130,25,25)" }}>Sign in</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

// ── Testimonial Carousel ──────────────────────────────────────────────────────
function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];
  return (
    <div className="relative max-w-3xl mx-auto px-12">
      <button onClick={() => setIdx(i => (i - 1 + testimonials.length) % testimonials.length)} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-rose-100 transition-colors">
        <ChevronLeft className="h-5 w-5 text-rose-900" />
      </button>
      <div className="text-center py-12 px-4">
        <div className="text-5xl mb-6">{t.emoji}</div>
        <blockquote className="text-xl md:text-2xl font-semibold text-rose-950 leading-relaxed mb-6">"{t.quote}"</blockquote>
        <p className="text-sm text-rose-700 font-medium">— {t.name}, <span className="font-normal">{t.location}</span></p>
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={cn("w-2 h-2 rounded-full transition-all", i === idx ? "bg-rose-600 w-4" : "bg-rose-300")} />)}
        </div>
      </div>
      <button onClick={() => setIdx(i => (i + 1) % testimonials.length)} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-rose-100 transition-colors">
        <ChevronRight className="h-5 w-5 text-rose-900" />
      </button>
    </div>
  );
}

// ── Plan Card ─────────────────────────────────────────────────────────────────
function PlanCard({ plan }: { plan: typeof plans[0] }) {
  const [tapped, setTapped] = useState(false);
  const [toast, setToast] = useState(false);

  const handleMatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <>
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-2xl shadow-xl font-semibold text-sm text-white flex items-center gap-2 whitespace-nowrap"
          style={{ background:"rgb(130,25,25)", animation:"fadeUp .3s ease both" }}>
          🎉 Match request sent for {plan.animalName}!
        </div>
      )}
      <div className="relative w-full overflow-hidden rounded-2xl cursor-pointer" style={{ height:"210px" }} onClick={() => setTapped(p => !p)}>
        <Image src={plan.image} alt={plan.name} fill className={`object-cover transition-transform duration-500 ${tapped ? "scale-105" : ""}`} />
        <div className={`absolute bottom-4 left-4 transition-opacity duration-300 ${tapped ? "opacity-0" : "opacity-100"}`}>
          <div className="px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-md" style={{ background:"rgba(0,0,0,0.35)" }}>{plan.name}</div>
        </div>
        <div className="absolute inset-x-0 bottom-0 rounded-b-2xl px-5 py-5 transition-transform duration-300 ease-in-out"
          style={{ background:"rgba(255,255,255,0.18)", backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)", border:"1px solid rgba(255,255,255,0.3)", transform: tapped ? "translateY(0)" : "translateY(100%)" }}>
          <p className="text-xs text-white/70 font-medium uppercase tracking-wider mb-0.5">{plan.name}</p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-white font-bold text-lg">{plan.animalName}</span>
            <span className="text-white/60 text-sm">·</span><span className="text-white/80 text-sm">{plan.age}</span>
            <span className="text-white/60 text-sm">·</span><span className="text-white/80 text-sm">{plan.gender}</span>
          </div>
          <ConfettiButton className="w-full font-semibold text-sm h-9 rounded-xl" style={{ background:"rgb(130,25,25)", color:"#fff", border:"none" }} onClick={handleMatch}>
            Get Match 🎉
          </ConfettiButton>
        </div>
      </div>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div style={{ fontFamily:"Montserrat, sans-serif" }} className="overflow-x-hidden">
      <style>{styles}</style>

      {/* Hero */}
      <section id="title" className="relative overflow-hidden flex flex-col" style={{ background:"rgb(226,176,160)", minHeight:"100svh" }}>
        <Navbar />
        <div className="relative flex-1 flex flex-col md:flex-row items-center justify-between gap-8 px-6 sm:px-10 md:px-20 pt-6 pb-14 md:pt-10 md:pb-16">
          {/* Text */}
          <div className="relative z-20 flex flex-col items-start w-full md:w-1/2 md:pl-10 lg:pl-16">
            <span className="hero-badge mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
              style={{ borderColor:"rgba(130,25,25,0.25)", color:"rgb(130,25,25)", background:"rgba(255,240,235,0.75)", backdropFilter:"blur(6px)" }}>
              🩺 AI-Powered Pet Care
            </span>
            <h1 className="hero-h1 font-black leading-[1.1] mb-5 text-rose-950" style={{ fontSize:"clamp(2.1rem,5.5vw,4rem)", fontFamily:"Montserrat, sans-serif" }}>
              Your Pet's Doctor.<br />Your Pet's Soulmate.
            </h1>
            <p className="hero-sub text-rose-900 font-medium mb-8 max-w-xs sm:max-w-sm" style={{ fontSize:"clamp(0.9rem,2vw,1.05rem)" }}>
              AI-powered health checks, vet advice, and love — all in one place for your furry friend.
            </p>
            <div className="hero-btn">
              <Link href="/login">
                <button className="cta-btn flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white shadow-lg" style={{ background:"rgb(130,25,25)", fontSize:"clamp(0.9rem,2vw,1rem)" }}>
                  Get Started 🐾
                </button>
              </Link>
            </div>
          </div>
          {/* Cat animation — imported from components/ui/HeroCat.tsx */}
          <HeroCat />
        </div>
        <div style={{ position:"absolute", bottom:"-80px", left:"-80px", width:"320px", height:"320px", borderRadius:"50%", background:"rgba(255,200,180,0.35)", filter:"blur(60px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"20%", right:"-60px", width:"260px", height:"260px", borderRadius:"50%", background:"rgba(200,120,100,0.2)", filter:"blur(50px)", pointerEvents:"none" }} />
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 md:px-16" style={{ background:"rgb(245,232,227)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bold text-rose-950 mb-3" style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontFamily:"Ubuntu Condensed, sans-serif" }}>Why Pawfect?</h2>
            <p className="text-rose-700/70 text-sm">Everything your Pet deserves.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="text-center border-rose-100 bg-white/70 hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background:"rgb(226,176,160)" }}><Icon className="h-6 w-6 text-rose-900" /></div>
                  </div>
                  <CardTitle className="text-rose-950 text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-sm text-rose-700/70">{desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" style={{ background:"rgba(224,185,172,0.794)" }} className="py-16 px-6">
        <div className="text-center mb-4">
          <Badge variant="outline" className="border-rose-400 text-rose-900 bg-rose-50/50 text-sm md:text-base px-4 py-1.5 font-semibold">Happy customers 🎉</Badge>
        </div>
        <TestimonialCarousel />
      </section>

      {/* Match */}
      <section id="pricing" className="py-24 px-6 md:px-16" style={{ background:"rgb(245,232,227)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-bold text-rose-950 mb-3" style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontFamily:"Ubuntu Condensed, sans-serif" }}>Match for Each &amp; Every Pet</h2>
            <p className="text-rose-700/70 text-sm italic">Every Paw deserves Love 🤎</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map(plan => <PlanCard key={plan.name} plan={plan} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="pt-12 pb-8 px-6 text-center" style={{ background:"rgba(224,185,172,0.794)" }}>
        <h2 className="font-bold text-rose-950 mb-8" style={{ fontSize:"clamp(1.8rem,4vw,3rem)", fontFamily:"Ubuntu Condensed, sans-serif" }}>Get Your #Pawfect Match Now.</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <Link href="/login">
            <Button size="lg" className="gap-2 font-semibold" style={{ background:"rgb(196,122,122)", color:"#fff" }}>🩺 AI Vet Assistant</Button>
          </Link>
        </div>
        <p className="text-sm text-rose-700/70">No download needed.</p>
      </section>

      {/* Footer */}
      <footer id="footer" className="py-8 px-6 text-center" style={{ background:"rgba(224,185,172,0.794)" }}>
        <p className="mb-2">Star us on github 🌟</p>
        <div className="flex justify-center gap-2 mb-3">
          <a href="https://github.com/Pragati30-code/Pawfect/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-rose-400 flex items-center justify-center text-rose-700 hover:text-rose-950 transition-colors"><Github className="h-4 w-4" /></a>
          <a href="mailto:pragatipanwar30@gmail.com" className="w-9 h-9 rounded-full border border-rose-400 flex items-center justify-center text-rose-700 hover:text-rose-950 transition-colors"><Mail className="h-4 w-4" /></a>
        </div>
        <Separator className="bg-rose-400/50 max-w-xs mx-auto mb-4" />
        <p className="text-xs text-rose-700/60">© Copyright Pawfect</p>
      </footer>
    </div>
  );
}