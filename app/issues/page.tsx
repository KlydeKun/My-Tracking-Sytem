import React from "react";
import { Table, Link } from "@radix-ui/themes";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueActions from "./IssueActions";
import prisma from "@/prisma/client";
import PriorityStatusBadge from "../components/PriorityStatusBadge";

const IssuesPage = async () => {
  const issues = prisma.issue.findMany();

  const dateFormatter = (issue: { createdAt: Date }) => {
    return new Date(issue.createdAt).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };
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
            <Table.ColumnHeaderCell>Priority</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Issue Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {(await issues).map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link
                  className="hover:underline"
                  href={`/issues/${issue.id}`}
                >
                  <span className="text-black">{issue.title.charAt(0).toUpperCase() + issue.title.slice(1)}</span>
                </Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell>
                <PriorityStatusBadge priority={issue.priority} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {dateFormatter(issue)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
