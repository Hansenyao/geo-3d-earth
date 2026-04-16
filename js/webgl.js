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
// Use GLSL to create shaders
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