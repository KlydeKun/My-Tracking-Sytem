"use client";

import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
// import { SimpleMdeReact } from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const { push } = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const createSubmitIssue = handleSubmit(async (data: IssueForm) => {
    try {
      setLoadingSubmit(true);
      await axios.post("/api/issues", data);
      push("/issues");
    } catch {
      setLoadingSubmit(false);
      setError("An unexpected error occurred. Please try again.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={createSubmitIssue}>
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={loadingSubmit}>
          Submit New Issue
          <Spinner loading={loadingSubmit} />
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
