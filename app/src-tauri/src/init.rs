use std::fs::{create_dir, File};

pub fn init_appdata_dir() {
    let appdata = std::env::var("APPDATA").unwrap_or("".to_string());
    let app_dir = format!("{}\\.twwh3editor", appdata);
    let file_characters = format!("{}\\characters.json", app_dir);
    let file_ownership = format!("{}\\ownership.json", app_dir);
    let file_session = format!("{}\\session.json", app_dir);
    let file_req = format!("{}\\req.json", app_dir);
    let file_res = format!("{}\\res.json", app_dir);

    create_dir(app_dir).ok();
    File::create(file_characters).ok();
    File::create(file_ownership).ok();
    File::create(file_session).ok();
    File::create(file_req).ok();
    File::create(file_res).ok();
}
