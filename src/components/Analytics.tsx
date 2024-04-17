'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const Analytics = () => {
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
};

export default Analytics;
