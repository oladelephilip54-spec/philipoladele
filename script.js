document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const status = document.getElementById("preloader-status");
  const body = document.body;

  if (preloader && status) {
    const words = ["SOCIAL", "WEB", "BOOKS"];
    let i = 0;
    status.textContent = "";
    const typeWord = () => {
      if (i >= words.length) {
        status.textContent = "SOCIAL · WEB · BOOKS";
        setTimeout(() => {
          preloader.classList.add("hidden");
          body.classList.remove("loading");
        }, 900);
        return;
      }
      const word = words[i];
      let c = 0;
      status.textContent = (i ? status.textContent.replace("|","") + " · " : "");
      const tick = setInterval(() => {
        status.textContent = status.textContent.replace("|","") + word[c] + "|";
        c += 1;
        if (c >= word.length) {
          clearInterval(tick);
          status.textContent = status.textContent.replace("|","");
          i += 1;
          setTimeout(typeWord, 280);
        }
      }, 70);
    };
    setTimeout(typeWord, 700);
  }

  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("active"));
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.classList.remove("active")));
  }

  startGoldShader();
});

function startGoldShader() {
  const canvas = document.createElement("canvas");
  canvas.id = "glbg";
  document.body.prepend(canvas);
  const gl = canvas.getContext("webgl", { antialias: false, alpha: true });
  if (!gl) return;

  const vs = "attribute vec2 a; void main(){ gl_Position = vec4(a,0.0,1.0); }";
  const fs = `
    precision highp float;
    uniform vec2 u_res;
    uniform float u_time;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float noise(vec2 p){
      vec2 i = floor(p); vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0,0.0));
      float c = hash(i + vec2(0.0,1.0));
      float d = hash(i + vec2(1.0,1.0));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
    }
    void main(){
      vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / min(u_res.x,u_res.y);
      float t = u_time * 0.12;
      float n = noise(p*2.4 + vec2(t, -t*0.7));
      n += 0.5*noise(p*5.0 - vec2(t*1.4, t));
      float vein = smoothstep(0.35, 0.85, n);
      float glow = 0.18 / (0.35 + length(p - vec2(sin(t)*0.25, cos(t*0.8)*0.2)));
      vec3 gold = vec3(0.89, 0.72, 0.35);
      vec3 deep = vec3(0.03, 0.025, 0.015);
      vec3 col = mix(deep, gold * 0.55, vein * 0.45 + glow * 0.25);
      col += gold * glow * 0.15;
      gl_FragColor = vec4(col, 0.92);
    }
  `;

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, "u_res");
  const uTime = gl.getUniformLocation(prog, "u_time");

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener("resize", resize);
  resize();

  const t0 = performance.now();
  function frame(now) {
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, (now - t0) / 1000);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
