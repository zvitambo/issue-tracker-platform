import React from 'react'
import prisma from "@/prisma/client";
import dynamic from 'next/dynamic'
//import IssueForm from '../../_components/IssueForm';
import { notFound } from 'next/navigation';
import IssueFormSkeleton from './loading';
const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
    params: {id: string}
}

const EditIssuePage = async ({params: {id}}: Props) => {

    const issue = await prisma?.issue.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!issue) return notFound();
  return (
   <IssueForm issue={issue}/>
  )
}

export default EditIssuePage