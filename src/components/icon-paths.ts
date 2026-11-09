// Catálogo único para renderização, tipagem e validação.
export const iconPaths = {
  doc: ["M4 4h16v16H4z"],
  plus: ["M12 5v14M5 12h14"],
  alura: ["M4 6l8-4 8 4-8 4-8-4z", "M4 6v8l8 4 8-4V6"],
};

export type IconName = keyof typeof iconPaths;
