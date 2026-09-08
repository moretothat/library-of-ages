# The Library of Ages

A first-person exploratory game in the spirit of Myst: you learn Western philosophy by
traveling to seven worlds — one per Part of Bertrand Russell's *A History of Western
Philosophy* — talking with the philosophers who live there, and gathering treasures that
embody their teachings. Bertrand Russell hosts from his Library, where seven linking
books wait on seven lecterns.

## Play it

**Option A — one file, no setup:** double-click `dist/library-of-ages.html`.

**Option B — from the project folder:**

```bash
cd ~/Coding/library-of-ages && python3 -m http.server 8642
```

then open http://localhost:8642.

## Controls

| Key | Action |
| --- | --- |
| WASD / arrows | walk (Shift to hurry) |
| drag mouse, or click for mouse-look | look around |
| E | speak with a thinker / take a treasure / open a linking book |
| J or Tab | journal (thinkers met, treasures found, seeds of thought) |
| M | sound on/off · Esc — menu |

## The seven ages

1. **The Dawn Shore** — the Pre-Socratics (Thales to Democritus, with Protagoras selling lessons)
2. **The Agora of Athens** — Socrates, Plato (walk into the Cave), Aristotle
3. **The Garden & the Porch** — Diogenes' jar, Epicurus' garden, the Stoa, Pyrrho's fog, Plotinus' fountain
4. **The Two Cities** — Augustine between the burning city and the radiant one; Boethius' cell; the scriptorium
5. **The Cathedral of Reason** — Anselm, Abelard, Aquinas' five pillars, Ockham's bare chapel
6. **The Clockwork Dawn** — Machiavelli to Hume around the great clock tower
7. **The Summit & the Engine** — Rousseau's oak to Nietzsche's storm-lit peak

Meet every thinker and gather every treasure in all seven ages and the sealed case in
the Library opens.

Some treasures do things: the Shadow from Plato's cave transmutes if you carry it into
the Forms garden; the ontological Gem only appears after Anselm walks you through the
argument; near Parmenides, nothing moves.

Progress saves automatically in the browser (localStorage).

## Structure

- `index.html` — shell + UI styles
- `js/util.js` — canvas textures, terrain, sky, particles
- `js/builders.js` — props, philosopher figures, treasure shapes
- `js/data-*.js` — all worlds, dialogue, and items (edit these to change content)
- `js/engine.js` — controls, dialogue, journal, saving, audio
- `build.py` — regenerates `dist/library-of-ages.html` (single file) and `dist/artifact.html`

All dialogue is original writing grounded in Russell's account (his structure, his
judgments, his asides — paraphrased, not quoted).
