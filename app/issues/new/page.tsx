"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { SimpleMdeReact } from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { push } = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState('');

  const createSubmitIssue = handleSubmit(async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      push("/issues");
    } catch {
      setError('An unexpected error occurred. Please try again.');
    }
  });

  return (
    <div className="max-w-xl">
      {error && <Callout.Root color="red" className="mb-5">
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
      <form
        className="space-y-3"
        onSubmit={createSubmitIssue}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Description" {...field} />
          )}
        ></Controller>
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
