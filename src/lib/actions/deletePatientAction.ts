"use server";

import { db } from "@/db";
import { patients, appointments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deletePatientAction(patientId: number) {
  // Delete appointments first to satisfy the FK constraint
  await db.delete(appointments).where(eq(appointments.patientId, patientId));
  await db.delete(patients).where(eq(patients.id, patientId));
  return { message: `Patient #${patientId} deleted successfully` };
}
