// NET.js – FINAL · NC conform · iki1uc

import { SUS } from "./SUS.js";
import { SUS_load } from "./SUS.load";
import { SUS_save } from "./SUS.save";
import { SUS_shiftVEC } from "./SUS.shiftVEC";
import { SUS_list } from "./SUS.list";
import { SUS_scanRESPO } from "./SUS.scanRESPO";
import { EYE } from "./EYE.js";

export const NET = {
  MOD: "NET",
  TYPE: "Soft-Landing",
  CORE: "iki1uc",
  VERSION: "1.0",
  STATUS: "active",

  modules: [SUS, EYE],

  run(vec) {
    return SUS.run(vec);
  },

  load(respo) {
    return SUS_load(respo);
  },

  save(memory) {
    return SUS_save(memory);
  },

  shiftVEC(state) {
    return SUS_shiftVEC(state);
  },

  list(memory) {
    return SUS_list(memory);
  },

  respo(respo) {
    return SUS_scanRESPO(respo);
  },

  eye(respo) {
    return EYE.view(respo);
  }
};
