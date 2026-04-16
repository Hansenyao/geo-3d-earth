/**
 * Cacluate FPS using DOM overlay
 * 
 * Hansen Yao
 * 2026-04-16
 */

let lastTime = performance.now();
let frameCount = 0;
let fps = 0;

export function updateFPS() {
  const now = performance.now();
  frameCount++;

  if (now - lastTime >= 1000) {
    fps = frameCount;
    frameCount = 0;
    lastTime = now;

    document.getElementById("fps").innerText = `FPS: ${fps}`;
  }
}