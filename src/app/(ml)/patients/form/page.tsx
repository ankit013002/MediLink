import React from "react";

export const dynamic = "force-dynamic";

import { getPatient } from "@/lib/queries/getPatient";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import PatientForm from "./PatientForm";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { patientId } = await searchParams;

  if (!patientId) {
    return { title: "New Patient" };
  }

  return { title: `Edit Patient #${patientId}` };
}

export default async function patientFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { patientId } = await searchParams;
    if (patientId) {
      const patient = await getPatient(parseInt(patientId));

      if (!patient) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Patient ID: #{patientId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      return <PatientForm patient={patient} />;
    } else {
      return <PatientForm />;
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
