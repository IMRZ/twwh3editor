import { invokeRunScript } from '@/api/loadstring';

type TeleportArgs = {
  cqi: number;
  x: number;
  y: number;
};

export function teleport(args: TeleportArgs) {
  return invokeRunScript<void>(script(args));
}

const script = (args: TeleportArgs) => /* lua */ `
local char_lookup = 'character_cqi:' .. ${args.cqi};
cm:teleport_to(char_lookup, ${args.x}, ${args.y});
`;
