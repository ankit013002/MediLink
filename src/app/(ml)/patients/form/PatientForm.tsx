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
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";
import { StatesArray } from "@/constants/StatesArray";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";
import { generateMetadata } from "./page";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

type Props = {
  patient?: selectPatientSchemaType;
};

export default function PatientForm({ patient }: Props) {
  const { getPermission, isLoading } = useKindeBrowserClient();
  const isAdmin = !isLoading && getPermission("admin")?.isGranted;

  // const permObj = getPermissions();
  // To get different permissions that user has. Just a way to get multiple
  // const isAuthorized =
  //   !isLoading && permObj.permissions.some((perm) => perm === "admin" || perm === "physician");

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
    active: patient?.active ?? true,
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
          {patient?.id ? "Edit" : "New"} Patient{" "}
          {patient?.id ? `#${patient?.id}` : "Form"}
        </h2>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col md:flex-row gap-4 md:gap-8"
          onSubmit={form.handleSubmit(submitForm)}
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertPatientSchemaType>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />
            <InputWithLabel<insertPatientSchemaType>
              fieldTitle="Last Name"
              nameInSchema="lastName"
            />
            <InputWithLabel<insertPatientSchemaType>
              fieldTitle="Address 1"
              nameInSchema="address1"
            />
            <InputWithLabel<insertPatientSchemaType>
              fieldTitle="Address 2"
              nameInSchema="address2"
            />
            <InputWithLabel<insertPatientSchemaType>
              fieldTitle="City"
              nameInSchema="city"
            />

            <SelectWithLabel<insertPatientSchemaType>
              fieldTitle="State"
              nameInSchema="state"
              data={StatesArray}
            />
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertPatientSchemaType>
              fieldTitle="Zip Code"
              nameInSchema="zip"
            />
            <InputWithLabel<insertPatientSchemaType>
              fieldTitle="Email"
              nameInSchema="email"
            />
            <InputWithLabel<insertPatientSchemaType>
              fieldTitle="Phone"
              nameInSchema="phone"
            />

            <TextAreaWithLabel<insertPatientSchemaType>
              fieldTitle="Notes"
              nameInSchema="notes"
              className="h-40"
            />

            {isLoading ? (
              <p>Loading...</p>
            ) : (
              isAdmin &&
              patient?.id && (
                <CheckboxWithLabel<insertPatientSchemaType>
                  fieldTitle="Active"
                  nameInSchema="active"
                  message="Yes"
                />
              )
            )}

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
              >
                Save
              </Button>
              <Button
                onClick={() => form.reset(defaultValues)}
                type="button"
                variant="destructive"
                title="Reset"
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
