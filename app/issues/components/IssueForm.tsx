"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Priority } from "@prisma/client";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Flex,
  Select,
  Spinner,
  TextField,
  Text
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

const priorityItems: { id: Priority; label: string }[] = [
  { id: "LOW", label: "Low" },
  { id: "MEDIUM", label: "Medium" },
  { id: "HIGH", label: "High" },
  { id: "CRITICAL", label: "Critical" },
];

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const { push } = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const createSubmitIssue = handleSubmit(async (data: IssueFormData) => {
    try {
      setLoadingSubmit(true);
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);
      push("/issues");
    } catch {
      setLoadingSubmit(false);
      setError("An unexpected error occurred. Please try again.");
    }
  });

  return (
    <div className="max-w-xl">
      <div className="mb-5">
        <Text className="text-lg font-semibold">{issue ? 'Update Created Issue': 'Add New Issue'}</Text>
      </div>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={createSubmitIssue}>
        <div className="flex flex-col md:flex-row gap-3">
          <TextField.Root
            className="w-full"
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
          <Controller
            name="priority"
            control={control}
            defaultValue={issue?.priority}
            render={({ field }) => (
              <Select.Root value={field.value} onValueChange={field.onChange}>
                <Select.Trigger placeholder="Set Priority" />
                <Select.Content color="gray">
                  <Select.Group>
                    {priorityItems.map((item) => (
                      <Select.Item key={item.id} value={item.id}>
                        {item.label}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            )}
          />
        </div>

        <Flex justify="between" mr="8">
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <ErrorMessage>{errors.priority?.message}</ErrorMessage>
        </Flex>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={loadingSubmit} variant="surface" color="ruby">
          <PaperPlaneIcon />
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          <Spinner loading={loadingSubmit} />
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
