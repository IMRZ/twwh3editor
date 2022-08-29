import { Faction } from '@/types';
import { invokeRunScript } from '@/api/loadstring';

type Args = {
  a: Faction;
  b: Faction;
  isMilitaryAlliance: boolean;
};

export function forceAlliance(args: Args) {
  return invokeRunScript<void>(script(args));
}

const script = (args: Args) => /* lua */ `
cm:force_alliance('${args.a.key}', '${args.b.key}', ${args.isMilitaryAlliance});
`;
