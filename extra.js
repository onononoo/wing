// more groups and lookup tables that sit on top of data.js

wings.push(
  {
    group: "plant and seed wings",
    subgroups: [
      {
        name: "winged seeds",
        entries: [
          { id: "zanonia", name: "gliding seed wing", note: "a thin two-winged seed that glides in wide circles. it inspired early glider designs.", examples: ["alsomitra macrocarpa"], flight: "gliding", material: "plant tissue", tags: ["glide", "living", "plant", "efficient"] },
          { id: "dipterocarp", name: "two-winged seed", note: "long wings on a heavy seed that spin it slowly to the ground.", examples: ["dipterocarpus"], flight: "gliding", material: "plant tissue", tags: ["rotating", "living", "plant"] },
          { id: "pine-seed", name: "pine seed wing", note: "a single papery wing that makes the seed twirl.", examples: ["scots pine", "spruce"], flight: "gliding", material: "plant tissue", tags: ["rotating", "living", "plant"] },
          { id: "elm-seed", name: "elm seed disk", note: "a round flat wing that flutters like a coin.", examples: ["american elm"], flight: "gliding", material: "plant tissue", tags: ["living", "plant"] },
          { id: "tree-of-heaven", name: "twisted seed wing", note: "a twisted strip that rolls and spins as it falls.", examples: ["ailanthus"], flight: "gliding", material: "plant tissue", tags: ["rotating", "living", "plant"] }
        ]
      },
      {
        name: "floating seeds",
        entries: [
          { id: "dandelion", name: "dandelion parachute", note: "a tuft of bristles that traps a steady ring of air above the seed.", examples: ["dandelion"], flight: "gliding", material: "plant tissue", tags: ["living", "plant", "tiny", "odd"] },
          { id: "milkweed", name: "milkweed silk", note: "silky threads that let the seed drift for long distances.", examples: ["common milkweed"], flight: "gliding", material: "plant tissue", tags: ["living", "plant", "soft"] }
        ]
      }
    ]
  },
  {
    group: "space and extreme wings",
    subgroups: [
      {
        name: "beyond normal air",
        entries: [
          { id: "shuttle", name: "space shuttle wing", note: "a double delta built to glide home from orbit, covered in heat tiles.", examples: ["space shuttle orbiter"], flight: "gliding", material: "aluminum", tags: ["supersonic", "space", "glide"] },
          { id: "lifting-body", name: "lifting body", note: "a craft with no real wings where the body shape makes the lift.", examples: ["x-24", "dream chaser"], flight: "gliding", material: "aluminum", tags: ["space", "experimental", "tailless"] },
          { id: "waverider", name: "waverider", note: "a hypersonic shape that surfs on its own shock wave.", examples: ["x-51"], flight: "powered", material: "titanium", tags: ["experimental", "fast", "supersonic"] },
          { id: "mars-rotor", name: "mars helicopter blade", note: "large, fast-spinning blades for the thin air of mars.", examples: ["ingenuity"], flight: "powered", material: "carbon fiber", tags: ["rotating", "space", "experimental"] },
          { id: "solar-sail", name: "solar sail", note: "a huge thin mirror pushed by sunlight. a wing for light, not air.", examples: ["ikaros", "lightsail"], flight: "none", material: "polymer film", tags: ["space", "experimental", "odd"] },
          { id: "solar-plane", name: "solar plane wing", note: "a very long wing covered in solar cells for flights that last days.", examples: ["solar impulse", "zephyr"], flight: "powered", material: "carbon fiber", tags: ["efficient", "high altitude", "experimental"] }
        ]
      }
    ]
  }
);

// what each material is like
const materials = {
  "aluminum": { origin: "made", weight: "light", stiffness: "medium", note: "the standard metal for aircraft." },
  "titanium": { origin: "made", weight: "medium", stiffness: "high", note: "strong and handles heat, but costly." },
  "composite": { origin: "made", weight: "light", stiffness: "high", note: "fibers set in plastic resin." },
  "carbon fiber": { origin: "made", weight: "very light", stiffness: "very high", note: "the stiffest common composite." },
  "fiberglass": { origin: "made", weight: "light", stiffness: "medium", note: "glass fibers in resin, cheap and tough." },
  "foam": { origin: "made", weight: "very light", stiffness: "low", note: "easy to shape, used on small drones." },
  "fabric": { origin: "made", weight: "very light", stiffness: "none", note: "holds shape only under tension or air pressure." },
  "polymer film": { origin: "made", weight: "very light", stiffness: "low", note: "thin plastic sheet." },
  "metal": { origin: "made", weight: "heavy", stiffness: "high", note: "general metal." },
  "stone": { origin: "natural", weight: "heavy", stiffness: "very high", note: "carved, never flown." },
  "lead or steel": { origin: "made", weight: "heavy", stiffness: "high", note: "heavy on purpose, for balance." },
  "chitin": { origin: "natural", weight: "very light", stiffness: "medium", note: "the shell material of insects." },
  "keratin": { origin: "natural", weight: "very light", stiffness: "medium", note: "the protein in feathers, hair, and nails." },
  "cartilage": { origin: "natural", weight: "light", stiffness: "low", note: "bendy tissue, like in your ears." },
  "plant tissue": { origin: "natural", weight: "very light", stiffness: "low", note: "dried plant cells." },
  "wood and fabric": { origin: "mixed", weight: "light", stiffness: "medium", note: "a wooden frame covered in cloth, used on early planes." },
  "wood or composite": { origin: "mixed", weight: "light", stiffness: "high", note: "old blades are wood, newer ones are composite." },
  "fabric and aluminum": { origin: "made", weight: "light", stiffness: "medium", note: "cloth stretched over metal tubes." },
  "feathers and bone": { origin: "natural", weight: "very light", stiffness: "medium", note: "hollow bones with feathers on top." },
  "feathers": { origin: "natural", weight: "very light", stiffness: "medium", note: "keratin feathers only." },
  "skin and bone": { origin: "natural", weight: "light", stiffness: "low", note: "living skin held by long bones." },
  "skin and rib": { origin: "natural", weight: "light", stiffness: "low", note: "skin held out by long ribs." },
  "skin": { origin: "natural", weight: "light", stiffness: "none", note: "a loose flap of skin." },
  "scales": { origin: "natural", weight: "light", stiffness: "low", note: "the scaled body itself." },
  "chitin and scales": { origin: "natural", weight: "very light", stiffness: "medium", note: "chitin covered in tiny colored scales." },
  "fin rays": { origin: "natural", weight: "light", stiffness: "medium", note: "thin bony rods holding up a fin." },
  "soft tissue": { origin: "natural", weight: "light", stiffness: "none", note: "soft body tissue with no bones." },
  "membrane": { origin: "natural", weight: "very light", stiffness: "low", note: "a thin see-through sheet." },
  "wax and feathers": { origin: "mixed", weight: "light", stiffness: "low", note: "feathers stuck together with wax, which melts." }
};

// what each flight mode means
const flightModes = {
  powered: "pushed by an engine or motor.",
  flapping: "makes its own lift and thrust by beating.",
  gliding: "trades height for distance, or rides moving air.",
  swimming: "works the same way as a wing, but in water.",
  none: "wing-shaped, but not used to fly."
};

// named links between entries: [from, type, to]
const links = [
  ["bird", "inspired", "ornithopter"],
  ["zanonia", "inspired", "flying-wing"],
  ["maple-seed", "inspired", "rotor"],
  ["dragonfly", "inspired", "robobee"],
  ["flying-squirrel", "inspired", "wingsuit"],
  ["icarus", "inspired", "ornithopter"],
  ["active-soaring", "same idea", "high-aspect"],
  ["active-soaring", "same idea", "sailplane"],
  ["passive-soaring", "same idea", "hang-glider"],
  ["alula", "same idea", "slat"],
  ["penguin", "same idea", "sea-turtle"],
  ["manta", "same idea", "sea-turtle"],
  ["sail", "same idea", "keel"],
  ["keel", "same idea", "hydrofoil"],
  ["race-wing", "same idea", "hydrofoil"],
  ["delta", "same idea", "shuttle"],
  ["shuttle", "same idea", "lifting-body"],
  ["lifting-body", "same idea", "waverider"],
  ["rotor", "same idea", "mars-rotor"],
  ["rotor", "same idea", "propeller"],
  ["propeller", "same idea", "turbine"],
  ["kite", "same idea", "paraglider"],
  ["paraglider", "same idea", "wingsuit"],
  ["dandelion", "same idea", "paraglider"],
  ["solar-plane", "same idea", "high-aspect"],
  ["fixed-drone", "same idea", "high-aspect"],
  ["blended", "same idea", "flying-wing"],
  ["box", "same idea", "annular"],
  ["dragon", "same idea", "bat"],
  ["angel", "same idea", "bird"],
  ["pegasus", "same idea", "bird"],
  ["fairy", "same idea", "butterfly"],
  ["bird", "evolved like", "bat"],
  ["bat", "evolved like", "pterosaur"],
  ["pterosaur", "evolved like", "bird"],
  ["flying-squirrel", "evolved like", "sugar-glider"],
  ["sugar-glider", "evolved like", "colugo"],
  ["winglet", "part of", "swept"],
  ["flap", "part of", "swept"],
  ["slat", "part of", "swept"],
  ["spoiler", "part of", "swept"],
  ["aileron", "part of", "straight"],
  ["canard", "part of", "delta"],
  ["primaries", "part of", "bird"],
  ["secondaries", "part of", "bird"],
  ["alula", "part of", "bird"],
  ["coverts", "part of", "bird"],
  ["monoplane", "replaced", "biplane"],
  ["biplane", "replaced", "triplane"],
  ["delta", "replaced", "variable-sweep"]
];

// words that get explained when they show up in notes
const glossary = {
  "lift": "the upward push a wing makes from moving air.",
  "drag": "air pushing back against something moving through it.",
  "thrust": "the forward push that moves something ahead.",
  "vortices": "spinning swirls of air, like at a wing tip.",
  "supersonic": "faster than the speed of sound.",
  "hypersonic": "more than about five times the speed of sound.",
  "composites": "materials made of fibers set in resin.",
  "chitin": "the tough material in insect shells and wings.",
  "shock wave": "a sudden jump in air pressure made at high speed.",
  "aerobatics": "stunt flying with loops and rolls.",
  "orbit": "a path that circles around a planet."
};
