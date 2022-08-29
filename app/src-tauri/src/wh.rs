use lazy_static::lazy_static;
use retry::delay::Fixed;
use retry::{retry_with_index, OperationResult};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::fs::OpenOptions;
use std::io::prelude::*;
use std::io::SeekFrom;
use std::sync::Mutex;

lazy_static! {
    static ref MUTEX: Mutex<u64> = Mutex::new(0);

    static ref REQ_PATH: String = format!(
        "{}\\.twwh3editor\\req.json",
        std::env::var("APPDATA").unwrap_or("".to_string())
    );
    static ref RES_PATH: String = format!(
        "{}\\.twwh3editor\\res.json",
        std::env::var("APPDATA").unwrap_or("".to_string())
    );
}

#[derive(Serialize, Deserialize)]
struct ModRequest {
    id: u64,
    data: Value,
}

#[derive(Serialize, Deserialize)]
struct ModResponse {
    id: u64,
    data: Option<Value>,
    error: Option<Value>,
}

pub fn do_request(data: Value) -> Result<Option<Value>, String> {
    let mut id = MUTEX.lock().unwrap();
    *id += 1;

    let request = ModRequest {
        id: *id,
        data: data,
    };

    let mut req_file = OpenOptions::new()
        .write(true)
        .create(true)
        .truncate(true)
        .open(&*REQ_PATH)
        .expect("Unable to open req_file");

    let req_json = serde_json::to_string(&request).unwrap();
    req_file.write_all(req_json.as_bytes()).unwrap();

    let mut res_file = OpenOptions::new()
        .read(true)
        .open(&*RES_PATH)
        .expect("Unable to open res_file");

    let result = retry_with_index(Fixed::from_millis(100), |current_try| {
        if current_try > 20 {
            return OperationResult::Err("request timed out");
        }

        let mut res = String::new();
        res_file.seek(SeekFrom::Start(0)).unwrap();
        res_file
            .read_to_string(&mut res)
            .expect("Unable to read string");

        let response: Result<ModResponse, _> = serde_json::from_str(&res);

        match response {
            Ok(res) if res.id == *id => {
                if res.error.is_some() {
                    return OperationResult::Err("TODO: error response");
                }

                return OperationResult::Ok(res.data);
            }
            _ => OperationResult::Retry(""),
        }
    });

    match result {
        Ok(s) => return Ok(s),
        Err(s) => return Err(s.to_string()),
    };
}
