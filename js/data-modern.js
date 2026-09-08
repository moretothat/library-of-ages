// ============================================================
// BOOK THREE — MODERN PHILOSOPHY
// World 6: The Clockwork Dawn (Part I — Renaissance to Hume)
// World 7: The Summit & the Engine (Part II — Rousseau to the Present)
// ============================================================

window.DATA_MODERN = {

// ------------------------------------------------------------
clockwork: {
  id: "clockwork",
  title: "The Clockwork Dawn",
  bookLabel: "BOOK III · PART I — FROM THE RENAISSANCE TO HUME",
  intro: {
    over: "EUROPE, 1500 – 1776",
    title: "The Clockwork Dawn",
    sub: "The Church's authority breaks, the telescope opens, and the universe becomes a machine. But who winds it — and how would we know?"
  },
  terrain: "clockwork",
  sky: { top: 0x4a6a9a, mid: 0x9ab8d8, bot: 0xe0e4e0, fogColor: 0xcfd8dc, fogNear: 55, fogFar: 150,
         sunPos: [-70, 60, 50], sunColor: 0xfff8e8, sunIntensity: 0.95, sunDisc: true,
         hemi: { sky: 0xc0d4e8, ground: 0x6a7468, intensity: 0.6 }, ambient: 0x8a94a0, ambientIntensity: 0.35 },
  ground: { base: 0x7a8a6a, accent: 0x64745a },
  particles: [
    { type: "mote", count: 90, area: { x: 0, z: 0, r: 46 }, y: [0.5, 8], color: 0xffffff, size: 0.05, speed: 0.06 }
  ],
  props: [
    { type: "returnBook", x: 0, z: 34, rot: Math.PI },
    { type: "clockTower", x: 0, z: 0 },
    { type: "plaque", x: 3.5, z: 4.5, rot: -2.6, title: "THE MECHANICAL UNIVERSE",
      lines: ["Copernicus moved the earth; Galileo timed its falling;", "Newton wrote the law the apple and the moon obey alike.", "The heavens became a clock.", "Philosophy spent two centuries asking:", "then what, exactly, are we?"] },
    { type: "palazzo", x: -30, z: 12, rot: 0.9 },
    { type: "leviathanMural", x: -36, z: -14, rot: 1.25 },
    { type: "stoveRoom", x: -12, z: -30, rot: 0.3 },
    { type: "lensBench", x: 3, z: -39, rot: 0.1 },
    { type: "monadOrrery", x: 17, z: -30 },
    { type: "slateTablet", x: 30, z: -7, rot: -0.9 },
    { type: "berkeleyGrove", x: 35, z: 12 },
    { type: "plaque", x: 30.5, z: 9, rot: -1.1, title: "THE GROVE OF PERCEPTION",
      lines: ["Try to catch a tree not being seen.", "You cannot — your looking is the catching.", "The bishop smiles: things are ideas,", "and they persist because Someone", "never stops watching."] },
    { type: "billiardPavilion", x: 24, z: 27, rot: -0.5 },
    { type: "tree", variant: "oak", x: -20, z: 26 }, { type: "tree", variant: "oak", x: 16, z: 18 },
    { type: "tree", variant: "cypress", x: -38, z: 2 }, { type: "tree", variant: "pine", x: 40, z: -22 },
    { type: "tree", variant: "pine", x: -26, z: -42 }, { type: "rocks", x: 42, z: 2, n: 4 },
    { type: "hedge", x: 27, z: -16, len: 10, rot: 0.4 }, { type: "hedge", x: 33, z: 20, len: 8, rot: -0.7 }
  ],
  zones: [
    { x: -12, z: -30, r: 6, type: "msg", text: "Inside the stove-room, the furniture looks... negotiable. The mirror does not." },
    { x: 35, z: 12, r: 8, type: "msg", text: "The trees are all here. Of course they are — you're looking." }
  ],
  spawn: { x: 0, z: 31, yaw: Math.PI },
  npcs: [
    { id: "machiavelli", name: "Niccolò Machiavelli", dates: "1469 – 1527", title: "Secretary of power",
      x: -29, z: 13.5, robe: 0x2a2a2e, trim: 0x8a2a2a, accessory: "quill",
      blurb: "Wrote down how power actually works, and was never forgiven for the accuracy.",
      seed: "Where in your life do you describe how things ought to work to avoid seeing how they do?",
      dialogue: [
        { t: "Come to the map table. Florence, Milan, the Papal States, the French across the Alps — I served this board for fourteen years, until the Medici returned and put me to the rope. Now I farm, and write, and dine each evening with the ancients in my study. They receive me kindly. The living are less consistent." },
        { t: "My little book scandalizes Europe, I hear. Notice what no one calls it: false. I committed the one unforgivable act — I described power as a physician describes disease. Whoever abandons what is done for what ought to be done learns his ruin faster than his lesson. I write what is done." },
        { t: "The prince who must hold a state cannot practice every virtue the pulpit praises — the pulpit does not govern. He must be lion and fox both: the lion cannot see the snares, the fox cannot drive off the wolves. Better feared than loved, if one must choose — fear is a chain you hold; love is a chain they hold. But hated? Never hated. Even cruelty has an economics." },
        { t: "They read me as the devil's handbook. Read again: I loved the republic — my great book is on republics, and liberty, and how citizens keep it. But I had watched Italy, lovely and moralizing, carved up by nations that understood force. A people that will not study power as it is delivers itself to those who have. That is my whole heresy, friend: I lowered philosophy's eyes from heaven to the council chamber." },
        { s: "Bertrand Russell", t: "The world's shock at Machiavelli is the shock of hearing said plainly what everyone practices discreetly — his 'wickedness' is largely candor, and candor about power is a public service. Where he errs is in the shortness of his game; but as far as he goes, he is simply honest, which in political philosophy is rarer than genius." },
        { t: "Take the mask from the table — lion on one profile, fox on the other. I do not say wear it. I say know it when it enters the room, whatever face it arrives in. It always arrives." }
      ] },
    { id: "hobbes", name: "Thomas Hobbes", dates: "1588 – 1679", title: "Geometer of fear",
      x: -34, z: -11, robe: 0x3a3a44, trim: 0xa8a8b8, accessory: "book",
      blurb: "Born in terror of the Armada; deduced the state from fear the way Euclid deduced circles.",
      seed: "How much liberty would you actually trade for safety — and how much have you already?",
      dialogue: [
        { t: "My mother went into labor at the rumor of the Spanish fleet — she brought forth twins, myself and fear. I have made a career of my brother. Behold the mural: the great Leviathan. Look close at the giant. Closer. He is made entirely of little men. That is not decoration; that is the argument." },
        { t: "Begin where Galileo begins: bodies, in motion, under law. Men are such bodies. Set them in a world without a common power — no law, no judge, every man his own avenger — and reason out what follows. Not devils: ordinary men, roughly equal, wanting the same scarce things, each striking first for fear of being struck. The war of every man against every man follows as surely as the theorem." },
        { t: "And in that condition there is no industry, for the fruit is uncertain; no arts, no letters, no society — and the life of man is solitary, poor, nasty, brutish, and short. I have watched England taste it: the civil war, the king's head on the block. My state of nature is not prehistory, friend. It is one bad decade away, always, everywhere." },
        { t: "The exit is a bargain. Each man lays down his right of nature — on condition all others do — and the bundled rights make the great artificial man, the mortal god, the Leviathan: sovereign, sword, and peace. Harsh? I never said the sovereign would be good. I said the alternative is the war, and I have seen both. Order first. Everything you love is a tenant of order." },
        { s: "Bertrand Russell", t: "Hobbes is the first wholly modern political mind: no divine right, no sacred tradition — the state deduced from fear and contract like a proposition of geometry. His remedy is worse than most diseases, and his premises too grim by half; but every liberal since has had to earn liberty against his argument, which is the compliment refutation pays." },
        { t: "The figurine by the mural — the giant of little men. Keep it where you can see it, and remember both of its lessons at once: the state is made of us; and what is made can be unmade, one frightened man at a time." }
      ] },
    { id: "descartes", name: "René Descartes", dates: "1596 – 1650", title: "First of the moderns",
      x: -11, z: -27, robe: 0x2e2e3a, trim: 0xc8c8d8, accessory: "quill",
      blurb: "Doubted everything in a stove-heated room and hit one bedrock: the doubter.",
      seed: "Strip away everything you could conceivably be wrong about. What survives?",
      dialogue: [
        { t: "Forgive the small quarters — an army winters nearby, and I have taken this stove-heated room to be alone with my thoughts. I stayed in bed till noon my whole life; my best work happened there. It is a schedule I recommend and doctors do not." },
        { t: "Here is what I attempted in this room. The age's knowledge is a city built on rubble — Aristotle patched by centuries. I chose to demolish. I resolved to doubt everything that could be doubted, however slightly: the senses, which deceive; this room, which I might be dreaming; even mathematics — for what if some malicious demon bends my mind whenever I count to four?" },
        { t: "And at the bottom of that pit, one thing would not fall. To be deceived, I must exist. To doubt, I must exist. I think, therefore I am — not learned from the senses, not taken on authority: self-certifying, every time I perform it. Perform it now, yourself. You see? The demon can fake your world entire; he cannot fake you to yourself. On that point I began rebuilding everything." },
        { t: "From it I raised the method — accept nothing unclear, divide every problem, order thoughts simple to complex — and on the method, my sciences: the geometry that weds algebra to space, the world as mechanism. But I confess the crack in my foundation: I made mind and body two substances, thought and extension, and where your will moves your hand remains... imperfectly explained. My successors will spend two centuries in that crack. An honest architect marks his own faults." },
        { s: "Bertrand Russell", t: "Modern philosophy begins in that stove-heated room: Descartes builds from his own certainty outward, and ever since, mind has been more certain than matter for philosophers — subjectivism's long career starts here. The system is wrong and the method immortal: what can be doubted, and what survives the doubting?" },
        { t: "The mirror inside is mostly dissolved, you will notice, like everything else in the room. Except where you stand in it. Take it — the one reflection the demon cannot counterfeit. Build on that, and build carefully." }
      ] },
    { id: "spinoza", name: "Baruch Spinoza", dates: "1632 – 1677", title: "The God-intoxicated lens-grinder",
      x: 4, z: -37, robe: 0x3a3a32, trim: 0xb8b89a, accessory: "beard",
      blurb: "Excommunicated at 23; refused fortunes and chairs; ground lenses and proved an ethics like geometry.",
      seed: "What would change if you saw your worst setback the way you see weather — from eternity?",
      dialogue: [
        { t: "Mind the glass dust. The synagogue cursed me at twenty-three — cursed by day and cursed by night, none to speak with me, none to come within four cubits. I have made a quiet life anyway: I grind lenses, I decline pensions, princes' chairs, and other flattering cages, and in the evenings I write an Ethics — proved, proposition by proposition, in the manner of Euclid. Axioms first. Then we see what follows about God and grief." },
        { t: "What follows first is this: there cannot be two infinite substances, for each would limit the other. So there is one — call it God, call it Nature; I say Deus sive Natura, and mean the same by both names. The world is not God's workshop, made and set aside. The world is how God exists. Thought and matter are not two stuffs at war, as the Frenchman in the stove-room has it — they are two faces of the one substance, read in different alphabets." },
        { t: "See what that does to your sorrows. Nothing in nature is contingent; each thing follows from the divine nature as surely as the triangle's angles from the triangle. Your rage at fate is a rage at geometry. But understanding is not surrender — it is alchemy. A passion ceases to be a passion the moment we form a clear idea of it. Understand your fear completely and it becomes... knowledge. This is the freedom possible to us: not exemption from causes, but comprehension of them." },
        { t: "And at the summit of comprehension, a strange reward. To see each thing under the aspect of eternity — your life, your losses, this lens dust — as the eternal order sees it, is to love that order; and this intellectual love of God is the mind's true peace. I do not ask the universe to love me back, friend. That was never the transaction. The blessedness is in the seeing. All things excellent are as difficult as they are rare — and I have found this one worth the grinding." },
        { s: "Bertrand Russell", t: "Spinoza is the noblest and most lovable of the great philosophers. Intellectually some have surpassed him; ethically, none. Cursed, slandered, and poor, he lived exactly the calm his system promised — and men who despised his arguments went on envying his peace. Where doctrine and life agree so completely, even a skeptic lowers his voice." },
        { t: "Look through the finished lens on the bench. One substance, friend — the dust, the grinder, the curse, the peace. Take it with you, for the days when your troubles look infinite. They are large, perhaps. Infinite is taken." }
      ] },
    { id: "leibniz", name: "Gottfried Wilhelm Leibniz", dates: "1646 – 1716", title: "The last universal genius",
      x: 18, z: -27, robe: 0x4a3a5a, trim: 0xd8b8e8, accessory: "book",
      blurb: "Invented calculus in a rival notation, dreamed of a logic that could settle all disputes, and defended this as the best of all possible worlds.",
      seed: "If every event needs a sufficient reason, does 'why is there anything at all?' have an answer?",
      dialogue: [
        { t: "Welcome, welcome — forgive the spinning; the orrery is new. I do everything in the margins of everything else: calculus in Paris between diplomatic errands — yes, Newton and I invented it apart, and yes, his partisans are tiresome — plus binary arithmetic, mining pumps, library catalogues, and a scheme for reuniting the churches. It did not take. The century is stubborn." },
        { t: "My deepest principle is simple: nothing is so without a sufficient reason why it is so and not otherwise. Nothing! Ask 'why' of everything, and do not stop at the edge of the world — ask it of the world entire: why is there something rather than nothing? Feel the vertigo of that question, traveler. It is my gift to philosophy, and no one has returned it." },
        { t: "Now watch the spheres. Matter cannot be the bottom of things — whatever is extended divides, and divides again. The true atoms must be unextended: monads, simple substances, each a soul-like point that mirrors the entire universe from its own station. Each windowless — nothing enters, nothing leaves — yet all agree, because God composed them from the beginning like choirs singing from one score. You and I do not truly touch; we harmonize. I find that lonelier and lovelier than touching." },
        { t: "And since God, by sufficient reason, chooses among all possible worlds, He chooses the best — this one, evils included, as the composer includes dissonance for the sake of the whole. The French wits will mock me for it — a novel with a simpleton chanting 'best of all possible worlds' through massacres. Let them. The claim was never that all is pleasant. It is that the whole, could you read the entire score, is optimal. I grant you cannot read it. Neither, monsieur Voltaire, can you." },
        { s: "Bertrand Russell", t: "Leibniz is one of the supreme intellects of all time, and one of the least satisfying great men: the public philosophy flatters princes with optimism, while in his desk drawer lies a stricter, stranger logic he thought too dangerous to publish. I spent years with those papers. The drawer was better than the books." },
        { t: "Take the loose monad from the orrery — windowless, and yet, look closely: everything is in it, including you, taking it. The universe from one point of view. That is all any of us is; the consolation is how much fits." }
      ] },
    { id: "locke", name: "John Locke", dates: "1632 – 1704", title: "Apostle of common sense",
      x: 31, z: -4, robe: 0x5a4a3a, trim: 0xd8c8a8, accessory: "book",
      blurb: "All knowledge from experience; all government from consent. The reasonable man's philosopher.",
      seed: "Which of your convictions came from experience — and which were written on you before you could check?",
      dialogue: [
        { t: "You find me by the slate — my favorite argument, and it argues by being blank. The schools say certain ideas are innate, stamped on the soul at birth: God, morality, the axioms. Convenient doctrine! Whatever the authorities stamp 'innate' is thereby beyond question. I ask only: whence come the stamps?" },
        { t: "Observe any child. The mind arrives white paper, void of characters, and experience writes upon it — sensation from without, reflection from within. Every idea you own, however lofty, I can trace to those two founts. No secret aristocracy of notions, friend. Knowledge is earned, not inherited — which means anyone may audit the books. Do you feel the politics hiding in that epistemology? Good. It is not hiding very hard." },
        { t: "For governments, too, must show their receipts. Men are born free and equal, with rights to life, liberty, and estate that no crown bestows and no crown may seize. Government is a trust — erected by consent, to secure those rights — and a trust betrayed is a trust dissolved. Kings dislike the clause. But I wrote in a century that beheaded one king and shipped out another, and I say the clause is what makes the rest of the contract worth signing." },
        { t: "I claim less than the great system-builders, and that is deliberate. I am, as I put it, an under-labourer — clearing the ground a little, removing rubbish from the road to knowledge. Certainty is rarer than the proud pretend; most of life runs on probability, and the honest mind proportions assent to evidence. Modesty, in philosophy, is not timidity. It is accuracy about oneself." },
        { s: "Bertrand Russell", t: "Locke is the most fortunate of philosophers: he wrote common sense into system just as England made his politics official, and his heirs — through Voltaire to America's founders — turned his modest clauses into revolutions. Always sensible, never quite rigorous; history has preferred that combination to genius, and mostly been right to." },
        { t: "Take the small slate, still blank. It is you, at the start — and the standing question ever after: who has been allowed to write on it, and would you have consented?" }
      ] },
    { id: "berkeley", name: "George Berkeley", dates: "1685 – 1753", title: "The good bishop of ideas",
      x: 36, z: 14, robe: 0x3a2a4a, trim: 0xc8a8e8, accessory: "book",
      blurb: "Took empiricism at its word: if all we know are perceptions, matter is a rumor. To be is to be perceived.",
      seed: "Point to something that exists unperceived — without perceiving it as you point. Stuck?",
      dialogue: [
        { t: "Ah, you've been trying it — sidling round the grove, spinning about to catch a tree off duty. Everyone tries. Consider what you were attempting: to perceive a thing unperceived. The errand refutes itself on the way out the door, does it not?" },
        { t: "I only take Mr. Locke at his word, more firmly than he took himself. All we ever know are perceptions — colors, sounds, textures, ideas. Then what, pray, is this 'matter' — this invisible, intangible substance alleged to stand behind the perceptions, itself never once perceived by anyone? A philosopher's rumor. I abolish it, and note the sequel: nothing changes. The cherry still reddens, the fire still burns. I have not robbed you of the world, friend — only of a metaphysical ghost that was eating philosophy's rent." },
        { t: "To be is to be perceived — esse est percipi. But now the famous worry: does the grove blink out when you leave it, and reassemble at your return? Compose yourself. The tree stands, because perception did not begin with you. All things exist steadily in the one Mind that never looks away; the order you call 'nature' is the grammar of God's continuous thought. Your perceiving is reading, not writing." },
        { t: "They refute me by kicking stones — the doctor kicks, the foot rebounds, 'thus I refute Berkeley!' He refutes nothing; he has merely perceived the stone with his boot. My system survives every kick and every jest, which is why the jests continue. Common sense finds me mad and cannot find the flaw. I commend the exercise to you: it is the finest training in philosophy I know, hunting the error in an argument you are certain must contain one." },
        { s: "Bertrand Russell", t: "Berkeley's paradox is the best value in philosophy: a conclusion nobody believes at the end of steps nobody can fault. The kicked stone answers nothing — and the serious answers require rebuilding the whole theory of what 'exists' means. Many have; the bishop's tollbooth collects from every one of them." },
        { t: "Take a fruit from the unseen tree — perfectly real, perfectly ripe, and perceived without interruption since before you arrived. You need never check on it. That was always the point." }
      ] },
    { id: "hume", name: "David Hume", dates: "1711 – 1776", title: "The cheerful demolisher",
      x: 25, z: 29, robe: 0x6a3a3a, trim: 0xe8c8a8, accessory: "book",
      blurb: "Followed empiricism to the bottom: causation is habit, the self a bundle, induction unprovable — then went to dinner.",
      seed: "The sun has always risen. What — precisely — does 'always has' prove about tomorrow?",
      dialogue: [
        { t: "A game of billiards? I insist — it is the most philosophical furniture in Europe. Watch: the white strikes the red; the red departs. Now tell me, what did you see of the famous 'cause'? Ball, click, ball. Motion, then motion. The necessity — the must — the power by which one produces the other: where is it on the table, friend? You have never once perceived it. Neither have I. Neither has anyone." },
        { t: "What we have is custom. One event follows another, a thousand times, and the mind — a creature of habit before it is a creature of reason — comes to expect, and mistakes its expectation for a cement in the world. Cause is a feeling in here, projected out there. I do not say the world has no cement. I say you have never seen it, and honesty should mind the difference." },
        { t: "It worsens delightfully. All your reasoning from experience assumes the future will resemble the past — and what is your evidence for that? Past futures resembled past pasts? Round the circle goes. The sun's ten thousand risings prove nothing about tomorrow, save that you are the sort of creature who expects. And the self? I enter most intimately into what I call myself, and I never catch a self — only perceptions, a bundle of them, flickering. Doubt the cement, doubt the sunrise, doubt the doubter. The demolition is now complete, and I performed it with a straight face." },
        { t: "And then — this is my favorite discovery, mind — nature rescues us from philosophy. I leave this table shipwrecked in skepticism; I dine, I play backgammon, I laugh with friends; and the conclusions become so strained and ridiculous I cannot re-enter them with conviction. Reason is, and ought only to be, the slave of the passions — the engine runs on wants, and reason navigates. Be a philosopher, yes; but amidst all your philosophy, be still a man. I find the mitigated life very pleasant. The despair is strictly professional." },
        { s: "Bertrand Russell", t: "Hume is where empiricism, honestly pursued, runs out of road — he developed it to its logical conclusion and made it, in a sense, incredible. The scandal is not his argument but the sequel: no one has refuted him, and no one has believed him. Every philosopher since walks past his gap or builds elaborately around it. Kant, next door, was woken by it — ask him what the alarm cost." },
        { t: "The chain on the table is my gift — two links that have followed each other forever and never once touched. Constant conjunction, friend. Carry it, expect the sunrise, enjoy the backgammon. The gap never closes; the trick is to live gracefully athwart it." }
      ] }
  ],
  items: [
    { id: "princes_mask", name: "The Prince's Mask", kind: "mask", x: -33, z: 16, color: 0x8a2a2a,
      flavor: "Lion in profile from the left, fox from the right, and from the front — whatever the room requires. It weighs more the longer you hold it.",
      meaning: "Machiavelli — power described as it is, not as preached; the lion and the fox behind every throne." },
    { id: "leviathan_fig", name: "The Leviathan", kind: "figurine", x: -37, z: -17.5, color: 0x6a7a8a,
      flavor: "A giant the size of your hand, assembled from hundreds of tinier figures, each gripping the next. Disassemble it and they scatter — you find yourself reassembling it quickly.",
      meaning: "Hobbes — the state as an artificial man built from fear and contract; order as the first, fragile good." },
    { id: "doubt_mirror", name: "The Doubting Mirror", kind: "mirror", x: -14, z: -33, color: 0xc8d8e8,
      flavor: "Everything it reflects dissolves at the edges — the room, the world, your own hands. The eyes looking back stay solid. They always stay solid.",
      meaning: "Descartes — doubt everything; what performs the doubting cannot be doubted. Cogito, ergo sum." },
    { id: "spinoza_lens", name: "The Lens of One Substance", kind: "lens", x: 6, z: -41, color: 0xb8d8b8,
      flavor: "Ground to a curve no optician ordered. Through it, everything — grass, stone, sky, you — is visibly the same single fabric, folded differently.",
      meaning: "Spinoza — God or Nature, one substance; freedom as understanding necessity; peace under the aspect of eternity." },
    { id: "monad", name: "The Monad", kind: "monad", x: 20, z: -33, color: 0xd8b8e8,
      flavor: "A windowless sphere: nothing goes in, nothing comes out. Yet look closely — the entire world is in there, from precisely one point of view. Yours, currently.",
      meaning: "Leibniz — reality as soul-like points, each mirroring the whole in pre-established harmony; and the deepest question: why anything at all?" },
    { id: "blank_slate", name: "The Blank Slate", kind: "slate", x: 33, z: -9, color: 0x4a4a52,
      flavor: "White paper, void of characters. Everything you know arrived after this. Whoever holds the chalk holds a great deal — check whose handwriting is on yours.",
      meaning: "Locke — no innate ideas; knowledge from experience; government by consent. The empiricist charter." },
    { id: "unseen_fruit", name: "The Unseen Tree's Fruit", kind: "fruit", x: 38, z: 16, color: 0xd84a5a,
      flavor: "Ripe, real, and never once unobserved — a fruit whose existence has been continuously maintained by a Perceiver with no other appointments.",
      meaning: "Berkeley — to be is to be perceived; matter dissolved into ideas, held steady in the mind of God." },
    { id: "broken_chain", name: "The Unconnected Chain", kind: "chain", x: 27, z: 32, color: 0xc8b090,
      flavor: "Two heavy links that have accompanied each other through every moment of their existence and have never touched. They always move together. There is no reason they must.",
      meaning: "Hume — causation as custom, induction as faith, the self as bundle. The gap philosophy still lives athwart." }
  ]
},

// ------------------------------------------------------------
summit: {
  id: "summit",
  title: "The Summit & the Engine",
  bookLabel: "BOOK III · PART II — FROM ROUSSEAU TO THE PRESENT DAY",
  intro: {
    over: "THE AGE OF REVOLUTIONS, 1750 – 1945",
    title: "The Summit & the Engine",
    sub: "Feeling revolts against reason, history starts moving, God's obituary is filed — and philosophy walks into the modern storm."
  },
  terrain: "summit",
  sky: { top: 0x3a3a5a, mid: 0x7a7a9a, bot: 0xc8b8a8, fogColor: 0x9a94a0, fogNear: 50, fogFar: 150,
         sunPos: [80, 40, 60], sunColor: 0xfff0d8, sunIntensity: 0.7, sunDisc: true,
         hemi: { sky: 0xa8a8c8, ground: 0x4a4442, intensity: 0.55 }, ambient: 0x7a7488, ambientIntensity: 0.4 },
  ground: { base: 0x6a7458, accent: 0x8a8478 },
  particles: [
    { type: "snow", count: 240, area: { x: 8, z: -40, r: 22 }, y: [0, 26], color: 0xffffff, size: 0.12, speed: 0.6 },
    { type: "ember", count: 90, area: { x: 36, z: -2, r: 10 }, y: [0.5, 9], color: 0xff7733, size: 0.13, speed: 0.6 },
    { type: "petal", count: 80, area: { x: -32, z: 18, r: 12 }, y: [0.5, 7], color: 0xd8e8b0, size: 0.12, speed: 0.2 }
  ],
  props: [
    { type: "returnBook", x: 0, z: 40, rot: Math.PI },
    { type: "socialOak", x: -32, z: 18 },
    { type: "kantTown", x: -15, z: 0 },
    { type: "plaque", x: -10.5, z: 5, rot: -2.9, title: "KÖNIGSBERG SQUARE",
      lines: ["The citizens set their watches", "by the professor's afternoon walk.", "He missed it once — the day", "Rousseau's Émile arrived in the post."] },
    { type: "spiralMonument", x: 6, z: -8 },
    { type: "theaterGrotto", x: -30, z: -20, rot: 0.8 },
    { type: "foundry", x: 36, z: -2, rot: -0.9 },
    { type: "feliciEngine", x: 22, z: 17, rot: -0.4 },
    { type: "workshop", x: 14, z: 33, rot: -2.6 },
    { type: "summitCairn", x: 8, z: -42 },
    { type: "plaque", x: 4, z: -37, rot: 0.2, title: "THE HIGH PATH",
      lines: ["Thin air ahead. The philosopher who lived", "up here wrote: what does not kill me", "makes me stronger. His readers note", "that both clauses deserve attention."] },
    { type: "tree", variant: "oak", x: -38, z: 8 }, { type: "tree", variant: "oak", x: -26, z: 26 },
    { type: "tree", variant: "pine", x: -6, z: -24 }, { type: "tree", variant: "pine", x: 18, z: -20 },
    { type: "tree", variant: "pine", x: 30, z: -26 }, { type: "tree", variant: "pine", x: -18, z: -34 },
    { type: "tree", variant: "dead", x: 14, z: -34 }, { type: "rocks", x: -2, z: -34, n: 5 },
    { type: "rocks", x: 24, z: -36, n: 4 }, { type: "rocks", x: 40, z: 14, n: 4 }
  ],
  zones: [
    { x: 8, z: -42, r: 16, type: "storm" },
    { x: 8, z: -42, r: 10, type: "msg", text: "Thin air, hard light. Imagine climbing here every day of your life — and being told you must love the climb enough to repeat it forever." }
  ],
  spawn: { x: 0, z: 37, yaw: Math.PI },
  npcs: [
    { id: "rousseau", name: "Jean-Jacques Rousseau", dates: "1712 – 1778", title: "Father of the romantic revolt",
      x: -31, z: 16, robe: 0x4a5a3a, trim: 0xc8d8a0, accessory: "quill",
      blurb: "Announced that civilization corrupts, feeling outranks reason, and legitimate rule needs the general will.",
      seed: "Which of your chains did you mistake for furniture — and which 'freedoms' are actually chains?",
      dialogue: [
        { t: "Leave the towns behind you — here, under the oak, one can breathe. The Academy of Dijon once asked whether the sciences and arts had purified morals. Every wig in Europe knew the expected answer. Walking to visit a friend in prison, I saw the true one in a flash that soaked me in tears: no. Progress has polished us, and polish is what corruption shines with." },
        { t: "Man is born free, and everywhere he is in chains. The savage wants food, rest, a mate — he compares himself to no one. Then came the first man who fenced a plot and said 'this is mine,' and found people simple enough to believe him. From property: comparison. From comparison: vanity, rank, and the exquisite modern misery of living in the eyes of others. Your cities are machines for that misery. I have felt it grind me in every salon in Paris." },
        { t: "I do not preach a return to the forest — the philosophers' caricature. The way back is barred; the way must be forward, to a compact worth signing. Let each give himself to all, on terms equal for all, and obey the general will — the will each of us shares as citizen, not the appetites we nurse as private men. Then to obey the law is to obey oneself, and freedom and law are one thing at last. Yes, it may mean men must be forced to be free. Write that down carefully, traveler. Men will do terrible and glorious things with that sentence." },
        { t: "And educate the child for that freedom — not with Latin drills but with nature, senses, and the heart's slow seasons; my Émile explains it across five hundred pages, and I am told the Königsberg professor missed his walk to finish it. The heart, monsieur — I built my century a heart. What the next century builds with it is, thank God, not my department." },
        { s: "Bertrand Russell", t: "Rousseau invented the politics of feeling, and I decline to forgive him for it: the general will is a blank check that Robespierre and worse have cashed. Yet every revolt of heart against calculation since — every poet, every democrat, every anxious parent with a theory — is his debtor. The most influential confused man in this history." },
        { t: "The tablet in the oak is the compact — signed by no one and binding on everyone, which is either the deepest truth in politics or its neatest trick. Decide on the walk down. Feel first, though. Feel first." }
      ] },
    { id: "kant", name: "Immanuel Kant", dates: "1724 – 1804", title: "The clockwork revolutionary",
      x: -14, z: 2, robe: 0x3a3a4a, trim: 0xd8d8e8, accessory: "spectacles",
      blurb: "Never left Königsberg; rearranged the universe from his study. Mind shapes world; duty outranks desire.",
      seed: "Could you will your next act as a law for everyone? If not — what exactly are you excusing?",
      dialogue: [
        { t: "You are punctual — I notice such things; the town sets its watches by me. Forgive my brevity: the walk is at half past four. You have met the Scotsman and his billiard table? Good. That man interrupted my dogmatic slumber, and I have spent thirty years answering the alarm. Herr Hume proved experience cannot certify causation. Yet mathematics and physics hold. How? The question required a revolution, so I performed one — indoors." },
        { t: "Copernicus moved the observer, not the heavens. I do the same. We had assumed knowledge must conform to objects, and skepticism followed. Reverse it: objects conform to knowledge. Space, time, causation — these are not read off the world; they are the spectacles you were born wearing, the mind's own forms, through which anything must appear to be experienced at all. Hume sought the causal cement in the world and found nothing. Of course — it was behind his eyes the entire time." },
        { t: "The price of the revolution, paid honestly: the spectacles never come off. You know the world-as-it-appears, structured by your forms; the world-in-itself is forever beyond the lens. Metaphysics wept. But note what the tears water — knowledge limited is knowledge grounded, and I have, as I put it, drawn the boundary of knowledge to leave room for what knowledge could never settle: freedom, duty, faith. The boundary is the gift, traveler. Both sides of it." },
        { t: "And on conduct, no spectacles are needed — only consistency. Act only on the maxim you could will as universal law: the lie fails the test, for a world of liars unravels the very promise it exploits. And never — this above all — treat a person, in yourself or another, merely as a means. Persons are ends. Full stop. Two things fill the mind with ever new awe: the starry heavens above me, and the moral law within me. One I walk under every afternoon at half past four. The other walks with me." },
        { s: "Bertrand Russell", t: "Kant's private life ran like his beloved clockwork, and out of it came the most consequential philosophy since Athens: the mind as legislator of nature. I think the revolution partly a magnificent evasion of Hume — but no philosopher since has been permitted to skip him, and the categorical imperative remains the sternest sentence ever addressed to human excuse-making." },
        { t: "The spectacles on the fountain's rim are for you. Put them on and the world orders itself — grid, sequence, cause. Now the unsettling exercise: try to remember what it looked like before. You cannot. You never saw 'before.' Good afternoon — the walk, you understand." }
      ] },
    { id: "hegel", name: "G. W. F. Hegel", dates: "1770 – 1831", title: "Historian of the Absolute",
      x: 7, z: -6, robe: 0x4a4442, trim: 0xa8a098, accessory: "book",
      blurb: "History as the dialectical march of Spirit coming to know itself — and philosophy as its hindsight.",
      seed: "What contradiction in your life is not a problem to fix but a stage to pass through?",
      dialogue: [
        { t: "Climb with me a turn or two — the monument is best explained by ascending it. The professor across the square drew a boundary and called it final. Boundaries final! To think a limit, mein Freund, is already to be leaning over it. Reason is not a fenced garden. Reason is a climb." },
        { t: "Here is the motion. Every thought, pressed hard, births its own contradiction — being, pressed, becomes nothing; the two quarrel, and the quarrel resolves upward into becoming, which contains and cancels and keeps them both. Aufhebung, I call it: the lifting-that-preserves. Thesis, antithesis — then not compromise, but a third thing standing on both their shoulders. Each landing of this spiral is such a reconciliation. So is each landing's next quarrel." },
        { t: "Now the audacity, stated plainly: this is not merely how thinking moves. It is how everything moves. History is the dialectic performed in blood and institutions — Persia falls to Greece, Rome to its provinces, the Revolution devours itself and yields the modern state — each age a thought in the mind of Geist, Spirit, coming by stages to know itself as free. The Orient knew one man was free; Greece, that some are; the modern world learns that man as man is free. Your wars and constitutions, traveler, are premises in an argument the world is having with itself. I saw Napoleon ride through Jena — the world-spirit on horseback, I told my friends. The system was never abstract for me. It went past my window." },
        { t: "And philosophy? Philosophy is the hindsight of Spirit — comprehension arriving after the fact, always. The owl of Minerva spreads its wings only with the falling of the dusk. Do not ask the philosopher for tomorrow; ask him what today has been trying to say. When you understand your age, you are already standing on the first stair of the next. That is the consolation and the sentence, both." },
        { s: "Bertrand Russell", t: "Nearly everything in Hegel is, I believe, false, and he is the hardest to read of all the great philosophers — yet for a century his shadow was the weather. Marx turned his dialectic upside down and shook history out of it; whole nations have been governed by marginal notes on this man. Obscurity, I note professionally, is no bar to influence. Rather the reverse." },
        { t: "Take the small spiral from the plinth. Hold it level with your eye: from the side, an endless climb; from above, a single point. Both views are true. That the two are one — there is my entire system, portable at last. My publishers will be furious." }
      ] },
    { id: "schopenhauer", name: "Arthur Schopenhauer", dates: "1788 – 1860", title: "The great pessimist",
      x: -29, z: -18, robe: 0x2e2a2e, trim: 0x9a8a9a, accessory: "poodle",
      blurb: "Behind the world's appearances: blind, striving Will. Relief comes only in art, compassion, and renunciation.",
      seed: "When a want of yours is finally satisfied, what arrives — peace, or the next want?",
      dialogue: [
        { t: "Sit, if you must; the poodle has the good seat. His name is Atma — world-soul; there has been a succession of them, all wiser than my colleagues. I lectured in Berlin once, deliberately at the same hour as Hegel. He drew hundreds, I drew none, and posterity is slowly grading the exam. I can wait. Waiting is the one skill my philosophy guarantees." },
        { t: "Kant was right: the world you perceive is representation, appearance shaped by your forms. But he left the thing-in-itself a blank, and I have filled it — not by looking out, but by noticing what you are from within. Not thought. Not spirit. Striving. Hunger, craving, restlessness — Will. Behind the theater's painted scenery it churns, one blind insatiable force, and every creature — falling stone, growing root, scheming man — is that one Will, costumed. The professor on the spiral says the world is Reason unfolding. Look at the world, traveler. Does it unfold like an argument — or lunge like an appetite?" },
        { t: "Now the ledger your optimists refuse to audit. Will means want; want means lack; lack is suffering. Satisfy the want and what follows? Not peace — boredom, until the next want arrives to relieve the boredom of the last. Wanting, we suffer; getting, we are bored: life swings between, like a pendulum. It is a debt collector's arithmetic, and I did not invent it. I merely declined to look away. They call me pessimist for it, as one blames the accountant for the debts." },
        { t: "Yet there are pardons — three. In art, and above all in music, you contemplate without wanting: the churn pauses, the veil lifts, and you are for one measure a clear eye and not a hunger. In compassion, you recognize the sufferer as yourself — the same Will under other skin; the Indians knew this, tat tvam asi, that thou art, and all my ethics is in it. And in renunciation, rarest, the saint turns from the churn entirely. I am no saint — I dine well, I keep my pistols loaded, I love this dog. But I have heard the music. That much of the pardon I can verify personally." },
        { s: "Bertrand Russell", t: "Schopenhauer's system is gloom made magnificent, and his life a standing refutation of it — the preacher of renunciation dined richly and quarreled venomously. Yet honor what he smuggled into philosophy: the unconscious drive beneath the reasoning mask. Psychology's whole modern century — Freud not least — walks out of his theater." },
        { t: "Take the scrap of the veil — the theater keeps spares; Maya is a generous costumer. Through it you see the world as usual. Folded in the pocket, you at least remember there was a veil. Most men die certain the scenery was the play. Atma, say goodbye. He won't. Wise, as I said." }
      ] },
    { id: "nietzsche", name: "Friedrich Nietzsche", dates: "1844 – 1900", title: "Philosopher with a hammer",
      x: 9, z: -40, robe: 0x3a2e2e, trim: 0xc8a888, accessory: "mustache",
      blurb: "Diagnosed God's death and nihilism's approach; prescribed amor fati, self-overcoming, and a yes that could bear eternity.",
      seed: "If you had to relive your life, unchanged, infinitely — what is the first thing you'd need to make worth repeating?",
      dialogue: [
        { t: "So you made the climb — good; I distrust every thought that arrives sitting down. Six thousand feet beyond man and time, I wrote up here. The air is thin, honest, dangerous. Like the century I am addressing, which has not yet noticed what it did. Shall I tell you the news, traveler? You have heard it rumored all the way up the mountain." },
        { t: "God is dead. Not slain by my hammer — by yours, collectively: by the telescope, the billiard table, the geology under the churchyard. Europe murdered its own foundation and continues attending services. I am not celebrating, understand — I am the messenger who arrived too early, lantern lit in the morning market. When the news lands, the old table of values goes blank. What is coming I have named in advance: nihilism, the guest at the door — the conviction that nothing means, nothing ranks, nothing is worth the candle. My century's real work, and yours, is what to do when he knocks." },
        { t: "The herd's answer will be comfort — the last men, blinking, warm, risk-free, 'happiness' invented and everything great forgotten. My answer is the opposite road: if the old tables are blank, become one who can write. Not license, mark me — the hardest discipline there is. Every deep drive in you longs to command; style them, rank them, spend them on a task worth a life: become who you are. What does not kill me makes me stronger — I wrote that line living on this mountain with a body in permanent revolt, half-blind, vomiting through migraines, writing between the waves. It was not a poster, traveler. It was field surgery." },
        { t: "And here is my scale for any life, my hammer-tap for hollow idols — eternal recurrence. Suppose a demon crept to you in your loneliest night and said: this life, as you live it, you must live innumerable times again — every pain, every pettiness, every joy, in sequence, forever. Would you curse him — or has there been one moment so tremendous you would say: very well, again, and again? That yes — amor fati, love of one's fate, wanting nothing to be different, not backward, not forward, not in all eternity — that is the heaviest weight and the highest health. I do not ask if you believe the cosmology. I ask what the question does to your Tuesday." },
        { s: "Bertrand Russell", t: "I will be honest as he would demand: I find his ethics of strength repellent, and history, in my lifetime, gave his rhetoric to gangsters — his pacifist sister sold the estate, so to speak, and he would have despised the buyers. But the diagnosis — that Europe's values had lost their ground and the bill was coming — no one saw it earlier or said it with more voltage. Read him arguing, never genuflecting. He asked for that himself." },
        { t: "The ring on the cairn — take it. A circle, you notice: no clasp, no beginning, no exit. Wear it on the days you are tempted to live provisionally, as a draft for some later life. There is no later life, friend. This is the fair copy. Write accordingly — and go down by the steep path. It is the honest one." }
      ] },
    { id: "mill", name: "John Stuart Mill", dates: "1806 – 1873", title: "Saint of rationalism",
      x: 23, z: 19, robe: 0x4a4a5a, trim: 0xc8d0d8, accessory: "book",
      blurb: "Raised as a calculating machine; broke; rebuilt utilitarianism with poetry, liberty, and higher pleasures.",
      seed: "Whose happiness is quietly excluded from your current arithmetic of the good?",
      dialogue: [
        { t: "Mind the engine — my godfather Bentham's design. Feed it any act or law, and it totals the happiness produced and the suffering spared, each person counting for one and none for more than one. The greatest happiness of the greatest number: morality as honest arithmetic at last, no incense required. I was raised to operate it — Greek at three, logic at twelve, and at twenty, I am obliged to report, the operator broke down entirely." },
        { t: "The famous crisis: I asked myself one grey evening — if every reform you fight for were accomplished tonight, would it make you happy? And an irrepressible self-consciousness answered: no. The machine had an error, and the error was me. What repaired me was nothing in the ledgers — Wordsworth's poems, music, the culture of the feelings. So I rebuilt the doctrine with the missing column: pleasures differ in kind, not merely amount. Better Socrates dissatisfied than a fool satisfied — and if the fool disagrees, note that only Socrates has tried both sides of the question." },
        { t: "Then guard the arithmetic's blind side. A majority's happiness can be served by crushing a minority — the sums may even balance. Never permit it. Over himself, over his own body and mind, the individual is sovereign; the sole warrant for coercion is harm to others — not his own good, not our comfort, not the majority's taste. And truth itself needs the same charter: silence an opinion and you rob mankind — if it is right, of the truth; if wrong, of the sharper truth its collision would have struck. I distrust even my own creed enough to demand its opponents keep speaking. That distrust is the most utilitarian thing about me." },
        { t: "And run the engine where the age dare not. Half the human species is entered in no ledger at all — the subjection of women is the last domestic slavery, defended by exactly the arguments that defended the first kind. Harriet Taylor and I wrote of it together for twenty years; the wits of London found an equal marriage funnier than the injustice it answered. Posterity may score that joke. The greatest number, traveler — it was never a rounding instruction." },
        { s: "Bertrand Russell", t: "Mill was my godfather — in the secular fashion — and remains the man I should least blush to have philosophy judged by: wrong with candor, reformed by poetry, and incapable of cruelty in argument. Utilitarianism has holes his own honesty exposed; On Liberty outweighs shelves of subtler books. Sainthood, in rationalists, looks like this." },
        { t: "Take the counter from the engine's tray. It tallies whatever you ask of a choice — but the dials for kind and for whom you must set by hand. That setting is the whole of ethics, friend. The adding was always the easy part." }
      ] },
    { id: "marx", name: "Karl Marx", dates: "1818 – 1883", title: "Philosopher of the engine room",
      x: 35, z: 0.5, robe: 0x3a3232, trim: 0xb84a3a, accessory: "beard",
      blurb: "Stood Hegel on his feet: history as class struggle driven by material production. The point is to change it.",
      seed: "Follow one thing you own back through every pair of hands that made it. What do you owe the hands?",
      dialogue: [
        { t: "Mind the sparks — they are the century, condensed. You have been up the spiral? Herr Hegel taught me everything, and I have kept it all — inverted. He says history is Spirit thinking itself forward and the world following. Stand him on his feet: history is men producing their dinner, and the thinking follows. It is not consciousness that determines life, but life — material, sweating, hungry life — that determines consciousness. The dialectic I keep. The ghost I dismiss." },
        { t: "Every age, then, is its engine room. Hand-mill: feudal lords. Steam-mill: industrial capital. Each system of production casts up its ruling class, and the rulers' ideas descend on the age as 'common sense,' 'nature,' 'God's order' — the ruling ideas of each age, traveler, have ever been the ideas of its ruling class. Your morality has a supply chain. Your philosophy has a landlord. The first act of criticism is reading the invoice." },
        { t: "And walk the engine room as I have — Manchester, the reports, Engels's ledgers. The worker pours his one life into objects he will never own, and the objects gather as a power over him; he makes the machine, the machine makes his hours, and the thing made of his life confronts him as an alien thing. I call it alienation — Entfremdung — and it is not solved by wages. Meanwhile capital, to its credit, is the most revolutionary force history has produced: it has melted every solid, profaned every holy, chained the globe in one market — and assembled, in its own factories, shoulder to shoulder, the class that has nothing to sell but its hands and nothing to lose but its chains. The engine, mein Freund, manufactures its own successors. That is the dialectic, cast in iron." },
        { t: "As for the philosophers — I wrote their epitaph young, and I have not improved on it: they have only interpreted the world, in various ways. The point, however, is to change it. Twenty years in the British Museum, boils, debts, buried children — you may ask whether I interpreted or changed. The century after me will answer with a violence of both kinds, and — I say this to you plainly — not all of it will read the invoice honestly either. Judge the analysis where it bites: whoever owns the engine writes the age. Check the deed, in every age. Yours included." },
        { s: "Bertrand Russell", t: "I visited the country built in his name and returned unconverted — as dogma, Marxism is a church, complete with schisms and inquisitors, and he would have made a difficult saint. But as analyst — that ideas have economic addresses, that freedom means little to a man who must sell his hours to eat — he changed what honesty requires of every philosopher since. One may refuse the prophet and still owe the diagnostician." },
        { t: "The gear from the great engine — take it. Alone in your pack it is dead iron; meshed, it moved the world. He would want you to notice that the metaphor cuts every way at once: nothing changes alone, and no gear chooses its machine. Choose yours, then. That much, at least, is not determined." }
      ] },
    { id: "james", name: "William James", dates: "1842 – 1910", title: "Pragmatist of the open universe",
      x: 15, z: 31, robe: 0x4a3e34, trim: 0xd8c090, accessory: "spectacles",
      blurb: "Asked of every idea: what difference does it make in practice? Truth as what works; the universe as unfinished.",
      seed: "Take a belief you argue about. If it changed nothing you'd ever do or expect — what are you arguing about?",
      dialogue: [
        { t: "Come in, come in — mind the workbench; ideas under repair. You have walked the whole gallery now: Forms, substances, monads, Spirit, Will. Magnificent architecture! And my American question for every wing of it is the workshop question: suppose this notion true — what concrete difference will it make to anyone's actual life? What experiences will differ? If the answer is none, gentlemen, the dispute is verbal, and we may all go to lunch. You would be startled how much of the gallery adjourns." },
        { t: "That is the pragmatic method, and it re-tools the very word 'true.' Truth is not a portrait's frozen likeness to reality — it is what happens to an idea: it is verified, it works, it marries our old beliefs to new fact, it carries us prosperously from experience to experience. Truths are made in the stream of events, the way health is made, the way wealth is made. The rationalists shudder — 'expedience!' But watch them navigate their own lives, and they are all pragmatists between books." },
        { t: "And the stream is where you live, mark it. Consciousness is no chain of beads, no theater of static ideas — it flows, a stream of thought, each pulse fringed with relations, tinged with purpose; I wrote a thousand pages of psychology before philosophy, and the laboratory cured me forever of tidy minds. It also taught me mercy: habit is the enormous flywheel of society — your character is a bundle of habits hardening daily, so mind which acts you repeat. You are, at this moment, spinning up the person you will be stuck being. Cheerful thought. I mean it cheerfully!" },
        { t: "Last tool in the kit, and my favorite. The evidentialists command: never believe beyond the evidence. Prudent — for the laboratory. But some options are living, forced, and momentous, and will not wait: whether life is worth living, whether to trust this person, whether the universe is friendly. There, refusing to choose is itself a choice — and in some cases, believing is part of what makes the thing true. Believe that the leap is possible, and your legs firm; trust a man, and you help create the fidelity you trusted. I call it the will to believe. Not license to fancy — a fighting chance, where the evidence has honestly run out and the moment has not. The universe, friend, is unfinished — with real options, real risks, real work left. I would not trade that for any Absolute's completed bliss. There is no lunch in the Absolute." },
        { s: "Bertrand Russell", t: "James was the most lovable of philosophers, and I fought his theory of truth all my life — 'it works' slides too easily into 'it pays,' and truth, I insist, is stubbornly about facts, not benefits. But his psychology was a masterpiece, his openness a tonic, and his kindness — he reviewed even his destroyers gently — a standing reproach to the profession. America's first philosophical voice, and still its best-natured." },
        { t: "The coin from the bench — its face reads IT WORKS, and the mint asks you to remember the fine print: works for whom, for how long, at what cost to the other truths you hold? Spend it on questions the evidence cannot close. You will find, I think, that it keeps turning up in your pocket. The unfinished universe makes change. Good journey — the library is expecting you." }
      ] }
  ],
  items: [
    { id: "social_contract", name: "The Carved Compact", kind: "tablet", x: -35, z: 21, color: 0xa8c878,
      flavor: "A tablet cut from the great oak, bearing an agreement with no signatures — binding, its holder insists, on everyone born after it.",
      meaning: "Rousseau — man born free yet everywhere in chains; legitimacy only from the general will. Handle with awe and gloves." },
    { id: "kant_spectacles", name: "The Spectacles of the Categories", kind: "spectacles", x: -17, z: 6, color: 0x8ab8d8,
      flavor: "Put them on: the world snaps into space, time, and causes. Take them off: you cannot. You never could. That's the discovery.",
      meaning: "Kant — the mind legislates experience; we know appearances, never things-in-themselves. Knowledge bounded, and thereby grounded." },
    { id: "hegel_spiral", name: "The Portable Dialectic", kind: "spiral", x: 9, z: -11, color: 0xb8b0a0,
      flavor: "A small bronze spiral. From the side: endless conflict, climbing. From above: one widening circle. Every quarrel it contains, it keeps.",
      meaning: "Hegel — thesis, antithesis, synthesis; history as Spirit's long argument with itself, comprehended only at dusk." },
    { id: "veil_maya", name: "A Scrap of the Veil", kind: "veil", x: -33, z: -22, color: 0x8a7a9a,
      flavor: "Gauze from the theater of the world. Through it, everything looks normal — which is precisely the effect. Behind it, something is always striving.",
      meaning: "Schopenhauer — the world as Will and representation; suffering as wanting's shadow; art, compassion, renunciation as the pardons." },
    { id: "ring_recurrence", name: "The Ring of Recurrence", kind: "ring", x: 11, z: -44, y: 1.6, color: 0xc8a888,
      flavor: "A plain circle with no clasp and no seam. Wearing it, you feel the question tighten pleasantly: this exact life, forever — yes or no?",
      meaning: "Nietzsche — amor fati; eternal recurrence as the test of a life; become who you are, since this is the fair copy." },
    { id: "felicific_counter", name: "The Felicific Counter", kind: "counter", x: 25, z: 21, color: 0xd8b04a,
      flavor: "A brass tally that sums any act's pleasures and pains — each person counting for one. The dials for 'kind' and 'whom' turn only by hand.",
      meaning: "Mill — the greatest happiness, upgraded: higher pleasures, sovereign individuals, and no one left out of the count." },
    { id: "iron_gear", name: "The Gear of History", kind: "gear", x: 38, z: 3.5, color: 0x8a6a4a,
      flavor: "One tooth-worn gear from an engine that never stops retooling itself. Alone it is scrap; meshed, it moved millions. It did not ask the millions.",
      meaning: "Marx — being determines consciousness; every age's ideas bear its owners' fingerprints; the point is to change it." },
    { id: "cash_value", name: "The Cash-Value Coin", kind: "coin", x: 17, z: 34, color: 0xd8c090,
      flavor: "Stamped IT WORKS on one face and FOR WHOM? on the other. It refuses to sit still in the pocket — like the universe that minted it, permanently unfinished.",
      meaning: "James — ideas judged by the difference they make; truth as what carries us well; belief, sometimes, as a creative act." }
  ]
}
};
