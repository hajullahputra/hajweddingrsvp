import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().min(2, "Sila masukkan nama penuh anda"),
  email: z.string().email("Sila masukkan e-mel yang sah").or(z.literal("no-email@rsvp.com")),
  attending: z.enum(["yes", "no"]),
  guestCount: z.number().min(1).max(10).default(1),
  notes: z.string().max(500).optional(),
});

export type RsvpFormData = z.infer<typeof rsvpSchema>;

export type RsvpRecord = RsvpFormData & {
  id: string;
  submittedAt: Date;
};
