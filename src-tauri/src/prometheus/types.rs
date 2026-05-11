#[derive(Clone)]
pub enum MetricKind {
    Gauge,

    CounterRate {
        window: String,
    },

    HistogramQuantile {
        quantile: f64,
        window: String,
    },
}

#[derive(Clone)]
pub struct MetricDefinition {
    pub name: String,
    pub kind: MetricKind,
}