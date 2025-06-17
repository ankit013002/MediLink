import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { patients } from "@/db/schema";

export const insertPatientSchema = createInsertSchema(patients, {
  firstName: (schema) => schema.firstName.min(1, "First name is required"),
  lastName: (schema) => schema.lastName.min(1, "Last name is required"),
  address1: (schema) => schema.address1.min(1, "Address is required"),
  city: (schema) => schema.city.min(1, "City is required"),
  state: (schema) => schema.state.length(2, "State is required"),
  email: (schema) => schema.email.email("Email is required"),
  zip: (schema) =>
    schema.zip.regex(
      /^\d{5}(-\d{4})?$/,
      "Invalid Zip code. Expected XXXXX or XXXXX-YYYY"
    ),
  phone: (schema) =>
    schema.phone.regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Invalid phone number (XXX-XXX-XXXX)"
    ),
});

export const selectPatientSchema = createSelectSchema(patients);

export type insertPatientSchemaType = typeof insertPatientSchema._type;

export type selectPatientSchemaType = typeof selectPatientSchema._type;
