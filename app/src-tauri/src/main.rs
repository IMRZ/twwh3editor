#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use serde_json::Value;
use tauri::{Manager, Window};
mod event;
mod wh;
mod characters;
mod ownership;
mod init;
mod session;

// pub struct AppState {
//     app_data: String,
// }

fn main() {
    tauri::Builder::default()
        // .manage(AppState {
        //     app_data: std::env::var("APPDATA").unwrap_or("".to_string())
        // })
        .setup(|app|{
            init::init_appdata_dir();

            let main_window1 = app.get_window("main").unwrap();
            let main_window2 = app.get_window("main").unwrap();
            let main_window3 = app.get_window("main").unwrap();

            session::emit_session(main_window3);
            characters::emit_characters(main_window1);
            ownership::emit_ownership(main_window2);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![mod_request, mod_init])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// https://github.com/notify-rs/notify
#[tauri::command]
async fn mod_init(window: Window) -> Result<(), ()> {
    event::do_event(window);
    return Ok(());
}

// async fn mod_init(window: Window, state: State<'_, AppState>) -> Result<(), ()> {
//     event::do_event(window);
//     return Ok(());
// }

#[tauri::command]
async fn mod_request(data: Value) -> Result<Option<Value>, String> {
    return wh::do_request(data);
}
