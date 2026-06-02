"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { rsvpSchema, RsvpFormData } from "@/lib/schema";

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function RsvpForm() {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState(1);
const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RsvpFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { attending: "yes", guestCount: 1 },
  });

  const onSubmit = async (data: RsvpFormData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, attending, guestCount }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmittedName(data.name.split(" ")[0]);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const labelClass = "block text-[11px] tracking-[0.14em] uppercase text-[#8B8680] mb-1.5";
  const toggleBase =
    "flex-1 py-2.5 border text-[11px] tracking-[0.12em] uppercase cursor-pointer transition-all duration-200 font-sans font-light";
  const toggleActive = "bg-[#2C2B29] text-[#FAF9F6] border-[#2C2B29]";
  const toggleInactive = "border-[#D4D2CE] text-[#8B8680] hover:border-[#8B8680]";

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          {...fade}
          transition={{ duration: 0.5 }}
          className="text-center py-10"
        >
          <p className="font-serif italic text-[#8B8680] text-sm tracking-widest mb-3">
            with gratitude
          </p>
          <h2 className="font-serif text-4xl font-light text-[#2C2B29] mb-3">
            Thank you, {submittedName}
          </h2>
          <div className="w-8 h-px bg-[#D4D2CE] mx-auto my-5" />
          <p className="text-sm text-[#8B8680] tracking-wider font-light">
            {attending === "yes"
              ? "We can't wait to celebrate with you."
              : "We'll miss you, and appreciate you letting us know."}
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          {...fade}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label className={labelClass}>full name</label>
            <input
              {...register("name")}
              className="input-line"
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-[11px] text-red-400 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>email address</label>
            <input
              {...register("email")}
              type="email"
              className="input-line"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Attendance toggle */}
          <div>
            <label className={labelClass}>will you attend?</label>
            <div className="flex gap-2">
              <button
                type="button"
                className={`${toggleBase} ${attending === "yes" ? toggleActive : toggleInactive}`}
                onClick={() => setAttending("yes")}
              >
                Joyfully accepts
              </button>
              <button
                type="button"
                className={`${toggleBase} ${attending === "no" ? toggleActive : toggleInactive}`}
                onClick={() => setAttending("no")}
              >
                Regretfully declines
              </button>
            </div>
          </div>

          {/* Conditional: guest count */}
          <AnimatePresence>
            {attending === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <label className={`${labelClass} mb-0`}>number of guests</label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-7 h-7 rounded-full border border-[#D4D2CE] text-[#8B8680] hover:border-[#2C2B29] hover:text-[#2C2B29] transition-colors flex items-center justify-center text-base leading-none"
                    >
                      −
                    </button>
                    <span className="text-sm w-4 text-center text-[#2C2B29]">{guestCount}</span>
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                      className="w-7 h-7 rounded-full border border-[#D4D2CE] text-[#8B8680] hover:border-[#2C2B29] hover:text-[#2C2B29] transition-colors flex items-center justify-center text-base leading-none"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notes */}
          <div>
            <label className={labelClass}>dietary notes or message</label>
            <textarea
              {...register("notes")}
              className="input-line resize-none"
              placeholder="Allergies, dietary restrictions, or a warm wish…"
              rows={3}
              style={{ paddingTop: "8px" }}
            />
          </div>

          {error && (
            <p className="text-[12px] text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#2C2B29] text-[#FAF9F6] text-[11px] tracking-[0.18em] uppercase font-light transition-opacity hover:opacity-75 disabled:opacity-40"
          >
            {loading ? "Sending…" : "Send RSVP"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
