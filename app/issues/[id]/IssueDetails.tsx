import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import PriorityStatusBadge from "@/app/components/PriorityStatusBadge";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { DateFormatter } from "@/app/issues/page";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" align="center" my="3">
        <Text size="2">
          Status: <IssueStatusBadge status={issue.status} />
        </Text>
        <Text size="2">
          Priority: <PriorityStatusBadge priority={issue.priority} />
        </Text>
        <Text>{DateFormatter(issue)}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
