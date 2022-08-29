import { invokeRunScript } from '@/api/loadstring';

export function showShroud(show: boolean) {
  return invokeRunScript<void>(`cm:show_shroud(${show});`);
}
