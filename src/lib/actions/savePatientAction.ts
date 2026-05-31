"use server";

import { db } from "@/db";
import { patients } from "@/db/schema";
import {
  insertPatientSchema,
  type insertPatientSchemaType,
} from "@/zod-schemas/patient";
import { eq } from "drizzle-orm";

export async function savePatientAction(data: insertPatientSchemaType) {
  const parsed = insertPatientSchema.safeParse(data);
  if (!parsed.success) {
    return { message: "Validation error" };
  }

  const { id, ...patientData } = parsed.data;

  if (id && id !== 0) {
    // Update
    const result = await db
      .update(patients)
      .set(patientData)
      .where(eq(patients.id, id as number))
      .returning({ updatedId: patients.id });

    return {
      message: `Patient ID ${result[0].updatedId} updated successfully`,
    };
  } else {
    // Insert
    const result = await db
      .insert(patients)
      .values(patientData)
      .returning({ insertedId: patients.id });

    return {
      message: `Patient ID ${result[0].insertedId} created successfully`,
    };
  }
}
