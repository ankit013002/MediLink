import React from "react";
import { getPatient } from "@/lib/queries/getPatient";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import PatientForm from "./PatientForm";

export default async function partientFormPage({
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
