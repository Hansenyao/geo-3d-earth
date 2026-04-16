/**
 * Use WebGL level API to render a Cube
 * 
 * Hansen Yao
 * 2026-04-16
 */

const canvas = document.getElementById("glcanvas");
const gl = canvas.getContext("webgl");

// Validate WebGL is available or not
if (!gl) {
  alert("WebGL not supported");
}

// ===========================
// 1. Use GLSL to create shaders
// ===========================

// Vertex shader, render each vertex for WebGL
const vsSource = `
attribute vec3 aPosition;
uniform mat4 uMatrix;

void main() {
  gl_Position = uMatrix * vec4(aPosition, 1.0);
}
`;

// Fragment shader, render color for each pixel
const fsSource = `
precision mediump float;

void main() {
  gl_FragColor = vec4(0.2, 0.8, 1.0, 1.0);
}
`;

// Compile shaders
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

// ===========================
// 2. Create the GLSL program for WebGL
// ===========================

const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
gl.useProgram(program);


// ===========================
// 3. Define a Cube Geometry (8 vertices)
// ===========================

const vertices = new Float32Array([
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

// ===========================
// 4. Define the Index Buffer (EBO) for Cube,
// each face have 2 triagles. 
// ===========================

const indices = new Uint16Array([
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

// ===========================
// 5. Buffer setup
// ===========================

// Vertex buffer, create the Vertex Buffer Object (VBO) for vertices
const vbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Index buffer, create the Element Buffer Object (EBO) for indices
const ebo = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
