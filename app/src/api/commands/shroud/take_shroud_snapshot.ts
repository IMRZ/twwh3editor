import { invokeRunScript } from '@/api/loadstring';

export function takeShroudSnapshot() {
  return invokeRunScript<void>('cm:take_shroud_snapshot();');
}
