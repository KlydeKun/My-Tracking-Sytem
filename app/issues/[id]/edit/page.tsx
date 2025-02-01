import React from "react";
import IssueForm from "@/app/issues/components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;

  const editIssue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!editIssue) notFound();

  return <IssueForm issue={editIssue} />;
};

export default EditIssuePage;
