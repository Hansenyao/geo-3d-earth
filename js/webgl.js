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
