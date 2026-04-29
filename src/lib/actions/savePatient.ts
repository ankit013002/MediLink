"use server";

import { db } from "@/db";
import { patients } from "@/db/schema";
import { insertPatientSchema, type insertPatientSchemaType } from "@/zod-schemas/patient";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import * as Sentry from "@sentry/nextjs";

export type SavePatientResult =
  | { success: true }
  | { success: false; message: string };

export async function savePatient(
  data: insertPatientSchemaType
): Promise<SavePatientResult> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = insertPatientSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: `Validation error: ${parsed.error.errors[0]?.message}`,
    };
  }

  // Omit server-managed timestamp columns so callers cannot override them
  const { id, createdAt, updatedAt, ...values } = parsed.data;

  try {
    if (!id || id <= 0) {
      await db.insert(patients).values(values);
    } else {
      await db.update(patients).set(values).where(eq(patients.id, id));
    }
  } catch (e) {
    Sentry.captureException(e);
    return { success: false, message: "Unable to save patient. Please try again." };
  }

  revalidatePath("/patients");
  return { success: true };
}
