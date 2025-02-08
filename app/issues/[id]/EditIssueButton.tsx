import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({ issueId }: { issueId: string }) => {
  return (
    <Link href={`/issues/${issueId}/editIssue`} className="w-full">
      <Button asChild variant="outline" color="gray" className="hover:cursor-pointer">
        <span className="w-full block">Edit Issue</span>
      </Button>
    </Link>
  );
};

export default EditIssueButton;
