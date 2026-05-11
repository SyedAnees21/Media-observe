use crate::prometheus::types::{
    MetricDefinition,
    MetricKind,
};

use serde::Deserialize;

#[derive(Deserialize)]
pub struct PromResponse {
    pub data: PromData,
}

#[derive(Deserialize)]
pub struct PromData {
    pub result: Vec<PromResult>,
}

#[derive(Deserialize)]
pub struct PromResult {
    pub value: (f64, String),
}

pub fn build_query(
    metric: &MetricDefinition,
) -> String {

    match &metric.kind {

        MetricKind::Gauge => {
            metric.name.clone()
        }

        MetricKind::CounterRate { window } => {
            format!(
                "rate({}[{}])",
                metric.name,
                window
            )
        }

        MetricKind::HistogramQuantile {
            quantile,
            window,
        } => {
            format!(
                "histogram_quantile({}, rate({}_bucket[{}]))",
                quantile,
                metric.name,
                window
            )
        }
    }
}

pub async fn execute_query(
    query: &str,
) -> Result<f64, reqwest::Error> {

    let url = format!(
        "http://localhost:9090/api/v1/query?query={}",
        query
    );

    let response =
        reqwest::get(url).await?;

    let body: PromResponse =
        response.json().await?;

    let value = body
        .data
        .result
        .first()
        .and_then(|r| {
            r.value.1.parse::<f64>().ok()
        })
        .unwrap_or(0.0);

    Ok(value)
}