export const passportFormats = {
  USA: 'LDDDDDDDD',
  Canada: 'LLDDDDDD',
  Ireland: 'AADDDDDDD',
  Japan: 'LLDDDDDDD',
} as const;

export type PassportCountry = keyof typeof passportFormats;
export type PassportFormatToken = 'A' | 'L' | 'D';
