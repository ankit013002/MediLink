"use server";

import { db } from "@/db";
import { appointments, patients } from "@/db/schema";
import { ilike, or, eq } from "drizzle-orm";

export async function getAppointmentSearchResults(searchText: string) {
  const results = await db
    .select({
      id: appointments.id,
      title: appointments.title,
      physician: appointments.physician,
      completed: appointments.completed,
      createdAt: appointments.createdAt,
      patientId: appointments.patientId,
      firstName: patients.firstName,
      lastName: patients.lastName,
      email: patients.email,
      phone: patients.phone,
    })
    .from(appointments)
    .leftJoin(patients, eq(appointments.patientId, patients.id))
    .where(
      or(
        ilike(appointments.title, `%${searchText}%`),
        ilike(appointments.physician, `%${searchText}%`),
        ilike(patients.firstName, `%${searchText}%`),
        ilike(patients.lastName, `%${searchText}%`),
        ilike(patients.email, `%${searchText}%`),
        ilike(patients.phone, `%${searchText}%`),
      ),
    )
    .orderBy(appointments.createdAt);
  return results;
}

export async function getAllAppointments() {
  const results = await db
    .select({
      id: appointments.id,
      title: appointments.title,
      physician: appointments.physician,
      completed: appointments.completed,
      createdAt: appointments.createdAt,
      patientId: appointments.patientId,
      firstName: patients.firstName,
      lastName: patients.lastName,
      email: patients.email,
      phone: patients.phone,
    })
    .from(appointments)
    .leftJoin(patients, eq(appointments.patientId, patients.id))
    .orderBy(appointments.createdAt);
  return results;
}
