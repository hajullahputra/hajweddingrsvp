"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Reusable floral bouquet (same as HeroSection) ── */
function PageFloral({ flip = false, size = 220 }: { flip?: boolean; size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 260 260" fill="none"
      style={{ display: "block", transform: flip ? "rotate(180deg) scaleX(-1)" : undefined, pointerEvents: "none" }}
    >
      <path d="M15 245 Q60 190 110 155 Q150 128 195 90 Q218 68 248 38" stroke="#C9A96E" strokeWidth="1.1" fill="none" opacity=".38"/>
      <path d="M22 245 Q55 205 85 178 Q115 150 145 120" stroke="#8A9E8B" strokeWidth=".85" fill="none" opacity=".3"/>
      <path d="M8 228 Q38 200 70 182 Q100 165 122 148" stroke="#C9A96E" strokeWidth=".7" fill="none" opacity=".25"/>
      <ellipse cx="218" cy="55" rx="20" ry="17" fill="#D4A5A5" opacity=".72"/>
      <ellipse cx="205" cy="46" rx="13" ry="9" fill="#C49090" opacity=".55" transform="rotate(-22 205 46)"/>
      <ellipse cx="231" cy="46" rx="13" ry="9" fill="#C49090" opacity=".55" transform="rotate(22 231 46)"/>
      <ellipse cx="218" cy="38" rx="11" ry="8" fill="#D4A5A5" opacity=".6"/>
      <ellipse cx="218" cy="70" rx="9" ry="6" fill="#BA8585" opacity=".42"/>
      <circle  cx="218" cy="55" r="7.5" fill="#BA8585" opacity=".35"/>
      <circle  cx="218" cy="55" r="3.5" fill="#9E6E6E" opacity=".38"/>
      <circle cx="128" cy="138" r="14" fill="#E8D5AA" opacity=".7"/>
      <ellipse cx="118" cy="128" rx="9" ry="6" fill="#C9A96E" opacity=".6" transform="rotate(-35 118 128)"/>
      <ellipse cx="138" cy="128" rx="9" ry="6" fill="#C9A96E" opacity=".6" transform="rotate(35 138 128)"/>
      <ellipse cx="138" cy="148" rx="9" ry="6" fill="#C9A96E" opacity=".6" transform="rotate(-35 138 148)"/>
      <ellipse cx="118" cy="148" rx="9" ry="6" fill="#C9A96E" opacity=".6" transform="rotate(35 118 148)"/>
      <circle  cx="128" cy="138" r="6" fill="#B8924D" opacity=".5"/>
      <ellipse cx="72" cy="192" rx="10" ry="8" fill="#D4A5A5" opacity=".65"/>
      <ellipse cx="63" cy="183" rx="7" ry="5" fill="#C49090" opacity=".5" transform="rotate(-28 63 183)"/>
      <ellipse cx="81" cy="183" rx="7" ry="5" fill="#C49090" opacity=".5" transform="rotate(28 81 183)"/>
      <ellipse cx="72" cy="201" rx="6" ry="4" fill="#BA8585" opacity=".4"/>
      <circle  cx="72" cy="192" r="4" fill="#A87070" opacity=".38"/>
      <circle  cx="168" cy="102" r="7" fill="#F0E0DC" opacity=".8"/>
      <ellipse cx="162" cy="96" rx="5" ry="3.5" fill="#E8D5AA" opacity=".7" transform="rotate(-30 162 96)"/>
      <ellipse cx="174" cy="96" rx="5" ry="3.5" fill="#E8D5AA" opacity=".7" transform="rotate(30 174 96)"/>
      <ellipse cx="174" cy="108" rx="5" ry="3.5" fill="#E8D5AA" opacity=".7" transform="rotate(-30 174 108)"/>
      <ellipse cx="162" cy="108" rx="5" ry="3.5" fill="#E8D5AA" opacity=".7" transform="rotate(30 162 108)"/>
      <circle  cx="168" cy="102" r="3" fill="#C9A96E" opacity=".65"/>
      <circle  cx="34" cy="232" r="5" fill="#D4A5A5" opacity=".55"/>
      <circle  cx="34" cy="232" r="2.5" fill="#C49090" opacity=".45"/>
      <path d="M192 82 Q170 60 182 40 Q202 62 192 82Z" fill="#8A9E8B" opacity=".62"/>
      <path d="M238 80 Q260 58 248 38 Q232 60 238 80Z" fill="#8A9E8B" opacity=".48"/>
      <path d="M145 120 Q123 98 135 78 Q154 100 145 120Z" fill="#8A9E8B" opacity=".55"/>
      <path d="M100 158 Q78 138 90 118 Q108 140 100 158Z" fill="#8A9E8B" opacity=".5"/>
      <path d="M52 208 Q30 190 42 170 Q60 190 52 208Z" fill="#8A9E8B" opacity=".45"/>
      <circle cx="202" cy="92" r="2.5" fill="#C9A96E" opacity=".45"/>
      <circle cx="115" cy="152" r="2" fill="#C9A96E" opacity=".4"/>
      <circle cx="60" cy="205" r="2" fill="#C9A96E" opacity=".38"/>
    </svg>
  );
}
import HeroSection from "@/components/sections/HeroSection";
import CoupleSection from "@/components/sections/CoupleSection";
import EventSection from "@/components/sections/EventSection";
import CountdownSection from "@/components/sections/CountdownSection";
import RsvpSection from "@/components/sections/RsvpSection";
import GuestCountSection from "@/components/sections/GuestCountSection";
import DisplayWishesSection from "@/components/sections/DisplayWishesSection";
import WishlistSection from "@/components/sections/WishlistSection";
// import WishesSection from "@/components/sections/WishesSection";
import FooterSection from "@/components/sections/FooterSection";
import FloatingPetals from "@/components/FloatingPetals";
import MusicPlayer from "@/components/MusicPlayer";

/* Sticky nav links */
const NAV = [
  { label: "Couple",   href: "#couple" },
  { label: "Event",    href: "#event" },
  { label: "RSVP",     href: "#rsvp" },
  { label: "Wishlist", href: "#wishlist" },
];

export default function HomePage() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {/* Floating petals — always in background */}
      {opened && <FloatingPetals />}

      {/* Music player — available from the hero screen onwards */}
      <MusicPlayer />

      {/* Cover / hero overlay */}
      <HeroSection onOpen={() => setOpened(true)} />

      {/* Main content — revealed after open */}
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >

            {/* Fixed border florals */}
            <div style={{ position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none", opacity: 0.7 }}>
              <PageFloral size={220} />
            </div>
            <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 0, pointerEvents: "none", opacity: 0.7 }}>
              <PageFloral size={220} flip />
            </div>

            {/* Sections */}
            <main style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 56, display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { id: "couple",    el: <CoupleSection />,       delay: 0 },
                { id: "event",     el: <EventSection />,        delay: 0.05 },
                { id: "countdown", el: <CountdownSection />,    delay: 0 },
                { id: "rsvp",      el: <RsvpSection />,         delay: 0 },
                { id: "",          el: <GuestCountSection />,   delay: 0 },
                { id: "",          el: <DisplayWishesSection />,delay: 0 },
                { id: "wishlist",  el: <WishlistSection />,     delay: 0 },
              ].map(({ id, el, delay }, i) => (
                <motion.div
                  key={id || i}
                  {...(id ? { id } : {})}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
                >
                  {el}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <FooterSection />
              </motion.div>
            </main>

            {/* Bottom nav */}
            <nav
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 40,
                background: "rgba(253,248,243,.97)",
                backdropFilter: "blur(10px)",
                borderTop: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  maxWidth: 480,
                  margin: "0 auto",
                  padding: "0 8px",
                }}
              >
                {NAV.map(n => (
                  <a key={n.href} href={n.href} className="nav-link">
                    {n.label}
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
