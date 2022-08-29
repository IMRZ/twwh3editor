import { invokeRunScript } from '@/api/loadstring';

export function restoreShroudFromSnapshot() {
  return invokeRunScript<void>('cm:restore_shroud_from_snapshot();');
}
