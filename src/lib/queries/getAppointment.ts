import { db } from "@/db";
import { appointments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAppointment(id: number) {
  const appointment = await db
    .select()
    .from(appointments)
    .where(eq(appointments.id, id));

  return appointment[0];
}
