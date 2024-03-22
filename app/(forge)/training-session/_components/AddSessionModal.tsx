"use client";
import React, { useMemo, useState, useTransition } from "react";

import { Modal } from "@/components/modals/Modal";
import useAddSessionModal from "@/hooks/useAddSessionModal";
import AddSessionForm, { FormSchema } from "./AddSessionForm";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createTrainingSession } from "../_actions/create-training-session";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

enum STEPS {
  SESSION = 0,
  RECORD = 1,
  SUBMIT = 2,
}

export const AddSessionModal = () => {
  const { onClose, isOpen } = useAddSessionModal();
  const [step, setStep] = useState<number>(STEPS.SESSION);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = async () => {
    setStep((value) => value + 1);
  };

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      details: "",
      duration: undefined,
      sessionType: undefined,
      intensity: undefined,
      date: new Date(),
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (step !== STEPS.SUBMIT) {
      onNext();
      return;
    }

    // TODO: Submit all formdata, session and record(s)

    // startTransition(async () => {
    //   const formData = new FormData();
    //   formData.append("details", data.details);
    //   formData.append("duration", String(data.duration));
    //   formData.append("sessionType", data.sessionType);
    //   formData.append("intensity", data.intensity);
    //   formData.append("date", data.date.toISOString());

    //   await createTrainingSession(formData);

    //   onClose();
    // });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.SUBMIT) return "Add session";

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.SESSION) return undefined;

    return "Back";
  }, [step]);

  const description = useMemo(() => {
    switch (step) {
      case 0:
        return "Enter the details of your training session.";
      case 1:
        return "Enter extra details on specific training rounds.";
      case 2:
        return "Make sure that your details are correct.";

      default:
        return "Enter the details of your training session.";
    }
  }, [step]);

  const formBody = useMemo(() => {
    switch (step) {
      case 0:
        return <AddSessionForm form={form} />;
      case 1:
        return <AddSessionForm form={form} />;
    }
  }, [step, form]);

  return (
    <Modal
      title="Add Training Session."
      description={description}
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {formBody}
        <Button
          type="submit"
          variant={"default"}
          disabled={isPending}
          className="w-full flex gap-2 bg-malibu-500 hover:bg-malibu-500/90"
        >
          <RotateCw
            color="white"
            className={cn("animate-spin", { hidden: !isPending })}
          />
          {actionLabel}
        </Button>
        {secondaryActionLabel && (
          <Button onClick={step === STEPS.SESSION ? undefined : onBack}>
            {secondaryActionLabel}
          </Button>
        )}
      </form>
    </Modal>
  );
};
