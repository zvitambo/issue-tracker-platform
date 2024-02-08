import React from "react";
import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inprogress: number;
  closed: number;
}

const IssueSummary = ({ open, inprogress, closed }: Props) => {
  const statuses: { label: string; value: number; status: Status }[] = [
    { label: "open", value: open, status: "OPEN" },
    { label: "inprogress", value: inprogress, status: "IN_PROGRESS" },
    { label: "closed", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="5">
      {statuses.map((status) => {
        return (
          <Card key={status.label}>
            <Flex direction='column' gap="1">
              <Link
                href={`/issues/list?status=${status.status}`}
                className='text-sm font-medium'
              >
                {status.label}
              </Link>
              <Text size='5' className='font-bold'>
                {status.value}
              </Text>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

export default IssueSummary;
