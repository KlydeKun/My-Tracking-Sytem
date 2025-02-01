import React from "react";
import { Table, Link } from "@radix-ui/themes";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueActions from "./IssueActions";
import prisma from "@/prisma/client";
import PriorityStatusBadge from "../components/PriorityStatusBadge";

const IssuesPage = async () => {
  const issues = prisma.issue.findMany();
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Priority
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {(await issues).map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link
                  className="text-violet-600 hover:underline"
                  href={`/issues/${issue.id}`}
                >
                  {issue.title}
                </Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <PriorityStatusBadge priority={issue.priority} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
