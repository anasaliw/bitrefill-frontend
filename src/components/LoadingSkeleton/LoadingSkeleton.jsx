import { Box, Skeleton } from "@mui/material";
import React from "react";

const LoadingSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          mt: "104px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Skeleton
          sx={{ height: 10, width: "80%", mb: 2 }}
          animation='wave'
          variant='rectangular'
        />
        <Skeleton
          sx={{ height: 100, width: "80%", mb: 2 }}
          animation='wave'
          variant='rectangular'
        />
        <Skeleton
          sx={{ height: 10, width: "80%", mb: 2 }}
          animation='wave'
          variant='rectangular'
        />
        <Skeleton
          sx={{ height: 100, width: "80%", mb: 2 }}
          animation='wave'
          variant='rectangular'
        />
        <Skeleton
          sx={{ height: 10, width: "80%", mb: 2 }}
          animation='wave'
          variant='rectangular'
        />
        <Skeleton
          sx={{ height: 100, width: "80%", mb: 2 }}
          animation='wave'
          variant='rectangular'
        />
      </Box>
    </>
  );
};

export default LoadingSkeleton;
