import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { appointments } from "@/db/schema";
import { z } from "zod";

export const insertAppointmentSchema = createInsertSchema(appointments, {
  id: z.union([z.number(), z.literal("(New)")]),
  title: (schema) => schema.title.min(1, "Title is required"),
  description: (schema) => schema.description.min(1, "Description is required"),
  physician: (schema) => schema.physician.min(1, "Physician is required"),
});

export const selectAppointmentSchema = createSelectSchema(appointments);

export type insertAppointmentSchemaType = typeof insertAppointmentSchema._type;

export type selectAppointmentSchemaType = typeof selectAppointmentSchema._type;
