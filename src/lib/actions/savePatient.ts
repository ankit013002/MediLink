"use server";

import { db } from "@/db";
import { patients } from "@/db/schema";
import { insertPatientSchema, type insertPatientSchemaType } from "@/zod-schemas/patient";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function savePatient(data: insertPatientSchemaType) {
  const parsed = insertPatientSchema.safeParse(data);
  if (!parsed.success) {
    return { message: `Validation error: ${parsed.error.errors[0]?.message}` };
  }

  const { id, ...values } = parsed.data;

  try {
    if (id === 0) {
      await db.insert(patients).values(values);
    } else {
      await db.update(patients).set(values).where(eq(patients.id, id));
    }
  } catch (e) {
    return { message: `Database error: ${e instanceof Error ? e.message : "Unknown error"}` };
  }

  revalidatePath("/patients");
  return { message: "Patient saved successfully" };
}
