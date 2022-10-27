import { invokeRunScript } from '@/api/loadstring';

export type InstantlySetSettlementPrimarySlotLevelArgs = {
  region: string;
  level: number;
};

export function instantlySetSettlementPrimarySlotLevel(
  args: InstantlySetSettlementPrimarySlotLevelArgs
) {
  console.log(script(args));
  return invokeRunScript<void>(script(args));
}

const script = (args: InstantlySetSettlementPrimarySlotLevelArgs) => /* lua */ `
local settlement = cm:get_region('${args.region}'):settlement();
cm:instantly_set_settlement_primary_slot_level(settlement, ${args.level});
`;
