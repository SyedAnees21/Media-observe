import { invoke } from '@tauri-apps/api/core';
import { DashboardDefinition } from '../types/dashboard';

export async function fetchDashboard() {
  return invoke<DashboardDefinition>('get_dashboard');
}
