// ============================================================
// BOOK TWO — CATHOLIC PHILOSOPHY
// World 4: The Two Cities (Part I — The Fathers)
// World 5: The Cathedral of Reason (Part II — The Schoolmen)
// ============================================================

window.DATA_MEDIEVAL = {

// ------------------------------------------------------------
cities: {
  id: "cities",
  title: "The Two Cities",
  bookLabel: "BOOK II · PART I — THE FATHERS",
  intro: {
    over: "THE FALL OF ROME, A.D. 410",
    title: "The Two Cities",
    sub: "The eternal city has been sacked. In the wreckage, philosophy turns Christian — and asks what can never be sacked."
  },
  terrain: "cities",
  night: true,
  sky: { top: 0x090a18, mid: 0x1a1530, bot: 0x3a2438, fogColor: 0x241a28, fogNear: 40, fogFar: 130,
         sunPos: [-40, 30, -80], sunColor: 0xa8b8e8, sunIntensity: 0.22, stars: true, moon: true,
         hemi: { sky: 0x3a3a6a, ground: 0x141018, intensity: 0.5 }, ambient: 0x2a2438, ambientIntensity: 0.65 },
  ground: { base: 0x3a3440, accent: 0x2c2632 },
  particles: [
    { type: "ember", count: 120, area: { x: -30, z: -24, r: 16 }, y: [0.5, 9], color: 0xff6622, size: 0.13, speed: 0.5 },
    { type: "rise", count: 110, area: { x: 29, z: -30, r: 12 }, y: [2, 18], color: 0xffe8a0, size: 0.1, speed: 0.5 },
    { type: "mote", count: 60, area: { x: -20, z: 27, r: 8 }, y: [0.3, 3], color: 0xffcf88, size: 0.06, speed: 0.05 }
  ],
  props: [
    { type: "returnBook", x: -24, z: 8, rot: 1.6 },
    { type: "cityOfMan", x: -30, z: -25 },
    { type: "cityOfGod", x: 29, z: -31 },
    { type: "plaque", x: 0, z: -13, rot: 0.0, title: "TWO CITIES, ONE HISTORY",
      lines: ["One city is built on love of self;", "its towers burn behind you.", "One is built on love beyond self;", "no army has found its gates.", "Every human heart holds citizenship in both."] },
    { type: "prisonCell", x: 19, z: 18, rot: -0.4 },
    { type: "wheelOfFortune", x: 24.5, z: 15.5 },
    { type: "scriptorium", x: -20, z: 27, rot: 0.7 },
    { type: "plaque", x: -15.5, z: 23, rot: 0.9, title: "THE SCRIPTORIUM",
      lines: ["While the empire fell, monks copied.", "Aristotle, Cicero, the Psalms —", "candle by candle through the long dark.", "Civilization survived at desk-height."] },
    { type: "ruinField", x: -6, z: -34, n: 7 },
    { type: "brokenColumn", x: 8, z: 2 }, { type: "brokenColumn", x: -14, z: -8 },
    { type: "tree", variant: "dead", x: -34, z: 14 }, { type: "tree", variant: "dead", x: 12, z: 30 },
    { type: "tree", variant: "dead", x: 36, z: 2 }, { type: "tree", variant: "cypress", x: 34, z: -14 },
    { type: "rocks", x: -38, z: -6, n: 4 }
  ],
  zones: [
    { x: 0, z: -18, r: 8, type: "msg", text: "From here you can see both cities at once. Augustine would say: so can everyone, from everywhere, always." }
  ],
  spawn: { x: -24, z: 5, yaw: -1.6 },
  npcs: [
    { id: "augustine", name: "Augustine of Hippo", dates: "A.D. 354 – 430", title: "Bishop, sinner, architect of the Christian mind",
      x: 1, z: -19, robe: 0x2a2a44, trim: 0xc8a04a, accessory: "book",
      blurb: "Prayed 'make me chaste — but not yet'; invented the inward autobiography; watched Rome fall and answered with a city that couldn't.",
      seed: "What do you love most? Augustine says that — not what you believe — is what you are.",
      dialogue: [
        { t: "You have heard the news — everyone has. Rome, sacked. The pagans say it happened because we abandoned the old gods. I am writing a reply. It is running long." },
        { t: "Before the bishop's robe, understand, I was a connoisseur of sin — I prayed, honestly, 'grant me chastity, but not yet.' As a boy I stole pears I did not even want, purely for the theft. Do not trust a philosopher who has never studied his own wickedness; he is theorizing about a country he has not visited." },
        { t: "What I found in that country: the will is divided against itself. I did not lack knowledge of the good — Socrates was wrong there. I knew, and did otherwise, and enjoyed it. No philosophy of the mind will save a creature whose problem is in the heart. We are not what we know. We are what we love." },
        { t: "Hence my long reply. Rome was built on love of self, unto contempt of God — glorious, and doomed like everything built on appetite. There is another city, built on love beyond self. Every heart holds papers in both; history is only their long entanglement. Empires are weather, traveler. The two cities are climate." },
        { t: "And time — ask me what time is, and I know; ask me to explain, and I do not. The past exists nowhere but memory, the future nowhere but expectation. Both are rooms of the soul. You do not stand in time; time stands in you. I wrote that while the world was ending. It steadied my hand." },
        { s: "Bertrand Russell", t: "Augustine invented the inner life as a subject — the Confessions is the first book in which a mind watches itself, and fifteen centuries of autobiography and psychology descend from it. His doctrine of original sin darkened the world for centuries; his honesty about his own heart lit it. Few men have done both." },
        { t: "My heart lies there on the stone — restless, as it was from the beginning. Our hearts are restless until they rest in what they were made for. I found my answer. The restlessness itself, I leave to you: it is the compass." }
      ] },
    { id: "boethius", name: "Boethius", dates: "c. A.D. 477 – 524", title: "The last Roman, awaiting execution",
      x: 19, z: 19.5, robe: 0x4a3a2a, trim: 0xb89a5a, accessory: "quill",
      blurb: "Senator, scholar, falsely condemned; wrote The Consolation of Philosophy in his cell while Fortune's wheel turned.",
      seed: "Everything Fortune gave you, Fortune can repossess. What did she never give you?",
      dialogue: [
        { t: "Forgive the accommodations. A year ago I was consul of Rome, my sons consuls beside me, my library the finest in the West. Then a forged letter, a jealous king — and this cell, and a date I am not told. Sit; the stone is warmer than it looks." },
        { t: "On the first night, self-pity came to visit, dressed as poetry. But another visitor followed — Philosophy herself, tall as the ceiling, come to scold me: 'Did you think you were exempt?' The book I am writing is our conversation. It will outlive the king who kills me. Forgive me — that thought is one of my remaining pleasures." },
        { t: "Her lesson is the Wheel. Fortune raises men and drops them — that is not her malice but her nature, as turning is the wheel's. Kings to dust, exiles to thrones. Did I think her gifts were mine? Rank, wealth, even my library — loans, every one. She has merely called them in. A man cannot lose what he never owned." },
        { t: "What, then, was ever mine? Only the good I could not be given and cannot be robbed of — the soul's own clarity, the love of the true. That is the consolation, and note this well: in my cell, philosophy is not an ornament of leisure. It is the last wall between a man and despair. It holds. I am the proof, for a few more weeks." },
        { s: "Bertrand Russell", t: "Boethius wrote the most serene book of his millennium under sentence of death — pure Plato, no complaint, no cant. For eight hundred years, whenever the Middle Ages spoke of comfort in adversity, they were quoting him. The Consolation would be admirable in any age; in his, it is astonishing." },
        { t: "The wheel by my window — take the small one, the model. Mount it where you keep your ambitions. When it turns, and it will, remember which of your goods were loans." }
      ] },
    { id: "benedict", name: "Benedict of Nursia", dates: "c. A.D. 480 – 547", title: "Father of the monks who saved the books",
      x: -21, z: 28.5, robe: 0x2e2a26, trim: 0x8a7a5a, accessory: "quill",
      blurb: "Wrote the Rule that organized the monasteries — where copying a page counted as prayer.",
      seed: "What would you preserve through a dark age, if you could only carry it a page at a time?",
      dialogue: [
        { t: "Lower your voice, friend — Brother Marcus is on the Ethics tonight, and his hand shakes when startled. A shaken hand costs a page, and pages, just now, are the rarest thing in the world." },
        { t: "You have seen the ruins. Rome is not falling; Rome has fallen — the roads unsafe, the schools closed, the libraries burned or sold for kindling. I do not know how long this dark lasts. Centuries, I suspect. So I have given my monks a Rule: pray, and work. Ora et labora. And I have counted the copying of books as work of the holiest kind." },
        { t: "Understand what a page is. A page is a voice that death has already failed to silence once. Aristotle is on these desks, and Cicero, beside the Psalms — pagans, yes. Wisdom does not stop being wisdom because its author never heard the Gospel. We copy what is true and let God sort the authors." },
        { t: "I will not live to see why it mattered. Neither will Brother Marcus, nor his students, nor theirs. We plant for a spring none of us is promised. But some morning, centuries on, a scholar will open a book that exists because a tired man in this room kept his hand steady — and the conversation you have been walking through, shore to porch, will resume as if it never stopped. It never stopped. That is the whole of my philosophy: it never stopped, because someone copied." },
        { s: "Bertrand Russell", t: "It is one of history's better jokes that the classical learning despised by the ascetics survived chiefly in their cloisters. The monasteries were the arks of a drowned civilization; when Europe was ready to think again, the monks had kept it something to think with. Gratitude is owed." },
        { t: "Take the loose page from the desk — Brother Marcus miscounted his quire, and a spare page is yours without sin. Carry it as I intend it: proof that the dark ages were never wholly dark. There were candles. We were the candles." }
      ] }
  ],
  items: [
    { id: "restless_heart", name: "The Restless Heart", kind: "heart", x: 3.5, z: -23, color: 0xd84a3a,
      flavor: "A small stone heart, faintly warm, that will not sit still in your pack. It is not broken. It is searching.",
      meaning: "Augustine — we are what we love, not what we know; restlessness as the soul's compass toward its true home." },
    { id: "wheel_fortune", name: "The Wheel of Fortune", kind: "wheel", x: 23, z: 21.5, color: 0xb89a5a,
      flavor: "A wooden wheel, turning slowly whether or not you touch it. Tiny kings ascend the rim; tiny kings descend. None of them can stop the turning; all of them believe they can.",
      meaning: "Boethius — Fortune's gifts are loans; philosophy is the possession no wheel can repossess." },
    { id: "preserved_page", name: "The Preserved Page", kind: "page", x: -24, z: 30.5, color: 0xf0e6c8,
      flavor: "One vellum page of Aristotle, copied by candlelight by a man who would never read Greek fluently and copied it anyway. The ink has outlived the empire.",
      meaning: "The monks — civilization survives dark ages a page at a time, by hands that trust an unseen spring." }
  ]
},

// ------------------------------------------------------------
cathedral: {
  id: "cathedral",
  title: "The Cathedral of Reason",
  bookLabel: "BOOK II · PART II — THE SCHOOLMEN",
  intro: {
    over: "PARIS AND OXFORD, THE 12TH & 13TH CENTURIES",
    title: "The Cathedral of Reason",
    sub: "Aristotle returns from Arabic libraries, and Europe builds a machine of logic tall enough to argue about God."
  },
  interior: { w: 30, d: 68, h: 17, floor: 0x4a4550, wall: 0x5a5462, trim: 0x3a3542, cathedral: true },
  sky: { top: 0x0a0a14, mid: 0x12101c, bot: 0x1a1626, fogColor: 0x16121e, fogNear: 30, fogFar: 90,
         sunPos: [0, 40, 0], sunColor: 0xd8c8ff, sunIntensity: 0.0,
         hemi: { sky: 0x8a7ab8, ground: 0x201a28, intensity: 0.5 }, ambient: 0x4a4060, ambientIntensity: 0.6 },
  particles: [
    { type: "mote", count: 300, area: { x: 0, z: 0, w: 26, d: 60 }, y: [0.5, 14], color: 0xc8b8e8, size: 0.055, speed: 0.04 }
  ],
  props: [
    { type: "returnBook", x: 0, z: 30, rot: Math.PI },
    { type: "cathedralNave" },
    { type: "fiveWays", x: 0, z: -22 },
    { type: "anselmAlcove", x: -11.5, z: 8 },
    { type: "plaque", x: -9, z: 12, rot: 1.35, title: "THE ONTOLOGICAL ALCOVE",
      lines: ["Conceive of that than which", "nothing greater can be conceived.", "Now — does it exist only in your mind?", "Then something greater could be conceived:", "the same, existing. The pedestal is not empty."] },
    { type: "sicetnon", x: 11, z: 2 },
    { type: "ockhamChapel", x: 11, z: 21 },
    { type: "plaque", x: 8, z: 17.5, rot: -1.3, title: "OCKHAM'S CHAPEL",
      lines: ["Notice how little there is in here.", "That is the sermon."] },
    { type: "plaque", x: 3, z: -17, rot: -0.3, title: "THE FIVE PILLARS",
      lines: ["Motion needs a mover; causes need a first;", "contingent things need one necessary;", "degrees need a measure; order needs a mind.", "Five roads, says Thomas, from the world you see", "to the God you cannot."] }
  ],
  zones: [
    { x: 11, z: 21, r: 6, type: "msg", text: "The geometry here is strangely simple. Anything that did not need to exist... doesn't." }
  ],
  spawn: { x: 0, z: 26, yaw: 0 },
  npcs: [
    { id: "anselm", name: "Anselm of Canterbury", dates: "A.D. 1033 – 1109", title: "Faith seeking understanding",
      x: -10.5, z: 6, robe: 0x5a5a7a, trim: 0xd8d0f0, accessory: "book",
      blurb: "Archbishop who tried to prove God from the definition of God alone — the boldest argument in theology.",
      seed: "Can anything be argued into existence? Why is it so hard to say what's wrong with trying?",
      dialogue: [
        { t: "Come, stand by the alcove. I want to show you the boldest thing in this cathedral, and it is not the vaulting. It is an argument I found one night at matins, after years of hunting it. I do not believe because I have proved; I believe, and therefore hunger to understand. But oh, the proof is sweet." },
        { t: "Follow me exactly. God is that than which nothing greater can be conceived. Even the fool who says in his heart 'there is no God' understands that phrase — so the concept, at least, exists in his mind. Yes?" },
        { t: "Now: suppose it exists in the mind alone. Then we can conceive of something greater — the very same being, existing in reality also. But then we have conceived something greater than that-than-which-nothing-greater-can-be-conceived. Contradiction! Therefore God exists not only in thought, but in reality.",
          opts: [ { label: "Something must be wrong with that.", goto: "ans_wrong" }, { label: "...I can't find the flaw.", goto: "ans_clean" } ] },
        { id: "ans_wrong", t: "Everyone says so! A monk named Gaunilo answered me in the fool's defense: by my logic, says he, a perfect island must exist too. But islands are things among things — greatness of islands has no maximum. My argument works, if it works, for one subject only: the greatest conceivable, full stop. Find the true flaw and you will have done what most of philosophy could not for seven centuries.", goto: "ans_join" },
        { id: "ans_clean", t: "Nor could the seven centuries after me — not cleanly! Aquinas set it aside; Descartes revived it; Kant, they tell me, will finally name the crack: that existence is not a property a concept can contain. Perhaps. I notice men are still arguing with me, which is its own kind of monument.", goto: "ans_join" },
        { id: "ans_join", s: "Bertrand Russell", t: "The ontological argument is the purest specimen in captivity: existence deduced from definition, no evidence consulted. It is almost certainly wrong — and it is far easier to feel certain of that than to say precisely why, as I discovered in my own youth, walking down Trinity Lane, when for one alarming moment I thought it sound." },
        { t: "Speak your conception toward the pedestal, traveler. What appears there — mind into marble — will remind you forever how thin the wall between thought and being once seemed. Faith seeking understanding: that is the whole of my method, and I commend it even to those with more understanding than faith." }
      ] },
    { id: "abelard", name: "Peter Abelard", dates: "A.D. 1079 – 1142", title: "The knight of dialectic",
      x: 10, z: 0, robe: 0x6a3a4a, trim: 0xe0a8b8, accessory: "quill",
      blurb: "Set the authorities against each other in Sic et Non; loved Héloïse; paid terribly for both.",
      seed: "When two authorities you trust disagree, what do you actually do?",
      dialogue: [
        { t: "You find me at my most dangerous occupation: reading carefully. This lectern holds my Sic et Non — 'Yes and No.' One hundred and fifty-eight questions, and beneath each, the saints and Fathers quoted faithfully against one another. Does God cause evil? Augustine yes — and Augustine no, in a different decade. I add nothing. I merely... arrange." },
        { t: "The masters call it impiety. It is the opposite. By doubting, I say, we come to inquiry; by inquiry, we come to truth. A faith that fears questions insults its own foundations. The authorities contradict each other — that is not my invention, only my table of contents. Someone had to teach this age that quoting is not thinking." },
        { t: "In Paris the students followed me in crowds — I was, I confess, insufferable; the young usually are when they are right. And then, in one house, I met Héloïse. The brightest mind I ever taught, and I include the crowds. You know the story, or think you: her uncle's revenge, the knife, the cloisters that swallowed us both. Her letters reach me still. She argues better than I do. She always did." },
        { t: "They have burned my books twice now, and the abbots write that my dialectic 'makes a mockery of mystery.' No. Mystery survives inquiry — only pretense does not. I have lost more than any man in this cathedral to that principle, and I hold it still: the question is an act of reverence. The refusal to ask is the blasphemy." },
        { s: "Bertrand Russell", t: "Abelard was the finest mind of his century and its most instructive casualty: Europe learning, painfully, that logic could be applied to sacred texts. His method — contradictions honestly tabled — became the engine of scholasticism itself. The Church that condemned him spent the next century quietly adopting his classroom." },
        { t: "Take the coin from the lectern — Sic on one face, Non on the other. When authorities collide, do not flip it. Stand it on edge, and think. That narrow edge is where every honest mind in this building actually lives." }
      ] },
    { id: "aquinas", name: "Thomas Aquinas", dates: "A.D. 1225 – 1274", title: "The Angelic Doctor",
      x: 0, z: -16, robe: 0x3a3230, trim: 0xe8d8a0, accessory: "book",
      blurb: "The 'dumb ox' who yoked Aristotle to Christianity and built the Summa — then called it all straw.",
      seed: "Reason and what you hold sacred: allies, strangers, or rivals?",
      dialogue: [
        { t: "They called me the dumb ox in school — I was large, and slow to speak. My master said the ox's bellow would fill the world. I have tried to fill it carefully. You have seen the five pillars? Each one is a road, and every road starts in the ordinary world — motion, causes, contingency, degrees, design — and walks by plain steps to something that must stand at the beginning. I do not ask you to close your eyes to know God. I ask you to open them." },
        { t: "Understand the war I am fighting. Aristotle has returned — from the Arabs, through Spain, and the masters read him trembling: a complete map of reality, drawn without revelation. Some would burn him; some would burn the Gospels. I say: neither. Truth cannot contradict truth. If reason is sound and faith is true, they are two lights on one landscape — and where they seem to cross, we have misread one or the other." },
        { t: "So I built the Summa: every question I could find — over three thousand — and for each, the strongest objections I could construct against my own position, stated better than my enemies state them, answered in order. Never fear the strongest version of the case against you. If your house cannot stand that wind, you were owed the news." },
        { t: "And yet — I will tell you what I tell few. Last December, saying Mass, something happened to me. I have not written since. Brother Reginald begs me to finish the Summa, and I answer him: I cannot. Compared to what I have seen, all I have written is straw. Note it well, traveler: the greatest system-builder of this age tells you, freely, that the system is not the summit. There is a seeing past the proving. Even here. Especially here." },
        { s: "Bertrand Russell", t: "I cannot grant Aquinas the highest rank — he knows his conclusion before he starts, which is advocacy, not inquiry. But the advocacy is magnificent: the objections stated fairly, the distinctions kept sharp, Aristotle and Scripture yoked and actually pulling. Philosophy has had worse habits than his, and mostly has." },
        { t: "The key of the five pillars lies at the altar. It opens nothing in this building. It is the shape of the claim itself — that the world, examined honestly, is a door and not a wall. Whether it opens where I say it does — go and see. That instruction is the whole Summa, in four words." }
      ] },
    { id: "ockham", name: "William of Ockham", dates: "c. A.D. 1287 – 1347", title: "The razor's owner",
      x: 10, z: 22.5, robe: 0x4a4a44, trim: 0xb8b8a8, accessory: "beard",
      blurb: "Franciscan who cut philosophy to the bone: do not multiply entities beyond necessity.",
      seed: "What's the simplest explanation you've been resisting — and what extra entities is the resistance made of?",
      dialogue: [
        { t: "Mind the emptiness — most visitors flinch at it. They come from the nave, all pillars and proofs, into my chapel, and ask where everything is. Everything is here, friend. What is missing is the unnecessary. Notice you cannot name a thing this room lacks — only a mood." },
        { t: "My rule, which they will one day call my razor: do not multiply entities beyond necessity. When two accounts explain the same appearances, the leaner one wins. Not because the world owes us simplicity — but because every entity you posit without need is a debt your argument takes on. I merely refuse the loans." },
        { t: "Watch it cut. Plato's Forms — the perfect Horse grazing beyond the sky? Unnecessary. 'Horse' is a name, a sign in the mind for the resemblance of this beast to that one. The particulars exist; the universal is our shorthand. They call this nominalism, and they call it dangerous. It is merely bookkeeping, done sober." },
        { t: "Now the cut that costs me. Brother Thomas yokes reason to faith — five roads from the world to God. I say the roads do not reach. Reason is competent for the world; of God it yields probabilities, ornaments, hopes — not proof. Faith is faith, and pretending it is geometry dishonors both. They summoned me to Avignon for that. I will die excommunicate, likely of this plague. But hear what the razor bought: once theology and natural knowledge are unyoked, the study of nature is free to follow evidence wherever it runs. I did not intend your sciences, traveler. I merely cleared their road." },
        { s: "Bertrand Russell", t: "Ockham's razor is the one piece of medieval equipment every modern thinker still carries — I have used it my whole career: wherever possible, substitute constructions out of known entities for inferences to unknown ones. The cathedral's own last great architect, quietly removing the scaffolding. After him, the Middle Ages end from within." },
        { t: "The razor rests on the bare altar — the only ornament I permit, because it is the anti-ornament. Take it. Use it on your beliefs before your enemies do, and — a professional caution — mind you do not shave off the patient. Necessity is the word in the rule everyone forgets." }
      ] }
  ],
  items: [
    { id: "ontological_gem", name: "The Conceived Gem", kind: "gem", x: -11.5, z: 9.8, y: 1.5, color: 0xd8d0ff, requiresMet: "anselm",
      flavor: "It did not exist until you finished the argument — or so the alcove insists. A jewel with one flaw, visible only from certain centuries.",
      meaning: "Anselm — the ontological argument: existence deduced from pure definition. Refuting it took seven hundred years; feeling it must be refutable takes one minute." },
    { id: "sic_et_non", name: "The Sic et Non Coin", kind: "coin", x: 12.5, z: 4.5, color: 0xc89a6a,
      flavor: "YES stamped on one face, NO on the other, and a rim worn thin — as if someone spent years standing it on edge.",
      meaning: "Abelard — authorities contradict; doubt begins inquiry; inquiry finds truth. Quoting is not thinking." },
    { id: "five_key", name: "The Five-Pillared Key", kind: "key", x: 0, z: -26, y: 1.4, color: 0xe8d8a0,
      flavor: "Its shaft is five pillars fused: motion, cause, necessity, degree, design. It feels less like a key than like a claim — that the world itself is a door.",
      meaning: "Aquinas — reason and faith as two lights on one landscape; five roads from ordinary things toward their source." },
    { id: "razor", name: "Ockham's Razor", kind: "razor", x: 13, z: 24, y: 1.3, color: 0xc8ccd0,
      flavor: "Impossibly light, permanently sharp. It cuts only what was never needed — though deciding what was needed is, you notice, still your job.",
      meaning: "Ockham — do not multiply entities beyond necessity. The medieval tool that built the modern world." }
  ]
}
};
