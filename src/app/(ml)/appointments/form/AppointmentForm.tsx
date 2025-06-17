"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  insertAppointmentSchema,
  insertAppointmentSchemaType,
} from "@/zod-schemas/appointments";
import { selectPatientSchemaType } from "@/zod-schemas/patient";
import { useForm } from "react-hook-form";

type Props = {
  patient: selectPatientSchemaType;
  appointment?: insertAppointmentSchemaType;
};

export default function AppointmentForm({ patient, appointment }: Props) {
  const defaultValue: insertAppointmentSchemaType = {
    id: appointment?.id ?? "(New)",
    patientId: appointment?.patientId ?? patient.id,
    title: appointment?.title ?? "",
    description: appointment?.description ?? "",
    completed: appointment?.completed ?? false,
    physician: appointment?.physician ?? "",
  };

  const form = useForm<insertAppointmentSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertAppointmentSchema),
    defaultValues: defaultValue,
  });

  async function submitForm(data: insertAppointmentSchemaType) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {appointment?.id ? "Edit" : "New"} Appointment{" "}
          {appointment?.id ? `#${appointment?.id}}` : "Form"}
        </h2>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col sm:flex-row gap-4 sm:gap-8"
          onSubmit={form.handleSubmit(submitForm)}
        >
          <p>{JSON.stringify(form.getValues())}</p>
        </form>
      </Form>
    </div>
  );
}
