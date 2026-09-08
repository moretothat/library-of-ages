// ============================================================
// UTIL — canvas textures, labels, terrain, sky, water, particles
// ============================================================
window.U = (function () {
  const U = {};

  U.mat = function (color, opts) {
    opts = opts || {};
    const m = new THREE.MeshLambertMaterial({ color: color });
    if (opts.emissive) { m.emissive = new THREE.Color(opts.emissive); m.emissiveIntensity = opts.emissiveIntensity || 1; }
    if (opts.transparent) { m.transparent = true; m.opacity = opts.opacity != null ? opts.opacity : 0.7; }
    if (opts.side) m.side = opts.side;
    if (opts.flat) m.flatShading = true;
    return m;
  };
  U.basic = function (color, opts) {
    opts = opts || {};
    const m = new THREE.MeshBasicMaterial({ color: color });
    if (opts.transparent) { m.transparent = true; m.opacity = opts.opacity != null ? opts.opacity : 0.7; }
    if (opts.side) m.side = opts.side;
    return m;
  };

  U.box = function (w, h, d, color, opts) {
    return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), U.mat(color, opts));
  };
  U.cyl = function (rt, rb, h, seg, color, opts) {
    return new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 10), U.mat(color, opts));
  };
  U.sph = function (r, color, opts, seg) {
    return new THREE.Mesh(new THREE.SphereGeometry(r, seg || 14, seg ? Math.max(6, seg - 2) : 10), U.mat(color, opts));
  };
  U.cone = function (r, h, seg, color, opts) {
    return new THREE.Mesh(new THREE.ConeGeometry(r, h, seg || 10), U.mat(color, opts));
  };

  // ---------- canvas text plate (plaques, signs) ----------
  U.textPlate = function (title, lines, opts) {
    opts = opts || {};
    const w = 512, h = 320;
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    const x = c.getContext("2d");
    x.fillStyle = opts.bg || "#efe6cf"; x.fillRect(0, 0, w, h);
    x.strokeStyle = opts.border || "#8a733e"; x.lineWidth = 6; x.strokeRect(10, 10, w - 20, h - 20);
    x.strokeRect(20, 20, w - 40, h - 40);
    x.fillStyle = opts.fg || "#3a3020";
    x.textAlign = "center";
    x.font = "bold 30px Georgia, serif";
    let y = 66;
    if (title) {
      x.fillText(title, w / 2, y, w - 70);
      y += 16;
      x.fillRect(w / 2 - 60, y, 120, 2);
      y += 40;
    }
    x.font = "italic 23px Georgia, serif";
    (lines || []).forEach(function (ln) { x.fillText(ln, w / 2, y, w - 70); y += 33; });
    const tex = new THREE.CanvasTexture(c);
    return tex;
  };

  // ---------- floating name label ----------
  U.nameSprite = function (name, dates) {
    const c = document.createElement("canvas"); c.width = 512; c.height = 128;
    const x = c.getContext("2d");
    x.clearRect(0, 0, 512, 128);
    x.fillStyle = "rgba(12,10,6,0.55)";
    const nw = Math.min(490, name.length * 19 + 60);
    U.rrect(x, 256 - nw / 2, 14, nw, dates ? 96 : 62, 10); x.fill();
    x.fillStyle = "#f6ecd2"; x.textAlign = "center";
    x.font = "600 34px Georgia, serif";
    x.fillText(name, 256, 58, 460);
    if (dates) {
      x.fillStyle = "#cbb06a"; x.font = "italic 24px Georgia, serif";
      x.fillText(dates, 256, 92, 460);
    }
    const tex = new THREE.CanvasTexture(c);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
    sp.scale.set(3.4, 0.85, 1);
    return sp;
  };
  U.rrect = function (x, a, b, w, h, r) {
    x.beginPath(); x.moveTo(a + r, b);
    x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r);
    x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath();
  };

  // ---------- glow sprite (sun, item halo, fire) ----------
  U.glowSprite = function (color, size) {
    const c = document.createElement("canvas"); c.width = 128; c.height = 128;
    const x = c.getContext("2d");
    const g = x.createRadialGradient(64, 64, 4, 64, 64, 62);
    const cc = new THREE.Color(color);
    const rgb = Math.round(cc.r * 255) + "," + Math.round(cc.g * 255) + "," + Math.round(cc.b * 255);
    g.addColorStop(0, "rgba(" + rgb + ",0.95)");
    g.addColorStop(0.35, "rgba(" + rgb + ",0.42)");
    g.addColorStop(1, "rgba(" + rgb + ",0)");
    x.fillStyle = g; x.fillRect(0, 0, 128, 128);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
    sp.scale.set(size, size, 1);
    return sp;
  };

  // ---------- terrain height functions ----------
  const TF = {
    dawn: function (x, z) {
      let h = 1.4 * Math.sin(x * 0.045 + 1.2) * Math.cos(z * 0.05) + 0.8 * Math.sin(z * 0.09 + 2.0) + 0.4 * Math.sin(x * 0.13);
      if (x > 30) h -= (x - 30) * 0.11;           // slope to the sea (east)
      if (x > 55) h -= (x - 55) * 0.25;
      const vd = Math.sqrt((x - 18) * (x - 18) + (z - 46) * (z - 46)); // volcano mound
      if (vd < 22) h += (22 - vd) * 0.32 * (vd > 7 ? 1 : vd / 7);
      return h;
    },
    agora: function (x, z) {
      let h = 0.9 * Math.sin(x * 0.05) * Math.cos(z * 0.06 + 1.0) + 0.5 * Math.sin(z * 0.11);
      const ad = Math.sqrt((x + 6) * (x + 6) + (z - 62) * (z - 62)); // acropolis hill
      if (ad < 30) h += (30 - ad) * 0.42;
      return h;
    },
    garden: function (x, z) {
      return 1.1 * Math.sin(x * 0.05 + 0.6) * Math.cos(z * 0.045) + 0.6 * Math.sin(z * 0.1 + 1.4) + 0.3 * Math.cos(x * 0.12);
    },
    cities: function (x, z) {
      let h = 1.0 * Math.sin(x * 0.04 + 2.2) * Math.cos(z * 0.05 + 0.5) + 0.5 * Math.sin(z * 0.09);
      const gd = Math.sqrt((x - 29) * (x - 29) + (z + 31) * (z + 31)); // city of god hill
      if (gd < 24) h += (24 - gd) * 0.34;
      const md = Math.sqrt((x + 30) * (x + 30) + (z + 25) * (z + 25)); // city of man sits low
      if (md < 20) h -= (20 - md) * 0.12;
      return h;
    },
    clockwork: function (x, z) {
      return 0.8 * Math.sin(x * 0.05 + 0.2) * Math.cos(z * 0.055 + 0.8) + 0.4 * Math.sin(z * 0.12 + 0.3);
    },
    summit: function (x, z) {
      let h = 1.2 * Math.sin(x * 0.05 + 1.0) * Math.cos(z * 0.05) + 0.6 * Math.sin(z * 0.08);
      const sd = Math.sqrt((x - 8) * (x - 8) + (z + 42) * (z + 42)); // the mountain
      if (sd < 34) h += Math.pow((34 - sd) / 34, 1.35) * 16;
      const wd = Math.sqrt((x + 32) * (x + 32) + (z - 18) * (z - 18)); // rousseau's vale
      if (wd < 16) h -= (16 - wd) * 0.08;
      return h;
    }
  };

  U.makeHeightFn = function (world) {
    const base = TF[world.terrain] || function () { return 0; };
    const flats = [];
    (world.props || []).forEach(function (p) {
      const F = U.FLATS[p.type];
      if (F) flats.push({ x: p.x || 0, z: p.z || 0, r: F.r, lift: F.lift || 0 });
    });
    (world.npcs || []).forEach(function (n) { flats.push({ x: n.x, z: n.z, r: 5, lift: 0 }); });
    (world.items || []).forEach(function (it) { flats.push({ x: it.x, z: it.z, r: 3.5, lift: 0 }); });
    if (world.spawn) flats.push({ x: world.spawn.x, z: world.spawn.z, r: 6, lift: 0 });
    return function (x, z) {
      let h = base(x, z);
      for (let i = 0; i < flats.length; i++) {
        const f = flats[i];
        const d = Math.sqrt((x - f.x) * (x - f.x) + (z - f.z) * (z - f.z));
        if (d < f.r) {
          const t = d / f.r, s = t * t * (3 - 2 * t); // smoothstep: 0 center → 1 edge
          const fh = base(f.x, f.z) + f.lift;
          h = fh * (1 - s) + h * s;
        }
      }
      return h;
    };
  };
  // prop types that flatten terrain beneath them
  U.FLATS = {
    returnBook: { r: 5 }, temple: { r: 12 }, river: { r: 0 }, firealtar: { r: 4 },
    sphereMonument: { r: 8 }, tidepools: { r: 8 }, agoraPlaza: { r: 14 }, cave: { r: 20 },
    formsGarden: { r: 9 }, lyceum: { r: 11 }, acropolisVista: { r: 16 }, academyGrove: { r: 8 },
    jar: { r: 5 }, walledGarden: { r: 11 }, stoa: { r: 12 }, fountainOfLight: { r: 8 },
    mistGrove: { r: 9 }, cityOfMan: { r: 15 }, cityOfGod: { r: 14 }, prisonCell: { r: 7 },
    wheelOfFortune: { r: 4 }, scriptorium: { r: 6 }, palazzo: { r: 9 }, leviathanMural: { r: 7 },
    stoveRoom: { r: 6 }, lensBench: { r: 5 }, monadOrrery: { r: 7 }, slateTablet: { r: 4 },
    berkeleyGrove: { r: 9 }, billiardPavilion: { r: 7 }, clockTower: { r: 9 },
    socialOak: { r: 8 }, kantTown: { r: 12 }, spiralMonument: { r: 6 }, theaterGrotto: { r: 9 },
    foundry: { r: 9 }, feliciEngine: { r: 5 }, workshop: { r: 7 }, summitCairn: { r: 6 },
    ruinField: { r: 10 }, volcano: { r: 0 }
  };

  // ---------- sky dome ----------
  U.buildSky = function (scene, sky) {
    const c = document.createElement("canvas"); c.width = 2; c.height = 512;
    const x = c.getContext("2d");
    const g = x.createLinearGradient(0, 0, 0, 512);
    g.addColorStop(0, "#" + new THREE.Color(sky.top).getHexString());
    g.addColorStop(0.55, "#" + new THREE.Color(sky.mid).getHexString());
    g.addColorStop(1, "#" + new THREE.Color(sky.bot).getHexString());
    x.fillStyle = g; x.fillRect(0, 0, 2, 512);
    const tex = new THREE.CanvasTexture(c);
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(240, 24, 16),
      new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, fog: false, depthWrite: false })
    );
    dome.renderOrder = -10;
    scene.add(dome);
    if (sky.stars) {
      const n = 500, pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const th = Math.random() * Math.PI * 2, ph = Math.random() * Math.PI * 0.45;
        const r = 230;
        pos[i * 3] = r * Math.cos(th) * Math.cos(ph);
        pos[i * 3 + 1] = r * Math.sin(ph) + 10;
        pos[i * 3 + 2] = r * Math.sin(th) * Math.cos(ph);
      }
      const gg = new THREE.BufferGeometry();
      gg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const stars = new THREE.Points(gg, new THREE.PointsMaterial({ color: 0xdfe6ff, size: 0.7, fog: false, sizeAttenuation: false }));
      stars.material.size = 1.6;
      scene.add(stars);
    }
    if (sky.moon) {
      const moon = U.glowSprite(0xdfe8ff, 26);
      moon.position.set(-90, 90, -140); scene.add(moon);
      const md = U.sph(6, 0xe8eeff, { emissive: 0xbfcfff, emissiveIntensity: 0.9 }, 16);
      md.material.fog = false; md.position.copy(moon.position); scene.add(md);
    }
    if (sky.sunDisc) {
      const sp = new THREE.Vector3().fromArray(sky.sunPos).normalize().multiplyScalar(200);
      const sun = U.glowSprite(sky.sunColor, 60);
      sun.position.copy(sp); sun.position.y = Math.max(sun.position.y, 8);
      scene.add(sun);
    }
    return dome;
  };

  // ---------- particles ----------
  U.buildParticles = function (scene, spec) {
    const n = spec.count;
    const pos = new Float32Array(n * 3);
    const seeds = new Float32Array(n * 2);
    const a = spec.area || {};
    function place(i) {
      let px, pz;
      if (a.r != null) {
        const th = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random()) * a.r;
        px = a.x + Math.cos(th) * rr; pz = a.z + Math.sin(th) * rr;
      } else {
        px = a.x + (Math.random() - 0.5) * a.w; pz = a.z + (Math.random() - 0.5) * a.d;
      }
      pos[i * 3] = px;
      pos[i * 3 + 1] = spec.y[0] + Math.random() * (spec.y[1] - spec.y[0]);
      pos[i * 3 + 2] = pz;
      seeds[i * 2] = Math.random() * 10; seeds[i * 2 + 1] = Math.random() * 10;
    }
    for (let i = 0; i < n; i++) place(i);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({
      color: spec.color, size: spec.size, transparent: true,
      opacity: spec.type === "mist" ? 0.16 : 0.8, depthWrite: false,
      blending: spec.type === "mist" ? THREE.NormalBlending : THREE.AdditiveBlending
    });
    const pts = new THREE.Points(g, m);
    pts.userData.spec = spec; pts.userData.seeds = seeds;
    scene.add(pts);
    return pts;
  };

  U.tickParticles = function (pts, t, dt, frozenZone) {
    const spec = pts.userData.spec, seeds = pts.userData.seeds;
    const pos = pts.geometry.attributes.position;
    const sp = spec.speed, y0 = spec.y[0], y1 = spec.y[1];
    for (let i = 0; i < spec.count; i++) {
      let x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      if (frozenZone) {
        const dx = x - frozenZone.x, dz = z - frozenZone.z;
        if (dx * dx + dz * dz < frozenZone.r * frozenZone.r) continue;
      }
      const s1 = seeds[i * 2], s2 = seeds[i * 2 + 1];
      switch (spec.type) {
        case "ember": case "rise":
          y += sp * dt * (0.7 + 0.6 * Math.sin(s1 + t));
          x += Math.sin(t * 0.7 + s1) * dt * 0.4;
          if (y > y1) y = y0;
          break;
        case "snow":
          y -= sp * dt * (0.7 + 0.5 * Math.sin(s2 + t));
          x += Math.sin(t * 0.5 + s1) * dt * 0.7;
          z += Math.cos(t * 0.4 + s2) * dt * 0.5;
          if (y < y0) y = y1;
          break;
        case "petal":
          y -= sp * dt * (0.5 + 0.4 * Math.sin(s1 + t));
          x += Math.sin(t * 0.8 + s1) * dt * 0.9;
          if (y < y0) y = y1;
          break;
        case "atom":
          x += Math.sin(t * 0.6 + s1) * dt * sp * 2.2;
          y += Math.cos(t * 0.5 + s2) * dt * sp * 1.6;
          z += Math.sin(t * 0.45 + s2 * 1.7) * dt * sp * 2.0;
          if (y < y0) y = y0; if (y > y1) y = y1;
          break;
        default: // mote, mist
          x += Math.sin(t * 0.25 + s1) * dt * sp * 3;
          y += Math.cos(t * 0.2 + s2) * dt * sp * 2;
          z += Math.cos(t * 0.22 + s1 * 1.3) * dt * sp * 3;
          if (y < y0) y = y1; if (y > y1) y = y0;
      }
      pos.setXYZ(i, x, y, z);
    }
    pos.needsUpdate = true;
  };

  return U;
})();
