"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  insertAppointmentSchema,
  insertAppointmentSchemaType,
} from "@/zod-schemas/appointments";
import { selectPatientSchemaType } from "@/zod-schemas/patient";
import { useForm } from "react-hook-form";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { Button } from "@/components/ui/button";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";
import { saveAppointmentAction } from "@/lib/actions/saveAppointmentAction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

type Props = {
  patient: selectPatientSchemaType;
  appointment?: insertAppointmentSchemaType;
  physicians?: {
    id: string;
    description: string;
  }[];
  isEditable?: boolean;
};

export default function AppointmentForm({
  patient,
  appointment,
  physicians,
  isEditable = true,
}: Props) {
  const isAdmin = Array.isArray(physicians);
  const router = useRouter();

  const defaultValues: insertAppointmentSchemaType = {
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
    defaultValues: defaultValues,
  });

  async function submitForm(data: insertAppointmentSchemaType) {
    try {
      const result = await saveAppointmentAction(data);
      toast.success(result.message);
      router.push("/appointments");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the appointment.");
    }
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {appointment?.id ? "Edit" : "New"} Appointment{" "}
          {appointment?.id && appointment.id !== "(New)"
            ? `#${appointment.id}`
            : "Form"}
        </h2>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col sm:flex-row gap-4 sm:gap-8"
          onSubmit={form.handleSubmit(submitForm)}
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertAppointmentSchemaType>
              fieldTitle="Title"
              nameInSchema="title"
              disabled={!isEditable}
            />

            {isAdmin ? (
              <SelectWithLabel<insertAppointmentSchemaType>
                fieldTitle="Physician"
                nameInSchema="physician"
                data={[
                  {
                    id: "new-appointment@example.com",
                    description: "new-appointment@example.com",
                  },
                  ...physicians,
                ]}
              />
            ) : (
              <InputWithLabel<insertAppointmentSchemaType>
                fieldTitle="Physician"
                nameInSchema="physician"
                readOnly={true}
              />
            )}

            {appointment?.id && (
              <CheckboxWithLabel<insertAppointmentSchemaType>
                fieldTitle="Completed"
                nameInSchema="completed"
                message="Yes"
                disabled={!isEditable}
              />
            )}

            <div className="mt-4 space-y-2">
              <h3 className="text-lg">Patient Info</h3>
              <hr className="w-4/5" />
              <p>
                {patient.firstName} {patient.lastName}
              </p>
              <p>{patient.address1}</p>
              {patient.address2 ? <p>{patient.address2}</p> : null}
              <p>
                {patient.city}, {patient.state} {patient.zip}
              </p>
              <hr className="w-4/5" />
              <p>Email: {patient.email}</p>
              <p>Phone: {patient.phone}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <TextAreaWithLabel<insertAppointmentSchemaType>
              fieldTitle="Reason for Visit"
              nameInSchema="description"
              className="h-96"
              disabled={!isEditable}
            />

            {isEditable && (
              <>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="w-3/4"
                    variant="default"
                    title="Save"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Saving…" : "Save"}
                  </Button>
                  <Button
                    onClick={() => form.reset(defaultValues)}
                    type="button"
                    variant="destructive"
                    title="Reset"
                    disabled={form.formState.isSubmitting}
                  >
                    Reset
                  </Button>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/appointments">Cancel</Link>
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
