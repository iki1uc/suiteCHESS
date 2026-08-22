// SUS.js – funktionierende Systemsteuerung

import { PUSH } from "./stations/PUSH.js";
import { PULL } from "./stations/PULL.js";
import { SHIFT } from "./stations/SHIFT.js";
import { FLOW } from "./stations/FLOW.js";
import { BREAK } from "./stations/BREAK.js";
import { SPIN } from "./stations/SPIN.js";
import { RISE } from "./stations/RISE.js";
import { DROP } from "./stations/DROP.js";
import { ROOT } from "./stations/ROOT.js";

// RESPO-Definition
export const RESPO = {
  OK: "OK",
  NOK: "NOK",
  FLOW: "FLOW",
  BREAK: "BREAK",
  ECHO: "ECHO",
  VOID: "VOID",
  ROOT: "ROOT"
};

// SUS – Hauptsteuerung
export const SUS = {
  station: null,
  last: null,

  run(lage) {
    this.last = this.station;

    switch (lage) {
      case "PUSH":  this.station = PUSH.exec(lage); break;
      case "PULL":  this.station = PULL.exec(lage); break;
      case "SHIFT": this.station = SHIFT.exec(lage); break;
      case "FLOW":  this.station = FLOW.exec(lage); break;
      case "BREAK": this.station = BREAK.exec(lage); break;
      case "SPIN":  this.station = SPIN.exec(lage); break;
      case "RISE":  this.station = RISE.exec(lage); break;
      case "DROP":  this.station = DROP.exec(lage); break;
      case "ROOT":  this.station = ROOT.exec(lage); break;

      default:
        this.station = {
          status: "INVALID",
          message: "Unbekannte Lage",
          given: lage
        };
    }

    return this.station;
  }
};

// Debug-Ausgabe
console.log("SUS bereit.");
