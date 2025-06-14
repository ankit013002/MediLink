import { getPatient } from "@/lib/queries/getPatient";
import { getAppointment } from "@/lib/queries/getAppointment";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";

export default async function AppointmentFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { patientId, appointmentId } = await searchParams;

    if (!patientId && !appointmentId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Patient ID or Appointment ID required to load form
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }

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

      if (!patient.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Patient ID: #{patientId} not active
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      console.log(patient);
    }

    if (appointmentId) {
      const appointment = await getAppointment(parseInt(appointmentId));

      if (!appointment) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Appointment ID: #{appointmentId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      const patient = await getPatient(appointment.patientId);

      console.log("Appointment: ", appointment);
      console.log("Patient: ", patient);
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
