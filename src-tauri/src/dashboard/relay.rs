use crate::dashboard::types::{DashboardDefinition, PanelDefinition, VisualizationType};

pub fn relay_dashboard() -> DashboardDefinition {
    DashboardDefinition {
        id: "relay-overview".into(),
        title: "Media Relay Overview".into(),

        panels: vec![
            PanelDefinition {
                id: "active-streams".into(),
                title: "Active Streams".into(),
                description: "Currently active relay streams".into(),
                metric: "relay_active_streams".into(),
                visualization: VisualizationType::Gauge,
                unit: "".into(),
            },
            PanelDefinition {
                id: "cpu".into(),
                title: "CPU Usage".into(),
                description: "Current relay CPU usage".into(),
                metric: "relay_cpu_usage".into(),
                visualization: VisualizationType::Gauge,
                unit: "%".into(),
            },
            PanelDefinition {
                id: "memory".into(),
                title: "Memory Usage".into(),
                description: "Current relay memory usage".into(),
                metric: "relay_memory_usage".into(),
                visualization: VisualizationType::Gauge,
                unit: "%".into(),
            },
            PanelDefinition {
                id: "bandwidth".into(),
                title: "Bandwidth".into(),
                description: "Current network throughput".into(),
                metric: "relay_bandwidth_mbps".into(),
                visualization: VisualizationType::Gauge,
                unit: "Mbps".into(),
            },
            PanelDefinition {
                id: "ingest-rate".into(),
                title: "Ingest Rate".into(),
                description: "Incoming streams/sec".into(),
                metric: "relay_streams_ingested_total".into(),
                visualization: VisualizationType::Counter,
                unit: "/s".into(),
            },
            PanelDefinition {
                id: "latency-p95".into(),
                title: "Latency p95".into(),
                description: "95th percentile latency".into(),
                metric: "relay_latency_ms".into(),
                visualization: VisualizationType::Histogram,
                unit: "ms".into(),
            },
        ],
    }
}
