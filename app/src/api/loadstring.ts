import { invoke } from '@tauri-apps/api/tauri';

type ScriptResult<T> = {
  data?: T;
  error?: string;
};

export async function invokeRunScript<T = any>(script: string) {
  const data = {
    command: 'loadstring',
    args: script,
  };


  const result = await invoke<ScriptResult<T>>('mod_request', { data });

  if (result.error) {
    throw new Error(result.error);
  }

  return result.data;
}
