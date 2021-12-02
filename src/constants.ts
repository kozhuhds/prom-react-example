import { MetricDefinition, useMetrics } from '@cabify/prom-react';
import { createCaller } from 'react-outside-call';

export const PROM_UI_REQUEST_SECONDS_COUNT: MetricDefinition = {
  type: 'histogram',
  name: 'prom_ui_request_seconds_count',
  description: 'A metric for UI request latency',
  buckets: [0.2, 0.5, 1, 2, 5, 10],
};

export const customPromMetrics: MetricDefinition[] = [
  PROM_UI_REQUEST_SECONDS_COUNT,
];

export const callConfig = createCaller({
  // eslint-disable-next-line react-hooks/rules-of-hooks
  metrics: () => useMetrics(),
});
