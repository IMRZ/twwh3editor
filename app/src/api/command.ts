import { invoke } from '@tauri-apps/api/tauri';

export async function invokeCommand<T = any>(command: string, args?: any) {
  const data = {
    command: command,
    args: args,
  };

  const result = await invoke<T>('mod_request', { data });

  return result;
}
