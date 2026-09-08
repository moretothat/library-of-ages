// ============================================================
// THE LIBRARY OF AGES — hub world data
// The Library: Russell's study, with seven linking books.
// ============================================================
window.WORLD_ORDER = ["dawn", "agora", "garden", "cities", "cathedral", "clockwork", "summit"];

window.DATA_HUB = {
  id: "hub",
  title: "The Library",
  bookLabel: "THE STUDY OF BERTRAND RUSSELL",
  intro: {
    over: "SOMEWHERE OUTSIDE TIME",
    title: "The Library",
    sub: "Seven books lie open on seven lecterns. Each one is a door."
  },
  interior: { w: 34, d: 24, h: 7.5, floor: 0x6b4f33, wall: 0x4a3826, trim: 0x2e2318 },
  sky: { top: 0x0b0d16, mid: 0x141826, bot: 0x1d2333, fogColor: 0x171410, fogNear: 24, fogFar: 60,
         sunPos: [0, 30, 0], sunColor: 0xffdba8, sunIntensity: 0.0,
         hemi: { sky: 0x8a7350, ground: 0x241a10, intensity: 0.55 }, ambient: 0x5a4a35, ambientIntensity: 0.5 },
  particles: [
    { type: "mote", count: 260, area: { x: 0, z: 0, w: 32, d: 22 }, y: [0.4, 7], color: 0xd8c290, size: 0.05, speed: 0.05 }
  ],
  props: [
    { type: "libraryRoom" },
    { type: "deskOfRussell", x: -10.5, z: -6.5, rot: 0.5 },
    { type: "fireplace", x: -16.6, z: 3.5, rot: Math.PI / 2 },
    { type: "glassCase", x: 0, z: -8.6 },
    { type: "rug", x: 0, z: 1.5, w: 13, d: 8, color: 0x7a2f26 },
    { type: "armchair", x: -13.5, z: 6.5, rot: -2.2 },
    { type: "globe", x: 13.8, z: -7.8 },
    { type: "plaque", x: 0, z: -10.9, y: 1.55, rot: Math.PI, title: "THE SEALED CASE",
      lines: ["Gather every thinker and every treasure", "of all seven ages,", "and this case will open."] }
  ],
  // Seven lecterns in a gentle arc facing the room's center.
  portals: [
    { target: "dawn",      x: -12.5, z: -1.5, rot: 1.95 },
    { target: "agora",     x: -8.6,  z: 3.4,  rot: 2.35 },
    { target: "garden",    x: -4.4,  z: 6.6,  rot: 2.75 },
    { target: "cities",    x: 0,     z: 7.8,  rot: Math.PI },
    { target: "cathedral", x: 4.4,   z: 6.6,  rot: 3.55 },
    { target: "clockwork", x: 8.6,   z: 3.4,  rot: 3.95 },
    { target: "summit",    x: 12.5,  z: -1.5, rot: 4.35 }
  ],
  spawn: { x: 0, z: -3.5, yaw: Math.PI },
  npcs: [
    {
      id: "russell", name: "Bertrand Russell", dates: "1872 – 1970",
      title: "Your host — logician, historian of philosophy",
      x: -8.2, z: -6.2, face: 0.9,
      robe: 0x3d3a52, trim: 0x8a84b0, accessory: "pipe",
      blurb: "Wrote the history that built this library. Believes philosophy lives in the questions.",
      seed: "Can you hold a question open without rushing to close it?",
      dialogue: [
        { t: "Ah — you found the place. Welcome. Every book in this room I wrote or read; the seven on the lecterns I lived in for years. They are not ordinary books." },
        { t: "Philosophy, as I practice it, occupies a strange territory. Science tells us what we can know; theology tells us what we wish were true. Philosophy is the no-man's-land between them — exposed to fire from both sides." },
        { t: "The only honest way to cross that territory is to meet the people who mapped it. So I have bound the ages into linking books. Touch an open page and you will stand where the thinkers stood." },
        { t: "A warning, gently given: do not go looking for the winner of the argument. Go looking for the argument. Each of these people was answering the pressures of their own age — wars, plagues, tyrants, gods. Ideas have circumstances." },
        { t: "Speak with everyone. Pocket what they leave for you — each treasure is a thought made solid, and this journal of yours will keep them. When an age is complete, its book on the lectern will burn a little brighter." },
        { t: "Gather all seven ages and the sealed case behind me will open. What is in it? The only thing I have ever been able to promise a student of philosophy. You will see." },
        { t: "Now — begin at the beginning, if you take my advice. The lectern furthest to the west holds the dawn: a shore in Ionia, where someone first asked a question that no priest could answer. Off you go." }
      ]
    }
  ],
  items: []
};

// The final treasure, granted at the sealed case when all ages are complete.
window.FINAL_ITEM = {
  id: "history_itself", name: "The Unfinished History",
  flavor: "A book whose final chapters are blank pages, freshly cut. Every age answered the last one, and every answer raised the next question. The history is not incomplete by accident — it is incomplete by nature.",
  meaning: "Philosophy is not a body of answers but a way of holding questions. The blank pages are yours."
};

window.FINAL_DIALOGUE = [
  { s: "Bertrand Russell", t: "So. You have walked the whole road — sea to summit, cave to cathedral. You are entitled to ask what it was all for. Twenty-five centuries of brilliant people contradicting one another." },
  { s: "Bertrand Russell", t: "Here is what I can offer. Not one of the systems you met survives whole. Plato's Forms, Aquinas's proofs, Hegel's Absolute — each cracked under the next age's questions. If philosophy were a science of answers, it would be a catalogue of failures." },
  { s: "Bertrand Russell", t: "But notice what the questions did. To ask what things are made of gave us physics. To ask how we ought to live gave us law and conscience. To ask what we can truly know keeps every tyrant and every charlatan a little less comfortable." },
  { s: "Bertrand Russell", t: "To teach how to live without certainty, and yet without being paralyzed by hesitation — that, I think, is the chief thing philosophy can still do for those who study it." },
  { s: "Bertrand Russell", t: "The case is open. Take the book. Mind the last pages — the printer left them blank, and I have come to believe that was not an error. Every history of thought ends at the present, and the present is always somebody's beginning." },
  { s: "Bertrand Russell", t: "It was a pleasure to have a reader who walked instead of skimmed. Now go home, look at your own age with these seven behind your eyes — and add your chapter." }
];
