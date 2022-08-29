import { Faction } from '@/types';
import flag_unknown from './flag_unknown.webp';
import flag_unknown_rotated from './flag_unknown_rotated.webp';

export const flags: any = import.meta.glob('@/assets/flags/**/*.webp', {
  eager: true,
});

export function getFlag64(faction: Faction) {
  const resource = faction.flagPath.replace('ui\\flags\\', '');
  const url = flags[`/src/assets/flags/${resource}/mon_64.webp`].default;

  if (!url) {
    return flag_unknown;
  }

  return url;
}

export function getFlagRotated(faction: Faction) {
  if (!faction) {
    return flags['/src/assets/flags/abandoned/mon_rotated.webp'].default;
  }

  const resource = faction.flagPath.replace('ui\\flags\\', '');
  const url = flags[`/src/assets/flags/${resource}/mon_rotated.webp`].default;

  if (!url) {
    return flag_unknown_rotated;
  }

  return url;
}
