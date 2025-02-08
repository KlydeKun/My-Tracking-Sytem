"use client";

import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
  const router = useRouter();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDeleteIssue = async () => {
    setLoadingDelete(true);
    try {
      await axios.delete(`/api/issues/${issueId}`);
    } catch (error) {
      console.error("Error deleting issue", error);
    } finally {
      router.push("/issues");
      router.refresh();
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="outline" color="ruby" className="hover:cursor-pointer">
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete Confirmation</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? Once deleted, it cannot be
          undone.
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant="outline" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <Button
            variant="outline"
            color="red"
            onClick={handleDeleteIssue}
            disabled={loadingDelete}
          >
            Confirm
            <Spinner loading={loadingDelete} />
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
