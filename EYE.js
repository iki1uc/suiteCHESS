// EYE.js – neutraler RESPO‑Viewer

export const EYE = {
  mode: "neutral",
  bind: false,
  scan: true,

  view(respo) {
    return {
      mode: "neutral",
      seen: {
        OK: respo.OK,
        NOK: respo.NOK,
        FLOW: respo.FLOW,
        BREAK: respo.BREAK,
        ECHO: respo.ECHO,
        VOID: respo.VOID,
        ROOT: respo.ROOT
      },
      bind: false
    };
  }
};

console.log("EYE bereit.");
