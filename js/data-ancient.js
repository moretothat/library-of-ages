// ============================================================
// BOOK ONE — ANCIENT PHILOSOPHY
// World 1: The Dawn Shore (Part I — The Pre-Socratics)
// World 2: The Agora of Athens (Part II — Socrates, Plato, Aristotle)
// World 3: The Garden & the Porch (Part III — After Aristotle)
// ============================================================

window.DATA_ANCIENT = {

// ------------------------------------------------------------
dawn: {
  id: "dawn",
  title: "The Dawn Shore",
  bookLabel: "BOOK I · PART I — THE PRE-SOCRATICS",
  intro: {
    over: "IONIA, THE 6TH CENTURY B.C.",
    title: "The Dawn Shore",
    sub: "Before philosophy, every question ended with a god. Then, on this coast, someone asked — what if we could find out?"
  },
  terrain: "dawn",
  sky: { top: 0x2a2e5e, mid: 0xc86e5a, bot: 0xf2c078, fogColor: 0xe8b98a, fogNear: 55, fogFar: 150,
         sunPos: [120, 22, 30], sunColor: 0xffd9a0, sunIntensity: 0.95, sunDisc: true,
         hemi: { sky: 0xffd7a8, ground: 0x5a4a45, intensity: 0.5 }, ambient: 0x907060, ambientIntensity: 0.35 },
  water: { level: -0.55, color: 0xd98e66, size: 500 },
  ground: { base: 0x9a8465, accent: 0x7a6a52 },
  particles: [
    { type: "ember", count: 90, area: { x: 18, z: 44, r: 14 }, y: [0.5, 10], color: 0xff7733, size: 0.16, speed: 0.8 },
    { type: "atom", count: 240, area: { x: 40, z: -32, r: 13 }, y: [0.4, 7], color: 0xbfd8ff, size: 0.11, speed: 0.35 },
    { type: "mist", count: 60, area: { x: -20, z: -38, r: 14 }, y: [0.2, 2.5], color: 0xffffff, size: 1.6, speed: 0.05 }
  ],
  props: [
    { type: "returnBook", x: -12, z: 2, rot: 1.4 },
    { type: "plaque", x: -9.5, z: 4.5, rot: 1.2, title: "THE FIRST QUESTION",
      lines: ["Here men first sought causes in nature,", "not in the moods of the gods.", "Science and philosophy were born twins."] },
    { type: "tidepools", x: 38, z: 10 },
    { type: "temple", x: -32, z: 30, rot: 0.4, cols: 6, w: 10, d: 14, color: 0xd8cbb2, styleNote: "pythagoras" },
    { type: "plaque", x: -27.5, z: 24.5, rot: 0.6, title: "THE TEMPLE OF NUMBER",
      lines: ["Strings halved sound the octave.", "Number hides beneath music,", "beneath triangles, beneath the world."] },
    { type: "river", x: 13, z: -6, len: 90, w: 6, rot: 0.12 },
    { type: "firealtar", x: 19, z: -25 },
    { type: "sphereMonument", x: -20, z: -40, r: 4.2 },
    { type: "volcano", x: 18, z: 46, r: 15 },
    { type: "plaque", x: 30, z: -8, rot: -1.2, title: "ANAXIMANDER'S SHRINE",
      lines: ["He said the source of all things is the apeiron —", "the Boundless, without edge or name.", "He drew the first map, and guessed", "that life crept out of the sea."] },
    { type: "signpost", x: -16, z: 12, rot: 1.0, text: "MAN IS THE MEASURE — lessons, 50 drachmae" },
    { type: "rocks", x: -38, z: -12, n: 5 }, { type: "rocks", x: 2, z: 30, n: 4 }, { type: "rocks", x: 44, z: -8, n: 4 },
    { type: "tree", variant: "cypress", x: -26, z: 14 }, { type: "tree", variant: "cypress", x: -40, z: 34 },
    { type: "tree", variant: "olive", x: -6, z: -18 }, { type: "tree", variant: "olive", x: -34, z: -26 }
  ],
  zones: [
    { x: -20, z: -40, r: 9, type: "still" },
    { x: -20, z: -40, r: 8, type: "msg", text: "Nothing moves here. Nothing changes. Parmenides would say: nothing ever did." },
    { x: 13, z: -6, r: 5, type: "msg", text: "You step into the river. Already it is not the river you stepped into." }
  ],
  spawn: { x: -12, z: -1, yaw: -1.4 },
  npcs: [
    { id: "thales", name: "Thales of Miletus", dates: "c. 624 – 546 B.C.", title: "The first philosopher",
      x: 34, z: 12, robe: 0x4a6a7a, trim: 0xa8c8d8, accessory: "staff",
      blurb: "Predicted an eclipse, fell in a well while stargazing, said all is water.",
      seed: "What would you accept as the single stuff beneath everything?",
      dialogue: [
        { t: "Careful of the tide pools — I once fell into a well, watching the stars, and a servant girl laughed at me. A fair price for the sky." },
        { t: "The priests say the sea does what Poseidon wills. I say: watch the water itself. It rises as mist, falls as rain, hardens to ice, feeds every living thing. Everything is water, in one disguise or another." },
        { t: "Perhaps I am wrong — likely I am! But mark what kind of answer it is. Water can be watched. Poseidon cannot. An answer you can test is worth a hundred you must only believe." },
        { t: "They also say I predicted the eclipse, and that I once cornered the olive presses and made a fortune, purely to prove a philosopher could. Wisdom is not the same as helplessness, friend." },
        { s: "Bertrand Russell", t: "Philosophy begins with Thales — not because his answer was good, but because his question was new. 'What is everything made of?' asked without appeal to the gods. Every scientist since is his heir." },
        { t: "Take a vial of the sea before you go. First principles should fit in your pocket." }
      ] },
    { id: "pythagoras", name: "Pythagoras", dates: "c. 570 – 495 B.C.", title: "Mystic of number",
      x: -30, z: 33, robe: 0xf0e8d8, trim: 0xc8a84a, accessory: "laurel",
      blurb: "Founded a cult of mathematics; heard numbers in music and geometry in the world.",
      seed: "Why should the universe obey mathematics at all?",
      dialogue: [
        { t: "Softly. You stand in a school as much as a temple. My followers keep silence for five years before they may argue. You, I will excuse — you seem short on time." },
        { t: "Pluck a string: a note. Halve the string: the octave. Two-thirds: the fifth. Harmony — the loveliest thing the ear knows — is ratio. Number, hiding inside beauty." },
        { t: "Once you hear it there, you find it everywhere. The triangle's sides obey a law no one decreed. The stars keep proportion in their turning. The world is not made of water, friend. It is made of number." },
        { t: "And if the deepest truths are numbers — truths you reach by pure thought, not by squinting at tide pools — then the soul that thinks must be finer than the body it rides in. Mathematics is how the soul remembers eternity." },
        { s: "Bertrand Russell", t: "I do not know of any other man who has been as influential in thought as Pythagoras. Through him mathematics became the model of eternal truth — and through that, from Plato to theology, the intellect learned to distrust the senses. Glorious, and not entirely healthy." },
        { t: "The tablet of the tetractys lies within — ten points that contain the harmonies. Bow to no idol, but you may nod to arithmetic." }
      ] },
    { id: "heraclitus", name: "Heraclitus", dates: "c. 535 – 475 B.C.", title: "The obscure, the fire-minded",
      x: 15, z: -22, robe: 0x7a3a2a, trim: 0xe8883a, accessory: "beard",
      blurb: "All things flow; strife is justice; the world is an ever-living fire.",
      seed: "If everything changes, what — if anything — stays still enough to know?",
      dialogue: [
        { t: "You crossed my river. Tell me — was it the same river when your second foot went in as when your first did? The water you touched is gone to the sea. You cannot step twice into the same river." },
        { t: "Men crave permanence. Fools. Look: the sun is new every day. Your body is a bonfire of food and air, keeping shape only by burning. All things are an exchange for fire, as goods for gold." },
        { t: "And do not curse strife. War of opposites is the harmony — the bow works because string and wood pull against each other. Remove the tension and you have firewood, not music." },
        { t: "Yet in all the flowing, one thing holds: the logos — the hidden pattern of the exchange. Most men sleepwalk past it. Listening not to me but to the logos, it is wise to agree that all things are one." },
        { s: "Bertrand Russell", t: "Heraclitus despised nearly everyone and wrote in riddles, yet his central sight is permanent: science itself has found no everlasting things, only everlasting processes. Philosophy has been fleeing his river ever since — mostly upstream." },
        { t: "The flame on that altar has never gone out. Take a tongue of it. It will not stay the same — that is the lesson." }
      ] },
    { id: "parmenides", name: "Parmenides", dates: "c. 515 – 450 B.C.", title: "Prophet of the changeless One",
      x: -22, z: -36, robe: 0xe8e8ea, trim: 0xb8b8c8, accessory: "staff",
      blurb: "Argued change and motion are illusions: what is, is — one, whole, unmoving.",
      seed: "Can logic overrule your own eyes? Should it ever?",
      dialogue: [
        { t: "The fire-lover across the river says all things change. I say nothing does — nothing can — and I will not ask you to trust your eyes. I will ask you to follow an argument." },
        { t: "Speak of what is not — you cannot. To think is to think of something; to name the void is to make it a thing. 'Nothing' cannot even be said. So: what is, is, and what is not, is not, and there is no third way." },
        { t: "But change is precisely something coming from nothing — the cold that was not, the man who was not. If nothing cannot be, change cannot be. What is must be one, whole, unborn, undying — a perfect sphere of being, still as this circle of ground." },
        { t: "Your senses scream against it? Then let them scream. Which will you crown, traveler — the eye, or the argument? Choose carefully. All philosophy after me is that choice." },
        { s: "Bertrand Russell", t: "What is remarkable is not the conclusion — it is the method. Parmenides invented the metaphysical argument: pure logic against all appearance. He is wrong, I think; but every philosopher since has had to explain exactly how, and most have bled trying." },
        { t: "The sphere rests where all motion ends. Lift it, if you can bear the stillness." }
      ] },
    { id: "empedocles", name: "Empedocles", dates: "c. 494 – 434 B.C.", title: "Physician, poet, self-proclaimed god",
      x: 14, z: 40, robe: 0x5a3a5a, trim: 0xd8a83a, accessory: "laurel",
      blurb: "Four roots — earth, air, fire, water — mixed by Love and pulled apart by Strife.",
      seed: "Is compromise a truce between extremes — or a deeper truth than either?",
      dialogue: [
        { t: "Mind the rim! Etna breathes today. They tell it thus: I leapt in, to prove my divinity, and the mountain kept me — and spat back one bronze sandal. Do I look kept to you?" },
        { t: "Thales cried water; Heraclitus, fire. Quarrelling children, each clutching one toy. I say there are four roots — earth, air, fire, water — unchanging in themselves, endlessly remixed. A compromise, yes. The world is built of compromises." },
        { t: "And what mixes them? Love, which draws together. What unmixes them? Strife, which drives apart. The cosmos swings between their reigns forever — embrace, divorce, embrace. You live in one such swing." },
        { t: "I proved air is a body with a kitchen ladle — trap it under water, inverted, and the water cannot enter. Invisible is not the same as nothing. Remember that; it is the beginning of chemistry." },
        { s: "Bertrand Russell", t: "A mix of philosopher, prophet, physician and charlatan — in roughly equal parts, and the mixture was the age itself. Yet his four elements ruled science for two thousand years, and his 'Love and Strife' are attraction and repulsion in fancy dress. Charlatans sometimes carry the mail." },
        { t: "The sandal lies on the rim — bronze, still warm. A relic of ambition. Handle it with irony." }
      ] },
    { id: "democritus", name: "Democritus", dates: "c. 460 – 370 B.C.", title: "The laughing philosopher",
      x: 42, z: -30, robe: 0x3a5a6a, trim: 0x9ad8ff, accessory: "beard",
      blurb: "Reality is atoms and void; everything else — sweet, bitter, color — is convention.",
      seed: "If you are atoms and void, what exactly is the 'you' that knows it?",
      dialogue: [
        { t: "Ha! Watch the motes drift, friend. You are looking at my answer to a century of quarrels — and it is smaller than dust." },
        { t: "Parmenides proved the void impossible, so change is illusion. I accept his logic and flip his conclusion: the void exists, and in it swarm atoms — uncuttable grains of being, each one a tiny Parmenidean sphere. Countless, eternal, falling and colliding forever." },
        { t: "Sweet exists by convention, bitter by convention, color by convention. In truth: atoms and void. The honey is not sweet — the honey's atoms and your tongue's atoms strike a bargain, and sweetness is the treaty." },
        { t: "No purpose steers the swarm. No Love, no Strife, no gods — only collision and necessity. Do not mourn! It means nothing in the world is watching you with disapproval. That is why I laugh. Cheerfulness, too, can be a philosophy." },
        { s: "Bertrand Russell", t: "In sheer luck of insight, the atomists were the most successful of all ancient guessers — their picture is astonishingly like our physics, purpose purged and mechanism enthroned. Philosophy, I confess, has in some ways never been so clear-eyed since." },
        { t: "Catch a seed of the swarm. Everything you will ever love is made of these. I find that funnier than tragedy, and truer." }
      ] },
    { id: "protagoras", name: "Protagoras", dates: "c. 490 – 420 B.C.", title: "Sophist — wisdom for hire",
      x: -18, z: 14, robe: 0x6a5a3a, trim: 0xe8d8a0, accessory: "book",
      blurb: "'Man is the measure of all things.' Taught rhetoric for pay; doubted the gods politely.",
      seed: "If truth is relative, why does persuasion matter so much?",
      dialogue: [
        { t: "A traveler! Fifty drachmae and I will teach you to win any argument in the agora — twenty-five, since the age of philosophy is young and business is slow." },
        { t: "You have met them, the shore-prophets? Water. Fire. Number. The One. Each certain, each contradicting the rest. What follows? That certainty is a costume. Man is the measure of all things — of what is, that it is; of what is not, that it is not." },
        { t: "The wind that chills you is warm to the runner. Who is wrong? Neither. There is no view from nowhere, friend — only views, and the skill to argue yours. That skill I sell." },
        { t: "Of the gods I say only this: I cannot know whether they exist or what they are like — the question is dark, and life is short. For that sentence, gentle as it is, they burned my books. Mind how the crowd treats honest doubt." },
        { s: "Bertrand Russell", t: "The Sophists were the lawyers of the Greek mind — and like lawyers, they taught both sides, which the pious never forgive. Their relativism was too easy; but their fee-taking honesty about it was, in its way, cleaner than some of the certainty that followed." },
        { t: "No trinket from me — my wares are words, and you have had a free sample. When a man in Athens tells you truth is not for sale, ask him what he charges." }
      ] }
  ],
  items: [
    { id: "vial_water", name: "Vial of the First Water", kind: "vial", x: 41, z: 15, color: 0x66c8e8,
      flavor: "Seawater from the pools of Miletus, stoppered in glass. Held to the dawn it turns to mist, to cloud, to everything.",
      meaning: "Thales — the first guess that nature explains nature. The answer was wrong; the question founded science." },
    { id: "tetractys", name: "The Tetractys Tablet", kind: "tablet", x: -32, z: 27, color: 0xe8d8a8,
      flavor: "Ten points in a perfect triangle: one, two, three, four. The Pythagoreans swore their oaths upon it — the harmonies of the world in a figure you can draw in sand.",
      meaning: "Pythagoras — the world answers to number; pure thought can touch eternal truth." },
    { id: "undying_flame", name: "The Undying Flame", kind: "flame", x: 19, z: -26.5, color: 0xff8833,
      flavor: "A tongue of fire that neither grows nor gutters — because it is never the same flame twice. It persists precisely by changing.",
      meaning: "Heraclitus — all is flux; identity is a pattern in the burning, not a thing that sits still." },
    { id: "sphere_being", name: "The Sphere of Being", kind: "sphere", x: -19, z: -43, color: 0xf0f0f4,
      flavor: "Perfectly smooth, perfectly balanced, impossibly heavy — as if it contained everything that is. While you hold it, you cannot quite remember what motion felt like.",
      meaning: "Parmenides — logic against appearances: what is cannot change. The first great argument philosophy could not walk around." },
    { id: "bronze_sandal", name: "The Bronze Sandal", kind: "sandal", x: 13, z: 47, color: 0xc88a3a,
      flavor: "Thrown back by Etna, they say, when the volcano swallowed the man who would be a god. Still faintly warm. Ambition survives its owner.",
      meaning: "Empedocles — four elements, mixed by Love and Strife; and a reminder that philosophers are human, sometimes fatally." },
    { id: "atom_seed", name: "The Atom Seed", kind: "seed", x: 44, z: -35, color: 0xbfd8ff,
      flavor: "A grain almost too small to hold, humming with collision. Everything — shores, ships, sorrows — is arrangements of this.",
      meaning: "Democritus — atoms and void, necessity without purpose. The luckiest guess in the history of thought." }
  ]
},

// ------------------------------------------------------------
agora: {
  id: "agora",
  title: "The Agora of Athens",
  bookLabel: "BOOK I · PART II — SOCRATES, PLATO & ARISTOTLE",
  intro: {
    over: "ATHENS, THE GOLDEN CENTURY",
    title: "The Agora of Athens",
    sub: "One city, three generations: the questioner, the dreamer, the cataloguer. Philosophy's noon."
  },
  terrain: "agora",
  sky: { top: 0x3a78c8, mid: 0x8ab8e8, bot: 0xe8d8b8, fogColor: 0xdfd0ae, fogNear: 60, fogFar: 160,
         sunPos: [60, 80, -40], sunColor: 0xfff2d8, sunIntensity: 1.1, sunDisc: true,
         hemi: { sky: 0xbfd8f0, ground: 0x8a7a5a, intensity: 0.6 }, ambient: 0x9a8a70, ambientIntensity: 0.3 },
  ground: { base: 0xb0a080, accent: 0x8a9a68 },
  particles: [
    { type: "mote", count: 100, area: { x: 0, z: 0, r: 50 }, y: [0.5, 6], color: 0xfff2d0, size: 0.06, speed: 0.08 }
  ],
  props: [
    { type: "returnBook", x: -30, z: 2, rot: 1.5 },
    { type: "agoraPlaza", x: 0, z: 4 },
    { type: "plaque", x: -4, z: -2, rot: 0.3, title: "THE MARKETPLACE",
      lines: ["Here Socrates stopped generals and cobblers alike", "with one small question:", "'And what, exactly, do you mean by that?'"] },
    { type: "cave", x: 8, z: -42 },
    { type: "plaque", x: 4, z: -33, rot: 0.1, title: "THE CAVE",
      lines: ["Prisoners face the wall, naming shadows,", "certain the shadows are the world.", "One of them turns around.", "— Plato's Republic, Book VII"] },
    { type: "formsGarden", x: 30, z: -46 },
    { type: "lyceum", x: 32, z: 20, rot: -0.5 },
    { type: "plaque", x: 27, z: 15, rot: -0.6, title: "THE LYCEUM",
      lines: ["Aristotle taught walking — the 'peripatetic' school.", "Fish, constitutions, tragedies, syllogisms:", "everything was worth cataloguing.", "Plato diluted by common sense."] },
    { type: "acropolisVista", x: -6, z: 62 },
    { type: "tree", variant: "olive", x: -14, z: 16 }, { type: "tree", variant: "olive", x: 12, z: 14 },
    { type: "tree", variant: "olive", x: -22, z: -20 }, { type: "tree", variant: "olive", x: 42, z: 8 },
    { type: "tree", variant: "cypress", x: -34, z: 22 }, { type: "tree", variant: "cypress", x: 20, z: 34 },
    { type: "tree", variant: "cypress", x: 46, z: -30 },
    { type: "brokenColumn", x: -18, z: 30 }, { type: "rocks", x: 48, z: -12, n: 4 },
    { type: "academyGrove", x: -26, z: -24 }
  ],
  zones: [
    { x: 8, z: -50, r: 7, type: "msg", text: "Shadows glide along the wall. The prisoners' whole vocabulary points at them. What would you even say to someone who had never turned around?" },
    { x: 30, z: -46, r: 9, type: "formswap" }
  ],
  spawn: { x: -30, z: -1, yaw: -1.5 },
  npcs: [
    { id: "socrates", name: "Socrates", dates: "469 – 399 B.C.", title: "The gadfly of Athens",
      x: 2, z: 4, robe: 0x8a8578, trim: 0xd8d0b8, accessory: "beard",
      blurb: "Wrote nothing; questioned everyone; died for it, calmly.",
      seed: "Which of your certainties has never once been cross-examined?",
      dialogue: [
        { t: "You walk like a person with somewhere to be. Splendid. May I delay you? I only ever ask small questions — my friends will tell you they are never small for long." },
        { t: "Tell me, traveler — you have crossed strange country to get here, so you must know: what is courage?",
          opts: [ { label: "Pressing on when you're afraid.", goto: "soc_a" }, { label: "Knowing when not to be afraid.", goto: "soc_b" }, { label: "I... thought I knew.", goto: "soc_c" } ] },
        { id: "soc_a", t: "Good! And the man who presses on into folly — off a cliff, into a fire, sure the volcano will make him a god? Brave, or a fool? Ah. So courage needs judgment. Then is it courage — or is it wisdom wearing armor?", goto: "soc_join" },
        { id: "soc_b", t: "Elegant! So the coward and the courageous differ in knowledge, not in trembling. But then a general who knows retreat is wise — retreating, is he brave? The word wriggles, does it not?", goto: "soc_join" },
        { id: "soc_c", t: "Then you are ahead of every general I have asked! To know that one does not know — the oracle called me wisest in Greece, and I could only conclude it meant this: I alone know that I know nothing.", goto: "soc_join" },
        { id: "soc_join", t: "Do you see the method? I have no doctrine to sell — ask Protagoras what doctrine costs. I am a midwife: I deliver men of the ideas they are already carrying and check whether the infant lives. Mostly, it does not. The examination is the point." },
        { t: "They will vote to kill me for this — corrupting the young, doubting the gods. My friends have a boat ready. But I have argued all my life that the soul matters more than the body, and a man should not desert his post at the first sight of the bill. The unexamined life is not worth living; the examined one, you must be willing to pay for." },
        { s: "Bertrand Russell", t: "Whether Socrates said half of what Plato reports, no one knows. But his method — definition by cross-examination — became the machinery of philosophy itself. He is the patron saint of everyone ever made annoying by a good question." },
        { t: "The cup by the stand is for you. Do not drink it — carry it. Let it ask you, every day, what your questions are worth." }
      ] },
    { id: "plato", name: "Plato", dates: "c. 428 – 348 B.C.", title: "Poet of the eternal Forms",
      x: -24, z: -26, robe: 0x4a4a7a, trim: 0xb8b8e8, accessory: "book",
      blurb: "Built the Academy; taught that the visible world is shadow and the Forms are real.",
      seed: "Is there a perfect version of anything — and if so, where does it live?",
      dialogue: [
        { t: "Welcome to the Academy's edge. My teacher questioned men in the market; I question the market itself — and the world it sits in. Have you walked into my cave yet? Go. I will wait. It is the truest thing I ever wrote, and it is fiction." },
        { t: "Draw a circle — in sand, on parchment, anywhere. It is flawed; every drawn circle is. Yet your geometry proves theorems about the perfect circle no hand has ever made. About what, then, is geometry true?" },
        { t: "I answer: the Form. The perfect Circle, the perfect Justice, the perfect Beauty — not in space, not in time, seen not with eyes but with intellect. Particular things are its shadows, cast flickering on the cave wall of the senses. Pythagoras heard it in number; I say all reality is built so." },
        { t: "And the soul? It knew the Forms before birth — that is why learning feels like remembering. Teach a slave boy geometry with only questions, and watch: he does not receive the truth. He recognizes it." },
        { t: "One prisoner in the cave is freed and climbs into sunlight. His eyes burn; he sees the real at last; and when he climbs back down to tell the others — they laugh at him, and would kill him if they could. I watched Athens do exactly that to the best man I knew. The Republic I dream of is a city that would not." },
        { s: "Bertrand Russell", t: "Plato is the most gifted writer philosophy has ever possessed — which is precisely the danger. The Forms are a magnificent mistake: mathematics mistaken for metaphysics, and a low opinion of the changing world that ethics never quite recovered from. Read him with reverence, and both eyes open." },
        { t: "In the cave lies a shadow you can lift from the wall. Carry it out into the sun and see for yourself what shadows are made of." }
      ] },
    { id: "aristotle", name: "Aristotle", dates: "384 – 322 B.C.", title: "The master of those who know",
      x: 33, z: 22, robe: 0x6a4a2a, trim: 0xd8b878, accessory: "book",
      blurb: "Tutored Alexander; catalogued everything; found the Forms inside things, not beyond them.",
      seed: "Where is the ideal — above the world, or folded inside it?",
      dialogue: [
        { t: "Walk with me — I think better moving, and so, you will find, do you. You have been to the cave? Good. Now let me tell you, with respect, why my teacher was wrong." },
        { t: "Plato houses the Form of Horse in a heaven no horse has ever grazed. But look at an actual horse: the form is in it — the organization, the purpose, the pattern of its matter. Form does not live above the world. Form is what matter is doing." },
        { t: "So instead of climbing out of the cave, I went collecting. Fish from the lagoon, constitutions of a hundred cities, the anatomy of tragedy, the rules of valid argument — which I set down first, and no one much improved for two thousand years. All men by nature desire to know; the world rewards the ones who look closely." },
        { t: "As for how to live: virtue is not a heaven to contemplate but a skill to practice — a mean between extremes. Courage sits between cowardice and recklessness; generosity between meanness and waste. You become just by doing just acts, as you become a builder by building. Happiness is not a feeling; it is an activity of the soul, and it takes a whole life." },
        { s: "Bertrand Russell", t: "Aristotle is Plato diluted by common sense — and common sense, in a genius, is a formidable solvent. He was the first to write like a professor, and for centuries 'the Philosopher' meant him alone. The scales he leaves you are the most livable idea in Greek ethics: weigh your extremes." },
        { t: "Take the scales from the colonnade. Balance is not the absence of passion, mind — it is passion, trained. Now — my walk continues. Yours too, I think." }
      ] }
  ],
  items: [
    { id: "hemlock_cup", name: "The Cup of Hemlock", kind: "cup", x: 5, z: 8, color: 0x9aa88a,
      flavor: "A plain clay cup, empty now. He took it from the jailer's hands like a man accepting the check after a long dinner, and kept asking questions until the cold reached his chest.",
      meaning: "Socrates — the examined life, paid for in full. Questions can cost everything and still be worth it." },
    { id: "shadow_form", name: "A Shadow from the Wall", kind: "shadow", x: 8, z: -50, color: 0x1a1a22,
      transformsTo: { name: "The Form of the Good", kind: "gem", color: 0xfff8d0,
        flavor: "In the cave it was a flat dark thing, and it was all you could see. In the sun it is geometry made of light. Nothing changed but where you stood.",
        meaning: "Plato — the visible world is shadow; understanding is the climb toward what casts it." },
      flavor: "A shadow peeled from the cave wall, weightless and cold. It seems terribly important in the dark.",
      meaning: "Carry it into sunlight." },
    { id: "golden_mean", name: "The Golden Mean Scales", kind: "scales", x: 37, z: 25, color: 0xd8b04a,
      flavor: "Bronze scales that refuse to sit at either extreme. Load one pan with recklessness and the other with cowardice, and the needle finds courage.",
      meaning: "Aristotle — virtue as the trained mean between extremes; character as practice, not theory." }
  ]
},

// ------------------------------------------------------------
garden: {
  id: "garden",
  title: "The Garden & the Porch",
  bookLabel: "BOOK I · PART III — ANCIENT PHILOSOPHY AFTER ARISTOTLE",
  intro: {
    over: "THE HELLENISTIC WORLD, AFTER ALEXANDER",
    title: "The Garden & the Porch",
    sub: "Empires swallowed the city-states, and philosophy changed its question — from 'what is the world?' to 'how do I survive it?'"
  },
  terrain: "garden",
  sky: { top: 0x2a2050, mid: 0x7a4a78, bot: 0xd8886a, fogColor: 0xa06a80, fogNear: 50, fogFar: 140,
         sunPos: [-90, 14, 60], sunColor: 0xffb890, sunIntensity: 0.7, sunDisc: true,
         hemi: { sky: 0xb08ab8, ground: 0x40304a, intensity: 0.5 }, ambient: 0x705a70, ambientIntensity: 0.4 },
  ground: { base: 0x6a5f58, accent: 0x54495a },
  particles: [
    { type: "petal", count: 120, area: { x: -26, z: -18, r: 12 }, y: [0.5, 6], color: 0xf0b8d0, size: 0.14, speed: 0.25 },
    { type: "mist", count: 90, area: { x: -8, z: 34, r: 13 }, y: [0.2, 3], color: 0xc8b8d8, size: 1.8, speed: 0.06 },
    { type: "rise", count: 140, area: { x: 8, z: -36, r: 7 }, y: [0, 12], color: 0xfff0c0, size: 0.12, speed: 0.9 }
  ],
  props: [
    { type: "returnBook", x: -28, z: 10, rot: 1.6 },
    { type: "ruinField", x: 2, z: 8, n: 6 },
    { type: "jar", x: 0, z: 5, rot: 0.4 },
    { type: "walledGarden", x: -26, z: -18 },
    { type: "plaque", x: -21, z: -11.5, rot: 0.9, title: "THE GARDEN OF EPICURUS",
      lines: ["Over the gate: 'Stranger, here you will do well", "to tarry; here our highest good is pleasure.'", "Inside: bread, water, cheese on feast days,", "and friends. That is the whole secret."] },
    { type: "stoa", x: 26, z: -8, rot: -0.35 },
    { type: "plaque", x: 20, z: -3, rot: -0.5, title: "THE PAINTED PORCH",
      lines: ["Zeno taught here, under scenes of Troy.", "The school took the porch's name: Stoa.", "Its creed crossed every border —", "a slave and an emperor kept it alike."] },
    { type: "fountainOfLight", x: 8, z: -36 },
    { type: "mistGrove", x: -8, z: 34 },
    { type: "plaque", x: -13, z: 30, rot: 1.8, title: "THE FOG OF PYRRHO",
      lines: ["Every argument has an equal opposite.", "The wise man suspends judgment —", "and finds, where certainty stood,", "an unexpected calm."] },
    { type: "tree", variant: "cypress", x: -38, z: 0 }, { type: "tree", variant: "cypress", x: 40, z: -24 },
    { type: "tree", variant: "olive", x: 14, z: 20 }, { type: "tree", variant: "olive", x: -12, z: -34 },
    { type: "tree", variant: "dead", x: 18, z: 36 }, { type: "brokenColumn", x: 34, z: 14 },
    { type: "rocks", x: -36, z: 28, n: 4 }
  ],
  zones: [
    { x: -8, z: 34, r: 9, type: "msg", text: "The fog neither thickens nor lifts. For a moment you cannot tell whether that troubles you — or whether anything does." }
  ],
  spawn: { x: -28, z: 7, yaw: -1.6 },
  npcs: [
    { id: "diogenes", name: "Diogenes of Sinope", dates: "c. 412 – 323 B.C.", title: "The Dog — Cynic of Cynics",
      x: 0, z: 6.6, y: 0.55, robe: 0x7a6a4a, trim: 0x5a4a32, accessory: "lamp",
      blurb: "Lived in a jar, owned a cloak and a bowl — then saw a boy drink from his hands and threw away the bowl.",
      seed: "Strip away everything you own in your head. What's left that is actually yours?",
      dialogue: [
        { t: "Yes, I live in the jar. No, I am not ashamed. Shame is for men who own things their neighbors want. I own a cloak and this lamp. Alexander himself — master of the world — stood where you stand and asked what he could do for me. I asked him to stop blocking my sun." },
        { t: "He said afterward: 'Were I not Alexander, I would wish to be Diogenes.' He conquered everything and envied a man in a jar. Sit with that a moment." },
        { t: "The lamp? I carry it lit in daylight, through the market, peering at faces. 'What are you doing, Dog?' — 'Looking for an honest man.' Still looking. The search keeps me fit." },
        { t: "Understand: I am not miserable. That is the whole trick. They call me dog — I bite nobody, I only bark at pretense. Virtue needs no theory, no Academy, no porch. It needs practice, poverty's honesty, and the nerve to live in public exactly what you believe in private. Everything else is perfume on chains." },
        { s: "Bertrand Russell", t: "The Cynics were what happens when a civilization disappoints its philosophers: virtue redefined as needing nothing the world can take. It is not a philosophy I could live — but note that its founder was harder to bribe than any man in this history." },
        { t: "Take the lamp. Daylight, remember. The honest man it seeks may as well be you — that would save us both the walking." }
      ] },
    { id: "epicurus", name: "Epicurus", dates: "341 – 270 B.C.", title: "Gardener of pleasure",
      x: -27, z: -19, robe: 0x4a6a4a, trim: 0xc0e0a8, accessory: "book",
      blurb: "Taught that pleasure is the good — and that the deepest pleasure is the absence of fear.",
      seed: "Which of your fears would dissolve if you examined what it's actually made of?",
      dialogue: [
        { t: "Come in, come in — the gate is never locked. They tell scandalous stories about this garden: orgies, gluttony, women admitted as equals. Only the last is true. Our feast today is barley bread, and there is water from the spring. Sit." },
        { t: "Yes, I teach that pleasure is the good. But watch what the word means. The drunkard's night buys a wretched morning; the ambitious man's triumph buys a lifetime of rivals. When I say pleasure I mean this: a body without pain, a mind without dread. Stillness, not fireworks." },
        { t: "Two fears poison every life, and I have remedies for both. The gods? Perfect beings, therefore untroubled, therefore utterly uninterested in punishing you — fear them not. Death? While you are, death is not; when death is, you are not. You will never meet it. Where is the harm in a meeting that cannot occur?" },
        { t: "What remains, once dread is gone? Friends, chiefly. Of everything wisdom offers for a happy life, the greatest by far is friendship. I die in agony of the stone — and I write, honestly, that it is a happy day, for my friends are around me and the memory of our conversations outweighs the pain. Test that claim when your time comes." },
        { s: "Bertrand Russell", t: "History has been outrageously unfair to Epicurus — his 'hedonism' was nearly monastic, bread and water and friendship, and his campaign against religious terror was a public health measure. An invalid's philosophy, perhaps; but gentle, sane, and kind." },
        { t: "The key to the garden hangs by the gate. It was never needed for the lock, you understand. It is to remind you the door was always open." }
      ] },
    { id: "marcus", name: "Marcus Aurelius", dates: "A.D. 121 – 180", title: "Emperor, and student of a slave",
      x: 28, z: -6, robe: 0x7a2a2a, trim: 0xd8a84a, accessory: "laurel",
      blurb: "Ruled Rome from a war camp while writing reminders to himself about how to be good.",
      seed: "What is actually within your control today — and what have you been pretending is?",
      dialogue: [
        { t: "Do not kneel — the Stoa makes no distinction of rank. The man who taught my teachers, Epictetus, was a slave with a crippled leg. I command the legions of Rome. On the porch, we hold the same doctrine and the same rank: student." },
        { t: "The doctrine fits in a sentence. Some things are up to you — your judgments, your purposes, your responses. Everything else — plague, betrayal, the border wars, the opinions of Rome — is not. Misery is wanting the second list to obey you. Freedom is mastering the first." },
        { t: "Each dawn I write to myself: today you will meet the meddling, the ungrateful, the arrogant. They act so because they cannot tell good from evil. You can. Then begin the day's work without hating anyone in it." },
        { t: "The harder teaching: welcome what happens — not endure, welcome. The universe is one living order, and what it deals you is your role in it, as the wound is the soldier's role. I bury my children, I fight a war I did not choose, I am tired beyond telling. The doctrine holds me up. I do not claim it comforts. It holds." },
        { s: "Bertrand Russell", t: "Stoicism is philosophy for a world grown too large to argue with — sour grapes made noble, perhaps, but nobility is not nothing. That its finest book is an emperor's private notes to himself, never meant for us: that is the most convincing argument the school ever produced." },
        { t: "On the pedestal stands the citadel — the fortress no siege can take, because it is built inside. Garrison yours. That is the whole of what an emperor can give you." }
      ] },
    { id: "pyrrho", name: "Pyrrho of Elis", dates: "c. 360 – 270 B.C.", title: "The first Skeptic",
      x: -7, z: 36, robe: 0x8a8a9a, trim: 0xc8c8d8, accessory: "staff",
      blurb: "Marched to India with Alexander, came back certain of nothing — and strangely serene.",
      seed: "Pick a belief you'd bet your house on. What's the strongest case against it?",
      dialogue: [
        { t: "Is the fog thick today? Or is it thin, and the air elsewhere thick? I have opinions about the fog. I merely decline to marry them." },
        { t: "I walked with Alexander's army to India. I watched wise men there defend, with perfect rigor, the opposite of everything wise men defend here. Same rigor, opposite conclusions. What follows? To every argument, an equal argument is opposed. Honesty, thereafter, has only one move: suspend judgment." },
        { t: "You expect that to feel like torment — the itch of the unresolved. Here is the school's secret, and I promise it only to those who try it: suspension is followed, as a shadow follows a body, by peace. It was the verdicts that were making you seasick, friend. Put them down and the deck steadies." },
        { t: "They tell it that my friends had to pull me from the path of carts, since I declined to judge whether the cart was real. Slander — I got out of the way. Appearances I follow cheerfully; bread appears nourishing, so I eat. It is certainty I decline, not lunch.",
          opts: [ { label: "But aren't you certain that nothing is certain?", goto: "pyr_trap" }, { label: "That sounds almost restful.", goto: "pyr_rest" } ] },
        { id: "pyr_trap", t: "Ha! The old net. No — I do not assert 'nothing is certain' as doctrine; that would be one more verdict. I report how things seem, including how my own doubting seems. Even my skepticism I hold loosely. You cannot trap a man who declines to stand still.", goto: "pyr_end" },
        { id: "pyr_rest", t: "It is. That is the scandal of it. Everyone assumes doubt must ache. But the ache was never the doubt — it was the clinging. I sleep better than any dogmatist in this history, and I have met them all.", goto: "pyr_end" },
        { id: "pyr_end", s: "Bertrand Russell", t: "Skepticism was philosophy's bad conscience, wandering the schools and asking each 'but how do you know?' Mostly they could not answer. As a way of life it is a dead end; as a discipline, every honest thinker since owes it a debt — and I have tried to pay mine." },
        { t: "The scales in the fog balance perfectly and forever. Take them. When you feel the old itch to be certain, set your reasons on the pans and watch them level." }
      ] },
    { id: "plotinus", name: "Plotinus", dates: "A.D. 204 – 270", title: "Last great pagan philosopher",
      x: 10, z: -34, robe: 0xd8cfa8, trim: 0xfff0c0, accessory: "halo",
      blurb: "While Rome crumbled, he mapped an inner ascent: from the One, through Mind, through Soul — and back.",
      seed: "When you're most fully absorbed — in work, in love, in beauty — what are you dissolving into?",
      dialogue: [
        { t: "You arrive as the empire falls to pieces — plague on the roads, barbarians at the river, emperors murdered by their own guards. I do not write about any of that. I am asked why. Because it is not, in the end, what is real." },
        { t: "Watch the fountain. From the One — beyond being, beyond thought, beyond every name — reality overflows, as light overflows the sun without the sun diminishing. First into Mind, where Plato's Forms live and think themselves. Then into Soul, which dreams the world you walk in. Each tier a dimmer radiance of the tier above." },
        { t: "You are not at the bottom of that cascade. You are the cascade, looking back up at itself. The soul's homesickness — that ache you have felt in music, in beauty, in love, and could not name — is the light remembering its source." },
        { t: "The return is not a doctrine but a practice: close the body's eyes, wake the inner one. Sculpt your own statue, as I tell my students — cut away all that is superfluous, straighten what is crooked, polish until virtue shines. Four times in my life the ascent has completed itself, and I stood in the One. I cannot tell you what it was. There were no longer two of us — no teller, and no tale." },
        { s: "Bertrand Russell", t: "Plotinus is the end of one story and the beginning of another: to men watching their civilization die, he offered an indestructible world within. It is metaphysics as consolation — and through Augustine, his ladder of light was built into Christianity, where it stands yet." },
        { t: "The mirror by the fountain does not show your face — it shows what the light passes through on the way to being you. Take it. The ascent begins wherever you are standing." }
      ] }
  ],
  items: [
    { id: "lamp_diogenes", name: "The Lamp of Diogenes", kind: "lamp", x: 3.4, z: 9.5, color: 0xffc86a,
      flavor: "Still lit, still daylight, still searching. It gives off less light than an honest face would.",
      meaning: "The Cynics — freedom measured by how little the world can take from you." },
    { id: "garden_key", name: "The Key to the Garden", kind: "key", x: -23, z: -13.5, color: 0xa8c87a,
      flavor: "It opens nothing; the gate was never locked. Bread, water, friends, and no dread of gods or death — the door to that was always open too.",
      meaning: "Epicurus — pleasure as peace: subtract pain, subtract fear, and guard what remains with friendship." },
    { id: "inner_citadel", name: "The Inner Citadel", kind: "fortress", x: 31, z: -11, color: 0xc87a4a,
      flavor: "A fortress the size of your palm, gates barred from within. Armies have starved outside smaller walls.",
      meaning: "The Stoics — sort what is yours from what is not; garrison the first; release the second." },
    { id: "level_scales", name: "The Level Scales", kind: "scales", x: -4, z: 39, color: 0xb8b8d0,
      flavor: "Both pans loaded, forever level. Somehow this is the most restful object you have ever held.",
      meaning: "Pyrrho — to every argument, an equal argument; suspend judgment, and peace follows unasked." },
    { id: "mirror_one", name: "The Mirror of Emanation", kind: "mirror", x: 11.5, z: -32, color: 0xfff0c0,
      flavor: "It reflects no face — only light, arriving from somewhere behind everything, undiminished by the distance.",
      meaning: "Plotinus — reality as cascading light from the One; the soul's ache as homesickness, and the way back inward." }
  ]
}
};
