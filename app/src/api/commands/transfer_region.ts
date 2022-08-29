import { invokeRunScript } from '@/api/loadstring';

type TransferRegionArgs = {
  region: string;
  faction: string;
};

export function transferRegion(args: TransferRegionArgs) {
  return invokeRunScript<void>(script(args));
}

const script = (args: TransferRegionArgs) => /* lua */ `
cm:transfer_region_to_faction('${args.region}', '${args.faction}');
local region = cm:get_region('${args.region}');
cm:heal_garrison(region:cqi());
`;
