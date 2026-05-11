export type VisualizationType = 'Gauge' | 'LineChart' | 'Counter' | 'Histogram';

export interface PanelDefinition {
  id: string;
  title: string;
  description: string;
  metric: string;
  visualization: VisualizationType;
  unit: string;
}

export interface DashboardDefinition {
  id: string;
  title: string;
  panels: PanelDefinition[];
}
