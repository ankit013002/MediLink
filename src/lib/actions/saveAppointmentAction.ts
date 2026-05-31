"use server";

import { db } from "@/db";
import { appointments } from "@/db/schema";
import {
  insertAppointmentSchema,
  type insertAppointmentSchemaType,
} from "@/zod-schemas/appointments";
import { eq } from "drizzle-orm";

export async function saveAppointmentAction(data: insertAppointmentSchemaType) {
  const parsed = insertAppointmentSchema.safeParse(data);
  if (!parsed.success) {
    return { message: "Validation error" };
  }

  const { id, ...appointmentData } = parsed.data;

  if (id && id !== "(New)") {
    // Update
    const result = await db
      .update(appointments)
      .set(appointmentData)
      .where(eq(appointments.id, id as number))
      .returning({ updatedId: appointments.id });

    return {
      message: `Appointment ID ${result[0].updatedId} updated successfully`,
    };
  } else {
    // Insert
    const result = await db
      .insert(appointments)
      .values(appointmentData)
      .returning({ insertedId: appointments.id });

    return {
      message: `Appointment ID ${result[0].insertedId} created successfully`,
    };
  }
}
