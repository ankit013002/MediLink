"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  insertPatientSchema,
  type insertPatientSchemaType,
  type selectPatientSchemaType,
} from "@/zod-schemas/patient";

type Props = {
  patient?: selectPatientSchemaType;
};

export default function PatientForm({ patient }: Props) {
  const defaultValues: insertPatientSchemaType = {
    id: patient?.id ?? 0,
    firstName: patient?.firstName ?? "",
    lastName: patient?.lastName ?? "",
    address1: patient?.address1 ?? "",
    address2: patient?.address2 ?? "",
    city: patient?.city ?? "",
    state: patient?.state ?? "",
    zip: patient?.zip ?? "",
    phone: patient?.phone ?? "",
    email: patient?.email ?? "",
    notes: patient?.notes ?? "",
  };

  const form = useForm<insertPatientSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertPatientSchema),
    defaultValues: defaultValues,
  });

  async function submitForm(data: insertPatientSchemaType) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {patient?.id ? "Edit" : "New"} Customer Form
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
