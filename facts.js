// measurements, eras, facts, and tag fixes that sit on top of the other data files

// extra tags to add to entries that were missing them
const tagPatches = {
  "bird": ["bird"],
  "elliptical-bird": ["bird"],
  "high-speed-bird": ["bird"],
  "active-soaring": ["bird", "sea"],
  "passive-soaring": ["bird"],
  "hovering": ["bird"],
  "primaries": ["feather"],
  "secondaries": ["feather"],
  "alula": ["feather"],
  "coverts": ["feather"],
  "pterosaur": ["reptile"],
  "archaeopteryx": ["feather"],
  "microraptor": ["feather", "reptile"],
  "rotor": ["hover"],
  "mars-rotor": ["hover"],
  "sailplane": ["glider"],
  "hang-glider": ["glider"],
  "paraglider": ["glider"]
};

// typical wingspan (or blade length, or width) in meters, as [smallest, largest]
// units in search can be m, cm, mm, or km
const spans = {
  "straight": [9, 12], "tapered": [10, 12], "elliptical": [11, 11.3], "swept": [28, 36],
  "forward-swept": [8, 17], "delta": [8, 26], "variable-sweep": [11, 42], "flying-wing": [16, 52],
  "blended": [6, 6.5], "high-aspect": [18, 31], "biplane": [5, 9], "triplane": [7, 7.2],
  "monoplane": [8, 80], "winglet": [1, 3], "canard": [2, 4],
  "bird": [0.08, 3.5], "bat": [0.15, 1.7], "pterosaur": [0.25, 11], "dragonfly": [0.05, 0.16],
  "butterfly": [0.02, 0.3], "beetle": [0.01, 0.2], "fly": [0.005, 0.03], "bee": [0.01, 0.06],
  "thrips": [0.0003, 0.002], "flying-squirrel": [0.2, 0.5], "sugar-glider": [0.15, 0.25],
  "colugo": [0.6, 0.7], "draco": [0.08, 0.12], "flying-frog": [0.08, 0.1], "flying-snake": [0.05, 0.1],
  "flying-fish": [0.2, 0.4], "penguin": [0.3, 0.9], "manta": [3, 7], "sea-turtle": [0.8, 2.5],
  "sea-angel": [0.01, 0.05], "ostrich": [1.8, 2], "kiwi": [0.04, 0.05],
  "elliptical-bird": [0.2, 1], "high-speed-bird": [0.4, 1.2], "active-soaring": [2, 3.5],
  "passive-soaring": [1.5, 3], "hovering": [0.06, 0.2],
  "rotor": [8, 32], "propeller": [1.5, 6], "turbine": [40, 115], "maple-seed": [0.02, 0.05],
  "hang-glider": [9, 11], "paraglider": [8, 13], "wingsuit": [1.5, 2], "kite": [0.5, 20],
  "sailplane": [15, 30], "race-wing": [0.8, 1], "sail": [3, 40], "keel": [0.5, 4],
  "hydrofoil": [0.6, 3], "ekranoplan": [44, 44], "missile-fin": [0.05, 1], "ornithopter": [1.5, 2],
  "robobee": [0.02, 0.03], "fixed-drone": [1, 4],
  "zanonia": [0.13, 0.15], "dipterocarp": [0.08, 0.15], "pine-seed": [0.01, 0.02],
  "elm-seed": [0.01, 0.02], "dandelion": [0.01, 0.015], "milkweed": [0.04, 0.06],
  "shuttle": [23.8, 23.8], "lifting-body": [4, 7], "waverider": [0.6, 0.6], "mars-rotor": [1.2, 1.2],
  "solar-sail": [14, 32], "solar-plane": [25, 72],
  "archaeopteryx": [0.5, 0.7], "microraptor": [0.8, 1], "yi-qi": [0.5, 0.6],
  "meganeura": [0.65, 0.7], "coelurosauravus": [0.3, 0.4],
  "wing-nut": [0.01, 0.05], "wing-mirror": [0.15, 0.3], "building-wing": [20, 200],
  "chicken-wing": [0.1, 0.2]
};

// when each kind of wing first showed up, in order. no numbers, just stages
const eras = ["deep past", "age of dinosaurs", "age of mammals", "ancient people", "early flight", "jet age", "space age", "now"];
const eraOf = {
  "meganeura": "deep past", "coelurosauravus": "deep past", "dragonfly": "deep past", "beetle": "deep past",
  "fly": "deep past", "thrips": "deep past", "butterfly": "age of dinosaurs", "bee": "age of dinosaurs",
  "pterosaur": "age of dinosaurs", "archaeopteryx": "age of dinosaurs", "microraptor": "age of dinosaurs",
  "yi-qi": "age of dinosaurs", "bird": "age of dinosaurs", "flying-fish": "age of dinosaurs",
  "sea-turtle": "age of dinosaurs", "dipterocarp": "age of dinosaurs", "maple-seed": "age of mammals",
  "bat": "age of mammals", "penguin": "age of mammals", "flying-squirrel": "age of mammals",
  "colugo": "age of mammals", "manta": "age of mammals", "sugar-glider": "age of mammals",
  "dandelion": "age of mammals", "ostrich": "age of mammals", "kiwi": "age of mammals",
  "icarus": "ancient people", "pegasus": "ancient people", "angel": "ancient people", "dragon": "ancient people",
  "winged-sun": "ancient people", "caduceus": "ancient people", "hermes": "ancient people",
  "kite": "ancient people", "sail": "ancient people", "keel": "ancient people", "fairy": "ancient people",
  "biplane": "early flight", "triplane": "early flight", "monoplane": "early flight", "parasol": "early flight",
  "straight": "early flight", "elliptical": "early flight", "gull": "early flight", "inverted-gull": "early flight",
  "propeller": "early flight", "aileron": "early flight", "flap": "early flight", "autogyro": "early flight",
  "rotor": "early flight", "pilot-wings": "early flight",
  "swept": "jet age", "delta": "jet age", "cropped-delta": "jet age", "variable-sweep": "jet age",
  "ogive": "jet age", "slat": "jet age", "spoiler": "jet age", "canard": "jet age", "flying-wing": "jet age",
  "hydrofoil": "jet age", "ekranoplan": "jet age", "race-wing": "jet age", "hang-glider": "jet age",
  "missile-fin": "jet age", "oblique": "jet age", "forward-swept": "jet age",
  "shuttle": "space age", "lifting-body": "space age", "winglet": "space age", "paraglider": "space age",
  "turbine": "space age", "high-aspect": "space age", "annular": "jet age",
  "wingsuit": "now", "blended": "now", "box": "now", "ornithopter": "now", "robobee": "now",
  "fixed-drone": "now", "mars-rotor": "now", "solar-sail": "now", "solar-plane": "now", "waverider": "now"
};

// short facts shown on the detail page
const facts = {
  "bird": ["bird wing bones are hollow but braced inside like a truss.", "a bird's wing is its arm and hand, with some finger bones fused."],
  "bat": ["bats are the only mammals that can truly fly.", "a bat wing has tiny hairs that sense airflow."],
  "pterosaur": ["the biggest pterosaurs had wings as wide as a small plane.", "they likely launched by vaulting on all four limbs."],
  "dragonfly": ["dragonflies catch almost all the prey they chase.", "each of the four wings has its own muscles."],
  "fly": ["the balance knobs (halteres) work like tiny gyroscopes."],
  "bee": ["bees beat their wings over two hundred times per second."],
  "thrips": ["at this size, air feels as thick as syrup, so bristles work as well as a solid wing."],
  "hovering": ["hummingbirds can fly backward and even upside down for a moment."],
  "active-soaring": ["albatrosses can glide for hours without flapping by using wind near the waves."],
  "alula": ["the alula keeps air flowing smoothly over the wing when a bird lands slowly."],
  "penguin": ["penguins 'fly' underwater using the same up and down stroke as flying birds."],
  "maple-seed": ["a spinning maple seed makes a small swirl on its front edge that adds lift."],
  "dandelion": ["the air bubble above a dandelion seed is a kind of ring swirl never seen before it was studied."],
  "zanonia": ["this seed's shape helped inspire early tailless glider designs."],
  "swept": ["sweeping a wing back makes air 'see' a thinner, slower wing."],
  "delta": ["delta wings make swirls on top that keep lift at steep angles."],
  "winglet": ["winglets can save several percent of fuel on long flights."],
  "variable-sweep": ["the pivots are very heavy, which is why few new planes use this."],
  "flying-wing": ["with no tail, flying wings are hard to keep steady without computers."],
  "rotor": ["helicopter blade tips move close to the speed of sound."],
  "mars-rotor": ["mars air is about one hundredth as thick as earth's, so the blades spin very fast."],
  "turbine": ["the biggest turbine blades are longer than a football field is wide."],
  "sail": ["a sail pulls a boat more than it pushes it when sailing across the wind."],
  "race-wing": ["at speed, a race car could make enough downforce to drive upside down in a tunnel."],
  "hydrofoil": ["water is about eight hundred times denser than air, so small foils lift a lot."],
  "shuttle": ["the shuttle landed as the heaviest glider ever flown."],
  "solar-sail": ["sunlight pushes very gently, but it never stops pushing."],
  "meganeura": ["these giant insects likely lived because the air held more oxygen then."],
  "microraptor": ["its feathers were black and shiny, like a crow's."],
  "wing-nut": ["the 'wings' just give your fingers something to push on."],
  "icarus": ["the story warns about going too far, not just about flying."]
};
