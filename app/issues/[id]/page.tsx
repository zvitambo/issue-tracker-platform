import React from 'react'
import prisma from "@/prisma/client";
import { notFound } from 'next/navigation'
import { Heading, Flex, Text, Card } from "@radix-ui/themes";
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkdown from 'react-markdown';

interface Props {
    params: {id: string}
}

const IssueDetailPage = async ({params: {id}}: Props) => {
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    })

    if (!issue) return notFound;
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="2">
        <IssueStatusBadge status={issue.status}/>
       <Text>{issue.createdAt.toDateString()}      </Text> </Flex>
       <Card className="prose" mt='4'><ReactMarkdown>{issue.description}</ReactMarkdown></Card>
      
    </div>
  );
}       

export default IssueDetailPage;