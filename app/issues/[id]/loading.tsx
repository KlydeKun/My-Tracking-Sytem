import { Box, Card, Flex, Skeleton } from "@radix-ui/themes";
import React from "react";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex className="space-x-3" my="3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
