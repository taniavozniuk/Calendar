import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(30, "Max 30 characters"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  notes: z.string().max(200, "Max 200 characters"),
  color: z.string().min(1, "Color is required"),
});

export type EventFormValues = z.infer<typeof eventSchema>;
