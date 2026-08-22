// WHIRL.js – 81 Tunnel · NC²□ Drift · iki1uc

import { RESPO } from "./SUS.js";
import { SUS_scanRESPO } from "./SUS.scanRESPO";

export const WHIRL = {
  MOD: "WHIRL",
  TYPE: "Soft-Landing",
  CORE: "iki1uc",
  VERSION: "1.0",
  STATUS: "active",

  colors: {
    OK: "green",
    FLOW: "yellow",
    BREAK: "red",
    NOK: "red",
    ECHO: "yellow",
    VOID: "red",
    ROOT: "green"
  },

  tunnel() {
    const scan = SUS_scanRESPO(RESPO);
    const keys = Object.keys(scan.respo);

    const out = [];

    for (let i = 0; i < 81; i++) {
      const key = keys[i % keys.length];
      out.push({
        cell: i,
        respo: key,
        color: this.colors[key],
        degree: "360°",
        percent: "100%",
        nc: "NC²□"
      });
    }

    return out;
  }
};
