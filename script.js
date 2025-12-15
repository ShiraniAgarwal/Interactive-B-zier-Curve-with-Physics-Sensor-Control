const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function vec(x, y) {
  return { x, y };
}

function add(a, b) {
  return vec(a.x + b.x, a.y + b.y);
}

function sub(a, b) {
  return vec(a.x - b.x, a.y - b.y);
}

function mul(v, s) {
  return vec(v.x * s, v.y * s);
}

function length(v) {
  return Math.hypot(v.x, v.y);
}

function normalize(v) {
  const len = length(v);
  return len === 0 ? vec(0, 0) : vec(v.x / len, v.y / len);
}

const P0 = vec(150, canvas.height / 2);
const P3 = vec(canvas.width - 150, canvas.height / 2);

let P1 = vec(canvas.width / 2 - 100, canvas.height / 2);
let P2 = vec(canvas.width / 2 + 100, canvas.height / 2);

let v1 = vec(0, 0);
let v2 = vec(0, 0);

let target = vec(P1.x, P1.y);

const stiffness = 0.02;
const damping = 0.85;

canvas.addEventListener("mousemove", (e) => {
  target.x = e.clientX;
  target.y = e.clientY;
});

function bezier(t) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;

  return add(
    add(
      mul(P0, uu * u),
      mul(P1, 3 * uu * t)
    ),
    add(
      mul(P2, 3 * u * tt),
      mul(P3, tt * t)
    )
  );
}

function bezierTangent(t) {
  const u = 1 - t;

  return add(
    add(
      mul(sub(P1, P0), 3 * u * u),
      mul(sub(P2, P1), 6 * u * t)
    ),
    mul(sub(P3, P2), 3 * t * t)
  );
}

function drawPoint(p, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#00eaff";
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (let t = 0; t <= 1.01; t += 0.01) {
    const p = bezier(t);
    if (t === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();

  ctx.strokeStyle = "#ffaa00";
  for (let t = 0; t <= 1; t += 0.1) {
    const p = bezier(t);
    const tan = normalize(bezierTangent(t));
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + tan.x * 30, p.y + tan.y * 30);
    ctx.stroke();
  }
  
  drawPoint(P0, "#ff4444");
  drawPoint(P1, "#ffffff");
  drawPoint(P2, "#ffffff");
  drawPoint(P3, "#ff4444");
}

function update() {
  
  const force1 = mul(sub(target, P1), stiffness);
  v1 = add(v1, force1);
  v1 = mul(v1, damping);
  P1 = add(P1, v1);

 
  const force2 = mul(sub(P1, P2), stiffness);
  v2 = add(v2, force2);
  v2 = mul(v2, damping);
  P2 = add(P2, v2);

  draw();
  requestAnimationFrame(update);
}

update();
