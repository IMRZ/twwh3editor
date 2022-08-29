use lazy_static::lazy_static;
use std::sync::Mutex;
use tauri::{Window};
use std::fs::OpenOptions;
use std::io::prelude::*;
use std::io::SeekFrom;
use std::{thread, time};

lazy_static! {
    static ref MUTEX: Mutex<bool> = Mutex::new(false);
    static ref READ_PATH: String = format!(
        "{}\\.twwh3editor\\ownership.json",
        std::env::var("APPDATA").unwrap_or("".to_string())
    );
}

pub fn do_event(window: Window) {
    let mut file = OpenOptions::new()
        .read(true)
        .open(&*READ_PATH)
        .expect("Unable to open res_file");

    std::thread::spawn(move || loop {
        let mut contents = String::new();
        file.seek(SeekFrom::Start(0)).unwrap();
        file
            .read_to_string(&mut contents)
            .expect("{}");

        window.emit("XXX", contents).unwrap();
        thread::sleep(time::Duration::from_millis(1000));
    });
}
