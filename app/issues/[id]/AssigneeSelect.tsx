"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {Skeleton} from "@/app/components"
import toast, {Toaster} from "react-hot-toast"

const AssigneeSelect = ({issue}:{issue: Issue}) => {
  const {
    data: users,
    error,
    isLoading,
  } = useUsers();

  if (isLoading) return <Skeleton/>;
  if (error) return null;

  const assignIssue = (userId: string) => {
          axios.patch(`/api/issues/${issue.id}`, {
            assignedToUserId: userId.trim() ? userId : null,
          }).catch((err)=> toast.error("An error occurred, changes were not saved"));
        }

  // const [users, setUsers] = useState<User[]>([]);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data } = await axios.get<User[]>("/api/users/");
  //     setUsers(data);
  //   };
  //   fetchUsers();
  // }, []);

  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={" "}>Unassigned</Select.Item>
            {users?.map((user) => {
              return (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              );
            })}
          </Select.Group>
          <Select.Separator />
        </Select.Content>
      </Select.Root>
    </>
  );
};

const useUsers = () =>  useQuery<User[]>({
  queryKey: ["users"],
  queryFn: () => axios.get("/api/users/").then((response) => response.data),
  staleTime: 60 * 1000 * 60,
  retry: 3,
});

export default AssigneeSelect;
