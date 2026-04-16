/**
 * Define vertex, indices, and color array for Cube
 * 
 * Hansen Yao
 * 2026-04-16
 */

// ===========================
// Define a Cube Geometry (8 vertices)
// ===========================
/*
export const vertices = new Float32Array([
  // Front
  -1, -1,  1,
   1, -1,  1,
   1,  1,  1,
  -1,  1,  1,

  // Back
  -1, -1, -1,
   1, -1, -1,
   1,  1, -1,
  -1,  1, -1,
]);
*/
export const vertices = new Float32Array([
  // Front
  -1, -1,  1,
   1, -1,  1,
   1,  1,  1,
  -1,  1,  1,

  // Back
   1, -1, -1,
  -1, -1, -1,
  -1,  1, -1,
   1,  1, -1,

  // Top
  -1,  1,  1,
   1,  1,  1,
   1,  1, -1,
  -1,  1, -1,

  // Bottom
  -1, -1, -1,
   1, -1, -1,
   1, -1,  1,
  -1, -1,  1,

  // Right
   1, -1,  1,
   1, -1, -1,
   1,  1, -1,
   1,  1,  1,

  // Left
  -1, -1, -1,
  -1, -1,  1,
  -1,  1,  1,
  -1,  1, -1,
]);

// ===========================
// Define the Index Buffer (EBO) for Cube,
// each face have 2 triagles. 
// ===========================
/*
export const indices = new Uint16Array([
  // front
  0, 1, 2, 0, 2, 3,

  // back
  4, 5, 6, 4, 6, 7,

  // top
  3, 2, 6, 3, 6, 7,

  // bottom
  0, 1, 5, 0, 5, 4,

  // right
  1, 2, 6, 1, 6, 5,

  // left
  0, 3, 7, 0, 7, 4
]);
*/
export const indices = new Uint16Array([
  0, 1, 2, 0, 2, 3,       // front
  4, 5, 6, 4, 6, 7,       // back
  8, 9,10, 8,10,11,       // top
 12,13,14,12,14,15,       // bottom
 16,17,18,16,18,19,       // right
 20,21,22,20,22,23        // left
]);

// ===========================
// Define the color for each face. 
// ===========================
export const colors = new Float32Array([
  // front (red)
  1,0,0, 1,0,0, 1,0,0, 1,0,0,

  // back (green)
  0,1,0, 0,1,0, 0,1,0, 0,1,0,

  // top (blue)
  0,0,1, 0,0,1, 0,0,1, 0,0,1,

  // bottom (yellow)
  1,1,0, 1,1,0, 1,1,0, 1,1,0,

  // right (cyan)
  0,1,1, 0,1,1, 0,1,1, 0,1,1,

  // left (magenta)
  1,0,1, 1,0,1, 1,0,1, 1,0,1,
]);