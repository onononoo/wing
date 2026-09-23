// parts, environments, pros and cons, and numbers used to estimate how air or water flows over each wing

// typical speed in meters per second for each speed step
const speedMs = { "still": 0, "slow": 3, "medium": 12, "fast": 60, "very fast": 400 };

// typical span divided by chord (how long and thin) for each aspect step
const aspectRatio = { "low": 2, "medium": 6, "high": 12, "very high": 25 };

// how thick each fluid is. kinematic viscosity in square meters per second
const fluids = {
  air: { viscosity: 1.5e-5, note: "normal air near the ground." },
  "thin air": { viscosity: 1.1e-3, note: "the very thin air of mars." },
  water: { viscosity: 1.0e-6, note: "sea or fresh water." }
};

// flow bands by reynolds number, a number that says whether thickness or momentum wins
const flowBands = [
  { below: 10, name: "creeping", note: "the fluid feels like honey. bristles work as well as solid wings." },
  { below: 1e3, name: "sticky", note: "thickness still matters a lot. flapping and clapping tricks help." },
  { below: 1e5, name: "in between", note: "the range of insects, seeds, and small birds. flow can suddenly change." },
  { below: 1e6, name: "smooth", note: "the range of large birds, gliders, and small drones." },
  { below: Infinity, name: "turbulent", note: "the range of airliners and fast jets. thin air layers near the skin churn." }
];

// which fluid each entry works in when it is not plain air
const fluidOf = {
  "penguin": "water", "manta": "water", "sea-turtle": "water", "sea-angel": "water",
  "keel": "water", "hydrofoil": "water", "mars-rotor": "thin air"
};

// where each kind of wing is found or used
const environments = {
  sky: ["straight", "tapered", "elliptical", "swept", "forward-swept", "delta", "cropped-delta", "ogive", "variable-sweep", "oblique", "flying-wing", "blended", "high-aspect", "annular", "sailplane", "hang-glider", "paraglider", "wingsuit", "kite", "solar-plane", "fixed-drone", "rotor", "autogyro", "propeller"],
  forest: ["flying-squirrel", "sugar-glider", "colugo", "draco", "flying-frog", "flying-snake", "elliptical-bird", "maple-seed", "zanonia", "dipterocarp", "pine-seed", "microraptor", "yi-qi", "bat"],
  sea: ["flying-fish", "penguin", "manta", "sea-turtle", "sea-angel", "active-soaring", "sail", "keel", "hydrofoil", "ekranoplan"],
  grassland: ["ostrich", "dandelion", "milkweed", "passive-soaring", "butterfly", "bee"],
  wetland: ["dragonfly", "meganeura", "fly"],
  space: ["shuttle", "lifting-body", "solar-sail", "mars-rotor", "waverider"],
  city: ["wing-nut", "wing-mirror", "car-fender", "building-wing", "stage-wing", "wingback", "chicken-wing", "race-wing", "turbine"],
  story: ["dragon", "angel", "fairy", "icarus", "pegasus", "hermes", "winged-sun", "caduceus"]
};

// what each wing is made of, as a tree of named parts
const parts = {
  "bird": ["upper arm bone", ["forearm", ["radius", "ulna"]], ["hand", ["fused finger bones", "alula"]], ["feathers", ["primaries", "secondaries", "coverts"]]],
  "bat": ["upper arm bone", "forearm", "thumb claw", ["fingers", ["second", "third", "fourth", "fifth"]], ["skin membrane", ["arm part", "hand part", "tail part"]]],
  "pterosaur": ["upper arm bone", "forearm", "pteroid bone", ["fingers", ["three small clawed fingers", "long wing finger"]], ["membrane", ["front part", "main part", "rear part"]]],
  "dragonfly": ["front wing pair", "back wing pair", ["each wing", ["veins", "cells", "pterostigma (weighted tip spot)", "nodus (flex point)"]], "direct flight muscles"],
  "beetle": [["elytra", ["hard shell", "hinge"]], ["flight wings", ["fold lines", "veins"]]],
  "fly": ["one wing pair", ["halteres", ["knob", "stalk", "sense cells"]]],
  "swept": [["main box", ["front spar", "rear spar", "ribs", "skin"]], ["front edge", ["slats"]], ["back edge", ["flaps", "ailerons", "spoilers"]], "winglet", "fuel tanks"],
  "straight": [["main box", ["spar", "ribs", "skin"]], ["back edge", ["flaps", "ailerons"]], "struts"],
  "delta": [["structure", ["many spars", "ribs", "skin"]], "elevons (mixed ailerons and elevators)", "fuel tanks"],
  "variable-sweep": ["fixed glove", "pivot", ["moving outer wing", ["spars", "flaps", "slats"]]],
  "rotor": ["hub", ["blades", ["root", "spar", "tip cap"]], "swashplate", "pitch links"],
  "propeller": ["hub", ["blades", ["root", "tip"]], "pitch control"],
  "turbine": ["hub", ["blades", ["root", "spar", "shell", "tip"]], "pitch motor"],
  "hang-glider": ["keel tube", "leading edge tubes", "cross bar", "control frame", "sail"],
  "paraglider": [["canopy", ["top skin", "bottom skin", "cells", "vents"]], ["lines", ["a lines", "b lines", "brake lines"]], "risers", "harness"],
  "sail": ["mast", "boom", ["sail", ["head", "luff", "leech", "foot"]], "sheets"],
  "hydrofoil": ["mast", ["foil", ["front wing", "back wing"]], "fuselage bar"],
  "shuttle": [["wing box", ["spars", "ribs"]], ["heat shield", ["black tiles", "white tiles", "carbon leading edge"]], "elevons"],
  "maple-seed": ["seed", ["wing", ["thick front vein", "thin blade"]]],
  "dandelion": ["seed", "stalk", ["pappus", ["about one hundred bristles"]]],
  "ornithopter": ["body", ["wings", ["spar", "membrane", "twist motor"]], "flapping motor", "tail"],
  "kite": ["spars", "sail", "bridle", "line"]
};

// good and bad points
const tradeoffs = {
  "straight": { pros: ["stable", "cheap to build", "good at low speed"], cons: ["lots of drag near the speed of sound"] },
  "swept": { pros: ["efficient near the speed of sound"], cons: ["worse at low speed", "tips can stall first"] },
  "delta": { pros: ["strong", "room for fuel", "good supersonic"], cons: ["needs high speed to land", "lots of drag in turns"] },
  "forward-swept": { pros: ["very agile", "stalls at the root first"], cons: ["twists under load", "needs stiff costly materials"] },
  "variable-sweep": { pros: ["good at both slow and fast speed"], cons: ["heavy pivots", "complex and costly"] },
  "flying-wing": { pros: ["low drag", "hard to see on radar"], cons: ["hard to keep steady", "little room for passengers"] },
  "high-aspect": { pros: ["very low drag from tips", "long range"], cons: ["bends a lot", "rolls slowly"] },
  "biplane": { pros: ["strong", "lots of lift in a small width"], cons: ["lots of drag from wires and struts"] },
  "winglet": { pros: ["saves fuel"], cons: ["adds weight and stress at the tip"] },
  "bird": { pros: ["can change shape", "self repairing feathers"], cons: ["feathers must be replaced by molting"] },
  "bat": { pros: ["very flexible", "tight turns"], cons: ["costs a lot of energy", "easily torn"] },
  "dragonfly": { pros: ["can hover and fly backward"], cons: ["cannot fold its wings"] },
  "beetle": { pros: ["wings protected by a shell"], cons: ["slow to take off"] },
  "fly": { pros: ["very fast reactions"], cons: ["only one pair of wings"] },
  "rotor": { pros: ["can hover", "lands anywhere"], cons: ["loud", "uses lots of fuel", "slow top speed"] },
  "paraglider": { pros: ["packs into a bag", "cheap"], cons: ["can collapse in rough air"] },
  "hang-glider": { pros: ["faster than a paraglider"], cons: ["bulky to carry"] },
  "hydrofoil": { pros: ["much less drag at speed"], cons: ["breaks the surface if it rises too high"] },
  "sail": { pros: ["free power from wind"], cons: ["cannot sail straight into the wind"] },
  "shuttle": { pros: ["could be flown again"], cons: ["heavy wings for a spacecraft", "fragile tiles"] },
  "solar-sail": { pros: ["needs no fuel"], cons: ["very weak push", "only works near a star"] },
  "ornithopter": { pros: ["quiet and lifelike"], cons: ["hard to build", "low efficiency"] },
  "maple-seed": { pros: ["falls slowly so wind can carry it"], cons: ["only travels so far"] },
  "wingsuit": { pros: ["lets a person glide far"], cons: ["cannot land without a parachute"] },
  "penguin": { pros: ["strong underwater strokes"], cons: ["cannot fly in air"] }
};
