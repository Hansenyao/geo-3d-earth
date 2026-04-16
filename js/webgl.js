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
attribute vec3 aColor;

uniform mat4 uMatrix;
varying vec3 vColor;

void main() {
  vColor = aColor;
  gl_Position = uMatrix * vec4(aPosition, 1.0);
}
`;

// Fragment shader, render color for each pixel
const fsSource = `
precision mediump float;
varying vec3 vColor;

void main() {
  gl_FragColor = vec4(vColor, 1.0);
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
// 4.1 Define the Index Buffer (EBO) for Cube,
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
// 4.2 Define the color for each face. 
// ===========================
const colors = new Float32Array([
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

// ===========================
// 5 Vertex buffer setup
// ===========================

// Vertex buffer, create the Vertex Buffer Object (VBO) for vertices
const vbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Index buffer, create the Element Buffer Object (EBO) for indices
const ebo = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

// Set it to attribute aPosition
const posLoc = gl.getAttribLocation(program, "aPosition");
gl.enableVertexAttribArray(posLoc);
gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);

// ===========================
// 6. Color buffer setup
// ===========================

// Vertex color buffer
const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

// Set it to attribute aColor
const colorLoc = gl.getAttribLocation(program, "aColor");
gl.enableVertexAttribArray(colorLoc);
gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);

// ===========================
// 7. Get the uniform matrix
// ===========================

const matrixLoc = gl.getUniformLocation(program, "uMatrix");

// ===========================
// 9. Enable Depth Test, to determined the objects rendering order
// ===========================

gl.enable(gl.DEPTH_TEST);

// =======================
// 10. Render loop
// =======================

let angle = 0;

function render() {
  requestAnimationFrame(render);
  
  angle += 0.01;

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const aspect = canvas.width / canvas.height;

  // Get transformation matrices from glMatrix
  const mat4 = glMatrix.mat4;
  let projection = mat4.create();
  let model = mat4.create();

  // Set persective view
  mat4.perspective(
    projection,
    Math.PI / 4,
    canvas.width / canvas.height,
    0.1,
    100
  );

  // transformations
  mat4.identity(model);
  mat4.translate(model, model, [0, 0, -5]);
  mat4.rotateY(model, model, angle);

  // Cacluate the final matrix
  let mvp = mat4.create();
  mat4.multiply(mvp, projection, model);

  // Pass the final matrix to GPU
  gl.uniformMatrix4fv(matrixLoc, false, mvp);

  // Draw the Cube by EBO
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}

render();