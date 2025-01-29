"use client";

import { Button, TextField } from "@radix-ui/themes";
import { SimpleMdeReact } from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { push } = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const createIssueSubmit = handleSubmit(async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      push("/issues");
    } catch (error) {
      console.log("Error creating issue", error);
    }
  });

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={createIssueSubmit}
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
  );
};

export default NewIssuePage;
