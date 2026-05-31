import React from "react";

export const dynamic = "force-dynamic";
import Link from "next/link";
import {
  getPatientSearchResults,
  getAllPatients,
} from "@/lib/queries/getPatients";
import { Button } from "@/components/ui/button";
import { DeletePatientButton } from "@/components/DeletePatientButton";

export const metadata = {
  title: "Patients",
};

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Patients({ searchParams }: Props) {
  const { searchText } = await searchParams;

  const patients = searchText
    ? await getPatientSearchResults(searchText)
    : await getAllPatients();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Patients</h2>
        <Button asChild>
          <Link href="/patients/form">New Patient</Link>
        </Button>
      </div>

      <form className="flex gap-2 max-w-sm" method="GET">
        <input
          type="text"
          name="searchText"
          defaultValue={searchText}
          placeholder="Search patients..."
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button type="submit">Search</Button>
        {searchText && (
          <Button variant="outline" asChild>
            <Link href="/patients">Clear</Link>
          </Button>
        )}
      </form>

      {patients.length === 0 ? (
        <p className="text-muted-foreground">No patients found.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left font-medium">ID</th>
                <th className="p-3 text-left font-medium">Name</th>
                <th className="p-3 text-left font-medium">Email</th>
                <th className="p-3 text-left font-medium">Phone</th>
                <th className="p-3 text-left font-medium">City</th>
                <th className="p-3 text-left font-medium">State</th>
                <th className="p-3 text-left font-medium">Active</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-t hover:bg-muted/50">
                  <td className="p-3">{patient.id}</td>
                  <td className="p-3">
                    {patient.lastName}, {patient.firstName}
                  </td>
                  <td className="p-3">{patient.email}</td>
                  <td className="p-3">{patient.phone}</td>
                  <td className="p-3">{patient.city}</td>
                  <td className="p-3">{patient.state}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        patient.active
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {patient.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/patients/form?patientId=${patient.id}`}>
                        Edit
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/appointments/form?patientId=${patient.id}`}>
                        New Appt
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/patients/${patient.id}/appointments`}>
                        History
                      </Link>
                    </Button>
                    <DeletePatientButton
                      patientId={patient.id}
                      patientName={`${patient.firstName} ${patient.lastName}`}
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
