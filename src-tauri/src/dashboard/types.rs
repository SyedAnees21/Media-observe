use serde::Serialize;

#[derive(Clone, Serialize)]
pub enum VisualizationType {
    Gauge,
    LineChart,
    Counter,
    Histogram,
}

#[derive(Clone, Serialize)]
pub struct PanelDefinition {
    pub id: String,
    pub title: String,
    pub description: String,
    pub metric: String,
    pub visualization: VisualizationType,
    pub unit: String,
}

#[derive(Clone, Serialize)]
pub struct DashboardDefinition {
    pub id: String,
    pub title: String,
    pub panels: Vec<PanelDefinition>,
}