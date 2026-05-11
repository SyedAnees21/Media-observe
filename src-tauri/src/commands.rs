use crate::dashboard;


#[tauri::command]
pub fn get_dashboard()
-> dashboard::types::DashboardDefinition {
    dashboard::relay::relay_dashboard()
}