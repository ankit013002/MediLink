import { getPatient } from "@/lib/queries/getPatient";
import { getAppointment } from "@/lib/queries/getAppointment";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import AppointmentForm from "./AppointmentForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as KindeInit } from "@kinde/management-api-js";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { patientId, appointmentId } = await searchParams;

  if (!patientId && !appointmentId) {
    return {
      title: "Missing Appointment ID or Patient ID",
    };
  }
  if (patientId) {
    return {
      title: `New Ticket for Customer #${patientId}`,
    };
  }
  if (appointmentId) {
    return {
      title: `Edit Appointment #${appointmentId}`,
    };
  }
}

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

    const { getPermission, getUser } = getKindeServerSession();
    const [adminPermission, user] = await Promise.all([
      getPermission("admin"),
      getUser(),
    ]);
    const isAdmin = adminPermission?.isGranted;

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

      if (isAdmin) {
        KindeInit();
        const { users } = await Users.getUsers();
        const physicians = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];
        return <AppointmentForm patient={patient} physicians={physicians} />;
      } else {
        return <AppointmentForm patient={patient} />;
      }
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

      if (isAdmin) {
        KindeInit();
        const { users } = await Users.getUsers();
        const physicians = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];
        return (
          <AppointmentForm
            patient={patient}
            physicians={physicians}
            appointment={appointment}
          />
        );
      } else {
        const isEditable = user!.email === appointment.physician;
        return (
          <AppointmentForm
            patient={patient}
            appointment={appointment}
            isEditable={isEditable}
          />
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
