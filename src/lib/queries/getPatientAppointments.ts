import { db } from "@/db";
import { appointments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getPatientAppointments(patientId: number) {
  const results = await db
    .select()
    .from(appointments)
    .where(eq(appointments.patientId, patientId))
    .orderBy(appointments.createdAt);
  return results;
}
