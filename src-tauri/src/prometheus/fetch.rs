use crate::prometheus::{
    query::{build_query, execute_query},
    types::MetricDefinition,
};

pub async fn fetch_metric(
    metric: &MetricDefinition,
) -> f64 {

    let query = build_query(metric);

    execute_query(&query)
        .await
        .unwrap_or(0.0)
}