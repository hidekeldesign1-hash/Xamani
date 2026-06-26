import { ROADMAP_PATH } from "./data";

export interface RoadmapPathPoint {
  x: number;
  y: number;
  angle: number;
}

let cachedPath: SVGPathElement | null = null;
let cachedLength = 0;

function getMeasurePath(): SVGPathElement {
  if (cachedPath) return cachedPath;

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", ROADMAP_PATH.trim());
  cachedPath = path;
  cachedLength = path.getTotalLength();
  return path;
}

export function getRoadmapPointAtProgress(progress: number): RoadmapPathPoint {
  const path = getMeasurePath();
  const length = cachedLength || path.getTotalLength();
  const t = Math.max(0, Math.min(1, progress));
  const atLen = length * t;
  const at = path.getPointAtLength(atLen);
  const ahead = path.getPointAtLength(Math.min(length, atLen + 5));
  const angle =
    (Math.atan2(ahead.y - at.y, ahead.x - at.x) * 180) / Math.PI;

  return { x: at.x, y: at.y, angle };
}
