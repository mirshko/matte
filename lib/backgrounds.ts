export type Background = {
  r: number;
  g: number;
  b: number;
  alpha: number;
};

export type BackgroundColors =
  | "White"
  | "Black"
  | "Blue"
  | "Green"
  | "Indigo"
  | "Orange"
  | "Pink"
  | "Purple"
  | "Red"
  | "Teal"
  | "Yellow";

const backgrounds: Record<BackgroundColors, Background> = {
  White: {
    r: 255,
    g: 255,
    b: 255,
    alpha: 1,
  },
  Black: {
    r: 0,
    g: 0,
    b: 0,
    alpha: 1,
  },
  Blue: {
    r: 0,
    g: 122,
    b: 255,
    alpha: 1,
  },
  Green: {
    r: 52,
    g: 199,
    b: 89,
    alpha: 1,
  },
  Indigo: {
    r: 88,
    g: 86,
    b: 214,
    alpha: 1,
  },
  Orange: {
    r: 255,
    g: 149,
    b: 0,
    alpha: 1,
  },
  Pink: {
    r: 255,
    g: 45,
    b: 85,
    alpha: 1,
  },
  Purple: {
    r: 175,
    g: 82,
    b: 222,
    alpha: 1,
  },
  Red: {
    r: 255,
    g: 59,
    b: 48,
    alpha: 1,
  },
  Teal: {
    r: 90,
    g: 200,
    b: 250,
    alpha: 1,
  },
  Yellow: {
    r: 255,
    g: 204,
    b: 0,
    alpha: 1,
  },
};

export default backgrounds;
