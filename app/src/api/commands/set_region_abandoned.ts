import { invokeRunScript } from '@/api/loadstring';

type SetRegionAbandonedArgs = {
  region: string;
};

export function setRegionAbandoned(args: SetRegionAbandonedArgs) {
  return invokeRunScript<void>(script(args));
}

const script = (args: SetRegionAbandonedArgs) => /* lua */ `
cm:set_region_abandoned('${args.region}');
`;
