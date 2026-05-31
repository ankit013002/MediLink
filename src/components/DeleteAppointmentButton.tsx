"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteAppointmentAction } from "@/lib/actions/deleteAppointmentAction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  appointmentId: number;
  title: string;
};

export function DeleteAppointmentButton({ appointmentId, title }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete appointment "${title}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const result = await deleteAppointmentAction(appointmentId);
      toast.success(result.message);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete appointment.");
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
