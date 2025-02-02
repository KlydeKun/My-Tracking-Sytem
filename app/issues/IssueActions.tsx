import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueActions = () => {
  return (
    <div>
      <div className="mb-5">
        <Button variant="surface" color="green">
          <PlusIcon />
          <Link href={"/issues/newIssue"}>New issue</Link>
        </Button>
      </div>
    </div>
  );
};

export default IssueActions;
