import React from 'react'
import { Status } from "@prisma/client";
import { Badge } from '@radix-ui/themes';

interface Props {
    status: Status
}

const statusMap: Record<Status, { label: string; color: "red" | "violet"| "green" }> = {
  OPEN: { label: "open", color: 'red' },
  IN_PROGRESS: { label: "in progress", color: "violet" },
  CLOSED: { label: "closed", color: "green" },
};

const IssueStatusBadge = ({status}: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
}

export default IssueStatusBadge