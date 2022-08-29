import { Faction } from '@/types';
import { invokeRunScript } from '@/api/loadstring';

type Args = {
  a: Faction;
  b: Faction;
};

export function forceMakeTradeAgreement(args: Args) {
  return invokeRunScript<void>(script(args));
}

const script = (args: Args) => /* lua */ `
cm:force_make_trade_agreement('${args.a.key}', '${args.b.key}');
`;
