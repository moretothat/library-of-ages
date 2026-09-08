// ============================================================
// ENGINE — The Library of Ages
// ============================================================
(function () {
  "use strict";

  // ---------- data assembly ----------
  const WORLDS = { hub: window.DATA_HUB };
  Object.assign(WORLDS, window.DATA_ANCIENT, window.DATA_MEDIEVAL, window.DATA_MODERN);
  const ORDER = window.WORLD_ORDER;
  const BOOK_COLORS = { dawn: 0xc86e3a, agora: 0x4a7ac8, garden: 0x7a4a8a, cities: 0x8a2a2a, cathedral: 0x5a5a7a, clockwork: 0x3a7a6a, summit: 0x6a4a3a };

  // self-check
  (function validate() {
    let n = 0, i = 0, bad = [];
    ORDER.concat(["hub"]).forEach(function (id) {
      const w = WORLDS[id];
      if (!w) { bad.push("missing world " + id); return; }
      (w.npcs || []).forEach(function (p) {
        n++;
        if (!p.dialogue || !p.dialogue.length) bad.push(id + "/" + p.id + ": no dialogue");
      });
      (w.items || []).forEach(function (it) {
        i++;
        if (!it.flavor) bad.push(id + "/" + it.id + ": no flavor");
      });
    });
    console.log("[LibraryOfAges] worlds:", ORDER.length + 1, "thinkers:", n, "treasures:", i);
    if (bad.length) console.warn("[LibraryOfAges] data problems:", bad);
  })();

  // ---------- state ----------
  const SAVE_KEY = "libraryOfAges.v1";
  let state = { met: {}, items: {}, transformed: {}, seenZones: {}, world: "hub", started: false, finished: false };
  function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) {} }
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (s && s.met) { state = Object.assign(state, s); return true; }
    } catch (e) {}
    return false;
  }
  const hasSave = load();

  function worldProgress(id) {
    const w = WORLDS[id];
    const nT = (w.npcs || []).length, iT = (w.items || []).length;
    let nM = 0, iM = 0;
    (w.npcs || []).forEach(function (p) { if (state.met[p.id]) nM++; });
    (w.items || []).forEach(function (it) { if (state.items[it.id]) iM++; });
    return { nM: nM, nT: nT, iM: iM, iT: iT, done: nM >= nT && iM >= iT && (nT + iT) > 0 };
  }
  function allDone() { return ORDER.every(function (id) { return worldProgress(id).done; }); }

  // ---------- DOM ----------
  const $ = function (s) { return document.querySelector(s); };
  const elApp = $("#app"), elHud = $("#hud"), elPrompt = $("#prompt"), elToast = $("#toast");
  const elCard = $("#card"), elDlg = $("#dlg"), elJournal = $("#journal"), elTitle = $("#title");
  const elPause = $("#pause"), elFade = $("#fade");

  // ---------- renderer ----------
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  elApp.appendChild(renderer.domElement);
  const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.1, 400);
  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ---------- audio ----------
  const AudioSys = (function () {
    let ac = null, master = null, ambNodes = [], muted = false;
    function ensure() {
      if (ac) return true;
      try {
        ac = new (window.AudioContext || window.webkitAudioContext)();
        master = ac.createGain(); master.gain.value = 0.09; master.connect(ac.destination);
      } catch (e) { return false; }
      return true;
    }
    function stopAmbient() {
      ambNodes.forEach(function (n) { try { n.stop ? n.stop() : n.disconnect(); } catch (e) {} });
      ambNodes = [];
    }
    const AMB = {
      hub: [92, 138.6], dawn: [110, 165, 220], agora: [146.8, 220], garden: [98, 147],
      cities: [82.4, 110.8], cathedral: [65.4, 98, 130.8, 196], clockwork: [130.8, 196],
      summit: [55, 82.4]
    };
    function ambient(worldId) {
      if (!ac) return;
      stopAmbient();
      const freqs = AMB[worldId] || [110, 165];
      const bus = ac.createGain(); bus.gain.value = 0.0; bus.connect(master);
      bus.gain.linearRampToValueAtTime(0.5, ac.currentTime + 3);
      freqs.forEach(function (f, i) {
        const o = ac.createOscillator(); o.type = i % 2 ? "triangle" : "sine";
        o.frequency.value = f * (1 + (Math.random() - 0.5) * 0.003);
        const g = ac.createGain(); g.gain.value = 0.22 / freqs.length;
        const lfo = ac.createOscillator(); lfo.frequency.value = 0.05 + i * 0.023;
        const lg = ac.createGain(); lg.gain.value = 0.1 / freqs.length;
        lfo.connect(lg); lg.connect(g.gain);
        o.connect(g); g.connect(bus); o.start(); lfo.start();
        ambNodes.push(o, lfo, g);
      });
      // gentle wind noise for summit / dawn shore
      if (worldId === "summit" || worldId === "dawn") {
        const len = ac.sampleRate * 2, buf = ac.createBuffer(1, len, ac.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
        const src = ac.createBufferSource(); src.buffer = buf; src.loop = true;
        const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = worldId === "summit" ? 500 : 800; bp.Q.value = 0.6;
        const g = ac.createGain(); g.gain.value = worldId === "summit" ? 0.08 : 0.03;
        const lfo = ac.createOscillator(); lfo.frequency.value = 0.11;
        const lg = ac.createGain(); lg.gain.value = 0.04; lfo.connect(lg); lg.connect(g.gain);
        src.connect(bp); bp.connect(g); g.connect(bus); src.start(); lfo.start();
        ambNodes.push(src, lfo, g);
      }
      ambNodes.push(bus);
    }
    function blip(freq, dur, vol, type) {
      if (!ac || muted) return;
      const o = ac.createOscillator(); o.type = type || "sine"; o.frequency.value = freq;
      const g = ac.createGain();
      g.gain.setValueAtTime(vol || 0.3, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + (dur || 0.15));
      o.connect(g); g.connect(master);
      o.start(); o.stop(ac.currentTime + (dur || 0.15) + 0.02);
    }
    return {
      init: function () { if (ensure() && ac.state === "suspended") ac.resume(); },
      ambient: function (w) { if (ac) ambient(w); },
      chime: function () { blip(784, 0.3, 0.25); setTimeout(function () { blip(1046.5, 0.35, 0.22); }, 90); setTimeout(function () { blip(1568, 0.6, 0.16); }, 200); },
      talk: function () { blip(520, 0.05, 0.1, "triangle"); },
      link: function () {
        if (!ac || muted) return;
        blip(180, 0.5, 0.2, "sawtooth"); blip(360, 0.6, 0.12); setTimeout(function () { blip(720, 0.7, 0.1); }, 150);
      },
      complete: function () {
        [523, 659, 784, 1046].forEach(function (f, i) { setTimeout(function () { blip(f, 0.5, 0.2); }, i * 130); });
      },
      thunder: function () {
        if (!ac || muted) return;
        const len = ac.sampleRate * 1.2, buf = ac.createBuffer(1, len, ac.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
        const src = ac.createBufferSource(); src.buffer = buf;
        const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 220;
        const g = ac.createGain(); g.gain.value = 0.5;
        src.connect(lp); lp.connect(g); g.connect(master); src.start();
      },
      toggleMute: function () { muted = !muted; if (master) master.gain.value = muted ? 0 : 0.09; return muted; }
    };
  })();

  // ---------- scene / world ----------
  let scene = null, ctx = null, currentWorld = null;
  let interactables = [], npcGroups = [], zoneStates = {};
  let heightFn = function () { return 0; };
  let stillZone = null, stormZone = null, lastLightning = 0;
  let dirLight = null;

  function disposeScene() {
    if (!scene) return;
    scene.traverse(function (o) {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        (Array.isArray(o.material) ? o.material : [o.material]).forEach(function (m) {
          if (m.map) m.map.dispose();
          m.dispose();
        });
      }
    });
    scene = null;
  }

  function loadWorld(id, opts) {
    opts = opts || {};
    const w = WORLDS[id];
    if (!w) { console.warn("no world", id); return; }
    disposeScene();
    currentWorld = w;
    state.world = id; save();
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(w.sky.fogColor, w.sky.fogNear, w.sky.fogFar);
    interactables = []; npcGroups = []; zoneStates = {}; stillZone = null; stormZone = null;
    pendingReveals = [];

    ctx = { scene: scene, colliders: [], anims: [], world: w, lightCount: 0, special: {} };
    heightFn = w.interior ? function () { return 0; } : U.makeHeightFn(w);
    ctx.heightFn = heightFn;

    // lights
    const amb = new THREE.AmbientLight(w.sky.ambient, w.sky.ambientIntensity != null ? w.sky.ambientIntensity : 0.4);
    scene.add(amb);
    const hemi = new THREE.HemisphereLight(w.sky.hemi.sky, w.sky.hemi.ground, w.sky.hemi.intensity);
    scene.add(hemi);
    dirLight = new THREE.DirectionalLight(w.sky.sunColor, w.sky.sunIntensity);
    dirLight.position.fromArray(w.sky.sunPos);
    scene.add(dirLight);

    U.buildSky(scene, w.sky);

    // ground
    if (w.interior) {
      // interior floor handled by props (libraryRoom / cathedralNave)
    } else {
      const R = 190;
      const geo = new THREE.PlaneGeometry(R, R, 100, 100);
      geo.rotateX(-Math.PI / 2);
      const pos = geo.attributes.position;
      const colors = [];
      const cBase = new THREE.Color(w.ground.base), cAcc = new THREE.Color(w.ground.accent), cTmp = new THREE.Color();
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), z = pos.getZ(i);
        const h = heightFn(x, z);
        pos.setY(i, h);
        const t = Math.min(1, Math.max(0, (Math.sin(x * 0.13) + Math.cos(z * 0.17) + 2) / 4 + h * 0.06));
        cTmp.copy(cBase).lerp(cAcc, t);
        colors.push(cTmp.r, cTmp.g, cTmp.b);
      }
      geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
      geo.computeVertexNormals();
      const ground = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true }));
      scene.add(ground);
      if (w.water) {
        const wat = new THREE.Mesh(new THREE.PlaneGeometry(w.water.size, w.water.size),
          new THREE.MeshLambertMaterial({ color: w.water.color, transparent: true, opacity: 0.85, emissive: w.water.color, emissiveIntensity: 0.15 }));
        wat.rotation.x = -Math.PI / 2; wat.position.y = w.water.level;
        scene.add(wat);
        ctx.anims.push(function (t) { wat.position.y = w.water.level + Math.sin(t * 0.5) * 0.08; });
      }
    }

    // props
    (w.props || []).forEach(function (p) {
      const fn = BUILDERS.props[p.type];
      if (!fn) { console.warn("no builder for prop", p.type); return; }
      fn(ctx, p);
    });

    // particles
    const partSystems = [];
    (w.particles || []).forEach(function (spec) { partSystems.push(U.buildParticles(scene, spec)); });
    ctx.partSystems = partSystems;

    // zones
    (w.zones || []).forEach(function (z) {
      if (z.type === "still") stillZone = z;
      if (z.type === "storm") stormZone = z;
    });

    // npcs
    (w.npcs || []).forEach(function (spec) {
      const g = BUILDERS.npc(ctx, spec);
      npcGroups.push(g);
      interactables.push({ x: spec.x, z: spec.z, r: 3.4, type: "npc", data: spec, group: g,
        prompt: function () { return "<b>E</b> — Speak with " + spec.name.split(" ")[0] + (state.met[spec.id] ? " again" : ""); } });
    });

    // items
    (w.items || []).forEach(function (spec) {
      if (state.items[spec.id]) return;
      if (spec.requiresMet && !state.met[spec.requiresMet]) {
        // spawn later, when its philosopher has been met
        pendingReveals.push({ world: id, spec: spec });
        return;
      }
      spawnItem(spec);
    });

    // portals
    if (id === "hub") {
      (w.portals || []).forEach(function (pt) {
        const tw = WORLDS[pt.target];
        const g = BUILDERS.linkBookGroup(BOOK_COLORS[pt.target] || 0x6a5a3a, tw.title, tw.bookLabel);
        g.position.set(pt.x, 0, pt.z); g.rotation.y = pt.rot || 0;
        scene.add(g);
        ctx.colliders.push({ x: pt.x, z: pt.z, r: 0.75 });
        const label = U.nameSprite(tw.title, tw.bookLabel.replace("BOOK ", "Bk ").replace(" · PART", " · Pt"));
        label.position.set(pt.x, 2.6, pt.z);
        label.scale.set(4.6, 1.15, 1);
        scene.add(label);
        if (worldProgress(pt.target).done) {
          const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), U.mat(0xffe8a0, { emissive: 0xffd870, emissiveIntensity: 1 }));
          gem.position.set(pt.x, 1.9, pt.z); scene.add(gem);
          ctx.anims.push(function (t) { gem.rotation.y = t * 1.4; gem.position.y = 1.9 + Math.sin(t * 2) * 0.06; });
        }
        interactables.push({ x: pt.x, z: pt.z, r: 2.6, type: "portal", target: pt.target,
          prompt: function () { return "<b>E</b> — Open <i>" + tw.title + "</i>"; } });
      });
      // Russell + the sealed case
      if (ctx.special.glassCase) {
        const gc = ctx.special.glassCase;
        interactables.push({ x: gc.x, z: gc.z, r: 2.8, type: "case",
          prompt: function () {
            return allDone() ? "<b>E</b> — Open the case" : "<i>Sealed — " + ORDER.filter(function (i2) { return worldProgress(i2).done; }).length + " of 7 ages complete</i>";
          } });
        if (allDone() && !state.finished) { gc.glow.material.opacity = 0.7; }
      }
    } else if (ctx.special.returnBook) {
      const rb = ctx.special.returnBook;
      interactables.push({ x: rb.x, z: rb.z, r: 2.6, type: "portal", target: "hub",
        prompt: function () { return "<b>E</b> — Return to the Library"; } });
    }

    // player spawn
    const sp = opts.spawn || w.spawn || { x: 0, z: 0, yaw: 0 };
    player.x = sp.x; player.z = sp.z; player.yaw = sp.yaw || 0; player.pitch = 0;
    player.y = heightFn(sp.x, sp.z) + EYE;

    // HUD
    $("#worldTag .wt1").textContent = w.bookLabel;
    $("#worldTag .wt2").textContent = w.title;
    updateProgressHud();

    if (!opts.quiet) {
      showCard(w.intro);
      AudioSys.ambient(id);
    }
  }

  let pendingReveals = [];
  function spawnItem(spec) {
    const g = BUILDERS.item(ctx, spec);
    interactables.push({ x: spec.x, z: spec.z, r: 2.6, type: "item", data: spec, group: g,
      prompt: function () { return "<b>E</b> — Take " + (state.transformed[spec.id] && spec.transformsTo ? spec.transformsTo.name : spec.name); } });
  }

  // ---------- player & input ----------
  const EYE = 1.7;
  const player = { x: 0, y: EYE, z: 0, yaw: 0, pitch: 0 };
  const keys = {};
  let pointerLocked = false, dragging = false, lastMX = 0, lastMY = 0;
  let mode = "title"; // title | play | dialogue | journal | pause | final

  const canvas = renderer.domElement;
  canvas.addEventListener("click", function () {
    if (mode !== "play") return;
    // try pointer lock; drag is always a fallback
    if (!pointerLocked && canvas.requestPointerLock) {
      try { canvas.requestPointerLock(); } catch (e) {}
    }
    tryInteract();
  });
  document.addEventListener("pointerlockchange", function () {
    pointerLocked = document.pointerLockElement === canvas;
  });
  document.addEventListener("pointerlockerror", function () { pointerLocked = false; });
  canvas.addEventListener("mousedown", function (e) { dragging = true; lastMX = e.clientX; lastMY = e.clientY; });
  window.addEventListener("mouseup", function () { dragging = false; });
  window.addEventListener("mousemove", function (e) {
    if (mode !== "play") return;
    let dx = 0, dy = 0;
    if (pointerLocked) { dx = e.movementX || 0; dy = e.movementY || 0; }
    else if (dragging) { dx = e.clientX - lastMX; dy = e.clientY - lastMY; lastMX = e.clientX; lastMY = e.clientY; }
    else return;
    player.yaw -= dx * 0.0028;
    player.pitch -= dy * 0.0024;
    player.pitch = Math.max(-1.35, Math.min(1.35, player.pitch));
  });

  window.addEventListener("keydown", function (e) {
    if (e.code === "Tab") e.preventDefault();
    keys[e.code] = true;
    AudioSys.init();
    if (mode === "dialogue") {
      if (e.code === "Space" || e.code === "Enter") { e.preventDefault(); dlgAdvance(); }
      else if (e.code === "KeyE") dlgClose();
      else if (/^Digit[1-4]$/.test(e.code)) dlgChoose(parseInt(e.code.slice(5), 10) - 1);
      return;
    }
    if (mode === "journal") {
      if (e.code === "KeyJ" || e.code === "Tab" || e.code === "Escape") toggleJournal(false);
      return;
    }
    if (mode === "pause") {
      if (e.code === "Escape") setPause(false);
      return;
    }
    if (mode !== "play") return;
    switch (e.code) {
      case "KeyE": tryInteract(); break;
      case "KeyJ": case "Tab": toggleJournal(true); break;
      case "KeyM": {
        const m = AudioSys.toggleMute();
        toast("SOUND", m ? "Muted" : "On");
        break;
      }
      case "Escape": if (!pointerLocked) setPause(true); break;
    }
  });
  window.addEventListener("keyup", function (e) { keys[e.code] = false; });

  function movePlayer(dt) {
    const fwd = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0);
    const str = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0);
    if (fwd || str) {
      const sp = (keys.ShiftLeft || keys.ShiftRight ? 8.4 : 5.2) * dt;
      const s = Math.sin(player.yaw), c = Math.cos(player.yaw);
      let dx = (-s * fwd + c * str), dz = (-c * fwd - s * str);
      const len = Math.hypot(dx, dz) || 1;
      player.x += (dx / len) * sp;
      player.z += (dz / len) * sp;
      walkT += sp;
    }
    // collisions
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 0; i < ctx.colliders.length; i++) {
        const col = ctx.colliders[i];
        const dx = player.x - col.x, dz = player.z - col.z;
        const rr = col.r + 0.5, d2 = dx * dx + dz * dz;
        if (d2 < rr * rr && d2 > 0.0001) {
          const d = Math.sqrt(d2);
          player.x = col.x + (dx / d) * rr;
          player.z = col.z + (dz / d) * rr;
        }
      }
    }
    // bounds
    if (currentWorld.interior) {
      const hw = currentWorld.interior.w / 2 - 1.2, hd = currentWorld.interior.d / 2 - 1.2;
      player.x = Math.max(-hw, Math.min(hw, player.x));
      player.z = Math.max(-hd, Math.min(hd, player.z));
    } else {
      const d = Math.hypot(player.x, player.z);
      if (d > 86) { player.x *= 86 / d; player.z *= 86 / d; }
    }
    // ground follow + bob
    const gh = heightFn(player.x, player.z) + EYE;
    player.y += (gh - player.y) * Math.min(1, dt * 10);
    const bob = Math.sin(walkT * 1.9) * 0.045;
    camera.position.set(player.x, player.y + bob, player.z);
    camera.rotation.order = "YXZ";
    camera.rotation.y = player.yaw;
    camera.rotation.x = player.pitch;
  }
  let walkT = 0;

  // ---------- interaction ----------
  function bestInteractable() {
    let best = null, bestScore = -1;
    const fs = Math.sin(player.yaw), fc = Math.cos(player.yaw);
    for (let i = 0; i < interactables.length; i++) {
      const it = interactables[i];
      const dx = it.x - player.x, dz = it.z - player.z;
      const d = Math.hypot(dx, dz);
      if (d > it.r) continue;
      const dot = (dx * -fs + dz * -fc) / (d || 1);
      if (d > 1.2 && dot < 0.35) continue;
      const score = (1 - d / it.r) + dot;
      if (score > bestScore) { bestScore = score; best = it; }
    }
    return best;
  }
  function tryInteract() {
    const it = bestInteractable();
    if (!it) return;
    if (it.type === "npc") openDialogue(it.data);
    else if (it.type === "item") collectItem(it);
    else if (it.type === "portal") travel(it.target);
    else if (it.type === "case") {
      if (allDone()) finalSequence();
      else AudioSys.talk();
    }
  }

  function collectItem(it) {
    const spec = it.data;
    state.items[spec.id] = true; save();
    const useT = state.transformed[spec.id] && spec.transformsTo;
    const shown = useT ? spec.transformsTo : spec;
    toast("TREASURE — " + currentWorld.title.toUpperCase(), shown.name);
    AudioSys.chime();
    if (it.group) scene.remove(it.group);
    interactables = interactables.filter(function (x) { return x !== it; });
    updateProgressHud();
    checkCompletion();
  }

  // ---------- dialogue ----------
  let dlgNpc = null, dlgIndex = 0;
  function openDialogue(spec) {
    dlgNpc = spec; dlgIndex = 0;
    mode = "dialogue";
    elDlg.classList.remove("hidden");
    if (document.exitPointerLock && pointerLocked) document.exitPointerLock();
    renderDlgPage();
  }
  function pageAt(i) { return dlgNpc.dialogue[i]; }
  function renderDlgPage() {
    const pg = pageAt(dlgIndex);
    if (!pg) { dlgClose(); return; }
    const speaker = pg.s || dlgNpc.name;
    elDlg.classList.toggle("russell", !!pg.s);
    $("#dlg .name").textContent = speaker;
    $("#dlg .dates").textContent = pg.s ? "your host" : (dlgNpc.dates || "");
    $("#dlg .body").textContent = pg.t;
    const opts = $("#dlg .opts");
    if (pg.opts) {
      opts.innerHTML = "";
      pg.opts.forEach(function (o, i) {
        const b = document.createElement("button");
        b.innerHTML = "<b>" + (i + 1) + "</b>" + o.label;
        b.onclick = function (ev) { ev.stopPropagation(); dlgChoose(i); };
        opts.appendChild(b);
      });
      opts.classList.remove("hidden");
      $("#dlg .foot").style.display = "none";
    } else {
      opts.classList.add("hidden");
      $("#dlg .foot").style.display = "flex";
    }
    AudioSys.talk();
  }
  function findPage(id) {
    for (let i = 0; i < dlgNpc.dialogue.length; i++) if (dlgNpc.dialogue[i].id === id) return i;
    return -1;
  }
  function dlgChoose(i) {
    const pg = pageAt(dlgIndex);
    if (!pg || !pg.opts || !pg.opts[i]) return;
    const gi = findPage(pg.opts[i].goto);
    if (gi >= 0) { dlgIndex = gi; renderDlgPage(); }
  }
  function dlgAdvance() {
    const pg = pageAt(dlgIndex);
    if (!pg) { dlgClose(); return; }
    if (pg.opts) return; // must choose
    if (pg.goto) {
      const gi = findPage(pg.goto);
      if (gi >= 0) { dlgIndex = gi; renderDlgPage(); return; }
    }
    // skip past option-branch pages that were not chosen (pages with ids belong to branches)
    let n = dlgIndex + 1;
    while (n < dlgNpc.dialogue.length && dlgNpc.dialogue[n].id && !wasBranchTarget(n)) n++;
    dlgIndex = n;
    if (dlgIndex >= dlgNpc.dialogue.length) { dlgFinish(); return; }
    renderDlgPage();
  }
  let branchVisited = {};
  function wasBranchTarget(n) { return branchVisited[dlgNpc.id + ":" + n]; }
  // simpler: when jumping via goto, mark target visited so linear advance stops skipping it
  const origFind = findPage;
  function dlgFinish() {
    const first = !state.met[dlgNpc.id];
    state.met[dlgNpc.id] = true; save();
    if (first) {
      toast("THINKER MET", dlgNpc.name + " — added to your journal");
      AudioSys.chime();
      // reveal any dependent items
      pendingReveals = pendingReveals.filter(function (pr) {
        if (pr.spec.requiresMet === dlgNpc.id && currentWorld.id === pr.world) {
          spawnItem(pr.spec);
          setTimeout(function () { toast("SOMETHING APPEARS", "The pedestal is no longer empty."); }, 1600);
          return false;
        }
        return true;
      });
    }
    dlgClose();
    updateProgressHud();
    checkCompletion();
  }
  function dlgClose() {
    elDlg.classList.add("hidden");
    if (dlgNpc && dlgIndex >= dlgNpc.dialogue.length - 1) { /* finished */ }
    dlgNpc = null;
    if (mode === "dialogue") mode = "play";
  }
  elDlg.addEventListener("click", function (e) {
    if (e.target.closest(".opts")) return;
    dlgAdvance();
  });

  // branch handling: pages after an opts page that carry ids are branch pages.
  // We handle: goto jumps land on them; linear advance from a non-branch page skips
  // consecutive id'd pages ONLY if we haven't just come from a goto.
  // (Implemented above via wasBranchTarget + marking below.)
  const _origRender = renderDlgPage;
  renderDlgPage = function () {
    branchVisited[dlgNpc.id + ":" + dlgIndex] = true;
    _origRender();
  };

  // ---------- travel ----------
  let traveling = false;
  function travel(target) {
    if (traveling) return;
    traveling = true;
    AudioSys.link();
    elFade.classList.remove("black");
    elFade.style.opacity = 1;
    setTimeout(function () {
      loadWorld(target);
      setTimeout(function () {
        elFade.style.opacity = 0;
        traveling = false;
      }, 350);
    }, 520);
  }

  // ---------- completion ----------
  const completedShown = {};
  function checkCompletion() {
    if (currentWorld.id === "hub") return;
    const p = worldProgress(currentWorld.id);
    if (p.done && !completedShown[currentWorld.id]) {
      completedShown[currentWorld.id] = true;
      setTimeout(function () {
        toast("AGE COMPLETE ✦", currentWorld.title + " — its book will burn brighter in the Library");
        AudioSys.complete();
      }, 1200);
    }
  }
  function finalSequence() {
    if (state.finished) {
      // replay the closing words
    }
    mode = "dialogue";
    dlgNpc = { id: "__final", name: "Bertrand Russell", dates: "1872 – 1970", dialogue: window.FINAL_DIALOGUE.slice() };
    dlgIndex = 0;
    elDlg.classList.remove("hidden");
    renderDlgPage();
    const origFinish = dlgFinish;
    // one-shot override
    dlgFinishOverride = function () {
      if (!state.finished) {
        state.finished = true;
        state.items[window.FINAL_ITEM.id] = true;
        save();
        toast("TREASURE ✦", window.FINAL_ITEM.name);
        AudioSys.complete();
        if (ctx.special.glassCase) {
          const gc = ctx.special.glassCase;
          gc.glass.material.opacity = 0.05;
          gc.glow.material.opacity = 1;
        }
        // celebration motes
        if (currentWorld.id === "hub") {
          const burst = U.buildParticles(scene, { type: "rise", count: 300, area: { x: 0, z: -3, r: 12 }, y: [0, 7], color: 0xffe8a0, size: 0.09, speed: 1.4 });
          ctx.partSystems.push(burst);
        }
      }
      dlgFinishOverride = null;
    };
  }
  let dlgFinishOverride = null;
  const _dlgFinish = dlgFinish;
  dlgFinish = function () {
    if (dlgNpc && dlgNpc.id === "__final") {
      const f = dlgFinishOverride; dlgClose(); if (f) f();
      updateProgressHud();
      return;
    }
    _dlgFinish();
  };

  // ---------- zones ----------
  function checkZones(t) {
    if (!currentWorld.zones) return;
    currentWorld.zones.forEach(function (z, i) {
      const key = currentWorld.id + ":" + i;
      const inside = Math.hypot(player.x - z.x, player.z - z.z) < z.r;
      if (z.type === "msg") {
        if (inside && !zoneStates[key] && !state.seenZones[key]) {
          zoneStates[key] = true; state.seenZones[key] = true; save();
          toast("", z.text, 5200);
        }
      } else if (z.type === "formswap") {
        if (inside) {
          // transform any carried shadow
          (currentWorld.items || []).forEach(function (it) {
            if (it.transformsTo && state.items[it.id] && !state.transformed[it.id]) {
              state.transformed[it.id] = true; save();
              flash(0.65);
              toast("TRANSFIGURATION", it.name + " has become " + it.transformsTo.name);
              AudioSys.chime();
            }
          });
          // also transform the uncollected item if carried logic missed — mark for pickup naming
        }
      } else if (z.type === "storm") {
        if (inside && t - lastLightning > 6 + Math.random() * 8) {
          lastLightning = t;
          flash(0.5);
          if (dirLight) {
            const oi = dirLight.intensity;
            dirLight.intensity = oi + 1.4;
            setTimeout(function () { if (dirLight) dirLight.intensity = oi; }, 140);
          }
          setTimeout(function () { AudioSys.thunder(); }, 300 + Math.random() * 700);
        }
      }
    });
  }
  function flash(op) {
    elFade.classList.remove("black");
    elFade.style.transition = "opacity .08s";
    elFade.style.opacity = op;
    setTimeout(function () {
      elFade.style.opacity = 0;
      setTimeout(function () { elFade.style.transition = "opacity .5s"; }, 120);
    }, 90);
  }

  // ---------- HUD ----------
  let toastTimer = null;
  function toast(t1, t2, dur) {
    $("#toast .t1").textContent = t1 || "";
    $("#toast .t1").style.display = t1 ? "block" : "none";
    $("#toast .t2").textContent = t2 || "";
    elToast.style.opacity = 1;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { elToast.style.opacity = 0; }, dur || 3800);
  }
  function showCard(intro) {
    if (!intro) return;
    $("#card .c0").textContent = intro.over || "";
    $("#card .c1").textContent = intro.title || "";
    $("#card .c2").textContent = intro.sub || "";
    elCard.style.opacity = 1;
    setTimeout(function () { elCard.style.opacity = 0; }, 4200);
  }
  function updateProgressHud() {
    if (!currentWorld) return;
    if (currentWorld.id === "hub") {
      const done = ORDER.filter(function (i) { return worldProgress(i).done; }).length;
      let tn = 0, ti = 0, mn = 0, mi = 0;
      ORDER.forEach(function (i) {
        const p = worldProgress(i);
        tn += p.nT; ti += p.iT; mn += p.nM; mi += p.iM;
      });
      $("#progressTag").innerHTML = done + " / 7 ages complete<br>" + mn + "/" + tn + " thinkers · " + mi + "/" + ti + " treasures";
    } else {
      const p = worldProgress(currentWorld.id);
      $("#progressTag").innerHTML = p.nM + "/" + p.nT + " thinkers · " + p.iM + "/" + p.iT + " treasures" + (p.done ? " ✦" : "");
    }
  }

  // ---------- journal ----------
  function toggleJournal(open) {
    if (open) {
      buildJournal();
      elJournal.classList.remove("hidden");
      mode = "journal";
      if (document.exitPointerLock && pointerLocked) document.exitPointerLock();
    } else {
      elJournal.classList.add("hidden");
      if (mode === "journal") mode = "play";
    }
  }
  $("#btnJournal2").addEventListener("click", function () { setPause(false); toggleJournal(true); });
  function buildJournal() {
    const body = $("#journal .jbody");
    let html = "";
    let mn = 0, tn = 0, mi = 0, ti = 0;
    ORDER.forEach(function (id) {
      const w = WORLDS[id], p = worldProgress(id);
      mn += p.nM; tn += p.nT; mi += p.iM; ti += p.iT;
      html += '<div class="jage' + (p.done ? " done" : "") + '">';
      html += '<div class="jt"><div><div class="a1">' + w.bookLabel + '</div><div class="a2">' + w.title + '</div></div>';
      html += '<div class="a3">' + p.nM + "/" + p.nT + " thinkers · " + p.iM + "/" + p.iT + " treasures</div></div>";
      html += '<div class="jrow">';
      (w.npcs || []).forEach(function (n) {
        const met = state.met[n.id];
        html += '<div class="jcardN' + (met ? "" : " jlocked") + '"><div class="n1">' + (met ? n.name : "???") +
          (met ? "<span>" + n.dates + "</span>" : "") + "</div>";
        html += '<div class="n2">' + n.blurb + "</div>";
        html += '<div class="n3">' + n.seed + "</div></div>";
      });
      (w.items || []).forEach(function (itm) {
        const got = state.items[itm.id];
        const shown = state.transformed[itm.id] && itm.transformsTo ? itm.transformsTo : itm;
        html += '<div class="jcardI' + (got ? "" : " jlocked") + '"><div class="n1">' + (got ? "✦ " + shown.name : "✦ ???") + "</div>";
        html += '<div class="n2">' + (got ? shown.flavor + "<br><i>" + shown.meaning + "</i>" : "") + "</div></div>";
      });
      html += "</div></div>";
    });
    if (state.finished) {
      html += '<div class="jage done"><div class="jt"><div><div class="a1">EPILOGUE</div><div class="a2">The Library</div></div></div><div class="jrow">';
      html += '<div class="jcardI"><div class="n1">✦ ' + window.FINAL_ITEM.name + '</div><div class="n2">' + window.FINAL_ITEM.flavor + "<br><i>" + window.FINAL_ITEM.meaning + "</i></div></div>";
      html += "</div></div>";
    }
    body.innerHTML = html;
    $("#journal .jhead .jp").textContent = currentWorld ? currentWorld.title : "";
    $("#jtotal").textContent = mn + "/" + tn + " thinkers · " + mi + "/" + ti + " treasures" + (state.finished ? " · the case is open" : "");
  }

  // ---------- pause ----------
  function setPause(on) {
    elPause.classList.toggle("hidden", !on);
    mode = on ? "pause" : "play";
  }
  $("#btnResume").addEventListener("click", function () { setPause(false); });
  $("#btnReset").addEventListener("click", function () {
    if (!confirm("Start the whole journey over? Your journal will be cleared.")) return;
    localStorage.removeItem(SAVE_KEY);
    location.reload();
  });

  // ---------- title ----------
  if (hasSave && state.started) {
    $("#btnContinue").classList.remove("hidden");
    $("#contnote").classList.remove("hidden");
  }
  $("#btnNew").addEventListener("click", function () {
    if (hasSave && state.started) {
      if (!confirm("Begin anew? This clears the previous journey in this browser.")) return;
      localStorage.removeItem(SAVE_KEY);
      state = { met: {}, items: {}, transformed: {}, seenZones: {}, world: "hub", started: true, finished: false };
    }
    startGame("hub");
  });
  $("#btnContinue").addEventListener("click", function () { startGame(state.world || "hub"); });
  function startGame(worldId) {
    state.started = true; save();
    AudioSys.init();
    elTitle.classList.add("hidden");
    elHud.classList.remove("hidden");
    mode = "play";
    loadWorld(worldId);
  }

  // ---------- main loop ----------
  const clock = new THREE.Clock();
  let promptShown = false;
  function tick() {
    requestAnimationFrame(tick);
    const dt = Math.min(0.05, clock.getDelta());
    const t = clock.elapsedTime;
    if (!scene) return;
    if (mode === "play") movePlayer(dt);
    else {
      camera.position.set(player.x, player.y, player.z);
      camera.rotation.order = "YXZ";
      camera.rotation.y = player.yaw; camera.rotation.x = player.pitch;
    }

    // anims
    for (let i = 0; i < ctx.anims.length; i++) ctx.anims[i](t, dt);
    // particles
    const frozen = stillZone && Math.hypot(player.x - stillZone.x, player.z - stillZone.z) < stillZone.r + 14 ? stillZone : null;
    for (let i = 0; i < ctx.partSystems.length; i++) U.tickParticles(ctx.partSystems[i], t, dt, frozen);
    // npc behavior
    for (let i = 0; i < npcGroups.length; i++) {
      const g = npcGroups[i];
      const dx = player.x - g.position.x, dz = player.z - g.position.z;
      const d = Math.hypot(dx, dz);
      g.position.y = g.userData.baseY + Math.sin(t * 1.1 + i * 2.1) * 0.035;
      if (d < 8) {
        const target = Math.atan2(dx, dz);
        let diff = target - g.rotation.y;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        g.rotation.y += diff * Math.min(1, dt * 3);
      }
      if (g.userData.label) {
        g.userData.label.material.opacity = Math.max(0, Math.min(1, 1.15 - d / 16));
      }
    }
    // prompt
    if (mode === "play") {
      const it = bestInteractable();
      if (it) { elPrompt.innerHTML = it.prompt(); elPrompt.classList.remove("hidden"); promptShown = true; }
      else if (promptShown) { elPrompt.classList.add("hidden"); promptShown = false; }
      checkZones(t);
    }
    renderer.render(scene, camera);
  }
  tick();

  // ---------- debug API ----------
  window.GAME = {
    warp: function (id) { startIfNeeded(); loadWorld(id); },
    state: function () { return state; },
    worlds: function () { return Object.keys(WORLDS); },
    progress: function () {
      const out = {};
      ORDER.forEach(function (id) { out[id] = worldProgress(id); });
      return out;
    },
    grantAll: function () {
      ORDER.forEach(function (id) {
        (WORLDS[id].npcs || []).forEach(function (n) { state.met[n.id] = true; });
        (WORLDS[id].items || []).forEach(function (i) { state.items[i.id] = true; });
      });
      save(); updateProgressHud();
      return "granted";
    },
    teleport: function (x, z) { player.x = x; player.z = z; },
    look: function (yaw, pitch) { player.yaw = yaw; player.pitch = pitch || 0; },
    shot: function (x, z, yaw, pitch) { player.x = x; player.z = z; player.yaw = yaw; player.pitch = pitch || 0; },
    openNpc: function (npcId) {
      const w = currentWorld;
      const n = (w.npcs || []).find(function (p) { return p.id === npcId; });
      if (n) openDialogue(n);
    },
    mode: function () { return mode; },
    debug: function () { return { world: currentWorld, player: player, zones: currentWorld && currentWorld.zones, interactables: interactables.length }; }
  };
  function startIfNeeded() {
    if (mode === "title") startGame(state.world || "hub");
  }
})();
