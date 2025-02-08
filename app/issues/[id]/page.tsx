import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { cache } from "react";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchUser = cache((issueId: string) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  const issue = await fetchUser((id));
  if (!issue) notFound();

  return (
    <div>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Box>
          <IssueDetails issue={issue} />
        </Box>
        <Box>
          <EditIssueButton issueId={issue.id} />
        </Box>
      </Grid>
    </div>
  );
};

export default IssueDetailPage;
