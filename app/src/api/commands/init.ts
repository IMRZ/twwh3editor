import { invokeCommand } from '@/api/command';
import { Region, Faction } from '@/types';

type InitResult = {
  session: number;
  campaign: string;
  faction: string;
  regions: Region[];
  factions: Record<string, Faction>;
};

export function init() {
  return invokeCommand<InitResult>('init');
}
