import { Box, Card, Flex } from '@radix-ui/themes';
import { Skeleton } from "@/app/components";

const IssueDetailLoadingPage = () => {
  return (
    <Box className='max-w-3xl'>
      <Skeleton />
      <Flex gap='4' my='2'>
        <Skeleton width={"5rem"} />
        <Skeleton width={"8rem"} />
      </Flex>
      <Card className='prose' mt='4'>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
}

export default IssueDetailLoadingPage;