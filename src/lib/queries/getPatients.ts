"use server";

import { db } from "@/db";
import { patients } from "@/db/schema";
import { ilike, or } from "drizzle-orm";

export async function getPatientSearchResults(searchText: string) {
  const results = await db
    .select({
      id: patients.id,
      firstName: patients.firstName,
      lastName: patients.lastName,
      email: patients.email,
      phone: patients.phone,
      city: patients.city,
      state: patients.state,
      active: patients.active,
    })
    .from(patients)
    .where(
      or(
        ilike(patients.firstName, `%${searchText}%`),
        ilike(patients.lastName, `%${searchText}%`),
        ilike(patients.email, `%${searchText}%`),
        ilike(patients.phone, `%${searchText}%`),
        ilike(patients.city, `%${searchText}%`),
      ),
    )
    .orderBy(patients.lastName, patients.firstName);
  return results;
}

export async function getAllPatients() {
  const results = await db
    .select({
      id: patients.id,
      firstName: patients.firstName,
      lastName: patients.lastName,
      email: patients.email,
      phone: patients.phone,
      city: patients.city,
      state: patients.state,
      active: patients.active,
    })
    .from(patients)
    .orderBy(patients.lastName, patients.firstName);
  return results;
}
