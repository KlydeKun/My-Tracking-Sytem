"use client";

import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
  const router = useRouter();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(false);
  const [alertClose, setAlertClose] = useState(false);

  const handleDeleteIssue = async () => {
    try {
      setLoadingDelete(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch {
      setError(true);
      if (!error) setAlertClose(false);
    }
  };

  return (
    <>
      <AlertDialog.Root open={alertClose}>
        <AlertDialog.Trigger>
          <Button
            variant="outline"
            color="ruby"
            className="hover:cursor-pointer"
            onClick={() => setAlertClose(true)}
          >
            Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Confirmation</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? Once deleted, it cannot
            be undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button
                variant="outline"
                color="gray"
                onClick={() => setAlertClose(false)}
              >
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
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error Deleting Issue</AlertDialog.Title>
          <AlertDialog.Description>
            An error occurred deleting the issue. Please try again or contact
            support if it persists.
          </AlertDialog.Description>
          <Flex mt="4">
            <Button
              variant="outline"
              color="gray"
              onClick={() => setError(false)}
            >
              Okay
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
