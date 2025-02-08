import { Button } from "@radix-ui/themes";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
  return (
    <Button variant="outline" color="ruby">
      Delete Issue
    </Button>
  );
};

export default DeleteIssueButton;
