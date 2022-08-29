import { Faction } from '@/types';
import { invokeRunScript } from '@/api/loadstring';

type Args = {
  a: Faction;
  b: Faction;
};

export function factionOffersPeaceToOtherFaction(args: Args) {
  return invokeRunScript<void>(script(args));
}

const script = (args: Args) => /* lua */ `
cm:faction_offers_peace_to_other_faction('${args.a.key}', '${args.b.key}');
`;
