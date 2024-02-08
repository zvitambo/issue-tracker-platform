import React from "react";
import { Flex, Table } from "@radix-ui/themes";
import { Link, IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
//import IssueStatusBadge from "../components/IssueStatusBadge";

import delay from "delay";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";
import { useSearchParams } from "next/navigation";
import IssueTable from "./IssueTable";
import { columnNames } from "./IssueTable";
import { IssueQuery } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });
  //await delay(1000);

  return (
    <Flex direction="column" gap='3'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};
export const metadata: Metadata = {
  title: "Issue list",
  description:"View issues list"
}

export default IssuesPage;
