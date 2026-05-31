"use server";

import { db } from "@/db";
import { appointments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteAppointmentAction(appointmentId: number) {
  await db.delete(appointments).where(eq(appointments.id, appointmentId));
  return { message: `Appointment #${appointmentId} deleted successfully` };
}
