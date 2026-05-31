import React from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";
import { db } from "@/db";
import { patients, appointments } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const [
    [totalPatients],
    [activePatients],
    [totalAppointments],
    [openAppointments],
  ] = await Promise.all([
    db.select({ count: count() }).from(patients),
    db
      .select({ count: count() })
      .from(patients)
      .where(eq(patients.active, true)),
    db.select({ count: count() }).from(appointments),
    db
      .select({ count: count() })
      .from(appointments)
      .where(eq(appointments.completed, false)),
  ]);

  const recentAppointments = await db
    .select({
      id: appointments.id,
      title: appointments.title,
      physician: appointments.physician,
      completed: appointments.completed,
      createdAt: appointments.createdAt,
      firstName: patients.firstName,
      lastName: patients.lastName,
    })
    .from(appointments)
    .leftJoin(patients, eq(appointments.patientId, patients.id))
    .orderBy(appointments.createdAt)
    .limit(5);

  return (
    <div className="flex flex-col gap-6 p-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Total Patients</p>
          <p className="text-3xl font-bold">{totalPatients.count}</p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Active Patients</p>
          <p className="text-3xl font-bold">{activePatients.count}</p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Total Appointments</p>
          <p className="text-3xl font-bold">{totalAppointments.count}</p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Open Appointments</p>
          <p className="text-3xl font-bold">{openAppointments.count}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/patients/form">New Patient</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/patients">View All Patients</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/appointments">View All Appointments</Link>
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Recent Appointments</h3>
        {recentAppointments.length === 0 ? (
          <p className="text-muted-foreground">No appointments yet.</p>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-medium">ID</th>
                  <th className="p-3 text-left font-medium">Title</th>
                  <th className="p-3 text-left font-medium">Patient</th>
                  <th className="p-3 text-left font-medium">Physician</th>
                  <th className="p-3 text-left font-medium">Status</th>
                  <th className="p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((appt) => (
                  <tr key={appt.id} className="border-t hover:bg-muted/50">
                    <td className="p-3">{appt.id}</td>
                    <td className="p-3">{appt.title}</td>
                    <td className="p-3">
                      {appt.lastName}, {appt.firstName}
                    </td>
                    <td className="p-3">{appt.physician}</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          appt.completed
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {appt.completed ? "Completed" : "Open"}
                      </span>
                    </td>
                    <td className="p-3">
                      <Button asChild size="sm" variant="outline">
                        <Link
                          href={`/appointments/form?appointmentId=${appt.id}`}
                        >
                          Edit
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
