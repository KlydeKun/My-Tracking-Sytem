import React from "react";
import { Button } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const IssuesPage = () => {
  return (
    <div>
      <Button variant="surface" color='green'>
        <PlusIcon />
        <Link href={"/issues/new"}>New issue</Link>
      </Button>
    </div>
  );
};

export default IssuesPage;
