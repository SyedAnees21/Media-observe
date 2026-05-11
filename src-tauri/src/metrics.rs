use std::collections::HashMap;

use crate::prometheus::{
    fetch::fetch_metric,
    types::{MetricDefinition, MetricKind},
};

pub fn relay_metrics() -> Vec<MetricDefinition> {
    vec![
        MetricDefinition {
            name: "relay_active_streams".into(),

            kind: MetricKind::Gauge,
        },
        MetricDefinition {
            name: "relay_cpu_usage".into(),

            kind: MetricKind::Gauge,
        },
        MetricDefinition {
            name: "relay_memory_usage".into(),

            kind: MetricKind::Gauge,
        },
        MetricDefinition {
            name: "relay_streams_ingested_total".into(),

            kind: MetricKind::CounterRate {
                window: "5m".into(),
            },
        },
        MetricDefinition {
            name: "relay_latency_ms".into(),

            kind: MetricKind::HistogramQuantile {
                quantile: 0.95,
                window: "5m".into(),
            },
        },
    ]
}

pub async fn fetch_all_metrics() -> HashMap<String, f64> {
    let metrics = relay_metrics();
    let mut results = HashMap::new();

    for metric in metrics {
        let value = fetch_metric(&metric).await;
        results.insert(metric.name.clone(), value);
    }

    results
}
