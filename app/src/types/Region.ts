export type Region = {
  cqi: number;
  key: string;
  name: string;
  province: {
    key: string;
    name: string;
  },
  settlement: Settlement;
};

export type Settlement = {
  cqi: number;
  x: number;
  y: number;
  climate: string;
  isPort: boolean;
};
