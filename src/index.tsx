import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MetricsDebugOverlay, MetricsProvider } from '@cabify/prom-react';
import { callConfig, customPromMetrics } from './constants';
import OutsideCallConsumer from 'react-outside-call';

ReactDOM.render(
  <MetricsProvider
    appName="jarvis"
    owner="asserts"
    metricsAggregatorUrl={
      process.env.NODE_ENV === 'production' ? '<AGGREGATOR_URL>' : undefined
    }
    customMetrics={customPromMetrics}
  >
    <OutsideCallConsumer config={callConfig}>
      <App />
    </OutsideCallConsumer>
    <MetricsDebugOverlay withLogger />
  </MetricsProvider>,
  document.getElementById('root'),
);
