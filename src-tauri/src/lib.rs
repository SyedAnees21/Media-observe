mod commands;
mod dashboard;
mod metrics;
mod prometheus;

use commands::get_dashboard;

use std::time::Duration;
use tauri::Emitter;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.handle().clone();

            tauri::async_runtime::spawn(async move {
                loop {
                    let metrics = metrics::fetch_all_metrics().await;
                    app_handle.emit("metrics-update", metrics).unwrap();
                    tokio::time::sleep(Duration::from_secs(1)).await;
                }
            });

            Ok(())
        })
        .plugin(tauri_plugin_http::init())
        .invoke_handler(tauri::generate_handler![get_dashboard])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
