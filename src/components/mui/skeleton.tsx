'use client';

import { Skeleton as MuiSkeleton, SkeletonProps as MuiSkeletonProps } from '@mui/material';

export function Skeleton(props: MuiSkeletonProps) {
  return <MuiSkeleton {...props} />;
}
