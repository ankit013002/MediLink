"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deletePatientAction } from "@/lib/actions/deletePatientAction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  patientId: number;
  patientName: string;
};

export function DeletePatientButton({ patientId, patientName }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete patient "${patientName}"? This will also delete all their appointments. This action cannot be undone.`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const result = await deletePatientAction(patientId);
      toast.success(result.message);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete patient.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting…" : "Delete"}
    </Button>
  );
}
