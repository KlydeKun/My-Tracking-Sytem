import { Box, Skeleton } from '@radix-ui/themes'
import React from 'react'

const LoadingNewIssuePage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton height="2rem" mb="1rem" />
      <Skeleton height="20rem" mb="2rem" />
      <Skeleton height="2rem" width="10rem" />
    </Box>
  )
}

export default LoadingNewIssuePage
