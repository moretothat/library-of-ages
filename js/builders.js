// ============================================================
// BUILDERS — props, NPC figures, item shapes, linking books
// Every builder adds to ctx.scene and registers colliders/anims.
// ctx = { scene, heightFn, colliders, anims, world, lightCount, special }
// ============================================================
window.BUILDERS = (function () {
  const B = { props: {} };

  function gy(ctx, x, z) { return ctx.heightFn(x, z); }
  function col(ctx, x, z, r) { ctx.colliders.push({ x: x, z: z, r: r }); }
  function anim(ctx, fn) { ctx.anims.push(fn); }
  function addLight(ctx, color, intensity, dist, x, y, z) {
    if (ctx.lightCount >= 9) return null;
    ctx.lightCount++;
    const L = new THREE.PointLight(color, intensity, dist);
    L.position.set(x, y, z); ctx.scene.add(L); return L;
  }
  // place a group at terrain height
  function place(ctx, g, p, lift) {
    g.position.set(p.x || 0, gy(ctx, p.x || 0, p.z || 0) + (p.y || 0) + (lift || 0), p.z || 0);
    if (p.rot) g.rotation.y = p.rot;
    ctx.scene.add(g);
    return g;
  }

  // ---------------- shared small builders ----------------
  function column(h, r, color) {
    const g = new THREE.Group();
    const c = color || 0xd8cbb2;
    const shaft = U.cyl(r, r * 1.12, h, 12, c); shaft.position.y = h / 2; g.add(shaft);
    const cap = U.box(r * 2.6, r * 0.7, r * 2.6, c); cap.position.y = h + r * 0.35; g.add(cap);
    const base = U.box(r * 2.7, r * 0.6, r * 2.7, c); base.position.y = r * 0.3; g.add(base);
    return g;
  }
  function flameMesh(scale, color) {
    const g = new THREE.Group();
    const f1 = U.cone(0.32 * scale, 0.9 * scale, 8, color || 0xff8833, { emissive: color || 0xff8833, emissiveIntensity: 1 });
    f1.position.y = 0.45 * scale; g.add(f1);
    const f2 = U.cone(0.16 * scale, 0.55 * scale, 8, 0xffd97a, { emissive: 0xffd97a, emissiveIntensity: 1 });
    f2.position.y = 0.6 * scale; g.add(f2);
    const glow = U.glowSprite(color || 0xff9944, 2.2 * scale); glow.position.y = 0.6 * scale; g.add(glow);
    return g;
  }
  function bookMesh(w, thick, color, open) {
    const g = new THREE.Group();
    if (open) {
      const p1 = U.box(w / 2, 0.05, w * 0.72, 0xf2ead2); p1.position.x = -w / 4; p1.rotation.z = 0.12; g.add(p1);
      const p2 = U.box(w / 2, 0.05, w * 0.72, 0xf2ead2); p2.position.x = w / 4; p2.rotation.z = -0.12; g.add(p2);
      const spine = U.box(w * 1.02, 0.06, w * 0.74, color); spine.position.y = -0.055; g.add(spine);
    } else {
      const cover = U.box(w, thick, w * 0.72, color); g.add(cover);
      const pages = U.box(w * 0.94, thick * 0.7, w * 0.68, 0xf2ead2); pages.position.x = w * 0.02; g.add(pages);
    }
    return g;
  }

  // ---------------- common props ----------------
  B.props.plaque = function (ctx, p) {
    const g = new THREE.Group();
    const post = U.cyl(0.07, 0.09, 1.15, 8, 0x5a4a36); post.position.y = 0.57; g.add(post);
    const board = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.45, 0.08),
      [U.mat(0x6a5540), U.mat(0x6a5540),
       U.mat(0x6a5540), U.mat(0x6a5540),
       new THREE.MeshLambertMaterial({ map: U.textPlate(p.title, p.lines) }), U.mat(0x6a5540)]);
    board.position.y = 1.75; board.rotation.y = Math.PI; g.add(board);
    place(ctx, g, p); col(ctx, p.x, p.z, 0.5);
    g.userData.readable = true;
    return g;
  };
  B.props.signpost = function (ctx, p) {
    const g = new THREE.Group();
    const post = U.cyl(0.08, 0.1, 2.2, 8, 0x5a4a36); post.position.y = 1.1; g.add(post);
    const board = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.7, 0.07),
      [U.mat(0x6a5540), U.mat(0x6a5540), U.mat(0x6a5540), U.mat(0x6a5540),
       new THREE.MeshLambertMaterial({ map: U.textPlate(null, [p.text], { bg: "#e2d5b2" }) }), U.mat(0x6a5540)]);
    board.position.y = 1.9; board.rotation.y = Math.PI; g.add(board);
    place(ctx, g, p); col(ctx, p.x, p.z, 0.4);
    return g;
  };
  B.props.tree = function (ctx, p) {
    const g = new THREE.Group();
    const v = p.variant || "cypress";
    if (v === "cypress") {
      const t = U.cyl(0.14, 0.2, 1.2, 7, 0x5a4632); t.position.y = 0.6; g.add(t);
      const c = U.cone(1.1, 6.5, 9, 0x2e4a30, { flat: true }); c.position.y = 4.3; g.add(c);
    } else if (v === "olive") {
      const t = U.cyl(0.2, 0.32, 1.7, 7, 0x6a5a42); t.position.y = 0.85; t.rotation.z = 0.12; g.add(t);
      [[0, 2.4, 0, 1.3], [0.9, 2.1, 0.4, 0.9], [-0.8, 2.2, -0.4, 0.95]].forEach(function (s) {
        const b = U.sph(s[3], 0x7a8a5a, { flat: true }, 9); b.position.set(s[0], s[1], s[2]); b.scale.y = 0.75; g.add(b);
      });
    } else if (v === "pine") {
      const t = U.cyl(0.16, 0.24, 2.4, 7, 0x4a3a2c); t.position.y = 1.2; g.add(t);
      [[2.6, 1.5], [3.6, 1.15], [4.5, 0.8]].forEach(function (s) {
        const c = U.cone(s[1], 1.6, 9, 0x38513e, { flat: true }); c.position.y = s[0]; g.add(c);
      });
    } else if (v === "oak") {
      const t = U.cyl(0.42, 0.62, 2.6, 9, 0x54432f); t.position.y = 1.3; g.add(t);
      [[0, 4.1, 0, 2.2], [1.7, 3.4, 0.7, 1.4], [-1.6, 3.5, -0.5, 1.5], [0.3, 3.3, 1.6, 1.25]].forEach(function (s) {
        const b = U.sph(s[3], 0x4f6238, { flat: true }, 10); b.position.set(s[0], s[1], s[2]); b.scale.y = 0.8; g.add(b);
      });
    } else { // dead
      const t = U.cyl(0.14, 0.26, 2.8, 7, 0x4a4038); t.position.y = 1.4; t.rotation.z = 0.08; g.add(t);
      const b1 = U.cyl(0.06, 0.1, 1.6, 6, 0x4a4038); b1.position.set(0.5, 2.9, 0); b1.rotation.z = -0.9; g.add(b1);
      const b2 = U.cyl(0.05, 0.09, 1.3, 6, 0x4a4038); b2.position.set(-0.45, 2.5, 0.2); b2.rotation.z = 0.8; g.add(b2);
    }
    place(ctx, g, p); col(ctx, p.x, p.z, 0.55);
    return g;
  };
  B.props.rocks = function (ctx, p) {
    const g = new THREE.Group();
    const n = p.n || 4;
    for (let i = 0; i < n; i++) {
      const r = 0.4 + Math.random() * 0.9;
      const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), U.mat(0x8a8278, { flat: true }));
      const a = (i / n) * Math.PI * 2, d = 1 + Math.random() * 2.2;
      m.position.set(Math.cos(a) * d, r * 0.5, Math.sin(a) * d);
      m.rotation.set(Math.random(), Math.random(), Math.random());
      m.scale.y = 0.7; g.add(m);
    }
    place(ctx, g, p);
    return g;
  };
  B.props.brokenColumn = function (ctx, p) {
    const g = new THREE.Group();
    const h = 1.4 + Math.random() * 1.4;
    const c = U.cyl(0.42, 0.48, h, 10, 0xb0a48e); c.position.y = h / 2; g.add(c);
    const top = U.cyl(0.42, 0.42, 0.3, 10, 0xa89c86); top.position.y = h + 0.1; top.rotation.x = 0.18; g.add(top);
    const chunk = U.cyl(0.4, 0.44, 0.9, 10, 0xa89c86);
    chunk.position.set(1.3, 0.35, 0.6); chunk.rotation.z = Math.PI / 2.2; g.add(chunk);
    place(ctx, g, p); col(ctx, p.x, p.z, 0.7);
    return g;
  };
  B.props.ruinField = function (ctx, p) {
    for (let i = 0; i < (p.n || 5); i++) {
      const a = Math.random() * Math.PI * 2, d = 2 + Math.random() * 7;
      B.props.brokenColumn(ctx, { x: p.x + Math.cos(a) * d, z: p.z + Math.sin(a) * d });
    }
    return null;
  };
  B.props.hedge = function (ctx, p) {
    const g = new THREE.Group();
    const b = U.box(p.len || 8, 1.3, 1.1, 0x3e5a3a, { flat: true }); b.position.y = 0.65; g.add(b);
    place(ctx, g, p); col(ctx, p.x, p.z, (p.len || 8) / 2 * 0.7);
    return g;
  };
  B.props.rug = function (ctx, p) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(p.w || 8, p.d || 5), U.mat(p.color || 0x7a2f26));
    m.rotation.x = -Math.PI / 2; m.position.set(p.x, 0.02, p.z);
    const trim = new THREE.Mesh(new THREE.PlaneGeometry((p.w || 8) + 0.5, (p.d || 5) + 0.5), U.mat(0xb08d3e));
    trim.rotation.x = -Math.PI / 2; trim.position.set(p.x, 0.012, p.z);
    ctx.scene.add(trim); ctx.scene.add(m);
    return m;
  };
  B.props.jar = function (ctx, p) {
    const g = new THREE.Group();
    const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.15, 2.4, 14, 1, true), U.mat(0x9a6a44, { side: THREE.DoubleSide }));
    jar.position.y = 1.2; g.add(jar);
    const bottom = U.cyl(1.15, 1.15, 0.12, 14, 0x8a5c3a); bottom.position.y = 0.06; g.add(bottom);
    const lip = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.12, 8, 16), U.mat(0x8a5c3a));
    lip.rotation.x = Math.PI / 2; lip.position.y = 2.4; g.add(lip);
    g.rotation.z = 0.12;
    place(ctx, g, p); col(ctx, p.x, p.z, 1.4);
    return g;
  };
  // Myst-style return book on a lectern
  B.props.returnBook = function (ctx, p) {
    const g = B.linkBookGroup(0x3a5a7a, "THE LIBRARY", "return");
    place(ctx, g, p); col(ctx, p.x, p.z, 0.7);
    ctx.special.returnBook = { x: p.x, z: p.z, group: g };
    return g;
  };
  B.linkBookGroup = function (color, label, sub) {
    const g = new THREE.Group();
    const base = U.box(1.1, 0.18, 1.1, 0x4a3a2a); base.position.y = 0.09; g.add(base);
    const stem = U.cyl(0.14, 0.2, 1.0, 8, 0x5a4632); stem.position.y = 0.6; g.add(stem);
    const top = U.box(0.9, 0.1, 0.8, 0x4a3a2a); top.position.y = 1.12; top.rotation.x = -0.28; g.add(top);
    const book = bookMesh(0.72, 0.1, color, true);
    book.position.y = 1.22; book.rotation.x = -0.28; g.add(book);
    const glow = U.glowSprite(0x9ad8ff, 1.6); glow.position.y = 1.35; g.add(glow);
    g.userData.glow = glow;
    return g;
  };

  // ---------------- Dawn Shore ----------------
  B.props.tidepools = function (ctx, p) {
    const g = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const a = i * 1.3, d = 1.5 + i * 1.1;
      const rock = U.cyl(1.1 + Math.random(), 1.3 + Math.random(), 0.35, 9, 0x7a7268, { flat: true });
      rock.position.set(Math.cos(a) * d, 0.12, Math.sin(a) * d); g.add(rock);
      const pool = U.cyl(0.8, 0.8, 0.08, 12, 0x66b8c8, { transparent: true, opacity: 0.75 });
      pool.position.set(Math.cos(a) * d, 0.34, Math.sin(a) * d); g.add(pool);
    }
    place(ctx, g, p);
    return g;
  };
  B.props.temple = function (ctx, p) {
    const g = new THREE.Group();
    const w = p.w || 10, d = p.d || 14, cols = p.cols || 6;
    const plat = U.box(w + 3, 0.9, d + 3, 0xcfc2a8); plat.position.y = 0.45; g.add(plat);
    const step = U.box(w + 4.6, 0.4, d + 4.6, 0xc0b39a); step.position.y = 0.2; g.add(step);
    for (let i = 0; i < cols; i++) {
      const z = -d / 2 + (d / (cols - 1)) * i;
      const c1 = column(4.2, 0.34); c1.position.set(-w / 2, 0.9, z); g.add(c1);
      const c2 = column(4.2, 0.34); c2.position.set(w / 2, 0.9, z); g.add(c2);
    }
    const roof = U.box(w + 2.4, 0.5, d + 2.4, 0xc8bba0); roof.position.y = 5.4; g.add(roof);
    const ped1 = U.cone(0.01, 1.6, 4, 0xc8bba0); // pediment triangles
    ped1.scale.set((w + 2.4) / 2, 1, 0.25); ped1.position.set(0, 6.4, d / 2 + 1.05); g.add(ped1);
    const ped2 = ped1.clone(); ped2.position.z = -d / 2 - 1.05; g.add(ped2);
    if (p.styleNote === "pythagoras") {
      // floating triangle of light
      const tri = new THREE.Group();
      const barMat = { emissive: 0xffe8a0, emissiveIntensity: 0.9 };
      for (let i = 0; i < 3; i++) {
        const bar = U.cyl(0.05, 0.05, 2.2, 6, 0xffe8a0, barMat);
        bar.rotation.z = Math.PI / 2;
        const ang = i * (Math.PI * 2 / 3) + Math.PI / 6;
        bar.position.set(Math.cos(ang) * 0.63, Math.sin(ang) * 0.63 + 3.2, 0);
        bar.rotation.z = ang + Math.PI / 2;
        tri.add(bar);
      }
      tri.position.y = 0.4; g.add(tri);
      anim(ctx, function (t) { tri.rotation.y = t * 0.4; tri.position.y = 0.4 + Math.sin(t * 0.8) * 0.15; });
      // monochord
      const mono = U.box(2.2, 0.25, 0.5, 0x8a6a44); mono.position.set(0, 1.25, -d / 2 + 2); g.add(mono);
      const str = U.cyl(0.015, 0.015, 2.1, 4, 0xf0e8d0, { emissive: 0xf0e8d0, emissiveIntensity: 0.5 });
      str.rotation.z = Math.PI / 2; str.position.set(0, 1.45, -d / 2 + 2); g.add(str);
    }
    place(ctx, g, p);
    col(ctx, p.x - w / 2, p.z - d / 2, 1); col(ctx, p.x + w / 2, p.z - d / 2, 1);
    col(ctx, p.x - w / 2, p.z + d / 2, 1); col(ctx, p.x + w / 2, p.z + d / 2, 1);
    return g;
  };
  B.props.river = function (ctx, p) {
    const len = p.len || 80, w = p.w || 6;
    const geo = new THREE.PlaneGeometry(w, len, 6, 40);
    const mat = new THREE.MeshLambertMaterial({ color: 0x4a9ab8, transparent: true, opacity: 0.82, emissive: 0x1a4a58, emissiveIntensity: 0.6 });
    const m = new THREE.Mesh(geo, mat);
    m.rotation.x = -Math.PI / 2; m.rotation.z = p.rot || 0;
    m.position.set(p.x, 0.15, p.z);
    // follow terrain roughly: sample along length
    ctx.scene.add(m);
    const pos = geo.attributes.position;
    const c = Math.cos(p.rot || 0), s = Math.sin(p.rot || 0);
    for (let i = 0; i < pos.count; i++) {
      const lx = pos.getX(i), ly = pos.getY(i);
      const wx = p.x + lx * c + ly * s, wz = p.z + (-lx * s + ly * c) * -1;
      pos.setZ(i, 0);
      const h = ctx.heightFn(wx, wz);
      pos.setZ(i, (h + 0.12 - 0.15));
    }
    pos.needsUpdate = true;
    anim(ctx, function (t) {
      const hue = 0.52 + Math.sin(t * 0.5) * 0.06;
      mat.color.setHSL(hue, 0.5, 0.42 + Math.sin(t * 1.7) * 0.05);
      mat.emissiveIntensity = 0.5 + Math.sin(t * 2.3) * 0.15;
    });
    return m;
  };
  B.props.firealtar = function (ctx, p) {
    const g = new THREE.Group();
    const base = U.cyl(1.2, 1.5, 1.1, 9, 0x6a6058, { flat: true }); base.position.y = 0.55; g.add(base);
    const bowl = U.cyl(1.0, 0.7, 0.5, 10, 0x4a423c); bowl.position.y = 1.35; g.add(bowl);
    const fl = flameMesh(1.4); fl.position.y = 1.5; g.add(fl);
    anim(ctx, function (t) { fl.scale.setScalar(1 + Math.sin(t * 9) * 0.08); fl.rotation.y = t * 2; });
    place(ctx, g, p); col(ctx, p.x, p.z, 1.3);
    addLight(ctx, 0xff8833, 1.4, 18, p.x, gy(ctx, p.x, p.z) + 2.4, p.z);
    return g;
  };
  B.props.sphereMonument = function (ctx, p) {
    const g = new THREE.Group();
    const r = p.r || 4;
    const ring = U.cyl(r + 3.4, r + 3.6, 0.25, 32, 0xe8e8ec); ring.position.y = 0.12; g.add(ring);
    const s = U.sph(r, 0xf2f2f6, { flat: false }, 28); s.position.y = r + 0.4; g.add(s);
    place(ctx, g, p); col(ctx, p.x, p.z, r + 0.6);
    return g;
  };
  B.props.volcano = function (ctx, p) {
    const g = new THREE.Group();
    const cone = U.cone(10, 9, 12, 0x3e3430, { flat: true }); cone.position.y = 2.5; g.add(cone);
    const crater = U.cyl(3.2, 4.4, 1.4, 12, 0x2c2420); crater.position.y = 6.6; g.add(crater);
    const lava = U.cyl(2.8, 2.8, 0.2, 12, 0xff5522, { emissive: 0xff5522, emissiveIntensity: 1 });
    lava.position.y = 7.0; g.add(lava);
    const glow = U.glowSprite(0xff6622, 9); glow.position.y = 8; g.add(glow);
    anim(ctx, function (t) { lava.material.emissiveIntensity = 0.8 + Math.sin(t * 2.2) * 0.25; });
    place(ctx, g, p, -1.5);
    col(ctx, p.x, p.z, 7.5);
    return g;
  };

  // ---------------- Agora ----------------
  B.props.agoraPlaza = function (ctx, p) {
    const g = new THREE.Group();
    const slab = U.cyl(13, 13.4, 0.3, 24, 0xc4b696); slab.position.y = 0.15; g.add(slab);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      if (i % 3 === 0) continue; // gaps to walk in
      const c = column(3.6, 0.3); c.position.set(Math.cos(a) * 11.5, 0.3, Math.sin(a) * 11.5); g.add(c);
      col(ctx, p.x + Math.cos(a) * 11.5, p.z + Math.sin(a) * 11.5, 0.6);
    }
    const stall = U.box(2.6, 1, 1.2, 0x8a6a4a); stall.position.set(6, 0.8, 4); g.add(stall);
    const awn = U.box(3, 0.08, 1.6, 0xb8563a); awn.position.set(6, 1.8, 4.1); awn.rotation.x = 0.15; g.add(awn);
    const pots = U.cyl(0.4, 0.3, 0.8, 8, 0x9a6a44); pots.position.set(4.8, 0.7, 3.4); g.add(pots);
    col(ctx, p.x + 6, p.z + 4, 1.6);
    place(ctx, g, p);
    return g;
  };
  B.props.cave = function (ctx, p) {
    const g = new THREE.Group();
    const stone = 0x5a5450, dark = 0x38322e;
    const W = 7, L = 20, H = 4.6;
    // tunnel running -z (into the dark), entrance at +z end
    const floor = U.box(W, 0.3, L, 0x46403c); floor.position.set(0, 0.15, -L / 2 + 2); g.add(floor);
    const wl = U.box(0.8, H, L, stone); wl.position.set(-W / 2, H / 2, -L / 2 + 2); g.add(wl);
    const wr = U.box(0.8, H, L, stone); wr.position.set(W / 2, H / 2, -L / 2 + 2); g.add(wr);
    const ceil = U.box(W + 1.6, 0.8, L, dark); ceil.position.set(0, H + 0.4, -L / 2 + 2); g.add(ceil);
    const back = U.box(W + 1.6, H + 1, 0.8, 0x2e2a26); back.position.set(0, H / 2, -L + 2 - 0.4); g.add(back);
    // shadow wall (inner face of back wall)
    const shadowWall = U.box(W - 0.4, H - 0.6, 0.1, 0x8a7a66);
    shadowWall.position.set(0, H / 2 - 0.2, -L + 2 + 0.15); g.add(shadowWall);
    // rocky mound on top
    [[0, H + 1.6, -6, 5], [3, H + 0.8, -12, 4], [-3.4, H + 1, -10, 4.4], [0, H + 1.2, -16, 4.6]].forEach(function (s) {
      const r = new THREE.Mesh(new THREE.IcosahedronGeometry(s[3], 0), U.mat(0x625a54, { flat: true }));
      r.position.set(s[0], s[1], s[2]); r.scale.y = 0.6; g.add(r);
    });
    // entrance arch rocks
    const a1 = new THREE.Mesh(new THREE.IcosahedronGeometry(2.4, 0), U.mat(stone, { flat: true }));
    a1.position.set(-W / 2 - 1, 1.4, 2.6); g.add(a1);
    const a2 = a1.clone(); a2.position.x = W / 2 + 1; g.add(a2);
    // the fire inside
    const fire = flameMesh(1.1); fire.position.set(0, 0.6, -8); g.add(fire);
    anim(ctx, function (t) { fire.scale.setScalar(1 + Math.sin(t * 8.2) * 0.1); });
    // chained watchers (dark silhouettes facing the wall)
    for (let i = 0; i < 3; i++) {
      const sil = new THREE.Group();
      const body = U.cone(0.42, 1.5, 8, 0x1e1a18); body.position.y = 0.75; sil.add(body);
      const head = U.sph(0.26, 0x1e1a18, {}, 10); head.position.y = 1.7; sil.add(head);
      sil.position.set(-1.6 + i * 1.6, 0.3, -13.5);
      g.add(sil);
      col(ctx, p.x - 1.6 + i * 1.6, p.z - 13.5 + 2, 0.5);
    }
    // gliding shadow shapes on the wall
    const shapes = [];
    for (let i = 0; i < 3; i++) {
      const sh = new THREE.Mesh(new THREE.PlaneGeometry(0.9 + i * 0.3, 1.1 + (i % 2) * 0.5),
        U.basic(0x241f1c, { transparent: true, opacity: 0.85 }));
      sh.position.set(0, 2.1, -L + 2 + 0.22); g.add(sh); shapes.push(sh);
    }
    anim(ctx, function (t) {
      shapes.forEach(function (sh, i) {
        sh.position.x = Math.sin(t * (0.4 + i * 0.17) + i * 2.1) * 2.6;
        sh.position.y = 2 + Math.sin(t * 0.6 + i) * 0.5;
        sh.scale.y = 1 + Math.sin(t * 1.2 + i) * 0.2;
      });
    });
    place(ctx, g, p);
    // side wall colliders (world-space approximations along tunnel)
    for (let zz = 0; zz < L; zz += 2.5) {
      col(ctx, p.x - W / 2, p.z + 2 - zz, 1.1);
      col(ctx, p.x + W / 2, p.z + 2 - zz, 1.1);
    }
    col(ctx, p.x, p.z + 2 - L, 1.4);
    addLight(ctx, 0xff8833, 1.3, 14, p.x, gy(ctx, p.x, p.z) + 1.6, p.z - 8);
    return g;
  };
  B.props.formsGarden = function (ctx, p) {
    const g = new THREE.Group();
    const geos = [new THREE.TetrahedronGeometry(0.7), new THREE.BoxGeometry(0.95, 0.95, 0.95),
      new THREE.OctahedronGeometry(0.75), new THREE.DodecahedronGeometry(0.72), new THREE.IcosahedronGeometry(0.72)];
    const solids = [];
    geos.forEach(function (geo, i) {
      const a = (i / 5) * Math.PI * 2;
      const ped = U.cyl(0.5, 0.65, 1.3, 9, 0xd8d0bc); ped.position.set(Math.cos(a) * 4.5, 0.65, Math.sin(a) * 4.5); g.add(ped);
      const s = new THREE.Mesh(geo, U.mat(0xfffbe8, { emissive: 0xfff2c0, emissiveIntensity: 0.55, flat: true }));
      s.position.set(Math.cos(a) * 4.5, 2.2, Math.sin(a) * 4.5); g.add(s); solids.push(s);
      col(ctx, p.x + Math.cos(a) * 4.5, p.z + Math.sin(a) * 4.5, 0.7);
    });
    const glow = U.glowSprite(0xfff2c0, 7); glow.position.y = 2.6; g.add(glow);
    anim(ctx, function (t) {
      solids.forEach(function (s, i) { s.rotation.y = t * 0.5 + i; s.rotation.x = t * 0.3; s.position.y = 2.2 + Math.sin(t * 0.9 + i * 1.3) * 0.18; });
    });
    place(ctx, g, p);
    return g;
  };
  B.props.lyceum = function (ctx, p) {
    const g = new THREE.Group();
    const plat = U.box(16, 0.7, 8, 0xcabb9e); plat.position.y = 0.35; g.add(plat);
    for (let i = 0; i < 6; i++) {
      const c = column(3.8, 0.3); c.position.set(-6.5 + i * 2.6, 0.7, -3); g.add(c);
      col(ctx, p.x - 6.5 + i * 2.6, p.z - 3, 0.55);
    }
    const roof = U.box(17, 0.4, 4.4, 0xbfb096); roof.position.set(0, 4.8, -2.4); g.add(roof);
    // specimen table
    const table = U.box(4.2, 0.16, 1.4, 0x8a6a4a); table.position.set(2, 1.05, 1.6); g.add(table);
    const t1 = U.sph(0.24, 0xd8c8a8, {}, 8); t1.position.set(0.8, 1.3, 1.6); g.add(t1);
    const t2 = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.5, 6), U.mat(0x8aa8b8)); t2.position.set(1.8, 1.35, 1.4); g.add(t2);
    const t3 = U.cyl(0.16, 0.22, 0.5, 8, 0x9a6a44); t3.position.set(2.8, 1.35, 1.7); g.add(t3);
    const t4 = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.07, 6, 10), U.mat(0xb0a890)); t4.position.set(3.6, 1.3, 1.5); t4.rotation.x = 1.2; g.add(t4);
    col(ctx, p.x + 2, p.z + 1.6, 2.1);
    // peripatetic path
    for (let i = 0; i < 9; i++) {
      const a = -0.4 + i * 0.35;
      const st = U.cyl(0.7, 0.75, 0.08, 8, 0xbfb096);
      st.position.set(Math.cos(a) * 11 - 2, 0.05, Math.sin(a) * 9 + 3);
      g.add(st);
    }
    place(ctx, g, p);
    return g;
  };
  B.props.acropolisVista = function (ctx, p) {
    const g = new THREE.Group();
    const plat = U.box(22, 1.2, 14, 0xb8ab90); plat.position.y = 0.6; g.add(plat);
    for (let i = 0; i < 8; i++) {
      const c = column(6, 0.5, 0xcfc2a8); c.position.set(-8.4 + i * 2.4, 1.2, 0); g.add(c);
    }
    const roof = U.box(21, 0.7, 3.4, 0xc4b79c); roof.position.y = 7.5; g.add(roof);
    const ped = U.cone(0.01, 2.4, 4, 0xc4b79c); ped.scale.set(10.5, 1, 0.3); ped.position.set(0, 8.9, 0); g.add(ped);
    place(ctx, g, p);
    col(ctx, p.x, p.z, 12);
    return g;
  };
  B.props.academyGrove = function (ctx, p) {
    const g = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const tr = B.props.tree(ctx, { variant: "olive", x: p.x + Math.cos(a) * 6, z: p.z + Math.sin(a) * 6 });
    }
    const bench = U.box(2.6, 0.5, 0.7, 0xb0a48e); bench.position.y = 0.25; g.add(bench);
    place(ctx, g, p); col(ctx, p.x, p.z, 1.4);
    return g;
  };

  // ---------------- Garden & Porch ----------------
  B.props.walledGarden = function (ctx, p) {
    const g = new THREE.Group();
    const wallC = 0x9a8a6a, W = 16, D = 14, H = 1.7;
    function wall(w, x, z, ry) {
      const m = U.box(w, H, 0.8, wallC); m.position.set(x, H / 2, z); m.rotation.y = ry || 0; g.add(m);
    }
    wall(W, 0, -D / 2, 0); wall(W / 2 - 1.6, -W / 4 - 0.8, D / 2, 0); wall(W / 2 - 1.6, W / 4 + 0.8, D / 2, 0);
    wall(D, -W / 2, 0, Math.PI / 2); wall(D, W / 2, 0, Math.PI / 2);
    // gate arch
    const ga = U.box(0.5, 2.6, 0.5, 0x8a7a5a); ga.position.set(-1.6, 1.3, D / 2); g.add(ga);
    const gb = ga.clone(); gb.position.x = 1.6; g.add(gb);
    const gt = U.box(3.9, 0.4, 0.6, 0x8a7a5a); gt.position.set(0, 2.7, D / 2); g.add(gt);
    // inside: fruit trees, table with bread & water
    [[-4, -3], [4, -2], [-2, 3], [4.5, 3.5]].forEach(function (s) {
      const tr = new THREE.Group();
      const t = U.cyl(0.14, 0.2, 1.1, 7, 0x6a5a42); t.position.y = 0.55; tr.add(t);
      const b = U.sph(1, 0x6a8a4a, { flat: true }, 9); b.position.y = 1.8; tr.add(b);
      [[0.4, 1.7, 0.5], [-0.5, 1.9, 0.2], [0.1, 2.2, -0.4]].forEach(function (f) {
        const fr = U.sph(0.09, 0xd84a5a, { emissive: 0x882a3a, emissiveIntensity: 0.4 }, 6);
        fr.position.set(f[0], f[1], f[2]); tr.add(fr);
      });
      tr.position.set(s[0], 0, s[1]); g.add(tr);
      col(ctx, p.x + s[0], p.z + s[1], 0.5);
    });
    const table = U.box(2.4, 0.14, 1.2, 0x8a6a4a); table.position.set(0, 0.95, -1); g.add(table);
    const bread = U.sph(0.3, 0xc89a5a, {}, 8); bread.scale.set(1.4, 0.7, 0.9); bread.position.set(-0.5, 1.15, -1); g.add(bread);
    const jug = U.cyl(0.16, 0.24, 0.55, 8, 0x8ab8c8); jug.position.set(0.5, 1.3, -1.2); g.add(jug);
    col(ctx, p.x, p.z - 1, 1.5);
    // wall colliders
    for (let xx = -W / 2; xx <= W / 2; xx += 2.5) { col(ctx, p.x + xx, p.z - D / 2, 1); if (Math.abs(xx) > 2.4) col(ctx, p.x + xx, p.z + D / 2, 1); }
    for (let zz = -D / 2; zz <= D / 2; zz += 2.5) { col(ctx, p.x - W / 2, p.z + zz, 1); col(ctx, p.x + W / 2, p.z + zz, 1); }
    place(ctx, g, p);
    return g;
  };
  B.props.stoa = function (ctx, p) {
    const g = new THREE.Group();
    const plat = U.box(20, 0.7, 8, 0xb8a88e); plat.position.y = 0.35; g.add(plat);
    const back = U.box(20, 4.6, 0.8, 0xa89878); back.position.set(0, 2.65, -3.6); g.add(back);
    // painted panels
    const cols = [0xb8563a, 0x4a7a8a, 0xc8a04a, 0x6a8a5a];
    for (let i = 0; i < 4; i++) {
      const panel = U.box(3.6, 2.6, 0.1, cols[i], { emissive: cols[i], emissiveIntensity: 0.25 });
      panel.position.set(-7.2 + i * 4.8, 2.6, -3.1); g.add(panel);
    }
    for (let i = 0; i < 7; i++) {
      const c = column(4.2, 0.32); c.position.set(-8.4 + i * 2.8, 0.7, 3); g.add(c);
      col(ctx, p.x + (-8.4 + i * 2.8) * Math.cos(p.rot || 0), p.z + 3, 0.55);
    }
    const roof = U.box(21, 0.5, 9, 0xa89878); roof.position.y = 5.2; g.add(roof);
    place(ctx, g, p);
    for (let xx = -9; xx <= 9; xx += 3) col(ctx, p.x + xx, p.z - 3.6, 1);
    return g;
  };
  B.props.fountainOfLight = function (ctx, p) {
    const g = new THREE.Group();
    const t1 = U.cyl(4, 4.4, 0.7, 20, 0xd8cfa8); t1.position.y = 0.35; g.add(t1);
    const t2 = U.cyl(2.6, 3, 0.6, 18, 0xe0d8b0); t2.position.y = 1.35; g.add(t2);
    const t3 = U.cyl(1.4, 1.8, 0.6, 16, 0xe8e0bc); t3.position.y = 2.35; g.add(t3);
    const beam = U.cyl(0.5, 0.9, 7, 12, 0xfff0c0, { emissive: 0xfff0c0, emissiveIntensity: 0.9, transparent: true, opacity: 0.5 });
    beam.position.y = 6; g.add(beam);
    const glow = U.glowSprite(0xfff0c0, 8); glow.position.y = 4; g.add(glow);
    anim(ctx, function (t) { beam.material.opacity = 0.4 + Math.sin(t * 1.4) * 0.15; beam.scale.x = beam.scale.z = 1 + Math.sin(t * 0.9) * 0.1; });
    place(ctx, g, p); col(ctx, p.x, p.z, 4.4);
    addLight(ctx, 0xfff0c0, 1.2, 22, p.x, gy(ctx, p.x, p.z) + 5, p.z);
    return g;
  };
  B.props.mistGrove = function (ctx, p) {
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + 0.5, d = 4 + (i % 2) * 3;
      const g = new THREE.Group();
      const t = U.cyl(0.14, 0.22, 2.2, 7, 0x6a6a78, { transparent: true, opacity: 0.55 }); t.position.y = 1.1; g.add(t);
      const b = U.sph(1.1, 0x8a8a9a, { transparent: true, opacity: 0.4, flat: true }, 9); b.position.y = 2.6; g.add(b);
      place(ctx, g, { x: p.x + Math.cos(a) * d, z: p.z + Math.sin(a) * d });
    }
    return null;
  };

  // ---------------- Two Cities ----------------
  B.props.cityOfMan = function (ctx, p) {
    const g = new THREE.Group();
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2, d = 2 + (i % 3) * 4;
      const h = 1.5 + (i * 37 % 5);
      const b = U.box(2 + (i % 2), h, 2 + ((i + 1) % 2), 0x2e2a2a, { flat: true });
      b.position.set(Math.cos(a) * d, h / 2 - 0.4, Math.sin(a) * d);
      b.rotation.y = i; b.rotation.z = (i % 3 - 1) * 0.09; g.add(b);
      if (i % 2 === 0) {
        const w = U.box(0.3, 0.4, 0.1, 0xff6622, { emissive: 0xff6622, emissiveIntensity: 1 });
        w.position.set(Math.cos(a) * d + 0.5, h * 0.55, Math.sin(a) * d + (1 + (i % 2)) * 1.01);
        g.add(w);
      }
      col(ctx, p.x + Math.cos(a) * d, p.z + Math.sin(a) * d, 1.7);
    }
    const glow = U.glowSprite(0xff5522, 16); glow.position.y = 4; g.add(glow);
    place(ctx, g, p);
    addLight(ctx, 0xff5522, 1.0, 30, p.x, gy(ctx, p.x, p.z) + 4, p.z);
    return g;
  };
  B.props.cityOfGod = function (ctx, p) {
    const g = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2, d = 1.5 + (i % 3) * 3.4;
      const h = 2.5 + (i * 29 % 6);
      const b = U.box(1.8, h, 1.8, 0xe8e0c8, { emissive: 0xc8b070, emissiveIntensity: 0.25, flat: true });
      b.position.set(Math.cos(a) * d, h / 2, Math.sin(a) * d); b.rotation.y = i * 0.7; g.add(b);
      col(ctx, p.x + Math.cos(a) * d, p.z + Math.sin(a) * d, 1.5);
    }
    const spire = U.cone(0.8, 5, 8, 0xf0e8d0, { emissive: 0xe8d090, emissiveIntensity: 0.5 });
    spire.position.y = 8; g.add(spire);
    const tower = U.box(1.6, 6, 1.6, 0xf0e8d0, { emissive: 0xd8c080, emissiveIntensity: 0.3 }); tower.position.y = 3; g.add(tower);
    const glow = U.glowSprite(0xffe8a0, 20); glow.position.y = 7; g.add(glow);
    place(ctx, g, p);
    col(ctx, p.x, p.z, 2);
    addLight(ctx, 0xffe8a0, 1.2, 34, p.x, gy(ctx, p.x, p.z) + 7, p.z);
    return g;
  };
  B.props.prisonCell = function (ctx, p) {
    const g = new THREE.Group();
    const stone = 0x4e4850;
    const floor = U.box(6, 0.3, 6, 0x3e3840); floor.position.y = 0.15; g.add(floor);
    const w1 = U.box(6, 3.4, 0.6, stone); w1.position.set(0, 1.7, -3); g.add(w1);
    const w2 = U.box(0.6, 3.4, 6, stone); w2.position.set(-3, 1.7, 0); g.add(w2);
    const w3 = U.box(0.6, 3.4, 6, stone); w3.position.set(3, 1.7, 0); g.add(w3);
    const roofBeam = U.box(6.6, 0.4, 6.6, 0x38323a); roofBeam.position.y = 3.6; g.add(roofBeam);
    // barred window in back wall
    const win = U.box(1.6, 1.2, 0.7, 0x1a1826); win.position.set(0, 2.2, -3); g.add(win);
    for (let i = 0; i < 4; i++) {
      const bar = U.cyl(0.04, 0.04, 1.2, 6, 0x8a8a92); bar.position.set(-0.6 + i * 0.4, 2.2, -2.95); g.add(bar);
    }
    const desk = U.box(1.8, 0.12, 0.9, 0x6a5a42); desk.position.set(1.4, 0.95, -1.6); g.add(desk);
    const book = bookMesh(0.6, 0.06, 0x7a2f26, true); book.position.set(1.4, 1.05, -1.6); g.add(book);
    const stool = U.cyl(0.3, 0.34, 0.55, 8, 0x5a4a36); stool.position.set(1.4, 0.55, -0.6); g.add(stool);
    const candle = U.cyl(0.05, 0.06, 0.3, 6, 0xe8dcc0); candle.position.set(2, 1.16, -1.8); g.add(candle);
    const cf = flameMesh(0.3); cf.position.set(2, 1.3, -1.8); g.add(cf);
    place(ctx, g, p);
    col(ctx, p.x, p.z - 3, 3); col(ctx, p.x - 3, p.z, 3); col(ctx, p.x + 3, p.z, 3);
    addLight(ctx, 0xffc878, 0.8, 10, p.x + 1, gy(ctx, p.x, p.z) + 1.8, p.z - 1);
    return g;
  };
  B.props.wheelOfFortune = function (ctx, p) {
    const g = new THREE.Group();
    const stand1 = U.box(0.4, 3.2, 0.4, 0x5a4a36); stand1.position.set(-2.2, 1.6, 0); g.add(stand1);
    const stand2 = stand1.clone(); stand2.position.x = 2.2; g.add(stand2);
    const wheel = new THREE.Group();
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.16, 8, 24), U.mat(0x8a6a44)); wheel.add(rim);
    for (let i = 0; i < 6; i++) {
      const sp = U.box(0.12, 3.5, 0.12, 0x7a5c3a); sp.rotation.z = (i / 6) * Math.PI; wheel.add(sp);
    }
    // little kings around the rim
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const k = new THREE.Group();
      const body = U.cone(0.14, 0.4, 6, 0xc8a04a); body.position.y = 0.2; k.add(body);
      const head = U.sph(0.09, 0xe8d0b0, {}, 6); head.position.y = 0.48; k.add(head);
      k.position.set(Math.cos(a) * 1.8, Math.sin(a) * 1.8, 0.2);
      k.rotation.z = a - Math.PI / 2;
      wheel.add(k);
    }
    wheel.position.y = 2.1; g.add(wheel);
    anim(ctx, function (t, dt) { wheel.rotation.z -= dt * 0.35; });
    place(ctx, g, p); col(ctx, p.x, p.z, 1.2);
    return g;
  };
  B.props.scriptorium = function (ctx, p) {
    const g = new THREE.Group();
    const floor = U.cyl(4.4, 4.6, 0.25, 14, 0x4a4038); floor.position.y = 0.12; g.add(floor);
    for (let i = 0; i < 2; i++) {
      const desk = U.box(2, 0.12, 1.1, 0x6a5a42); desk.position.set(-1 + i * 2.4, 1.05, -0.5 - i * 0.3); desk.rotation.y = i * 0.4; g.add(desk);
      const bk = bookMesh(0.7, 0.07, i ? 0x3a5a7a : 0x7a2f26, true); bk.position.set(-1 + i * 2.4, 1.16, -0.5 - i * 0.3); bk.rotation.y = i * 0.4; g.add(bk);
      const cnd = U.cyl(0.05, 0.06, 0.34, 6, 0xe8dcc0); cnd.position.set(-0.4 + i * 2.4, 1.28, -0.9 - i * 0.3); g.add(cnd);
      const fl = flameMesh(0.28); fl.position.set(-0.4 + i * 2.4, 1.44, -0.9 - i * 0.3); g.add(fl);
    }
    const shelf = U.box(3, 1.8, 0.5, 0x5a4a36); shelf.position.set(0, 0.9, -2.6); g.add(shelf);
    for (let i = 0; i < 7; i++) {
      const b = U.box(0.28, 0.5, 0.36, [0x7a2f26, 0x3a5a7a, 0x5a6a3a, 0x8a6a2a][i % 4]);
      b.position.set(-1.2 + i * 0.4, 1.55, -2.5); g.add(b);
    }
    place(ctx, g, p); col(ctx, p.x, p.z - 1, 2.4);
    addLight(ctx, 0xffc878, 0.9, 12, p.x, gy(ctx, p.x, p.z) + 2, p.z);
    return g;
  };

  // ---------------- Cathedral (interior) ----------------
  function stainedGlassTex(seed) {
    const c = document.createElement("canvas"); c.width = 128; c.height = 256;
    const x = c.getContext("2d");
    x.fillStyle = "#14101c"; x.fillRect(0, 0, 128, 256);
    const palette = ["#b83a4a", "#3a5ab8", "#c8a03a", "#5a3ab8", "#3a8a6a", "#b85a2a"];
    let s = seed;
    function rnd() { s = (s * 9301 + 49297) % 233280; return s / 233280; }
    for (let yy = 8; yy < 248; yy += 20) {
      for (let xx = 8; xx < 120; xx += 20) {
        // pointed arch mask
        const cy = yy + 10, cx = xx + 10;
        const archY = cx < 64 ? 60 - (cx / 64) * 52 : 60 - ((128 - cx) / 64) * 52;
        if (cy < archY) continue;
        x.fillStyle = palette[Math.floor(rnd() * palette.length)];
        x.fillRect(xx, yy, 17, 17);
      }
    }
    x.strokeStyle = "#0a0810"; x.lineWidth = 3;
    x.strokeRect(4, 4, 120, 248);
    return new THREE.CanvasTexture(c);
  }
  function roseWindowTex() {
    const c = document.createElement("canvas"); c.width = 256; c.height = 256;
    const x = c.getContext("2d");
    x.fillStyle = "#14101c"; x.fillRect(0, 0, 256, 256);
    const palette = ["#b83a4a", "#3a5ab8", "#c8a03a", "#5a3ab8", "#3a8a6a"];
    for (let i = 0; i < 16; i++) {
      const a0 = (i / 16) * Math.PI * 2, a1 = ((i + 0.9) / 16) * Math.PI * 2;
      x.fillStyle = palette[i % palette.length];
      x.beginPath(); x.moveTo(128, 128);
      x.arc(128, 128, 112, a0, a1); x.closePath(); x.fill();
    }
    x.fillStyle = "#14101c"; x.beginPath(); x.arc(128, 128, 46, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#e8c85a"; x.beginPath(); x.arc(128, 128, 34, 0, Math.PI * 2); x.fill();
    return new THREE.CanvasTexture(c);
  }
  B.props.cathedralNave = function (ctx, p) {
    const g = new THREE.Group();
    const IW = ctx.world.interior.w, ID = ctx.world.interior.d, IH = ctx.world.interior.h;
    const stone = 0x5a5462, dark = 0x443e4e;
    // floor
    const floor = U.box(IW, 0.3, ID, ctx.world.interior.floor); floor.position.y = -0.15; g.add(floor);
    // checkered center aisle
    for (let i = 0; i < Math.floor(ID / 4); i++) {
      const t = U.box(3, 0.06, 2, i % 2 ? 0x6a6472 : 0x3e3846);
      t.position.set(0, 0.02, -ID / 2 + 2 + i * 4); g.add(t);
    }
    // side walls with glass
    for (const side of [-1, 1]) {
      const wall = U.box(1, IH, ID, stone); wall.position.set(side * (IW / 2 + 0.5), IH / 2, 0); g.add(wall);
      for (let i = 0; i < 6; i++) {
        const zz = -ID / 2 + 8 + i * 10;
        const glass = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 8),
          new THREE.MeshBasicMaterial({ map: stainedGlassTex(i * 7 + (side + 2)), side: THREE.DoubleSide }));
        glass.position.set(side * (IW / 2 - 0.05), 8.4, zz);
        glass.rotation.y = -side * Math.PI / 2;
        g.add(glass);
      }
    }
    // end walls
    const wN = U.box(IW + 2, IH, 1, stone); wN.position.set(0, IH / 2, -ID / 2 - 0.5); g.add(wN);
    const wS = U.box(IW + 2, IH, 1, stone); wS.position.set(0, IH / 2, ID / 2 + 0.5); g.add(wS);
    // rose window on north wall
    const rose = new THREE.Mesh(new THREE.CircleGeometry(4.4, 24),
      new THREE.MeshBasicMaterial({ map: roseWindowTex() }));
    rose.position.set(0, 10.5, -ID / 2 + 0.05); g.add(rose);
    const roseGlow = U.glowSprite(0x8a6ab8, 13); roseGlow.position.set(0, 10.5, -ID / 2 + 1); g.add(roseGlow);
    // ceiling with beams
    const ceil = U.box(IW + 2, 0.6, ID + 2, 0x2e2a36); ceil.position.y = IH + 0.3; g.add(ceil);
    for (let i = 0; i < 7; i++) {
      const beam = U.box(IW, 0.9, 0.7, dark); beam.position.set(0, IH - 0.4, -ID / 2 + 6 + i * 9.6); g.add(beam);
    }
    // column rows
    for (let i = 0; i < 6; i++) {
      const zz = -ID / 2 + 8 + i * 10;
      for (const side of [-1, 1]) {
        const c = column(IH - 1.2, 0.55, 0x6a6472); c.position.set(side * 7, 0, zz); g.add(c);
        col(ctx, side * 7, zz, 0.9);
      }
    }
    // altar
    const alt = U.box(6, 1, 2.4, 0x3e3846); alt.position.set(0, 0.5, -ID / 2 + 5); g.add(alt);
    const cloth = U.box(6.2, 0.1, 2.6, 0x7a2f36); cloth.position.set(0, 1.02, -ID / 2 + 5); g.add(cloth);
    col(ctx, 0, -ID / 2 + 5, 3);
    // candle stands
    [[-5, -ID / 2 + 8], [5, -ID / 2 + 8], [-8, 4], [8, -6]].forEach(function (s, i) {
      const st = U.cyl(0.1, 0.16, 1.6, 7, 0x8a7a4a); st.position.set(s[0], 0.8, s[1]); g.add(st);
      const fl = flameMesh(0.42); fl.position.set(s[0], 1.7, s[1]); g.add(fl);
      if (i < 3) addLight(ctx, 0xffc878, 0.85, 16, s[0], 3, s[1]);
      col(ctx, s[0], s[1], 0.4);
    });
    ctx.scene.add(g);
    return g;
  };
  B.props.fiveWays = function (ctx, p) {
    const g = new THREE.Group();
    const labels = ["I", "II", "III", "IV", "V"];
    for (let i = 0; i < 5; i++) {
      const a = Math.PI + (i - 2) * 0.42;
      const x = Math.cos(a) * 6, z = Math.sin(a) * 6 - 1;
      const c = column(6.5, 0.5, 0x7a7284); c.position.set(x, 0, z); g.add(c);
      const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9),
        new THREE.MeshBasicMaterial({ map: U.textPlate(labels[i], [], { bg: "#2e2a36", fg: "#e8c85a", border: "#e8c85a" }), transparent: false }));
      plate.position.set(x, 2.4, z + 0.56); g.add(plate);
      col(ctx, p.x + x, p.z + z, 0.8);
    }
    place(ctx, g, p);
    return g;
  };
  B.props.anselmAlcove = function (ctx, p) {
    const g = new THREE.Group();
    const arch1 = U.box(0.5, 3.6, 0.5, 0x6a6472); arch1.position.set(-1.4, 1.8, 0); g.add(arch1);
    const arch2 = arch1.clone(); arch2.position.x = 1.4; g.add(arch2);
    const top = U.cone(0.01, 1.4, 4, 0x6a6472); top.scale.set(1.8, 1, 0.3); top.position.set(0, 4.2, 0); g.add(top);
    const ped = U.cyl(0.5, 0.66, 1.2, 10, 0x8a8294); ped.position.set(0, 0.6, 0); g.add(ped);
    const glow = U.glowSprite(0xd8d0ff, 3); glow.position.set(0, 1.8, 0); g.add(glow);
    anim(ctx, function (t) { glow.material.opacity = 0.5 + Math.sin(t * 1.1) * 0.3; });
    place(ctx, g, p); col(ctx, p.x, p.z, 1);
    return g;
  };
  B.props.sicetnon = function (ctx, p) {
    const g = new THREE.Group();
    const stand = U.box(1.4, 0.16, 1, 0x5a4a36); stand.position.y = 1.1; stand.rotation.x = -0.3; g.add(stand);
    const leg = U.cyl(0.12, 0.18, 1.05, 8, 0x4a3a2a); leg.position.y = 0.5; g.add(leg);
    const bk = bookMesh(0.9, 0.1, 0x3a3a5a, true); bk.position.y = 1.25; bk.rotation.x = -0.3; g.add(bk);
    const plate = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.9),
      new THREE.MeshBasicMaterial({ map: U.textPlate("SIC · NON", ["yes — and no"], { bg: "#2e2a36", fg: "#e8d8b0", border: "#8a733e" }) }));
    plate.position.set(0, 2.4, -0.2); g.add(plate);
    place(ctx, g, p); col(ctx, p.x, p.z, 0.7);
    return g;
  };
  B.props.ockhamChapel = function (ctx, p) {
    const g = new THREE.Group();
    // deliberately spare: one bare altar, one bench
    const alt = U.box(2.2, 0.9, 1, 0x6a6472); alt.position.set(0, 0.45, -2); g.add(alt);
    const bench = U.box(2.4, 0.45, 0.55, 0x5a5462); bench.position.set(0, 0.22, 1.5); g.add(bench);
    place(ctx, g, p);
    col(ctx, p.x, p.z - 2, 1.3); col(ctx, p.x, p.z + 1.5, 1.2);
    return g;
  };

  // ---------------- Clockwork ----------------
  B.props.clockTower = function (ctx, p) {
    const g = new THREE.Group();
    const base = U.box(5, 3, 5, 0x8a8278); base.position.y = 1.5; g.add(base);
    const shaft = U.box(3.6, 9, 3.6, 0x9a9288); shaft.position.y = 7.5; g.add(shaft);
    const top = U.cone(3, 2.6, 4, 0x5a6a7a); top.position.y = 13.6; top.rotation.y = Math.PI / 4; g.add(top);
    // clock faces on four sides
    for (let i = 0; i < 4; i++) {
      const face = new THREE.Group();
      const disc = U.cyl(1.3, 1.3, 0.1, 20, 0xf0ead8, { emissive: 0xd8d0b8, emissiveIntensity: 0.3 });
      disc.rotation.x = Math.PI / 2; face.add(disc);
      for (let k = 0; k < 12; k++) {
        const tick = U.box(0.07, 0.24, 0.05, 0x3a3630);
        const a = (k / 12) * Math.PI * 2;
        tick.position.set(Math.cos(a) * 1.05, Math.sin(a) * 1.05, 0.07); tick.rotation.z = a + Math.PI / 2;
        face.add(tick);
      }
      const hh = U.box(0.09, 0.65, 0.05, 0x2a2620); hh.position.z = 0.09; hh.geometry.translate(0, 0.28, 0); face.add(hh);
      const mh = U.box(0.06, 0.95, 0.05, 0x2a2620); mh.position.z = 0.11; mh.geometry.translate(0, 0.42, 0); face.add(mh);
      face.position.y = 10.5;
      face.rotation.y = (i * Math.PI) / 2;
      face.translateZ(1.85);
      g.add(face);
      anim(ctx, function (t) { hh.rotation.z = -t * 0.05; mh.rotation.z = -t * 0.6; });
    }
    // pendulum arch at base
    const pen = U.cyl(0.06, 0.06, 2.6, 6, 0x8a7a4a); pen.geometry.translate(0, -1.3, 0);
    const bob = U.sph(0.3, 0xc8a84a, { emissive: 0x8a6a2a, emissiveIntensity: 0.4 }, 10); bob.position.y = -2.6; pen.add(bob);
    pen.position.set(0, 2.9, 2.56); g.add(pen);
    anim(ctx, function (t) { pen.rotation.z = Math.sin(t * 1.8) * 0.4; });
    place(ctx, g, p); col(ctx, p.x, p.z, 3.4);
    return g;
  };
  B.props.palazzo = function (ctx, p) {
    const g = new THREE.Group();
    const floor = U.box(11, 0.5, 9, 0x8a7a68); floor.position.y = 0.25; g.add(floor);
    const back = U.box(11, 4.4, 0.7, 0xa08a72); back.position.set(0, 2.45, -4.2); g.add(back);
    const side = U.box(0.7, 4.4, 9, 0xa08a72); side.position.set(-5.2, 2.45, 0); g.add(side);
    const roof = U.box(12, 0.5, 10, 0x7a4a3a); roof.position.y = 4.9; g.add(roof);
    // banners
    for (let i = 0; i < 3; i++) {
      const bn = U.box(0.9, 1.6, 0.06, [0x8a2a2a, 0xc8a04a, 0x2a4a7a][i]);
      bn.position.set(-3 + i * 3, 3.2, -3.8); g.add(bn);
    }
    // map table
    const table = U.box(4.4, 0.2, 2.6, 0x6a5a42); table.position.set(0, 1.1, -1); g.add(table);
    const map = new THREE.Mesh(new THREE.PlaneGeometry(4, 2.2),
      new THREE.MeshLambertMaterial({ map: U.textPlate("ITALIA · 1513", ["Firenze — Milano — Roma — Napoli", "alliances shift weekly"], { bg: "#d8c8a0" }) }));
    map.rotation.x = -Math.PI / 2; map.position.set(0, 1.22, -1); g.add(map);
    // lion & fox statues
    const lion = new THREE.Group();
    const lb = U.box(0.8, 0.5, 1.2, 0xc8a04a); lb.position.y = 0.55; lion.add(lb);
    const lh = U.sph(0.34, 0xc8a04a, {}, 8); lh.position.set(0, 0.95, 0.6); lion.add(lh);
    const mane = U.sph(0.44, 0xa8823a, { flat: true }, 8); mane.position.set(0, 0.95, 0.45); lion.add(mane);
    lion.position.set(-3.6, 0.5, 2.6); g.add(lion);
    const fox = new THREE.Group();
    const fb = U.box(0.5, 0.36, 1, 0xb86a3a); fb.position.y = 0.45; fox.add(fb);
    const fh = U.cone(0.2, 0.5, 6, 0xb86a3a); fh.rotation.x = -Math.PI / 2; fh.position.set(0, 0.6, 0.7); fox.add(fh);
    const ft = U.cone(0.14, 0.6, 6, 0xd8a86a); ft.rotation.x = Math.PI / 2.4; ft.position.set(0, 0.55, -0.7); fox.add(ft);
    fox.position.set(3.6, 0.5, 2.6); g.add(fox);
    place(ctx, g, p);
    col(ctx, p.x, p.z - 4.2, 5); col(ctx, p.x - 5.2, p.z, 4.4); col(ctx, p.x, p.z - 1, 2.4);
    col(ctx, p.x - 3.6, p.z + 2.6, 0.8); col(ctx, p.x + 3.6, p.z + 2.6, 0.8);
    return g;
  };
  B.props.leviathanMural = function (ctx, p) {
    const g = new THREE.Group();
    const c = document.createElement("canvas"); c.width = 256; c.height = 320;
    const x = c.getContext("2d");
    x.fillStyle = "#d8cfb8"; x.fillRect(0, 0, 256, 320);
    x.strokeStyle = "#6a5a42"; x.lineWidth = 8; x.strokeRect(6, 6, 244, 308);
    function inside(px, py) {
      if ((px - 128) * (px - 128) + (py - 84) * (py - 84) < 42 * 42) return true; // head
      if (py > 120 && py < 300) { const w = 55 + (py - 120) * 0.24; return Math.abs(px - 128) < w; } // torso
      return false;
    }
    x.fillStyle = "#3a3630";
    for (let py = 40; py < 310; py += 9) for (let px = 20; px < 240; px += 8) {
      if (!inside(px, py)) continue;
      x.beginPath(); x.arc(px, py - 2, 2.1, 0, Math.PI * 2); x.fill();
      x.fillRect(px - 1, py, 2, 5);
    }
    // crown
    x.fillStyle = "#8a6a2a";
    for (let i = 0; i < 3; i++) { x.beginPath(); x.moveTo(98 + i * 24, 44); x.lineTo(110 + i * 24, 14); x.lineTo(122 + i * 24, 44); x.fill(); }
    const wallM = new THREE.Mesh(new THREE.BoxGeometry(7, 8.4, 0.6),
      [U.mat(0x8a7a68), U.mat(0x8a7a68), U.mat(0x8a7a68), U.mat(0x8a7a68),
       new THREE.MeshLambertMaterial({ map: new THREE.CanvasTexture(c) }), U.mat(0x8a7a68)]);
    wallM.position.y = 4.2; g.add(wallM);
    const b1 = U.box(1, 5, 1, 0x7a6a58); b1.position.set(-4, 2.5, 0); g.add(b1);
    const b2 = b1.clone(); b2.position.x = 4; g.add(b2);
    place(ctx, g, p);
    col(ctx, p.x, p.z, 3.6);
    return g;
  };
  B.props.stoveRoom = function (ctx, p) {
    const g = new THREE.Group();
    const wallc = 0x7a6a58;
    const floor = U.box(7, 0.3, 7, 0x6a5a48); floor.position.y = 0.15; g.add(floor);
    const w1 = U.box(7, 3.4, 0.5, wallc); w1.position.set(0, 1.7, -3.3); g.add(w1);
    const w2 = U.box(0.5, 3.4, 7, wallc); w2.position.set(-3.3, 1.7, 0); g.add(w2);
    const w3a = U.box(0.5, 3.4, 2.4, wallc); w3a.position.set(3.3, 1.7, -2.3); g.add(w3a);
    const w3b = U.box(0.5, 3.4, 2.4, wallc); w3b.position.set(3.3, 1.7, 2.3); g.add(w3b);
    const roof = U.cone(5.6, 2.4, 4, 0x5a4a3a); roof.position.y = 4.4; roof.rotation.y = Math.PI / 4; g.add(roof);
    // stove
    const stove = U.cyl(0.7, 0.9, 1.7, 10, 0x3e3833); stove.position.set(-2.2, 0.95, -2.2); g.add(stove);
    const stoveGlow = U.box(0.5, 0.4, 0.1, 0xff6622, { emissive: 0xff6622, emissiveIntensity: 1 });
    stoveGlow.position.set(-2.2, 0.7, -1.75); g.add(stoveGlow);
    // half-dissolved furniture (wireframe)
    const chair = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.6, 0.9), new THREE.MeshBasicMaterial({ color: 0xc8b898, wireframe: true, transparent: true, opacity: 0.5 }));
    chair.position.set(1.4, 0.8, -1.6); g.add(chair);
    const table = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1, 1.1), new THREE.MeshBasicMaterial({ color: 0xc8b898, wireframe: true, transparent: true, opacity: 0.45 }));
    table.position.set(0.4, 0.5, 1.4); g.add(table);
    anim(ctx, function (t) {
      chair.material.opacity = 0.28 + Math.sin(t * 1.3) * 0.2;
      table.material.opacity = 0.25 + Math.sin(t * 1.7 + 2) * 0.18;
    });
    place(ctx, g, p);
    col(ctx, p.x, p.z - 3.3, 3.6); col(ctx, p.x - 3.3, p.z, 3.6);
    col(ctx, p.x + 3.3, p.z - 2.3, 1.4); col(ctx, p.x + 3.3, p.z + 2.3, 1.4);
    col(ctx, p.x - 2.2, p.z - 2.2, 0.9);
    addLight(ctx, 0xff8844, 0.8, 9, p.x - 2, gy(ctx, p.x, p.z) + 1.4, p.z - 2);
    return g;
  };
  B.props.lensBench = function (ctx, p) {
    const g = new THREE.Group();
    const bench = U.box(3, 0.16, 1.3, 0x6a5a42); bench.position.y = 1; g.add(bench);
    const leg1 = U.box(0.16, 1, 1.1, 0x5a4a36); leg1.position.set(-1.3, 0.5, 0); g.add(leg1);
    const leg2 = leg1.clone(); leg2.position.x = 1.3; g.add(leg2);
    const bigLens = U.cyl(1.3, 1.3, 0.16, 24, 0xb8d8c8, { transparent: true, opacity: 0.5, emissive: 0x4a6a5a, emissiveIntensity: 0.3 });
    bigLens.rotation.x = Math.PI / 2; bigLens.rotation.z = Math.PI / 2;
    bigLens.position.set(0, 2.3, -0.3); g.add(bigLens);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.32, 0.09, 8, 24), U.mat(0x8a7a4a));
    ring.position.copy(bigLens.position); ring.rotation.y = Math.PI / 2; ring.rotation.y = 0; g.add(ring);
    const grinder = U.cyl(0.3, 0.36, 0.5, 10, 0x8a8278); grinder.position.set(-0.9, 1.32, 0.2); g.add(grinder);
    anim(ctx, function (t) { grinder.rotation.y = t * 3; });
    place(ctx, g, p); col(ctx, p.x, p.z, 1.7);
    return g;
  };
  B.props.monadOrrery = function (ctx, p) {
    const g = new THREE.Group();
    const pole = U.cyl(0.14, 0.2, 4.4, 8, 0x8a7a4a); pole.position.y = 2.2; g.add(pole);
    const base = U.cyl(1.2, 1.5, 0.4, 12, 0x6a5a42); base.position.y = 0.2; g.add(base);
    const spheres = [];
    for (let i = 0; i < 5; i++) {
      const s = U.sph(0.34, 0xd8c8f0, { emissive: 0x8a7ab8, emissiveIntensity: 0.5 }, 14);
      g.add(s); spheres.push(s);
    }
    anim(ctx, function (t) {
      spheres.forEach(function (s, i) {
        const a = t * (0.3 + i * 0.12) + i * 1.3, r = 1.4 + i * 0.5;
        s.position.set(Math.cos(a) * r, 2.2 + Math.sin(t * 0.7 + i) * 0.8, Math.sin(a) * r);
      });
    });
    const glow = U.glowSprite(0xb8a8e8, 5); glow.position.y = 2.4; g.add(glow);
    place(ctx, g, p); col(ctx, p.x, p.z, 0.8);
    return g;
  };
  B.props.slateTablet = function (ctx, p) {
    const g = new THREE.Group();
    const frame = U.box(2.6, 3.4, 0.3, 0x6a5a42); frame.position.y = 2; g.add(frame);
    const slate = U.box(2.2, 3, 0.12, 0xf2ead8, { emissive: 0xd8d0c0, emissiveIntensity: 0.15 });
    slate.position.set(0, 2, 0.18); g.add(slate);
    const leg1 = U.box(0.2, 1.4, 0.2, 0x5a4a36); leg1.position.set(-1, 0.5, 0); leg1.rotation.z = 0.15; g.add(leg1);
    const leg2 = leg1.clone(); leg2.position.x = 1; leg2.rotation.z = -0.15; g.add(leg2);
    place(ctx, g, p); col(ctx, p.x, p.z, 1.2);
    return g;
  };
  B.props.berkeleyGrove = function (ctx, p) {
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + 0.4, d = 3.5 + (i % 2) * 2.6;
      B.props.tree(ctx, { variant: "oak", x: p.x + Math.cos(a) * d, z: p.z + Math.sin(a) * d });
    }
    return null;
  };
  B.props.billiardPavilion = function (ctx, p) {
    const g = new THREE.Group();
    // posts + roof
    for (const s of [[-3, -2.4], [3, -2.4], [-3, 2.4], [3, 2.4]]) {
      const post = U.cyl(0.14, 0.16, 3.2, 8, 0x6a5a48); post.position.set(s[0], 1.6, s[1]); g.add(post);
      col(ctx, p.x + s[0], p.z + s[1], 0.35);
    }
    const roof = U.box(7.6, 0.3, 6, 0x4a5a4a); roof.position.y = 3.4; g.add(roof);
    // table
    const table = U.box(3.6, 0.35, 2, 0x2e5a3a); table.position.y = 1.05; g.add(table);
    const rim = U.box(3.9, 0.18, 2.3, 0x6a4a2a); rim.position.y = 1.24; g.add(rim);
    const felt = U.box(3.5, 0.05, 1.9, 0x3a7a4a); felt.position.y = 1.28; g.add(felt);
    const legs = U.box(3.2, 0.9, 1.6, 0x5a3a22); legs.position.y = 0.45; g.add(legs);
    const white = U.sph(0.14, 0xf0ead8, {}, 10); white.position.set(-0.8, 1.42, 0); g.add(white);
    const red = U.sph(0.14, 0xc83a3a, {}, 10); red.position.set(0.5, 1.42, 0.2); g.add(red);
    anim(ctx, function (t) {
      const c = Math.sin(t * 0.7);
      white.position.x = -0.8 + Math.max(0, c) * 1.0;
      red.position.x = 0.5 + Math.max(0, Math.sin(t * 0.7 - 0.55)) * 0.9;
    });
    place(ctx, g, p);
    col(ctx, p.x, p.z, 2.1);
    return g;
  };

  // ---------------- Summit ----------------
  B.props.socialOak = function (ctx, p) {
    const g = new THREE.Group();
    const t = U.cyl(0.8, 1.15, 3.4, 10, 0x54432f); t.position.y = 1.7; g.add(t);
    [[0, 5.6, 0, 3.1], [2.5, 4.6, 1, 2], [-2.3, 4.8, -0.7, 2.1], [0.4, 4.4, 2.3, 1.8], [-0.6, 4.5, -2.2, 1.7]].forEach(function (s) {
      const b = U.sph(s[3], 0x4f6238, { flat: true }, 10); b.position.set(s[0], s[1], s[2]); b.scale.y = 0.78; g.add(b);
    });
    place(ctx, g, p); col(ctx, p.x, p.z, 1.5);
    return g;
  };
  B.props.kantTown = function (ctx, p) {
    const g = new THREE.Group();
    // cobble circle
    const cob = U.cyl(9, 9.4, 0.25, 22, 0x8a8478); cob.position.y = 0.12; g.add(cob);
    // houses around
    const hs = [[-6, -5, 0.4], [6, -5.5, -0.3], [-6.5, 5, 2.6], [6.5, 5.5, 3.5]];
    hs.forEach(function (s, i) {
      const h = new THREE.Group();
      const body = U.box(3.4, 2.8, 3, [0xc8b89a, 0xb8a888, 0xd0c0a0, 0xc0a890][i]); body.position.y = 1.4; h.add(body);
      const roofm = U.cone(2.8, 1.8, 4, 0x6a4a3a); roofm.position.y = 3.7; roofm.rotation.y = Math.PI / 4; h.add(roofm);
      // timber stripes
      const tb = U.box(3.5, 0.14, 3.1, 0x5a4a36); tb.position.y = 2.3; h.add(tb);
      const door = U.box(0.7, 1.2, 0.08, 0x4a3a2a); door.position.set(0, 0.6, 1.53); h.add(door);
      const win1 = U.box(0.6, 0.6, 0.06, 0xffe8a0, { emissive: 0xd8b860, emissiveIntensity: 0.6 }); win1.position.set(-1, 1.7, 1.53); h.add(win1);
      const win2 = win1.clone(); win2.position.x = 1; h.add(win2);
      h.position.set(s[0], 0, s[1]); h.rotation.y = s[2];
      g.add(h);
      col(ctx, p.x + s[0], p.z + s[1], 2.5);
    });
    // fountain + bell post at center
    const f = U.cyl(1.4, 1.7, 0.7, 12, 0x9a948a); f.position.y = 0.35; g.add(f);
    const fp = U.cyl(0.16, 0.2, 1.4, 8, 0x8a8478); fp.position.y = 1.3; g.add(fp);
    const bell = U.cone(0.4, 0.6, 10, 0xc8a84a); bell.position.y = 2.2; g.add(bell);
    anim(ctx, function (t) { bell.rotation.z = Math.sin(t * 2.2) * 0.12; });
    col(ctx, p.x, p.z, 1.9);
    place(ctx, g, p);
    return g;
  };
  B.props.spiralMonument = function (ctx, p) {
    const g = new THREE.Group();
    const pole = U.cyl(0.2, 0.3, 8.5, 10, 0x7a7268); pole.position.y = 4.25; g.add(pole);
    const spiral = new THREE.Group();
    for (let i = 0; i < 26; i++) {
      const a = i * 0.5, r = 2.4 - i * 0.055, y = 0.4 + i * 0.3;
      const s = U.box(1.15, 0.14, 0.5, 0xb0a890);
      s.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
      s.rotation.y = -a;
      spiral.add(s);
    }
    g.add(spiral);
    anim(ctx, function (t, dt) { spiral.rotation.y += dt * 0.14; });
    place(ctx, g, p); col(ctx, p.x, p.z, 2.7);
    return g;
  };
  B.props.theaterGrotto = function (ctx, p) {
    const g = new THREE.Group();
    // proscenium
    const p1 = U.box(0.9, 5, 0.9, 0x3a3038); p1.position.set(-3.4, 2.5, 0); g.add(p1);
    const p2 = p1.clone(); p2.position.x = 3.4; g.add(p2);
    const lintel = U.box(7.8, 0.9, 1, 0x2e2630); lintel.position.y = 5.2; g.add(lintel);
    // dark box behind
    const back = U.box(7.6, 5, 4.4, 0x1c161e); back.position.set(0, 2.5, -2.6); g.add(back);
    // the churning Will
    const churn = new THREE.Group();
    const blobs = [];
    for (let i = 0; i < 7; i++) {
      const b = U.sph(0.5 + (i % 3) * 0.2, 0x2a1e2e, { emissive: 0x4a2a4e, emissiveIntensity: 0.5 }, 10);
      churn.add(b); blobs.push(b);
    }
    churn.position.set(0, 2, -2.2); g.add(churn);
    anim(ctx, function (t) {
      blobs.forEach(function (b, i) {
        const a = t * (0.6 + i * 0.13) + i * 0.9;
        b.position.set(Math.cos(a) * 1.4, Math.sin(a * 1.3) * 1, Math.sin(a) * 0.8);
        b.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.25);
      });
    });
    // the veil
    const veil = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 4.2, 12, 8),
      new THREE.MeshLambertMaterial({ color: 0x8a7a9a, transparent: true, opacity: 0.42, side: THREE.DoubleSide }));
    veil.position.set(0, 2.4, 0.2); g.add(veil);
    anim(ctx, function (t) {
      const pos = veil.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), y = pos.getY(i);
        pos.setZ(i, Math.sin(x * 1.4 + t * 1.6) * 0.12 + Math.cos(y * 1.2 + t) * 0.08);
      }
      pos.needsUpdate = true;
    });
    place(ctx, g, p);
    col(ctx, p.x - 3.4, p.z, 1); col(ctx, p.x + 3.4, p.z, 1); col(ctx, p.x, p.z - 2.6, 3.4);
    return g;
  };
  B.props.foundry = function (ctx, p) {
    const g = new THREE.Group();
    const hall = U.box(8, 4, 6, 0x5a4238); hall.position.y = 2; g.add(hall);
    const roofm = U.cone(6, 2.2, 4, 0x3e2e28); roofm.position.y = 5.1; roofm.rotation.y = Math.PI / 4; g.add(roofm);
    const chim = U.cyl(0.6, 0.8, 5, 10, 0x4a3a32); chim.position.set(2.6, 6, -1.5); g.add(chim);
    const mouth = U.box(2.4, 2, 0.4, 0x2a1e18); mouth.position.set(0, 1.2, 3); g.add(mouth);
    const fireGlow = U.box(1.8, 1.4, 0.15, 0xff6622, { emissive: 0xff6622, emissiveIntensity: 1 });
    fireGlow.position.set(0, 1, 3.1); g.add(fireGlow);
    anim(ctx, function (t) { fireGlow.material.emissiveIntensity = 0.8 + Math.sin(t * 5.2) * 0.25; });
    // great gear
    const gear = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.26, 8, 20), U.mat(0x6a5a4a)); gear.add(ring);
    for (let i = 0; i < 8; i++) {
      const tooth = U.box(0.42, 0.42, 0.3, 0x6a5a4a);
      const a = (i / 8) * Math.PI * 2;
      tooth.position.set(Math.cos(a) * 2.05, Math.sin(a) * 2.05, 0); tooth.rotation.z = a; gear.add(tooth);
      const spoke = U.box(0.16, 1.6, 0.2, 0x5a4a3c); spoke.rotation.z = a; spoke.position.set(Math.cos(a) * 0.8, Math.sin(a) * 0.8, 0); gear.add(spoke);
    }
    gear.position.set(-4.9, 2.6, 1); g.add(gear);
    anim(ctx, function (t, dt) { gear.rotation.z += dt * 0.5; });
    place(ctx, g, p);
    col(ctx, p.x, p.z, 4.6); col(ctx, p.x - 4.9, p.z + 1, 1.2);
    addLight(ctx, 0xff6622, 1.1, 20, p.x, gy(ctx, p.x, p.z) + 1.6, p.z + 3.6);
    return g;
  };
  B.props.feliciEngine = function (ctx, p) {
    const g = new THREE.Group();
    const body = U.box(2.6, 1.8, 1.4, 0x8a6a3a); body.position.y = 1.2; g.add(body);
    const legs = U.box(2.2, 0.35, 1.1, 0x5a4a36); legs.position.y = 0.18; g.add(legs);
    for (let i = 0; i < 3; i++) {
      const dial = U.cyl(0.3, 0.3, 0.12, 14, 0xf0e8d0, { emissive: 0xc8b878, emissiveIntensity: 0.3 });
      dial.rotation.x = Math.PI / 2; dial.position.set(-0.8 + i * 0.8, 1.6, 0.75); g.add(dial);
      const needle = U.box(0.04, 0.22, 0.03, 0x8a2a2a); needle.position.set(-0.8 + i * 0.8, 1.68, 0.83); g.add(needle);
      anim(ctx, (function (n, k) { return function (t) { n.rotation.z = Math.sin(t * (0.8 + k * 0.3)) * 1.1; }; })(needle, i));
    }
    const lever = U.cyl(0.05, 0.05, 1.1, 6, 0x8a8278); lever.position.set(1.5, 1.9, 0); lever.rotation.z = -0.5; g.add(lever);
    const knob = U.sph(0.14, 0xc83a3a, {}, 8); knob.position.set(1.9, 2.3, 0); g.add(knob);
    const funnel = U.cone(0.5, 0.7, 10, 0xa88a4a); funnel.rotation.x = Math.PI; funnel.position.set(0, 2.5, 0); g.add(funnel);
    place(ctx, g, p); col(ctx, p.x, p.z, 1.7);
    return g;
  };
  B.props.workshop = function (ctx, p) {
    const g = new THREE.Group();
    const floor = U.box(7, 0.3, 5.4, 0x7a6a52); floor.position.y = 0.15; g.add(floor);
    for (const s of [[-3.2, -2.4], [3.2, -2.4], [-3.2, 2.4], [3.2, 2.4]]) {
      const post = U.cyl(0.14, 0.17, 3, 8, 0x6a5a48); post.position.set(s[0], 1.5, s[1]); g.add(post);
    }
    const roofm = U.box(7.6, 0.25, 6, 0x8a5a3a); roofm.position.y = 3.15; roofm.rotation.x = 0.06; g.add(roofm);
    const bench = U.box(4, 0.16, 1.3, 0x6a5a42); bench.position.set(0, 1, -1.4); g.add(bench);
    // tools
    const ham = new THREE.Group();
    const hh = U.box(0.5, 0.2, 0.2, 0x7a7268); hh.position.y = 0.5; ham.add(hh);
    const hs = U.cyl(0.045, 0.05, 0.5, 6, 0x8a6a44); hs.position.y = 0.25; ham.add(hs);
    ham.position.set(-1.2, 1.1, -1.4); ham.rotation.z = 0.6; g.add(ham);
    const saw = U.box(0.9, 0.16, 0.03, 0xa8a8a0); saw.position.set(0.2, 1.15, -1.5); saw.rotation.z = 0.1; g.add(saw);
    const jarG = U.cyl(0.16, 0.16, 0.4, 8, 0x8ab8c8, { transparent: true, opacity: 0.6 }); jarG.position.set(1.4, 1.28, -1.4); g.add(jarG);
    place(ctx, g, p);
    col(ctx, p.x, p.z - 1.4, 2.2);
    addLight(ctx, 0xffd8a0, 0.7, 12, p.x, gy(ctx, p.x, p.z) + 2.6, p.z);
    return g;
  };
  B.props.summitCairn = function (ctx, p) {
    const g = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const r = 0.85 - i * 0.14;
      const s = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), U.mat(0x8a8890, { flat: true }));
      s.position.y = 0.4 + i * 0.62; s.rotation.y = i * 1.2; s.scale.y = 0.6; g.add(s);
    }
    place(ctx, g, p); col(ctx, p.x, p.z, 1.1);
    return g;
  };

  // ---------------- Library (hub interior) ----------------
  function shelfTex() {
    const c = document.createElement("canvas"); c.width = 256; c.height = 256;
    const x = c.getContext("2d");
    x.fillStyle = "#3a2c1e"; x.fillRect(0, 0, 256, 256);
    const cols = ["#7a2f26", "#3a5a7a", "#5a6a3a", "#8a6a2a", "#5a3a5a", "#a8503a", "#2e4a44"];
    for (let row = 0; row < 4; row++) {
      const y0 = row * 64;
      x.fillStyle = "#241a10"; x.fillRect(0, y0 + 56, 256, 8);
      let xx = 4;
      while (xx < 248) {
        const w = 8 + Math.random() * 14, h = 40 + Math.random() * 14;
        x.fillStyle = cols[Math.floor(Math.random() * cols.length)];
        x.fillRect(xx, y0 + 56 - h, w, h);
        x.fillStyle = "rgba(255,235,180,0.35)";
        x.fillRect(xx + 2, y0 + 56 - h + 6, w - 4, 2);
        xx += w + 2;
      }
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }
  B.props.libraryRoom = function (ctx, p) {
    const g = new THREE.Group();
    const IW = ctx.world.interior.w, ID = ctx.world.interior.d, IH = ctx.world.interior.h;
    // wood floor with plank stripes
    const floor = U.box(IW, 0.3, ID, 0x6b4f33); floor.position.y = -0.15; g.add(floor);
    for (let i = 0; i < Math.floor(IW / 2); i++) {
      const pl = U.box(0.06, 0.02, ID, 0x543c26);
      pl.position.set(-IW / 2 + 1 + i * 2, 0.01, 0); g.add(pl);
    }
    // shelf walls
    const st = shelfTex(); st.repeat.set(4, 1.6);
    const mkWall = function (w, h) {
      return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: st.clone() }));
    };
    const wN = mkWall(IW, IH); wN.position.set(0, IH / 2, -ID / 2 + 0.1); g.add(wN);
    const wS = mkWall(IW, IH); wS.position.set(0, IH / 2, ID / 2 - 0.1); wS.rotation.y = Math.PI; g.add(wS);
    const wE = mkWall(ID, IH); wE.position.set(IW / 2 - 0.1, IH / 2, 0); wE.rotation.y = -Math.PI / 2; g.add(wE);
    const wW = mkWall(ID, IH); wW.position.set(-IW / 2 + 0.1, IH / 2, 0); wW.rotation.y = Math.PI / 2; g.add(wW);
    wN.material.map.repeat.set(5, 2); wE.material.map.repeat.set(4, 2); wW.material.map.repeat.set(4, 2); wS.material.map.repeat.set(5, 2);
    [wN, wS, wE, wW].forEach(function (w) { w.material.map.needsUpdate = true; });
    // window on north wall (night sky)
    const win = U.box(4.4, 3.2, 0.2, 0x101828, { emissive: 0x1a2848, emissiveIntensity: 0.8 });
    win.position.set(6, 3.4, -ID / 2 + 0.18); g.add(win);
    const frame = U.box(4.8, 3.6, 0.15, 0x3a2c1e); frame.position.set(6, 3.4, -ID / 2 + 0.12); g.add(frame);
    const moonG = U.glowSprite(0xd8e0ff, 1.6); moonG.position.set(7, 4.2, -ID / 2 + 0.4); g.add(moonG);
    // ceiling + beams
    const ceil = U.box(IW + 1, 0.4, ID + 1, 0x2e2318); ceil.position.y = IH + 0.2; g.add(ceil);
    for (let i = 0; i < 5; i++) {
      const beam = U.box(IW, 0.5, 0.5, 0x3e2f1e); beam.position.set(0, IH - 0.25, -ID / 2 + 3 + i * 5); g.add(beam);
    }
    // chandelier
    const ch = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.09, 8, 18), U.mat(0x5a4a2a));
    ring.rotation.x = Math.PI / 2; ch.add(ring);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const cd = U.cyl(0.05, 0.06, 0.3, 6, 0xe8dcc0); cd.position.set(Math.cos(a) * 1.3, 0.2, Math.sin(a) * 1.3); ch.add(cd);
      const fl = flameMesh(0.24); fl.position.set(Math.cos(a) * 1.3, 0.36, Math.sin(a) * 1.3); ch.add(fl);
    }
    ch.position.set(0, IH - 1.6, 0); g.add(ch);
    addLight(ctx, 0xffd8a0, 0.9, 26, 0, IH - 2, 0);
    ctx.scene.add(g);
    return g;
  };
  B.props.deskOfRussell = function (ctx, p) {
    const g = new THREE.Group();
    const top = U.box(3.4, 0.16, 1.7, 0x54432f); top.position.y = 1.05; g.add(top);
    const l1 = U.box(0.18, 1, 1.5, 0x463825); l1.position.set(-1.5, 0.5, 0); g.add(l1);
    const l2 = l1.clone(); l2.position.x = 1.5; g.add(l2);
    // papers, inkwell, lamp
    const papers = U.box(0.9, 0.04, 0.65, 0xf2ead2); papers.position.set(-0.6, 1.16, 0.1); papers.rotation.y = 0.2; g.add(papers);
    const paper2 = U.box(0.8, 0.03, 0.6, 0xEEE4c8); paper2.position.set(-0.2, 1.19, -0.2); paper2.rotation.y = -0.3; g.add(paper2);
    const ink = U.cyl(0.09, 0.11, 0.16, 8, 0x2a2a3a); ink.position.set(0.5, 1.2, -0.4); g.add(ink);
    const lampBase = U.cyl(0.12, 0.18, 0.5, 8, 0x3a5a3a); lampBase.position.set(1.1, 1.35, -0.3); g.add(lampBase);
    const shade = U.cone(0.45, 0.4, 10, 0x3a7a4a, { emissive: 0x2a6a3a, emissiveIntensity: 0.5 });
    shade.position.set(1.1, 1.75, -0.3); g.add(shade);
    const lglow = U.glowSprite(0xa8ffc8, 1.8); lglow.position.set(1.1, 1.6, -0.3); g.add(lglow);
    const chair = U.box(0.9, 0.5, 0.9, 0x5a3a2a); chair.position.set(0, 0.25, 1.4); g.add(chair);
    const chairB = U.box(0.9, 1.1, 0.16, 0x5a3a2a); chairB.position.set(0, 0.8, 1.85); g.add(chairB);
    // stack of seven volumes
    for (let i = 0; i < 7; i++) {
      const b = U.box(0.62 - i * 0.02, 0.09, 0.45, [0x7a2f26, 0x3a5a7a, 0x5a6a3a, 0x8a6a2a, 0x5a3a5a, 0xa8503a, 0x2e4a44][i]);
      b.position.set(1.2, 1.18 + i * 0.09, 0.45); b.rotation.y = i * 0.14; g.add(b);
    }
    place(ctx, g, p);
    col(ctx, p.x, p.z, 2.1);
    addLight(ctx, 0xc8ffda, 0.7, 9, p.x + 1, 2.2, p.z);
    return g;
  };
  B.props.fireplace = function (ctx, p) {
    const g = new THREE.Group();
    const hearth = U.box(3.4, 2.6, 1, 0x4a3a2e); hearth.position.y = 1.3; g.add(hearth);
    const mantel = U.box(3.8, 0.2, 1.2, 0x6b4f33); mantel.position.y = 2.7; g.add(mantel);
    const opening = U.box(1.9, 1.5, 0.5, 0x140c08); opening.position.set(0, 0.85, 0.35); g.add(opening);
    const fire = flameMesh(1.0); fire.position.set(0, 0.35, 0.45); g.add(fire);
    const log1 = U.cyl(0.12, 0.12, 1.2, 7, 0x54432f); log1.rotation.z = Math.PI / 2; log1.position.set(0, 0.28, 0.5); g.add(log1);
    anim(ctx, function (t) { fire.scale.setScalar(1 + Math.sin(t * 7.3) * 0.09); });
    place(ctx, g, p);
    col(ctx, p.x, p.z, 2);
    const L = addLight(ctx, 0xff9944, 1.3, 18, p.x, 1.6, p.z + 1);
    if (L) anim(ctx, function (t) { L.intensity = 1.15 + Math.sin(t * 8.7) * 0.2 + Math.sin(t * 3.1) * 0.1; });
    return g;
  };
  B.props.glassCase = function (ctx, p) {
    const g = new THREE.Group();
    const ped = U.box(2, 1.1, 1.4, 0x54432f); ped.position.y = 0.55; g.add(ped);
    const glass = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.2, 1.1),
      U.mat(0xa8c8d8, { transparent: true, opacity: 0.18 }));
    glass.position.y = 1.7; g.add(glass);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.78, 1.28, 1.18),
      new THREE.MeshBasicMaterial({ color: 0xb08d3e, wireframe: true }));
    frame.position.y = 1.7; g.add(frame);
    const book = bookMesh(0.8, 0.16, 0x7a2f26, false);
    book.position.y = 1.45; book.rotation.x = -0.5; g.add(book);
    const glow = U.glowSprite(0xffe8a0, 2.4); glow.position.y = 1.7; glow.material.opacity = 0.25; g.add(glow);
    place(ctx, g, p);
    col(ctx, p.x, p.z, 1.4);
    ctx.special.glassCase = { group: g, glow: glow, glass: glass, x: p.x, z: p.z };
    return g;
  };
  B.props.armchair = function (ctx, p) {
    const g = new THREE.Group();
    const seat = U.box(1.3, 0.5, 1.2, 0x6a2f26); seat.position.y = 0.45; g.add(seat);
    const back = U.box(1.3, 1.2, 0.3, 0x6a2f26); back.position.set(0, 1.05, -0.5); g.add(back);
    const a1 = U.box(0.25, 0.4, 1.2, 0x5a2a20); a1.position.set(-0.6, 0.85, 0); g.add(a1);
    const a2 = a1.clone(); a2.position.x = 0.6; g.add(a2);
    place(ctx, g, p); col(ctx, p.x, p.z, 1);
    return g;
  };
  B.props.globe = function (ctx, p) {
    const g = new THREE.Group();
    const stand = U.cyl(0.5, 0.7, 0.3, 10, 0x54432f); stand.position.y = 0.15; g.add(stand);
    const pole = U.cyl(0.06, 0.06, 1.1, 6, 0x8a6a2a); pole.position.y = 0.8; pole.rotation.z = 0.4; g.add(pole);
    const globe = U.sph(0.55, 0x4a7a9a, {}, 14); globe.position.y = 1.35; g.add(globe);
    const land = U.sph(0.56, 0x7a9a5a, { flat: true }, 7); land.scale.set(0.9, 0.85, 0.95); land.position.y = 1.35; g.add(land);
    anim(ctx, function (t, dt) { globe.rotation.y += dt * 0.3; land.rotation.y += dt * 0.3; });
    place(ctx, g, p); col(ctx, p.x, p.z, 0.8);
    return g;
  };

  // ---------------- NPC figure ----------------
  B.npc = function (ctx, spec) {
    const g = new THREE.Group();
    const robe = spec.robe || 0x6a6a6a, trim = spec.trim || 0xa8a8a8, skin = spec.skin || 0xd8b896;
    // robe
    const body = U.cone(0.62, 1.75, 10, robe, { flat: true }); body.position.y = 0.875; g.add(body);
    const chest = U.cyl(0.34, 0.5, 0.6, 9, robe); chest.position.y = 1.55; g.add(chest);
    const sash = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.06, 6, 14), U.mat(trim));
    sash.rotation.x = Math.PI / 2; sash.position.y = 1.28; g.add(sash);
    // head
    const head = U.sph(0.3, skin, {}, 12); head.position.y = 2.08; g.add(head);
    const hood = U.sph(0.35, trim, { flat: true }, 9);
    hood.scale.set(1, 0.9, 1); hood.position.y = 2.16; hood.position.z = -0.08; g.add(hood);
    // simple face shading: eyes
    const e1 = U.sph(0.035, 0x2a2016, {}, 5); e1.position.set(-0.1, 2.12, 0.27); g.add(e1);
    const e2 = e1.clone(); e2.position.x = 0.1; g.add(e2);
    // arms folded (small cylinders)
    const arm = U.cyl(0.09, 0.11, 0.7, 7, robe); arm.rotation.z = Math.PI / 2.4; arm.position.set(0.25, 1.35, 0.28); g.add(arm);
    const arm2 = arm.clone(); arm2.rotation.z = -Math.PI / 2.4; arm2.position.x = -0.25; g.add(arm2);
    // blob shadow
    const sh = new THREE.Mesh(new THREE.CircleGeometry(0.72, 14), U.basic(0x000000, { transparent: true, opacity: 0.28 }));
    sh.rotation.x = -Math.PI / 2; sh.position.y = 0.02; g.add(sh);
    // accessories
    const acc = spec.accessory;
    if (acc === "staff") {
      const s = U.cyl(0.045, 0.055, 2.3, 6, 0x6a5136); s.position.set(0.55, 1.15, 0.1); s.rotation.z = -0.06; g.add(s);
      const knot = U.sph(0.09, 0x8a6a44, {}, 6); knot.position.set(0.57, 2.3, 0.1); g.add(knot);
    } else if (acc === "book") {
      const b = bookMesh(0.42, 0.09, 0x7a2f26, false); b.position.set(-0.42, 1.45, 0.32); b.rotation.z = 0.5; g.add(b);
    } else if (acc === "quill") {
      const q = U.cone(0.03, 0.5, 5, 0xf0ead8); q.position.set(0.42, 1.62, 0.3); q.rotation.z = -0.5; g.add(q);
    } else if (acc === "lamp") {
      const pole = U.cyl(0.03, 0.03, 0.5, 5, 0x6a5136); pole.position.set(0.5, 1.6, 0.25); pole.rotation.z = -0.4; g.add(pole);
      const lam = U.box(0.18, 0.24, 0.18, 0xc8a04a, { emissive: 0xffc86a, emissiveIntensity: 0.9 });
      lam.position.set(0.62, 1.42, 0.3); g.add(lam);
      const lg = U.glowSprite(0xffc86a, 1); lg.position.copy(lam.position); g.add(lg);
    } else if (acc === "laurel") {
      const l = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 6, 12), U.mat(0x6a8a3a));
      l.rotation.x = Math.PI / 2.3; l.position.y = 2.26; g.add(l);
    } else if (acc === "halo") {
      const h = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.03, 6, 18), U.mat(0xffe8a0, { emissive: 0xffe8a0, emissiveIntensity: 1 }));
      h.position.y = 2.52; h.rotation.x = Math.PI / 2.1; g.add(h);
      const hg = U.glowSprite(0xfff0c0, 1.4); hg.position.y = 2.3; g.add(hg);
    } else if (acc === "pipe") {
      const st = U.cyl(0.025, 0.025, 0.3, 5, 0x54432f); st.position.set(0.16, 2.0, 0.3); st.rotation.z = 1.1; st.rotation.x = 0.3; g.add(st);
      const bowl = U.cyl(0.05, 0.07, 0.1, 6, 0x54432f); bowl.position.set(0.28, 1.95, 0.34); g.add(bowl);
    } else if (acc === "beard") {
      const bd = U.cone(0.2, 0.45, 8, 0xd8d0c0, { flat: true }); bd.rotation.x = Math.PI; bd.position.set(0, 1.86, 0.16); g.add(bd);
    } else if (acc === "mustache") {
      const m1 = U.box(0.34, 0.09, 0.08, 0x4a3a2a); m1.position.set(0, 1.98, 0.28); g.add(m1);
      const m2 = U.box(0.4, 0.06, 0.06, 0x4a3a2a); m2.position.set(0, 1.94, 0.28); g.add(m2);
    } else if (acc === "spectacles") {
      const r1 = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 5, 10), U.mat(0x8a7a3a));
      r1.position.set(-0.1, 2.12, 0.29); g.add(r1);
      const r2 = r1.clone(); r2.position.x = 0.1; g.add(r2);
      const br = U.box(0.08, 0.02, 0.02, 0x8a7a3a); br.position.set(0, 2.12, 0.3); g.add(br);
    } else if (acc === "hammer") {
      const hh = U.box(0.3, 0.14, 0.14, 0x7a7268); hh.position.set(0.55, 1.5, 0.2); g.add(hh);
      const hs2 = U.cyl(0.035, 0.04, 0.55, 6, 0x8a6a44); hs2.position.set(0.55, 1.25, 0.2); g.add(hs2);
    } else if (acc === "crown") {
      const cr = U.cyl(0.26, 0.3, 0.18, 8, 0xc8a04a, { emissive: 0x8a6a2a, emissiveIntensity: 0.4 }); cr.position.y = 2.38; g.add(cr);
    } else if (acc === "poodle") {
      const dog = new THREE.Group();
      const db = U.sph(0.24, 0x2a2624, { flat: true }, 8); db.scale.set(1.3, 1, 1); db.position.y = 0.38; dog.add(db);
      const dh = U.sph(0.16, 0x2a2624, { flat: true }, 8); dh.position.set(0.34, 0.58, 0); dog.add(dh);
      const pom = U.sph(0.1, 0x3a3634, {}, 7); pom.position.set(-0.36, 0.62, 0); dog.add(pom);
      for (let i = 0; i < 4; i++) {
        const leg = U.cyl(0.035, 0.035, 0.3, 5, 0x2a2624);
        leg.position.set(i < 2 ? 0.18 : -0.18, 0.15, i % 2 ? 0.12 : -0.12); dog.add(leg);
      }
      dog.position.set(1.1, 0, 0.3); g.add(dog);
      anim(ctx, function (t) { dog.position.y = Math.abs(Math.sin(t * 3)) * 0.04; });
    }
    // name label
    const label = U.nameSprite(spec.name, spec.dates);
    label.position.y = 3.0; g.add(label);
    g.userData.label = label;

    const gyv = gy(ctx, spec.x, spec.z) + (spec.y || 0);
    g.position.set(spec.x, gyv, spec.z);
    if (spec.face != null) g.rotation.y = spec.face;
    ctx.scene.add(g);
    col(ctx, spec.x, spec.z, 0.9);
    // idle bob + face player handled by engine via userData
    g.userData.baseY = gyv;
    g.userData.npc = spec;
    return g;
  };

  // ---------------- Items ----------------
  function itemCore(kind, color) {
    const g = new THREE.Group();
    const c = color || 0xffe8a0;
    const em = { emissive: c, emissiveIntensity: 0.45, flat: true };
    let m;
    switch (kind) {
      case "vial": {
        m = new THREE.Group();
        const glass = U.cyl(0.16, 0.2, 0.5, 8, c, { transparent: true, opacity: 0.7, emissive: c, emissiveIntensity: 0.4 });
        m.add(glass);
        const neck = U.cyl(0.07, 0.09, 0.18, 8, c, { transparent: true, opacity: 0.7 }); neck.position.y = 0.32; m.add(neck);
        const cork = U.cyl(0.07, 0.07, 0.1, 8, 0xa8845a); cork.position.y = 0.44; m.add(cork);
        break; }
      case "tablet": m = U.box(0.55, 0.7, 0.1, c, em); break;
      case "flame": m = flameMesh(0.8, c); m.position.y = -0.3; break;
      case "sphere": m = U.sph(0.32, c, { emissive: c, emissiveIntensity: 0.3 }, 18); break;
      case "sandal": {
        m = new THREE.Group();
        const sole = U.box(0.5, 0.07, 0.24, c, em); m.add(sole);
        const strap = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.03, 5, 10), U.mat(c, em));
        strap.rotation.y = Math.PI / 2; strap.position.set(0.08, 0.08, 0); m.add(strap);
        break; }
      case "seed": m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 1), U.mat(c, { emissive: c, emissiveIntensity: 0.6 })); break;
      case "cup": {
        m = new THREE.Group();
        const bowl = U.cyl(0.22, 0.14, 0.3, 10, c, em); m.add(bowl);
        const foot = U.cyl(0.07, 0.14, 0.12, 8, c); foot.position.y = -0.2; m.add(foot);
        break; }
      case "shadow": {
        m = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.9), U.basic(0x14121a, { transparent: true, opacity: 0.9 }));
        break; }
      case "scales": {
        m = new THREE.Group();
        const pole = U.cyl(0.03, 0.04, 0.7, 6, c, em); m.add(pole);
        const beam = U.box(0.8, 0.04, 0.04, c, em); beam.position.y = 0.32; m.add(beam);
        for (const s of [-0.36, 0.36]) {
          const str = U.cyl(0.01, 0.01, 0.24, 4, c); str.position.set(s, 0.2, 0); m.add(str);
          const pan = U.cyl(0.12, 0.09, 0.05, 8, c, em); pan.position.set(s, 0.07, 0); m.add(pan);
        }
        break; }
      case "lamp": {
        m = new THREE.Group();
        const body = U.box(0.28, 0.36, 0.28, 0xc8a04a, { emissive: 0xffc86a, emissiveIntensity: 0.8 }); m.add(body);
        const top = U.cone(0.2, 0.16, 6, 0xa8843a); top.position.y = 0.26; m.add(top);
        break; }
      case "key": {
        m = new THREE.Group();
        const shaft = U.cyl(0.04, 0.04, 0.6, 6, c, em); shaft.rotation.z = Math.PI / 2; m.add(shaft);
        const bow = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.035, 6, 12), U.mat(c, em)); bow.position.x = -0.36; m.add(bow);
        const t1 = U.box(0.08, 0.14, 0.04, c, em); t1.position.set(0.24, -0.1, 0); m.add(t1);
        const t2 = U.box(0.06, 0.1, 0.04, c, em); t2.position.set(0.12, -0.08, 0); m.add(t2);
        break; }
      case "fortress": {
        m = new THREE.Group();
        const keep = U.box(0.34, 0.4, 0.34, c, em); m.add(keep);
        for (const s of [[-0.22, -0.22], [0.22, -0.22], [-0.22, 0.22], [0.22, 0.22]]) {
          const t = U.cyl(0.08, 0.09, 0.5, 6, c, em); t.position.set(s[0], 0.05, s[1]); m.add(t);
          const tc = U.cone(0.1, 0.12, 6, c); tc.position.set(s[0], 0.36, s[1]); m.add(tc);
        }
        break; }
      case "mirror": {
        m = new THREE.Group();
        const disc = U.cyl(0.32, 0.32, 0.04, 18, 0xd8e8f0, { emissive: 0xbfd8e8, emissiveIntensity: 0.6 });
        disc.rotation.x = Math.PI / 2; m.add(disc);
        const rim = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.04, 6, 18), U.mat(c)); m.add(rim);
        break; }
      case "wheel": {
        m = new THREE.Group();
        const rim = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 6, 16), U.mat(c, em)); m.add(rim);
        for (let i = 0; i < 3; i++) {
          const sp = U.box(0.04, 0.6, 0.04, c, em); sp.rotation.z = i * Math.PI / 3; m.add(sp);
        }
        break; }
      case "heart": {
        m = new THREE.Group();
        const s1 = U.sph(0.16, c, { emissive: 0x882a20, emissiveIntensity: 0.6 }, 10); s1.position.set(-0.09, 0.08, 0); m.add(s1);
        const s2 = s1.clone(); s2.position.x = 0.09; m.add(s2);
        const pt = U.cone(0.22, 0.35, 8, c, { emissive: 0x882a20, emissiveIntensity: 0.6 });
        pt.rotation.x = Math.PI; pt.position.y = -0.12; m.add(pt);
        break; }
      case "page": m = U.box(0.5, 0.68, 0.02, 0xf2e8cc, { emissive: 0xd8c8a0, emissiveIntensity: 0.35 }); break;
      case "gem": m = new THREE.Mesh(new THREE.OctahedronGeometry(0.32, 0), U.mat(c, { emissive: c, emissiveIntensity: 0.7, flat: true })); break;
      case "coin": {
        m = U.cyl(0.28, 0.28, 0.05, 16, c, { emissive: c, emissiveIntensity: 0.4 });
        m.rotation.x = Math.PI / 2;
        break; }
      case "razor": {
        m = new THREE.Group();
        const blade = U.box(0.6, 0.16, 0.02, 0xd8dce0, { emissive: 0xa8b0b8, emissiveIntensity: 0.5 }); m.add(blade);
        const handle = U.box(0.3, 0.09, 0.04, 0x54432f); handle.position.set(-0.42, -0.05, 0); handle.rotation.z = 0.5; m.add(handle);
        break; }
      case "mask": {
        m = new THREE.Group();
        const face = U.sph(0.3, c, { emissive: 0x5a1a1a, emissiveIntensity: 0.3, flat: true }, 10);
        face.scale.z = 0.5; m.add(face);
        const eye1 = U.box(0.08, 0.05, 0.1, 0x140c08); eye1.position.set(-0.11, 0.05, 0.24); m.add(eye1);
        const eye2 = eye1.clone(); eye2.position.x = 0.11; m.add(eye2);
        break; }
      case "figurine": {
        m = new THREE.Group();
        const body = U.cone(0.2, 0.55, 8, c, em); body.position.y = 0.02; m.add(body);
        const head = U.sph(0.11, c, em, 8); head.position.y = 0.4; m.add(head);
        const cr = U.cyl(0.08, 0.1, 0.07, 6, 0xc8a04a); cr.position.y = 0.5; m.add(cr);
        break; }
      case "lens": {
        m = new THREE.Group();
        const disc = U.cyl(0.3, 0.3, 0.06, 18, c, { transparent: true, opacity: 0.6, emissive: c, emissiveIntensity: 0.4 });
        disc.rotation.x = Math.PI / 2; m.add(disc);
        const rim = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.03, 6, 18), U.mat(0x8a7a4a)); m.add(rim);
        const handle = U.cyl(0.03, 0.04, 0.3, 6, 0x8a7a4a); handle.position.y = -0.42; m.add(handle);
        break; }
      case "monad": {
        m = U.sph(0.3, c, { emissive: c, emissiveIntensity: 0.55 }, 20);
        const inner = U.sph(0.14, 0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.9 }, 10);
        m.add(inner);
        break; }
      case "slate": m = U.box(0.55, 0.7, 0.05, 0xf0ead8, { emissive: 0xc8c0a8, emissiveIntensity: 0.3 }); break;
      case "fruit": {
        m = new THREE.Group();
        const f = U.sph(0.22, c, { emissive: 0x882a30, emissiveIntensity: 0.4 }, 12); m.add(f);
        const stem = U.cyl(0.02, 0.02, 0.14, 5, 0x54622f); stem.position.y = 0.26; m.add(stem);
        const leaf = U.box(0.12, 0.02, 0.07, 0x5a7a3a); leaf.position.set(0.07, 0.3, 0); leaf.rotation.z = 0.4; m.add(leaf);
        break; }
      case "chain": {
        m = new THREE.Group();
        const l1 = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.045, 6, 12), U.mat(c, em)); l1.position.x = -0.22; m.add(l1);
        const l2 = l1.clone(); l2.position.x = 0.22; l2.rotation.y = Math.PI / 2; m.add(l2);
        break; }
      case "spectacles": {
        m = new THREE.Group();
        const r1 = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.03, 6, 14), U.mat(c, em)); r1.position.x = -0.2; m.add(r1);
        const r2 = r1.clone(); r2.position.x = 0.2; m.add(r2);
        const br = U.box(0.12, 0.03, 0.03, c, em); m.add(br);
        const lens1 = U.cyl(0.14, 0.14, 0.02, 12, 0x8ab8d8, { transparent: true, opacity: 0.5 });
        lens1.rotation.x = Math.PI / 2; lens1.position.x = -0.2; m.add(lens1);
        const lens2 = lens1.clone(); lens2.position.x = 0.2; m.add(lens2);
        break; }
      case "spiral": {
        m = new THREE.Group();
        for (let i = 0; i < 14; i++) {
          const a = i * 0.62, r = 0.09 + i * 0.022;
          const seg = U.box(0.13, 0.035, 0.06, c, em);
          seg.position.set(Math.cos(a) * r, i * 0.045 - 0.3, Math.sin(a) * r);
          seg.rotation.y = -a; m.add(seg);
        }
        break; }
      case "veil": {
        m = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.75, 6, 6),
          new THREE.MeshLambertMaterial({ color: c, transparent: true, opacity: 0.55, side: THREE.DoubleSide, emissive: c, emissiveIntensity: 0.2 }));
        break; }
      case "ring": {
        m = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.055, 8, 20), U.mat(c, { emissive: c, emissiveIntensity: 0.5 }));
        break; }
      case "counter": {
        m = new THREE.Group();
        const body = U.box(0.44, 0.3, 0.2, c, em); m.add(body);
        const dial = U.cyl(0.1, 0.1, 0.05, 10, 0xf0ead8, { emissive: 0xd8d0b8, emissiveIntensity: 0.5 });
        dial.rotation.x = Math.PI / 2; dial.position.set(0, 0.05, 0.12); m.add(dial);
        const btn = U.sph(0.05, 0xc83a3a, {}, 6); btn.position.set(0.16, 0.2, 0); m.add(btn);
        break; }
      case "gear": {
        m = new THREE.Group();
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.06, 6, 14), U.mat(c, em)); m.add(ring);
        for (let i = 0; i < 7; i++) {
          const a = (i / 7) * Math.PI * 2;
          const tooth = U.box(0.1, 0.1, 0.07, c, em);
          tooth.position.set(Math.cos(a) * 0.3, Math.sin(a) * 0.3, 0); tooth.rotation.z = a; m.add(tooth);
        }
        break; }
      case "book": m = bookMesh(0.5, 0.12, c, false); break;
      default: m = U.sph(0.28, c, { emissive: c, emissiveIntensity: 0.5 }, 12);
    }
    g.add(m);
    return g;
  }
  B.item = function (ctx, spec) {
    const g = new THREE.Group();
    const isFloating = spec.kind !== "shadow";
    if (isFloating) {
      const ped = U.cyl(0.34, 0.46, 0.85, 9, 0x8a8074);
      ped.position.y = 0.42; g.add(ped);
    }
    const core = itemCore(spec.kind, spec.color);
    core.position.y = isFloating ? 1.55 : 1.3;
    g.add(core);
    const glow = U.glowSprite(spec.glowColor || spec.color || 0xffe8a0, 1.7);
    glow.position.y = core.position.y; g.add(glow);
    const gyv = gy(ctx, spec.x, spec.z) + (spec.y ? spec.y - 1.1 : 0);
    g.position.set(spec.x, gyv, spec.z);
    ctx.scene.add(g);
    g.userData.core = core; g.userData.item = spec; g.userData.glow = glow;
    anim(ctx, function (t) {
      core.position.y = (isFloating ? 1.55 : 1.3) + Math.sin(t * 1.4 + spec.x) * 0.12;
      core.rotation.y = t * 0.8;
      glow.position.y = core.position.y;
    });
    return g;
  };

  return B;
})();
