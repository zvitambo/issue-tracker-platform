"use client";

import {Spinner} from "@/app/components/";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const [error, setError] = useState(false);
    const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const deleteIssue = async () => {

    try {
      setDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
    
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red'> Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
          <AlertDialog.Description size='2'>
            Are you sure you want to delete this Issue ? this action cannot be
            undone !
          </AlertDialog.Description>

          <Flex gap='3' mt='4' justify='end'>
            <AlertDialog.Cancel>
             
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant='solid' color='red' onClick={deleteIssue} disabled={deleting}>
                Delete Issue
                {deleting && <Spinner/>}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description size='2'>
            This Issue could not be deleted
          </AlertDialog.Description>

          <Button
            variant='soft'
            color='gray'
            mt='2'
            onClick={() => setError(false)}
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
