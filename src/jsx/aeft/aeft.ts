import {
  helloVoid,
  helloError,
  helloStr,
  helloNum,
  helloArrayStr,
  helloObj,
} from "../utils/samples";
export { helloError, helloStr, helloNum, helloArrayStr, helloObj, helloVoid };
import { dispatchTS } from "../utils/utils";

export const helloWorld = () => {
  alert("Hello from After Effects!");
  app.project.activeItem;
};


export const moveCTI = (deltaFrames: number) => {
  const comp = app.project.activeItem;

  if (comp && comp instanceof CompItem) {
    comp.time += deltaFrames * comp.frameDuration;
    return comp.time;
  }

  return "No active composition";
};

/*
|--------------------------------------------------------------------------
| Timeline Tools
|--------------------------------------------------------------------------
*/

export const deleteSelectedLayers = () => {
  app.beginUndoGroup("Sniprr Delete");

  const comp = app.project.activeItem;

  if (comp && comp.selectedLayers.length > 0) {
    const sel = comp.selectedLayers;

    for (let i = 0; i < sel.length; i++) {
      sel[i].remove();
    }
  }

  app.endUndoGroup();
};

export const trimSelectedLayers = (side: string) => {
  app.beginUndoGroup("Sniprr Trim");

  const comp = app.project.activeItem;

  if (comp && comp.selectedLayers.length > 0) {
    const sel = comp.selectedLayers;
    const t = comp.time;

    for (let i = 0; i < sel.length; i++) {
      const layer = sel[i];

      try {
        if (side === "left") {
          if (t < layer.outPoint) {
            layer.inPoint = t;
          }
        } else if (side === "right") {
          if (t > layer.inPoint) {
            layer.outPoint = t;
          }
        }
      } catch (e) {}
    }
  }

  app.endUndoGroup();
};

export const moveLayerPoint = (type: string) => {
  app.beginUndoGroup("Sniprr Move");

  const comp = app.project.activeItem;

  if (comp && comp.selectedLayers.length > 0) {
    const sel = comp.selectedLayers;
    const t = comp.time;

    for (let i = 0; i < sel.length; i++) {
      const layer = sel[i];

      if (type === "in") {
        const offset = t - layer.inPoint;
        layer.startTime += offset;
      } else if (type === "out") {
        const offset = t - layer.outPoint;
        layer.startTime += offset;
      }
    }
  }

  app.endUndoGroup();
};