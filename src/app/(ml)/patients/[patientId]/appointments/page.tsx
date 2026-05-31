import React from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { getPatient } from "@/lib/queries/getPatient";
import { getPatientAppointments } from "@/lib/queries/getPatientAppointments";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { DeleteAppointmentButton } from "@/components/DeleteAppointmentButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;
  return { title: `Appointments for Patient #${patientId}` };
}

export default async function PatientAppointmentsPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;
  const id = parseInt(patientId);

  const patient = await getPatient(id);
  if (!patient) notFound();

  const appts = await getPatientAppointments(id);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <BackButton title="Back" variant="outline" />
        <h2 className="text-2xl font-bold">
          Appointments — {patient.firstName} {patient.lastName}
        </h2>
      </div>

      <div className="flex gap-2 text-sm text-muted-foreground">
        <span>{patient.email}</span>
        <span>·</span>
        <span>{patient.phone}</span>
        <span>·</span>
        <span>
          {patient.city}, {patient.state}
        </span>
      </div>

      <div className="flex gap-2">
        <Button asChild>
          <Link href={`/appointments/form?patientId=${patient.id}`}>
            New Appointment
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/patients/form?patientId=${patient.id}`}>
            Edit Patient
          </Link>
        </Button>
      </div>

      {appts.length === 0 ? (
        <p className="text-muted-foreground">
          No appointments found for this patient.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left font-medium">ID</th>
                <th className="p-3 text-left font-medium">Title</th>
                <th className="p-3 text-left font-medium">Physician</th>
                <th className="p-3 text-left font-medium">Date</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appts.map((appt) => (
                <tr key={appt.id} className="border-t hover:bg-muted/50">
                  <td className="p-3">{appt.id}</td>
                  <td className="p-3">{appt.title}</td>
                  <td className="p-3">{appt.physician}</td>
                  <td className="p-3">
                    {new Date(appt.createdAt).toLocaleDateString()}
                  </td>
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
                  <td className="p-3 flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href={`/appointments/form?appointmentId=${appt.id}`}
                      >
                        Edit
                      </Link>
                    </Button>
                    <DeleteAppointmentButton
                      appointmentId={appt.id}
                      title={appt.title}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
