import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueActions = () => {
  return (
    <div>
      <div className="mb-5">
        <Link href={"/issues/newIssue"}>
          <Button
            variant="outline"
            color="gray"
            className="hover:cursor-pointer"
          >
            <PlusIcon />
            New issue
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default IssueActions;
