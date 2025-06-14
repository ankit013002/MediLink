import { db } from "@/db";
import { patients } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getPatient(id: number) {
  const patient = await db.select().from(patients).where(eq(patients.id, id));
  return patient[0];
}
