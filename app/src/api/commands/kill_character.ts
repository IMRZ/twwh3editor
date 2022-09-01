import { invokeRunScript } from '@/api/loadstring';

export type KillCharacterArgs = {
  cqi: string;
  destroyForce: boolean;
};

export function killCharacter(args: KillCharacterArgs) {
  return invokeRunScript<void>(script(args));
}

const script = (args: KillCharacterArgs) => /* lua */ `
cm:kill_character(${args.cqi}, ${args.destroyForce});
`;
