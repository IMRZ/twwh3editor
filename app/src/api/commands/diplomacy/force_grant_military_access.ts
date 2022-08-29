import { Faction } from '@/types';
import { invokeRunScript } from '@/api/loadstring';

type Args = {
  a: Faction;
  b: Faction;
};

export function forceGrantMilitaryAccess(args: Args) {
  return invokeRunScript<void>(script(args));
}

const script = (args: Args) => /* lua */ `
cm:force_grant_military_access('${args.a.key}', '${args.b.key}', false);
`;
