import create from 'zustand';
import { init as initCommand } from './commands';
import { Character, Region, Faction } from '@/types';
import { maps } from '@/data';

type AppState = {
  session?: number;
  campaign?: string;
  faction: string;
  regions: Region[];
  characters: Character[];
  factions: Record<string, Faction>;
  ownership: Record<string, string>;
  init: () => Promise<any>;

  cursorPosition: number[];
  setCursorPosition: (cp: number[]) => void;

  selectedItem: { type: string; cqi: number } | undefined;
  setSelectedItem: (item: { type: string; cqi: number } | undefined) => void;

  toImagePos: ([y, x]: L.LatLngTuple) => L.LatLngTuple;
  toGamePos: ([y, x]: L.LatLngTuple) => L.LatLngTuple;
};

export const useAppStore = create<AppState>()((set, get) => ({
  session: undefined,
  campaign: undefined,
  faction: '',
  regions: [],
  characters: [],
  factions: {},
  ownership: {},
  init: async () => {
    const result = await initCommand()
      .then((res) => {
        set({
          session: res.session,
          campaign: res.campaign,
          faction: res.faction,
          regions: res.regions,
          factions: res.factions,
        });
        return res;
      })
      .catch(() => {
        return null;
      });
    return result;
  },

  cursorPosition: [0, 0],
  setCursorPosition: (cursorPosition) => set(() => ({ cursorPosition })),

  selectedItem: undefined,
  setSelectedItem: (selectedItem) => set(() => ({ selectedItem })),

  toImagePos: ([y, x]) => {
    const campaign = get().campaign!;
    // @ts-ignore
    const { image, game } = maps[campaign];
    return [y * (image.height / game.height), x * (image.width / game.width)];
  },

  toGamePos: ([y, x]) => {
    const campaign = get().campaign!;
    // @ts-ignore
    const { image, game } = maps[campaign];
    return [Math.round(y / (image.height / game.height)), Math.round(x / (image.width / game.width))];
  }
}));
