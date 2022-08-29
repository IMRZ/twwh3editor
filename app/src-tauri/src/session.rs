use lazy_static::lazy_static;
use std::path::Path;
use tauri::Window;

use std::io::prelude::*;
use std::fs::OpenOptions;
use std::io::SeekFrom;

use notify::{ Watcher, RecursiveMode };
use futures::{ channel::mpsc::{channel}, SinkExt, StreamExt };

lazy_static! {
    static ref READ_PATH: String = format!(
        "{}\\.twwh3editor\\session.json",
        std::env::var("APPDATA").unwrap_or("".to_string())
    );
}

pub fn emit_session(window: Window) {
    tauri::async_runtime::spawn(async move {
        let (mut sender, mut receiver) = channel(1);
        let mut watcher = notify::recommended_watcher(move |res| {
            futures::executor::block_on(async {
                sender.send(res).await.unwrap();
            })
        }).unwrap();

        let path = Path::new(&*READ_PATH);
        watcher.watch(path, RecursiveMode::NonRecursive).unwrap();

        while let Some(res) = receiver.next().await {
            match res {
                Ok(_) => {
                    // println!("changed: {:?}", event);
                    let contents = read_file_contents();
                    window.emit("session", contents).unwrap();
                },
                Err(e) => println!("watch error: {:?}", e),
            }
        }
    });
}

fn read_file_contents() -> String {
    let mut file = OpenOptions::new()
        .read(true)
        .open(&*READ_PATH)
        .expect("Unable to open res_file");

    let mut contents = String::new();
        file.seek(SeekFrom::Start(0)).unwrap();
        file
            .read_to_string(&mut contents)
            .expect("{}");

    return contents;
}

// pub fn emit_session(window: Window) {
//     let (sender, receiver) = channel();
//     let mut watcher = notify::recommended_watcher(sender).unwrap();
//     let path = Path::new(&*READ_PATH);
//     watcher.watch(path, RecursiveMode::Recursive).unwrap();
//     loop {
//         match receiver.recv() {
//            Ok(event) => println!("{:?}", event),
//            Err(e) => println!("watch error: {:?}", e),
//         }
//     }
// }
