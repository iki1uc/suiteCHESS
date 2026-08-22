// ID.js – Neutral Core · iki1uc

import { SUS } from "./SUS.js";
import { RESPO } from "./SUS.js";

export const ID = {
  MOD: "ID",
  TYPE: "Soft-Landing",
  CORE: "iki1uc",
  VERSION: "1.0",
  STATUS: "active",

  glyphs: {
    OK: "𐄷",
    NOK: "𐄹",
    FLOW: "𐄺",
    BREAK: "𐄼",
    ECHO: "𐄽",
    VOID: "𐄾",
    ROOT: "𐄿"
  },

  identity() {
    return {
      mode: SUS.mode || "neutral",
      can: SUS.can || [],
      cannot: SUS.cannot || [],
      degree: "360°",
      percent: "100%",
      nc: "NC²□"
    };
  },

  respoGlyphs() {
    const out = {};
    for (const key in RESPO) {
      out[key] = this.glyphs[key];
    }
    return out;
  }
};
