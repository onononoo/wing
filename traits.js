// even more groups, plus scales, synonyms, and a tag family tree

wings.push(
  {
    group: "everyday and borrowed wings",
    subgroups: [
      {
        name: "objects named after wings",
        entries: [
          { id: "wing-nut", name: "wing nut", note: "a nut with two flat ears so it can be turned by hand.", examples: ["drum kit stands", "clamps"], flight: "none", material: "metal", tags: ["object", "borrowed name"] },
          { id: "wing-mirror", name: "wing mirror", note: "a side mirror on a car, named for sticking out like a wing.", examples: ["car side mirror"], flight: "none", material: "metal", tags: ["object", "borrowed name", "vehicle"] },
          { id: "wingback", name: "wingback chair", note: "a chair with side panels that block drafts.", examples: ["armchairs"], flight: "none", material: "wood and fabric", tags: ["object", "borrowed name", "furniture"] },
          { id: "car-fender", name: "car wing (fender)", note: "the body panel over a wheel, called a wing in some countries.", examples: ["front fender"], flight: "none", material: "metal", tags: ["object", "borrowed name", "vehicle"] },
          { id: "stage-wing", name: "stage wings", note: "the hidden spaces at the sides of a stage.", examples: ["theaters"], flight: "none", material: "wood and fabric", tags: ["place", "borrowed name"] },
          { id: "building-wing", name: "building wing", note: "a part of a building that sticks out from the main body.", examples: ["hospital wings", "museum wings"], flight: "none", material: "stone", tags: ["place", "borrowed name"] }
        ]
      },
      {
        name: "food and people",
        entries: [
          { id: "chicken-wing", name: "chicken wing", note: "the wing of a chicken, cooked as food.", examples: ["buffalo wings"], flight: "none", material: "feathers and bone", tags: ["food", "bird", "borrowed name"] },
          { id: "winger", name: "winger", note: "a player who runs along the sides of the field.", examples: ["soccer", "hockey", "rugby"], flight: "none", material: "skin and bone", tags: ["sport", "borrowed name", "human"] },
          { id: "political-wing", name: "political wing", note: "a side of a group or party, like left wing or right wing.", examples: ["left wing", "right wing"], flight: "none", material: "membrane", tags: ["symbol", "borrowed name"] },
          { id: "air-force-wing", name: "air force wing", note: "a unit of an air force made of several squadrons.", examples: ["fighter wing"], flight: "powered", material: "aluminum", tags: ["borrowed name", "military"] }
        ]
      }
    ]
  },
  {
    group: "prehistoric wings",
    subgroups: [
      {
        name: "early flyers",
        entries: [
          { id: "archaeopteryx", name: "archaeopteryx wing", note: "a feathered wing that still had clawed fingers.", examples: ["archaeopteryx"], flight: "flapping", material: "feathers and bone", tags: ["extinct", "bird", "true flight"] },
          { id: "microraptor", name: "four-winged dinosaur", note: "feathered wings on both arms and legs, used to glide between trees.", examples: ["microraptor"], flight: "gliding", material: "feathers and bone", tags: ["extinct", "glide", "odd"] },
          { id: "yi-qi", name: "bat-winged dinosaur", note: "a small dinosaur with skin wings held by a long wrist rod.", examples: ["yi qi", "ambopteryx"], flight: "gliding", material: "skin and bone", tags: ["extinct", "glide", "odd", "rare"] },
          { id: "meganeura", name: "giant griffinfly wing", note: "dragonfly-like wings wider than a pigeon's, from a time with more oxygen.", examples: ["meganeura"], flight: "flapping", material: "chitin", tags: ["extinct", "insect", "true flight"] },
          { id: "coelurosauravus", name: "rod-winged reptile", note: "a gliding reptile whose wings were held by rods of new bone, not ribs.", examples: ["coelurosauravus"], flight: "gliding", material: "skin and bone", tags: ["extinct", "glide", "reptile"] }
        ]
      }
    ]
  }
);

// ordered scales. search can compare them, like speed>medium
const scales = {
  size: ["tiny", "small", "medium", "large", "huge"],
  speed: ["still", "slow", "medium", "fast", "very fast"],
  aspect: ["low", "medium", "high", "very high"]
};

// rules that guess scale values from tags and other fields. first match wins per scale
const traitRules = [
  { when: e => e.tags.includes("tiny"), set: { size: "tiny" } },
  { when: e => e.tags.includes("insect") || e.tags.includes("plant"), set: { size: "small" } },
  { when: e => e.tags.includes("airliner") || e.tags.includes("space") || e.tags.includes("energy"), set: { size: "huge" } },
  { when: e => e.flight === "powered" || e.tags.includes("glider"), set: { size: "large" } },
  { when: () => true, set: { size: "medium" } },

  { when: e => e.flight === "none", set: { speed: "still" } },
  { when: e => e.tags.includes("supersonic"), set: { speed: "very fast" } },
  { when: e => e.tags.includes("fast") || e.tags.includes("jet") || e.tags.includes("high speed"), set: { speed: "fast" } },
  { when: e => e.tags.includes("plant") || e.tags.includes("low speed") || e.tags.includes("hover"), set: { speed: "slow" } },
  { when: () => true, set: { speed: "medium" } },

  { when: e => e.tags.includes("efficient") && e.flight === "gliding", set: { aspect: "very high" } },
  { when: e => e.tags.includes("efficient"), set: { aspect: "high" } },
  { when: e => e.tags.includes("supersonic") || e.tags.includes("agile") || e.tags.includes("tailless"), set: { aspect: "low" } },
  { when: () => true, set: { aspect: "medium" } }
];

// hand-set values that beat the rules
const traitOverrides = {
  "active-soaring": { size: "large", aspect: "very high" },
  "passive-soaring": { size: "large", aspect: "medium" },
  "hovering": { size: "tiny", speed: "slow", aspect: "medium" },
  "high-speed-bird": { speed: "very fast" },
  "pterosaur": { size: "huge", aspect: "high" },
  "meganeura": { size: "medium" },
  "rotor": { aspect: "very high" },
  "mars-rotor": { size: "medium", aspect: "high" },
  "turbine": { aspect: "very high" },
  "solar-sail": { size: "huge", aspect: "low" },
  "flying-wing": { size: "huge" },
  "robobee": { size: "tiny" },
  "fixed-drone": { size: "small" },
  "kite": { size: "medium", speed: "slow" },
  "wingsuit": { size: "medium", speed: "fast" },
  "manta": { size: "large", speed: "slow" },
  "sea-angel": { size: "tiny" },
  "building-wing": { size: "huge" }
};

// words that mean the same thing, so a search for one finds the other
const synonyms = [
  ["plane", "aircraft", "airplane", "jet"],
  ["glide", "gliding", "glider", "soar", "soaring"],
  ["flap", "flapping", "beat"],
  ["fast", "quick", "speed", "high speed"],
  ["tiny", "small", "little", "micro"],
  ["huge", "big", "giant", "large"],
  ["water", "sea", "ocean", "underwater", "swimming"],
  ["extinct", "prehistoric", "fossil", "ancient"],
  ["myth", "legend", "folklore", "fiction"],
  ["robot", "drone", "machine"],
  ["spin", "spinning", "rotating", "rotor", "twirl"]
];

// tag family tree. picking a parent tag also matches its children
const tagParents = {
  "animal": ["bird", "mammal", "insect", "reptile", "amphibian", "fish"],
  "flight style": ["true flight", "glide", "hover", "tethered"],
  "speed": ["fast", "high speed", "supersonic", "low speed"],
  "made by people": ["airliner", "fighter", "trainer", "drone", "robot", "sport", "general aviation", "homebuilt", "military"],
  "not real": ["myth", "fiction", "symbol"],
  "life": ["living", "extinct", "plant"],
  "names": ["borrowed name", "object", "place", "food", "furniture"]
};
