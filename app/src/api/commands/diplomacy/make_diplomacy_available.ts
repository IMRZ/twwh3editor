import { Faction } from '@/types';
import { invokeRunScript } from '@/api/loadstring';

type Args = {
  a: Faction;
  b: Faction;
};

export function makeDiplomacyAvailable(args: Args) {
  return invokeRunScript<void>(script(args));
}

const script = (args: Args) => /* lua */ `
cm:make_diplomacy_available('${args.a.key}', '${args.b.key}');
`;
