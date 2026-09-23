// more groups and entries, plus masses, sayings, words for wing in other languages, and their sources.
// loads after sources.js so it can add to sources and cites directly

wings.push(
  {
    group: "more animal wings",
    subgroups: [
      {
        name: "more insects",
        entries: [
          { id: "alate", name: "termite and ant alate wing", note: "wings grown only for one mating flight, then snapped off.", examples: ["termite swarmers", "flying ants"], flight: "flapping", material: "chitin", tags: ["true flight", "living", "insect", "shed"] },
          { id: "mayfly", name: "mayfly wing", note: "big triangle front wings held upright at rest. adults live only a short time.", examples: ["common mayfly"], flight: "flapping", material: "chitin", tags: ["true flight", "living", "insect"] },
          { id: "moth", name: "moth wing", note: "scaled like a butterfly, often with fur and a hook linking front and back wings.", examples: ["luna moth", "hawk moth"], flight: "flapping", material: "chitin and scales", tags: ["true flight", "living", "insect"] },
          { id: "damselfly", name: "damselfly wing", note: "four matching thin wings, folded along the back at rest.", examples: ["banded demoiselle"], flight: "flapping", material: "chitin", tags: ["true flight", "living", "insect", "agile"] },
          { id: "fairyfly", name: "fairyfly wing", note: "a stick with a fringe of long hairs. one of the smallest flying animals.", examples: ["kikiki huna"], flight: "flapping", material: "chitin", tags: ["true flight", "living", "insect", "tiny"] },
          { id: "locust", name: "locust wing", note: "fan-folded back wings that carry swarms across whole regions.", examples: ["desert locust"], flight: "flapping", material: "chitin", tags: ["true flight", "living", "insect", "swarm"] },
          { id: "earwig", name: "earwig wing", note: "a big back wing folded like origami under a tiny shell.", examples: ["common earwig"], flight: "flapping", material: "chitin", tags: ["true flight", "living", "insect", "folding", "armored"] },
          { id: "cicada", name: "cicada wing", note: "clear wings with a surface of tiny spikes that kill bacteria.", examples: ["periodical cicada"], flight: "flapping", material: "chitin", tags: ["true flight", "living", "insect"] },
          { id: "lacewing", name: "lacewing wing", note: "a net of fine veins held like a roof over the body.", examples: ["green lacewing"], flight: "flapping", material: "chitin", tags: ["true flight", "living", "insect"] },
          { id: "mosquito", name: "mosquito wing", note: "short wings beat so fast they hum. flies with rotation tricks, not long strokes.", examples: ["culex", "aedes"], flight: "flapping", material: "chitin", tags: ["true flight", "living", "insect", "fast"] }
        ]
      },
      {
        name: "notable birds",
        entries: [
          { id: "swift", name: "swift wing", note: "narrow sickle wings. some swifts stay aloft for months.", examples: ["common swift"], flight: "flapping", material: "feathers and bone", tags: ["true flight", "living", "bird", "fast"] },
          { id: "owl", name: "owl wing", note: "soft comb edges and velvet feathers make flight nearly silent.", examples: ["barn owl"], flight: "flapping", material: "feathers and bone", tags: ["true flight", "living", "bird", "silent"] },
          { id: "kestrel", name: "kestrel wing", note: "pointed wings used to hang still in the wind while hunting.", examples: ["common kestrel", "american kestrel"], flight: "flapping", material: "feathers and bone", tags: ["true flight", "living", "bird", "hover"] },
          { id: "frigatebird", name: "frigatebird wing", note: "the most wing area for its weight of any bird. rides rising air for weeks.", examples: ["magnificent frigatebird"], flight: "gliding", material: "feathers and bone", tags: ["true flight", "living", "bird", "sea", "efficient"] },
          { id: "condor", name: "condor wing", note: "wide slotted wings for soaring on mountain updrafts, rarely flapping.", examples: ["andean condor"], flight: "gliding", material: "feathers and bone", tags: ["true flight", "living", "bird"] },
          { id: "hoatzin", name: "hoatzin chick wing", note: "chicks have two claws on each wing to climb branches.", examples: ["hoatzin"], flight: "flapping", material: "feathers and bone", tags: ["true flight", "living", "bird", "odd"] },
          { id: "steamer-duck", name: "steamer duck wing", note: "short wings used to paddle across water like a paddle steamer.", examples: ["falkland steamer duck"], flight: "swimming", material: "feathers and bone", tags: ["flightless", "living", "bird", "water"] },
          { id: "kakapo", name: "kakapo wing", note: "a heavy parrot that cannot fly but uses its wings to parachute and balance.", examples: ["kakapo"], flight: "gliding", material: "feathers and bone", tags: ["flightless", "living", "bird", "rare"] }
        ]
      },
      {
        name: "odd gliders and swimmers",
        entries: [
          { id: "flying-squid", name: "flying squid fins", note: "squid jet out of the water and spread fins and arms to glide.", examples: ["japanese flying squid"], flight: "gliding", material: "soft tissue", tags: ["glide", "living", "water", "odd"] },
          { id: "gurnard", name: "flying gurnard fins", note: "huge fan fins that likely scare off predators more than they fly.", examples: ["flying gurnard"], flight: "swimming", material: "fin rays", tags: ["living", "fish", "water"] },
          { id: "hatchetfish", name: "hatchetfish fins", note: "a small fish that leaps and buzzes its fins over the water.", examples: ["freshwater hatchetfish"], flight: "gliding", material: "fin rays", tags: ["glide", "living", "fish"] },
          { id: "gliding-ant", name: "gliding ant body", note: "falls backward and steers its flat body to land on the tree trunk again.", examples: ["cephalotes atratus"], flight: "gliding", material: "chitin", tags: ["glide", "living", "insect", "odd"] },
          { id: "gecko", name: "flying gecko flaps", note: "skin flaps along the body, legs, and tail work as a parachute.", examples: ["kuhl's flying gecko"], flight: "gliding", material: "skin", tags: ["glide", "living", "reptile"] }
        ]
      },
      {
        name: "lost birds and giants",
        entries: [
          { id: "dodo", name: "dodo wing", note: "stubby wings far too small to lift its body.", examples: ["dodo"], flight: "none", material: "feathers and bone", tags: ["flightless", "extinct", "bird"] },
          { id: "great-auk", name: "great auk wing", note: "small wings used only to fly underwater, like a penguin of the north.", examples: ["great auk"], flight: "swimming", material: "feathers and bone", tags: ["flightless", "extinct", "bird", "water"] },
          { id: "quetzalcoatlus", name: "quetzalcoatlus wing", note: "one of the largest flying animals ever, with a giraffe-tall body.", examples: ["quetzalcoatlus northropi"], flight: "flapping", material: "skin and bone", tags: ["true flight", "extinct", "reptile", "giant"] },
          { id: "argentavis", name: "argentavis wing", note: "a giant soaring bird with one of the widest bird wingspans known.", examples: ["argentavis magnificens"], flight: "gliding", material: "feathers and bone", tags: ["true flight", "extinct", "bird", "giant"] },
          { id: "pelagornis", name: "bony-toothed bird wing", note: "a huge sea bird with long wings, like an albatross grown past its limits.", examples: ["pelagornis sandersi"], flight: "gliding", material: "feathers and bone", tags: ["true flight", "extinct", "bird", "sea", "giant"] },
          { id: "sharovipteryx", name: "leg-winged reptile", note: "a small reptile with its main gliding skin between its back legs.", examples: ["sharovipteryx"], flight: "gliding", material: "skin and bone", tags: ["glide", "extinct", "reptile", "odd"] },
          { id: "kuehneosaurus", name: "rib-winged reptile", note: "an early lizard-like glider with long ribs, much like draco today.", examples: ["kuehneosaurus"], flight: "gliding", material: "skin and rib", tags: ["glide", "extinct", "reptile"] },
          { id: "rhamphorhynchus", name: "long-tailed pterosaur wing", note: "narrow wings and a long tail ending in a diamond vane.", examples: ["rhamphorhynchus"], flight: "flapping", material: "skin and bone", tags: ["true flight", "extinct", "reptile"] }
        ]
      }
    ]
  },
  {
    group: "more machine wings",
    subgroups: [
      {
        name: "odd wing layouts",
        entries: [
          { id: "rogallo", name: "rogallo wing", note: "a flexible fabric wing held in a delta by a few tubes. led to hang gliders.", examples: ["early hang gliders", "parawing tests"], flight: "gliding", material: "fabric and aluminum", tags: ["flexible", "glider", "classic"] },
          { id: "channel-wing", name: "channel wing", note: "half-tube wings with a propeller blowing air through each channel.", examples: ["custer channel wing"], flight: "powered", material: "aluminum", tags: ["experimental", "rare", "low speed"] },
          { id: "joined-wing", name: "joined wing", note: "a front and back wing that meet in a diamond seen from above.", examples: ["test drones"], flight: "powered", material: "composite", tags: ["experimental", "rare"] },
          { id: "sesquiplane", name: "sesquiplane", note: "a biplane whose lower wing is much smaller, one and a half wings.", examples: ["nieuport 17"], flight: "powered", material: "wood and fabric", tags: ["classic", "fighter"] },
          { id: "wing-warping", name: "wing warping", note: "twisting the whole wing to roll, before ailerons were common.", examples: ["wright flyer"], flight: "powered", material: "wood and fabric", tags: ["classic", "control"] },
          { id: "tiltrotor", name: "tiltrotor", note: "rotors on the wing tips tilt up to hover and forward to fly like a plane.", examples: ["v-22 osprey"], flight: "powered", material: "composite", tags: ["hover", "military", "complex"] },
          { id: "tiltwing", name: "tiltwing", note: "the whole wing tilts with its engines to go from hover to cruise.", examples: ["canadair cl-84"], flight: "powered", material: "aluminum", tags: ["hover", "experimental", "rare"] },
          { id: "folding-wing", name: "folding wing", note: "wings that fold up to fit on ships or at airport gates.", examples: ["carrier planes", "boeing 777x tips"], flight: "powered", material: "aluminum", tags: ["folding", "military", "airliner"] }
        ]
      },
      {
        name: "more wing add-ons",
        entries: [
          { id: "blown-flap", name: "blown flap", note: "engine air is blown over the flaps for extra lift at low speed.", examples: ["short takeoff planes"], flight: "powered", material: "aluminum", tags: ["control", "landing", "low speed"] },
          { id: "vortex-generator", name: "vortex generator", note: "tiny fins on the wing that stir air to keep it attached.", examples: ["many airliners and small planes"], flight: "powered", material: "aluminum", tags: ["control", "tiny"] },
          { id: "wing-fence", name: "wing fence", note: "a flat plate across the wing that stops air sliding out toward the tip.", examples: ["mig-15"], flight: "powered", material: "aluminum", tags: ["control", "jet"] },
          { id: "lex", name: "leading-edge extension", note: "a sharp strip along the wing root that makes a strong swirl for high angles.", examples: ["f/a-18 hornet"], flight: "powered", material: "aluminum", tags: ["fighter", "agile"] },
          { id: "krueger-flap", name: "krueger flap", note: "a panel that swings out from under the front edge for landing.", examples: ["boeing 747"], flight: "powered", material: "aluminum", tags: ["control", "landing", "airliner"] },
          { id: "supercritical", name: "supercritical wing", note: "a flat-topped wing section that pushes shock waves back near the speed of sound.", examples: ["most modern airliners"], flight: "powered", material: "aluminum", tags: ["high speed", "airliner", "efficient"] }
        ]
      },
      {
        name: "wings for water, wind, and play",
        entries: [
          { id: "parafoil", name: "parafoil", note: "a ram-air fabric wing with cells that fill up like a pillow.", examples: ["skydiving canopies", "cargo drops"], flight: "gliding", material: "fabric", tags: ["flexible", "glider"] },
          { id: "wingsail", name: "wingsail", note: "a stiff sail shaped like an upright wing.", examples: ["racing catamarans"], flight: "none", material: "composite", tags: ["sea", "sport", "efficient"] },
          { id: "kitesurf", name: "kitesurf kite", note: "an inflatable arc wing that pulls a rider on a board.", examples: ["leading edge inflatable kites"], flight: "gliding", material: "fabric", tags: ["tethered", "sport", "sea"] },
          { id: "underwater-glider", name: "underwater glider", note: "a robot with wings that sinks and rises by changing buoyancy, gliding forward each time.", examples: ["ocean survey gliders"], flight: "swimming", material: "composite", tags: ["robot", "water", "efficient"] },
          { id: "flying-disc", name: "flying disc", note: "a spinning round wing. spin keeps it steady, its shape makes lift.", examples: ["frisbee-style discs", "disc golf drivers"], flight: "gliding", material: "polymer film", tags: ["toy", "sport", "spin"] },
          { id: "boomerang", name: "boomerang", note: "two or more small wings joined at an angle. spin tips its path into a loop.", examples: ["returning boomerang"], flight: "gliding", material: "wood or composite", tags: ["toy", "sport", "spin", "classic"] },
          { id: "paper-plane", name: "paper plane", note: "a folded sheet of paper that glides. often a dart or a wide glider.", examples: ["dart", "glider fold"], flight: "gliding", material: "plant tissue", tags: ["toy", "folding", "glider"] },
          { id: "cyclogyro", name: "cyclogyro", note: "blades spin around a sideways axis like a paddle wheel, each one changing pitch.", examples: ["small test drones"], flight: "powered", material: "composite", tags: ["experimental", "rare", "hover", "spin"] }
        ]
      },
      {
        name: "more space wings",
        entries: [
          { id: "buran", name: "buran wing", note: "a double delta wing on a reusable orbiter that flew once without crew.", examples: ["buran"], flight: "gliding", material: "aluminum", tags: ["space", "reentry"] },
          { id: "magnetic-sail", name: "magnetic sail", note: "a loop of current makes a field that catches the solar wind, a wing with no surface.", examples: ["design studies"], flight: "none", material: "metal", tags: ["space", "experimental", "odd"] },
          { id: "electric-sail", name: "electric sail", note: "long charged wires push against the solar wind.", examples: ["design studies"], flight: "none", material: "metal", tags: ["space", "experimental", "odd"] }
        ]
      }
    ]
  },
  {
    group: "more stories, symbols, and names",
    subgroups: [
      {
        name: "winged beings",
        entries: [
          { id: "griffin", name: "griffin wing", note: "eagle wings on a lion's body, a guard of treasure.", examples: ["griffin"], flight: "flapping", material: "feathers and bone", tags: ["myth", "hybrid"] },
          { id: "harpy", name: "harpy wing", note: "a bird-bodied spirit with a human face, linked to storm winds.", examples: ["harpies"], flight: "flapping", material: "feathers and bone", tags: ["myth", "hybrid"] },
          { id: "garuda", name: "garuda wing", note: "a great bird-like being, king of birds in several traditions.", examples: ["garuda"], flight: "flapping", material: "feathers and bone", tags: ["myth", "bird"] },
          { id: "thunderbird", name: "thunderbird wing", note: "a huge bird whose wingbeats make thunder in many stories.", examples: ["thunderbird"], flight: "flapping", material: "feathers and bone", tags: ["myth", "bird", "giant"] },
          { id: "phoenix", name: "phoenix wing", note: "a fire bird that is reborn from its own ashes.", examples: ["phoenix"], flight: "flapping", material: "feathers", tags: ["myth", "bird", "symbol"] },
          { id: "nike", name: "winged victory", note: "a goddess of victory, often shown with wide wings.", examples: ["winged victory statues"], flight: "flapping", material: "stone", tags: ["myth", "symbol"] },
          { id: "cupid", name: "cupid wing", note: "small wings on a child-like god of love.", examples: ["cupid", "eros"], flight: "flapping", material: "feathers", tags: ["myth", "symbol"] },
          { id: "tengu", name: "tengu wing", note: "a bird-like mountain spirit from folk tales.", examples: ["tengu"], flight: "flapping", material: "feathers", tags: ["myth", "hybrid"] },
          { id: "wyvern", name: "wyvern wing", note: "a two-legged dragon whose wings take the place of front legs.", examples: ["heraldic wyvern"], flight: "flapping", material: "skin and bone", tags: ["myth", "reptile", "symbol"] },
          { id: "lamassu", name: "lamassu wing", note: "a winged bull or lion with a human head, carved at gates.", examples: ["gate statues"], flight: "none", material: "stone", tags: ["myth", "symbol", "hybrid"] },
          { id: "seraph", name: "seraph wings", note: "a being with six wings: two to fly, two to cover the face, two to cover the feet.", examples: ["seraphim"], flight: "flapping", material: "feathers", tags: ["myth", "symbol", "many wings"] },
          { id: "cherub", name: "cherub wings", note: "older accounts give them four wings and four faces, later art made them baby-like.", examples: ["cherubim"], flight: "flapping", material: "feathers", tags: ["myth", "symbol", "many wings"] },
          { id: "talaria", name: "winged sandals", note: "sandals with small wings that let their wearer fly.", examples: ["talaria"], flight: "flapping", material: "feathers", tags: ["myth", "object"] }
        ]
      },
      {
        name: "more borrowed names",
        entries: [
          { id: "snow-angel", name: "snow angel", note: "wing shapes made by sweeping arms up and down while lying in snow.", examples: ["snow angel"], flight: "none", material: "soft tissue", tags: ["borrowed name", "toy", "human"] },
          { id: "wingman", name: "wingman", note: "a pilot flying beside the lead plane, now also a friend who backs you up.", examples: ["formation flying"], flight: "powered", material: "aluminum", tags: ["borrowed name", "military", "human"] },
          { id: "wing-dam", name: "wing dam", note: "a wall that sticks partway into a river to steer the current.", examples: ["river channels"], flight: "none", material: "stone", tags: ["borrowed name", "place", "water"] },
          { id: "wingwall", name: "wingwall", note: "a side wall that fans out from a bridge or culvert to hold back soil.", examples: ["bridge ends"], flight: "none", material: "stone", tags: ["borrowed name", "place"] },
          { id: "wingtip-shoe", name: "wingtip shoe", note: "a shoe with a toe cap shaped like spread wings.", examples: ["brogues"], flight: "none", material: "skin", tags: ["borrowed name", "object", "clothing"] },
          { id: "wing-collar", name: "wing collar", note: "a stiff shirt collar with folded down points like small wings.", examples: ["formal shirts"], flight: "none", material: "fabric", tags: ["borrowed name", "object", "clothing"] },
          { id: "aviator-badge", name: "pilot wings badge", note: "a badge of spread wings earned by trained pilots.", examples: ["military pilot badges"], flight: "none", material: "metal", tags: ["borrowed name", "symbol", "object"] },
          { id: "wing-commander", name: "wing commander", note: "an air force rank named for leading a wing.", examples: ["air force officers"], flight: "powered", material: "aluminum", tags: ["borrowed name", "military", "human"] }
        ]
      },
      {
        name: "more winged plants",
        entries: [
          { id: "winged-bean", name: "winged bean", note: "a pod with four frilly wings running along its length.", examples: ["winged bean"], flight: "none", material: "plant tissue", tags: ["plant", "food", "borrowed name"] },
          { id: "ash-seed", name: "ash seed", note: "a long single-winged seed that spins and flutters down.", examples: ["common ash"], flight: "gliding", material: "plant tissue", tags: ["plant", "seed", "spin"] },
          { id: "sycamore-seed", name: "sycamore seed pair", note: "two joined winged seeds that split and spin as they fall.", examples: ["sycamore maple"], flight: "gliding", material: "plant tissue", tags: ["plant", "seed", "spin"] },
          { id: "linden-bract", name: "linden bract", note: "a leafy strap on the fruit stalk that turns the whole cluster into a spinner.", examples: ["lime tree", "basswood"], flight: "gliding", material: "plant tissue", tags: ["plant", "seed", "spin"] },
          { id: "winged-spindle", name: "winged spindle stem", note: "corky wings along the twigs. they do not fly, they just stick out.", examples: ["burning bush"], flight: "none", material: "plant tissue", tags: ["plant", "borrowed name"] },
          { id: "tipu-seed", name: "tipu seed", note: "a big single-winged seed that autorotates like a maple.", examples: ["tipu tree"], flight: "gliding", material: "plant tissue", tags: ["plant", "seed", "spin"] }
        ]
      }
    ]
  }
);

// ---------- extra table rows for the new entries ----------

Object.assign(spans, {
  "alate": [0.01, 0.07], "mayfly": [0.01, 0.06], "moth": [0.004, 0.3], "damselfly": [0.02, 0.19],
  "fairyfly": [0.00015, 0.0008], "locust": [0.08, 0.13], "earwig": [0.01, 0.03], "cicada": [0.05, 0.18],
  "lacewing": [0.01, 0.07], "mosquito": [0.006, 0.012],
  "swift": [0.38, 0.45], "owl": [0.3, 2], "kestrel": [0.55, 0.8], "frigatebird": [2, 2.4],
  "condor": [2.7, 3.2], "hoatzin": [0.6, 0.7], "steamer-duck": [0.7, 0.9], "kakapo": [0.8, 0.9],
  "flying-squid": [0.1, 0.3], "gurnard": [0.2, 0.4], "hatchetfish": [0.03, 0.06], "gliding-ant": [0.005, 0.01],
  "gecko": [0.1, 0.2], "dodo": [0.3, 0.5], "great-auk": [0.4, 0.6], "quetzalcoatlus": [10, 11],
  "argentavis": [5, 6.5], "pelagornis": [6, 7.4], "sharovipteryx": [0.15, 0.25], "kuehneosaurus": [0.2, 0.3],
  "rhamphorhynchus": [0.4, 1.8],
  "rogallo": [5, 10], "channel-wing": [8, 12], "joined-wing": [2, 10], "sesquiplane": [8, 8.2],
  "wing-warping": [12, 12.3], "tiltrotor": [14, 26], "tiltwing": [10, 11], "folding-wing": [11, 72],
  "blown-flap": [20, 40], "vortex-generator": [0.01, 0.05], "wing-fence": [0.1, 0.5], "lex": [2, 4],
  "krueger-flap": [1, 3], "supercritical": [30, 65],
  "parafoil": [5, 30], "wingsail": [5, 40], "kitesurf": [5, 15], "underwater-glider": [1, 1.2],
  "flying-disc": [0.2, 0.28], "boomerang": [0.3, 0.6], "paper-plane": [0.1, 0.3], "cyclogyro": [0.2, 1],
  "buran": [24, 24], "magnetic-sail": [1000, 100000], "electric-sail": [10000, 40000],
  "snow-angel": [1.2, 2], "wing-dam": [5, 100], "wingwall": [2, 10], "wingtip-shoe": [0.05, 0.1],
  "wing-collar": [0.03, 0.05], "aviator-badge": [0.05, 0.1],
  "winged-bean": [0.01, 0.03], "ash-seed": [0.025, 0.045], "sycamore-seed": [0.06, 0.1],
  "linden-bract": [0.06, 0.1], "winged-spindle": [0.002, 0.01], "tipu-seed": [0.05, 0.07]
});

Object.assign(eraOf, {
  "mayfly": "deep past", "damselfly": "deep past", "cicada": "age of dinosaurs", "moth": "age of dinosaurs",
  "alate": "age of dinosaurs", "lacewing": "deep past", "earwig": "age of dinosaurs", "locust": "age of dinosaurs",
  "mosquito": "age of dinosaurs", "fairyfly": "age of dinosaurs",
  "sharovipteryx": "age of dinosaurs", "kuehneosaurus": "age of dinosaurs", "rhamphorhynchus": "age of dinosaurs",
  "quetzalcoatlus": "age of dinosaurs", "argentavis": "age of mammals", "pelagornis": "age of mammals",
  "dodo": "age of mammals", "great-auk": "age of mammals", "owl": "age of mammals", "swift": "age of mammals",
  "griffin": "ancient people", "harpy": "ancient people", "garuda": "ancient people", "phoenix": "ancient people",
  "nike": "ancient people", "cupid": "ancient people", "lamassu": "ancient people", "seraph": "ancient people",
  "cherub": "ancient people", "talaria": "ancient people", "boomerang": "ancient people", "thunderbird": "ancient people",
  "wing-warping": "early flight", "sesquiplane": "early flight", "cyclogyro": "early flight", "channel-wing": "early flight",
  "wing-fence": "jet age", "krueger-flap": "jet age", "blown-flap": "jet age", "vortex-generator": "jet age",
  "rogallo": "jet age", "tiltwing": "jet age", "lex": "jet age", "flying-disc": "jet age",
  "supercritical": "space age", "tiltrotor": "space age", "parafoil": "space age", "buran": "space age",
  "folding-wing": "early flight", "kitesurf": "now", "wingsail": "now", "underwater-glider": "now",
  "joined-wing": "now", "magnetic-sail": "now", "electric-sail": "now", "aviator-badge": "early flight",
  "wingman": "early flight", "wing-commander": "early flight"
});

Object.assign(fluidOf, {
  "steamer-duck": "water", "great-auk": "water", "gurnard": "water", "underwater-glider": "water"
});

Object.assign(traitOverrides, {
  "fairyfly": { size: "tiny", speed: "slow" },
  "mosquito": { size: "tiny" },
  "quetzalcoatlus": { size: "huge", aspect: "high" },
  "argentavis": { size: "huge", aspect: "high" },
  "pelagornis": { size: "huge", aspect: "very high" },
  "frigatebird": { size: "large", aspect: "very high" },
  "condor": { size: "large", aspect: "medium", speed: "medium" },
  "swift": { size: "small", speed: "fast", aspect: "high" },
  "kestrel": { size: "small" },
  "magnetic-sail": { size: "huge" },
  "electric-sail": { size: "huge", aspect: "very high" },
  "flying-disc": { size: "small", aspect: "low" },
  "boomerang": { size: "small" },
  "paper-plane": { size: "small", speed: "slow" },
  "buran": { size: "huge", speed: "very fast", aspect: "low" },
  "vortex-generator": { size: "tiny" },
  "tiltrotor": { size: "large", aspect: "medium" },
  "underwater-glider": { size: "medium", speed: "slow" },
  "kitesurf": { size: "medium" }
});

Object.assign(facts, {
  "alate": ["termites drop their wings along a weak seam once they find a mate."],
  "fairyfly": ["some fairyflies are smaller than a single-celled amoeba."],
  "earwig": ["an earwig back wing folds to about one tenth of its open area."],
  "cicada": ["the spikes on the wing surface tear apart bacteria that land on them."],
  "mosquito": ["mosquito wing strokes are very short, so they lean on unusual flow tricks for lift."],
  "swift": ["common swifts can stay airborne for about ten months at a time."],
  "owl": ["the front edge of an owl feather has a soft comb that breaks up noisy swirls."],
  "frigatebird": ["frigatebirds can sleep in flight, one half of the brain at a time."],
  "condor": ["one condor was tracked flying a long way while flapping for only about one percent of the time."],
  "quetzalcoatlus": ["it probably stood as tall as a giraffe on the ground."],
  "seraph": ["six wings are more than any real flying animal has."],
  "boomerang": ["a returning boomerang turns because one wing moves faster through the air than the other."],
  "flying-disc": ["without spin, a flying disc flips over, because lift sits in front of its center."],
  "magnetic-sail": ["it pushes on charged particles in the solar wind, not on air."],
  "tiltrotor": ["its rotors are a compromise, too small to be a good helicopter and too big to be a good propeller."],
  "vortex-generator": ["they add a little drag but save a lot of lift near a stall."]
});

Object.assign(tagPatches, {
  "owl": ["feather"], "swift": ["feather"], "kestrel": ["feather"], "rogallo": ["glider"],
  "parafoil": ["glider"], "kitesurf": ["kite"]
});

environments.sky.push("rogallo", "channel-wing", "joined-wing", "sesquiplane", "wing-warping", "tiltrotor", "tiltwing", "folding-wing", "blown-flap", "vortex-generator", "wing-fence", "lex", "krueger-flap", "supercritical", "parafoil", "cyclogyro", "swift", "frigatebird", "condor");
environments.forest.push("owl", "hoatzin", "kakapo", "gliding-ant", "gecko", "lacewing", "cicada", "alate", "ash-seed", "sycamore-seed", "linden-bract", "winged-spindle", "tipu-seed", "tengu");
environments.sea.push("frigatebird", "steamer-duck", "great-auk", "flying-squid", "gurnard", "wingsail", "kitesurf", "underwater-glider", "pelagornis");
environments.grassland.push("kestrel", "locust", "moth", "flying-disc", "boomerang");
environments.wetland.push("mayfly", "damselfly", "mosquito", "hatchetfish", "wing-dam");
environments.space.push("buran", "magnetic-sail", "electric-sail");
environments.city.push("snow-angel", "wingtip-shoe", "wing-collar", "paper-plane", "wingwall", "earwig", "fairyfly");
environments.story.push("griffin", "harpy", "garuda", "thunderbird", "phoenix", "nike", "cupid", "wyvern", "lamassu", "seraph", "cherub", "talaria");

Object.assign(parts, {
  "owl": ["arm bones", ["feathers", ["comb front edge", "velvet top", "soft fringe back edge"]]],
  "earwig": [["short shell (tegmina)"], ["back wing", ["fan rays", "central ring joint", "fold lines"]]],
  "tiltrotor": ["wing", ["nacelles", ["engine", "tilt gear"]], ["rotors", ["hub", "three blades"]], "cross shaft"],
  "boomerang": [["arms", ["leading edge", "trailing edge", "airfoil top"]], "elbow"],
  "flying-disc": ["flat top", "curved rim", "lip"],
  "parafoil": [["canopy", ["cells", "cross vents", "open front"]], "lines", "brake toggles"],
  "seraph": ["two wings for flying", "two wings for the face", "two wings for the feet"],
  "underwater-glider": ["hull", "wings", "tail fin", "buoyancy pump", "battery that shifts to steer"],
  "cyclogyro": ["drum", ["blades", ["pitch links"]], "eccentric hub"]
});

Object.assign(tradeoffs, {
  "owl": { pros: ["almost silent"], cons: ["feathers soak up rain and are not very waterproof"] },
  "tiltrotor": { pros: ["hovers and cruises fast"], cons: ["very complex", "worse at each job than a dedicated design"] },
  "folding-wing": { pros: ["fits in tight spaces"], cons: ["heavy hinges", "one more thing to fail"] },
  "rogallo": { pros: ["very simple", "packs small"], cons: ["low glide ratio", "can tuck in steep dives"] },
  "parafoil": { pros: ["no rigid parts"], cons: ["needs airflow to keep its shape"] },
  "flying-disc": { pros: ["steady and easy to throw"], cons: ["drops fast once spin slows"] },
  "underwater-glider": { pros: ["runs for months on little power"], cons: ["very slow"] },
  "earwig": { pros: ["huge wing packs into a tiny space"], cons: ["earwigs rarely fly"] },
  "swift": { pros: ["can stay aloft for months"], cons: ["tiny feet, hard to take off from flat ground"] }
});

links.push(
  ["rogallo", "led to", "hang-glider"],
  ["parafoil", "led to", "paraglider"],
  ["owl", "inspired", "turbine"],
  ["earwig", "inspired", "solar-sail"],
  ["kestrel", "same idea", "hovering"],
  ["frigatebird", "same idea", "passive-soaring"],
  ["condor", "same idea", "sailplane"],
  ["swift", "same idea", "high-speed-bird"],
  ["great-auk", "evolved like", "penguin"],
  ["steamer-duck", "same idea", "penguin"],
  ["kuehneosaurus", "evolved like", "draco"],
  ["quetzalcoatlus", "type of", "pterosaur"],
  ["rhamphorhynchus", "type of", "pterosaur"],
  ["argentavis", "same idea", "condor"],
  ["pelagornis", "same idea", "active-soaring"],
  ["tiltrotor", "same idea", "rotor"],
  ["tiltwing", "same idea", "tiltrotor"],
  ["wing-warping", "led to", "aileron"],
  ["sesquiplane", "type of", "biplane"],
  ["blown-flap", "type of", "flap"],
  ["krueger-flap", "same idea", "slat"],
  ["kitesurf", "type of", "kite"],
  ["wingsail", "same idea", "sail"],
  ["underwater-glider", "same idea", "sailplane"],
  ["boomerang", "same idea", "rotor"],
  ["ash-seed", "same idea", "maple-seed"],
  ["sycamore-seed", "type of", "maple-seed"],
  ["tipu-seed", "same idea", "maple-seed"],
  ["linden-bract", "same idea", "maple-seed"],
  ["buran", "same idea", "shuttle"],
  ["magnetic-sail", "same idea", "solar-sail"],
  ["electric-sail", "same idea", "solar-sail"],
  ["griffin", "same idea", "pegasus"],
  ["wyvern", "type of", "dragon"],
  ["seraph", "same idea", "angel"],
  ["cherub", "same idea", "angel"],
  ["talaria", "belongs to", "hermes"],
  ["wingman", "same idea", "air-force-wing"],
  ["wing-commander", "belongs to", "air-force-wing"],
  ["aviator-badge", "same idea", "pilot-wings"],
  ["fairyfly", "same idea", "thrips"],
  ["damselfly", "same idea", "dragonfly"],
  ["moth", "same idea", "butterfly"],
  ["hatchetfish", "same idea", "flying-fish"],
  ["gecko", "same idea", "draco"]
);

Object.assign(glossary, {
  "autorotates": "spins by itself as it falls, which slows the fall.",
  "buoyancy": "the upward push from a fluid on anything in it.",
  "solar wind": "a stream of charged particles blowing out from the sun."
});

synonyms.push(
  ["myth", "mythical", "legendary"],
  ["toy", "game", "play"],
  ["silent", "quiet", "stealth"],
  ["hybrid", "mixed", "chimera"]
);
tagParents["made by people"].push("toy");
tagParents["names"].push("clothing", "human");
tagParents["not real"].push("hybrid");

// ---------- sources for the new entries ----------

Object.assign(sources, {
  "alate": wiki("alate"), "mayfly": wiki("mayfly"), "moth": wiki("moth"), "damselfly": wiki("damselfly"),
  "mymaridae": wiki("mymaridae"), "locust": wiki("locust"), "earwig": wiki("earwig"), "cicada": wiki("cicada"),
  "neuroptera": wiki("neuroptera"), "mosquito": wiki("mosquito"),
  "swift": wiki("swift (bird)"), "owl": wiki("owl"), "kestrel": wiki("kestrel"), "frigatebird": wiki("frigatebird"),
  "andean-condor": wiki("andean condor"), "hoatzin": wiki("hoatzin"), "steamer-duck": wiki("steamer duck"),
  "kakapo": wiki("kakapo"), "dodo": wiki("dodo"), "great-auk": wiki("great auk"),
  "flying-squid": wiki("flying squid"), "flying-gurnard": wiki("flying gurnard"),
  "hatchetfish": wiki("freshwater hatchetfish"), "gliding-ant": wiki("gliding ant"), "ptychozoon": wiki("ptychozoon"),
  "quetzalcoatlus": wiki("quetzalcoatlus"), "argentavis": wiki("argentavis"), "pelagornis": wiki("pelagornis"),
  "sharovipteryx": wiki("sharovipteryx"), "kuehneosaurus": wiki("kuehneosaurus"), "rhamphorhynchus": wiki("rhamphorhynchus"),
  "rogallo-wing": wiki("rogallo wing"), "channel-wing": wiki("channel wing"), "joined-wing": wiki("joined wing"),
  "sesquiplane": wiki("sesquiplane"), "wing-warping": wiki("wing warping"), "tiltrotor": wiki("tiltrotor"),
  "tiltwing": wiki("tiltwing"), "blown-flap": wiki("blown flap"), "vortex-generator": wiki("vortex generator"),
  "wing-fence": wiki("wing fence"), "lex": wiki("leading-edge extension"), "krueger-flap": wiki("krueger flap"),
  "supercritical": wiki("supercritical airfoil"), "folding-wing": wiki("folding wing"),
  "parafoil": wiki("parafoil"), "wingsail": wiki("wingsail"), "kitesurfing": wiki("kitesurfing"),
  "underwater-glider": wiki("underwater glider"), "flying-disc": wiki("flying disc"), "boomerang": wiki("boomerang"),
  "paper-plane": wiki("paper plane"), "cyclogyro": wiki("cyclogyro"),
  "buran": wiki("buran (spacecraft)"), "magnetic-sail": wiki("magnetic sail"), "electric-sail": wiki("electric sail"),
  "griffin": wiki("griffin"), "harpy": wiki("harpy"), "garuda": wiki("garuda"), "thunderbird": wiki("thunderbird (mythology)"),
  "phoenix": wiki("phoenix (mythology)"), "nike": wiki("nike (mythology)"), "cupid": wiki("cupid"), "tengu": wiki("tengu"),
  "wyvern": wiki("wyvern"), "lamassu": wiki("lamassu"), "seraph": wiki("seraph"), "cherub": wiki("cherub"),
  "talaria": wiki("talaria"), "angel-wings": wiki("angel wings"),
  "snow-angel": wiki("snow angel"), "wingman": wiki("wingman"), "wing-dam": wiki("wing dam"), "wingwall": wiki("wingwall"),
  "brogue": wiki("brogue shoe"), "wing-collar": wiki("wing collar"), "aviator-badge": wiki("aviator badge"),
  "wing-commander": wiki("wing commander (rank)"),
  "winged-bean": wiki("psophocarpus tetragonolobus"), "fraxinus": wiki("fraxinus"), "sycamore": wiki("acer pseudoplatanus"),
  "tilia": wiki("tilia"), "euonymus-alatus": wiki("euonymus alatus"), "tipuana": wiki("tipuana tipu"),
  "wing-loading": wiki("wing loading"), "lift-to-drag": wiki("lift-to-drag ratio"), "stall": wiki("stall (fluid dynamics)"),
  "airfoil": wiki("airfoil"), "wingtip-vortices": wiki("wingtip vortices"), "bird-flight": wiki("bird flight"),
  "flightless-bird": wiki("flightless bird"), "moult": wiki("molting"), "flight-feather": wiki("flight feather"),
  "wing-clipping": wiki("wing clipping"), "wingspan": wiki("wingspan"), "drag": wiki("drag (physics)"),
  "halteres": wiki("halteres"), "karman": wiki("kármán vortex street"), "bird-migration": wiki("bird migration"),
  "wiktionary-wing": { publisher: "wiktionary", title: "wing", url: "https://en.wiktionary.org/wiki/wing" }
});
publishers["wiktionary"] = { kind: "dictionary", tier: "general", note: "open dictionary with word origins and other languages." };

Object.assign(cites, {
  "alate": [["alate", "biology"], ["insect-wing", "parts"]],
  "mayfly": [["mayfly", "biology"]],
  "moth": [["moth", "biology"], ["insect-wing", "parts"]],
  "damselfly": [["damselfly", "biology"]],
  "fairyfly": [["mymaridae", "biology"], ["reynolds", "physics"]],
  "locust": [["locust", "biology"]],
  "earwig": [["earwig", "biology"], ["insect-wing", "shape"]],
  "cicada": [["cicada", "biology"]],
  "lacewing": [["neuroptera", "biology"]],
  "mosquito": [["mosquito", "biology"], ["insect-flight", "physics"]],
  "swift": [["swift", "biology"], ["bird-flight", "physics"]],
  "owl": [["owl", "biology"], ["flight-feather", "parts"]],
  "kestrel": [["kestrel", "biology"], ["bird-flight", "physics"]],
  "frigatebird": [["frigatebird", "biology"], ["wing-loading", "physics"]],
  "condor": [["andean-condor", "biology"], ["bird-flight", "physics"]],
  "hoatzin": [["hoatzin", "biology"]],
  "steamer-duck": [["steamer-duck", "biology"], ["flightless-bird", "overview"]],
  "kakapo": [["kakapo", "biology"], ["flightless-bird", "overview"]],
  "flying-squid": [["flying-squid", "biology"]],
  "gurnard": [["flying-gurnard", "biology"]],
  "hatchetfish": [["hatchetfish", "biology"]],
  "gliding-ant": [["gliding-ant", "biology"]],
  "gecko": [["ptychozoon", "biology"]],
  "dodo": [["dodo", "biology"], ["flightless-bird", "overview"]],
  "great-auk": [["great-auk", "biology"], ["flightless-bird", "overview"]],
  "quetzalcoatlus": [["quetzalcoatlus", "biology"], ["pterosaur", "overview"]],
  "argentavis": [["argentavis", "biology"]],
  "pelagornis": [["pelagornis", "biology"]],
  "sharovipteryx": [["sharovipteryx", "biology"]],
  "kuehneosaurus": [["kuehneosaurus", "biology"]],
  "rhamphorhynchus": [["rhamphorhynchus", "biology"], ["pterosaur", "overview"]],
  "rogallo": [["rogallo-wing", "history"], ["hang-gliding", "overview"]],
  "channel-wing": [["channel-wing", "overview"]],
  "joined-wing": [["joined-wing", "overview"], ["wing-configuration", "shape"]],
  "sesquiplane": [["sesquiplane", "overview"], ["biplane", "shape"]],
  "wing-warping": [["wing-warping", "history"], ["aileron", "overview"]],
  "tiltrotor": [["tiltrotor", "overview"]],
  "tiltwing": [["tiltwing", "overview"]],
  "folding-wing": [["folding-wing", "overview"]],
  "blown-flap": [["blown-flap", "overview"], ["flap", "parts"]],
  "vortex-generator": [["vortex-generator", "overview"], ["stall", "physics"]],
  "wing-fence": [["wing-fence", "overview"], ["swept-wing", "physics"]],
  "lex": [["lex", "overview"]],
  "krueger-flap": [["krueger-flap", "overview"]],
  "supercritical": [["supercritical", "overview"], ["airfoil", "shape"]],
  "parafoil": [["parafoil", "overview"]],
  "wingsail": [["wingsail", "overview"]],
  "kitesurf": [["kitesurfing", "overview"]],
  "underwater-glider": [["underwater-glider", "overview"]],
  "flying-disc": [["flying-disc", "overview"]],
  "boomerang": [["boomerang", "overview"]],
  "paper-plane": [["paper-plane", "overview"]],
  "cyclogyro": [["cyclogyro", "overview"]],
  "buran": [["buran", "history"]],
  "magnetic-sail": [["magnetic-sail", "overview"]],
  "electric-sail": [["electric-sail", "overview"]],
  "griffin": [["griffin", "history"]],
  "harpy": [["harpy", "history"]],
  "garuda": [["garuda", "history"]],
  "thunderbird": [["thunderbird", "history"]],
  "phoenix": [["phoenix", "history"]],
  "nike": [["nike", "history"], ["angel-wings", "shape"]],
  "cupid": [["cupid", "history"]],
  "tengu": [["tengu", "history"]],
  "wyvern": [["wyvern", "history"]],
  "lamassu": [["lamassu", "history"]],
  "seraph": [["seraph", "history"], ["angel-wings", "shape"]],
  "cherub": [["cherub", "history"]],
  "talaria": [["talaria", "history"]],
  "snow-angel": [["snow-angel", "name"]],
  "wingman": [["wingman", "name"]],
  "wing-dam": [["wing-dam", "name"]],
  "wingwall": [["wingwall", "name"]],
  "wingtip-shoe": [["brogue", "name"]],
  "wing-collar": [["wing-collar", "name"]],
  "aviator-badge": [["aviator-badge", "name"]],
  "wing-commander": [["wing-commander", "name"]],
  "winged-bean": [["winged-bean", "biology"]],
  "ash-seed": [["fraxinus", "biology"], ["seed-dispersal", "physics"]],
  "sycamore-seed": [["sycamore", "biology"], ["seed-dispersal", "physics"]],
  "linden-bract": [["tilia", "biology"]],
  "winged-spindle": [["euonymus-alatus", "biology"]],
  "tipu-seed": [["tipuana", "biology"], ["seed-dispersal", "physics"]]
});

// some older entries get a second source now that more exist
for (const [id, extra] of Object.entries({
  "bird": [["bird-flight", "physics"], ["flight-feather", "parts"]],
  "fly": [["halteres", "parts"]],
  "ostrich": [["flightless-bird", "overview"]],
  "kiwi": [["flightless-bird", "overview"]],
  "penguin": [["flightless-bird", "overview"]],
  "winglet": [["wingtip-vortices", "physics"]],
  "high-aspect": [["lift-to-drag", "physics"]],
  "sailplane": [["lift-to-drag", "physics"]],
  "primaries": [["flight-feather", "parts"], ["moult", "biology"]],
  "secondaries": [["flight-feather", "parts"]],
  "angel": [["angel-wings", "shape"]],
  "active-soaring": [["bird-migration", "biology"]]
})) cites[id] = [...(cites[id] || []), ...extra];

Object.assign(tableCites, {
  "masses and wing loading": ["wing-loading", "wingspan"],
  "glide and stall estimates": ["lift-to-drag", "stall", "drag"],
  "sayings": ["wiktionary-wing"],
  "words for wing": ["wiktionary-wing"],
  "airfoil sections": ["airfoil"],
  "wake shapes": ["wingtip-vortices", "karman"]
});

// ---------- new tables ----------

// typical flying mass in kilograms, used to estimate wing loading and slowest flying speed
const masses = {
  "straight": 1100, "tapered": 1500, "elliptical": 3000, "swept": 70000, "delta": 12000, "variable-sweep": 30000,
  "flying-wing": 70000, "high-aspect": 12000, "biplane": 700, "triplane": 590, "sailplane": 500, "hang-glider": 120,
  "paraglider": 100, "wingsuit": 80, "rotor": 5000, "mars-rotor": 1.8, "shuttle": 100000, "buran": 80000,
  "solar-plane": 2300, "fixed-drone": 5, "robobee": 0.00008, "ornithopter": 4, "tiltrotor": 21000,
  "bird": 0.4, "bat": 0.03, "pterosaur": 50, "dragonfly": 0.0008, "butterfly": 0.0005, "bee": 0.0001,
  "beetle": 0.001, "fly": 0.00002, "mosquito": 0.0000025, "fairyfly": 0.00000001, "locust": 0.002,
  "swift": 0.04, "owl": 0.5, "kestrel": 0.2, "frigatebird": 1.4, "condor": 12, "hovering": 0.004,
  "active-soaring": 9, "passive-soaring": 5, "quetzalcoatlus": 220, "argentavis": 70, "pelagornis": 30,
  "flying-squirrel": 0.15, "sugar-glider": 0.12, "colugo": 1.5, "draco": 0.03, "flying-fish": 0.3,
  "maple-seed": 0.0002, "ash-seed": 0.00007, "dandelion": 0.0000006, "zanonia": 0.0002,
  "flying-disc": 0.175, "boomerang": 0.08, "paper-plane": 0.005, "kite": 0.5, "parafoil": 120
};

// air density in kilograms per cubic meter, per fluid, for the stall speed estimate
const densities = { air: 1.225, "thin air": 0.017, water: 1000 };

// best lift coefficient a wing of each kind can reach before it stalls
const maxLift = { natural: 1.6, made: 1.4, mixed: 1.2 };

// a few common airfoil sections, with thickness as a share of chord
const airfoils = {
  "flat plate": { thickness: 0.02, camber: 0, note: "a thin sheet. fine for insects, toys, and seeds." },
  "clark y": { thickness: 0.117, camber: 0.034, note: "a classic flat-bottomed section used on early planes and models." },
  "naca 0012": { thickness: 0.12, camber: 0, note: "a symmetric section, the same on top and bottom. used on tails and rotors." },
  "naca 2412": { thickness: 0.12, camber: 0.02, note: "a mildly curved section for light planes." },
  "supercritical": { thickness: 0.11, camber: 0.02, note: "flat top, curved bottom back end. for near the speed of sound." },
  "double wedge": { thickness: 0.04, camber: 0, note: "two sharp triangles. for supersonic flight." },
  "cambered plate": { thickness: 0.02, camber: 0.06, note: "a curved thin sheet, like a bird feather row or a sail." }
};
const airfoilOf = {
  "straight": "clark y", "tapered": "naca 2412", "elliptical": "naca 2412", "biplane": "clark y", "triplane": "clark y",
  "parasol": "clark y", "monoplane": "naca 2412", "swept": "supercritical", "supercritical": "supercritical",
  "delta": "double wedge", "ogive": "double wedge", "missile-fin": "double wedge", "rotor": "naca 0012",
  "propeller": "clark y", "turbine": "naca 2412", "canard": "naca 0012", "race-wing": "cambered plate",
  "dragonfly": "flat plate", "butterfly": "flat plate", "bee": "flat plate", "fly": "flat plate", "mosquito": "flat plate",
  "maple-seed": "flat plate", "paper-plane": "flat plate", "sail": "cambered plate", "bird": "cambered plate",
  "bat": "cambered plate", "owl": "cambered plate", "wingsail": "naca 0012", "hydrofoil": "naca 2412",
  "sailplane": "naca 2412", "high-aspect": "naca 2412", "boomerang": "clark y", "flying-disc": "cambered plate"
};

// the swirl each kind of wing leaves behind it
const wakes = {
  "tip vortices": { note: "two spinning tubes trail from the tips of fixed wings.", ids: ["straight", "tapered", "swept", "high-aspect", "sailplane", "winglet", "condor"] },
  "vortex ring": { note: "flapping wings shed a chain of smoke-ring swirls, one per beat.", ids: ["bird", "bat", "swift", "owl", "kestrel"] },
  "leading edge vortex": { note: "a swirl rides on top of the wing and adds lift at steep angles.", ids: ["delta", "lex", "dragonfly", "bee", "maple-seed", "hovering", "ash-seed"] },
  "clap and fling": { note: "wings clap together then peel apart, pulling swirls into the gap.", ids: ["thrips", "fairyfly", "butterfly"] },
  "helical wake": { note: "spinning blades leave a twisting spiral of swirls.", ids: ["rotor", "propeller", "turbine", "tiltrotor", "mars-rotor"] },
  "vortex street": { note: "a zig-zag row of swirls peeling off a blunt shape.", ids: ["dandelion", "flying-disc", "magnetic-sail"] }
};

// sayings that use wings, with what they mean
const sayings = [
  ["wing it", "do something without planning."],
  ["take under your wing", "look after and teach someone."],
  ["spread your wings", "try new things on your own."],
  ["clip someone's wings", "limit what someone can do."],
  ["waiting in the wings", "ready to step in when needed."],
  ["on the wing", "while flying, or while on the move."],
  ["take wing", "start flying, or start to do well."],
  ["on a wing and a prayer", "with very little chance, relying on luck."],
  ["earn your wings", "prove you are skilled at something."],
  ["left wing and right wing", "the two sides of politics."],
  ["winging a ball", "throwing it hard and fast."]
];

// the word for wing in other languages
const words = [
  ["latin", "ala"], ["greek", "pteron"], ["german", "flügel"], ["french", "aile"], ["spanish", "ala"],
  ["italian", "ala"], ["portuguese", "asa"], ["dutch", "vleugel"], ["swedish", "vinge"], ["danish", "vinge"],
  ["norwegian", "vinge"], ["icelandic", "vængur"], ["old norse", "vængr"], ["finnish", "siipi"], ["polish", "skrzydło"],
  ["russian", "krylo"], ["czech", "křídlo"], ["hungarian", "szárny"], ["turkish", "kanat"], ["welsh", "adain"],
  ["irish", "sciathán"], ["japanese", "tsubasa"], ["indonesian", "sayap"], ["swahili", "bawa"], ["hawaiian", "ʻēheu"]
];

// word pieces that mean wing, found in many animal and science names
const roots = {
  "ptera": "wing, from greek. chiroptera (hand wing, bats), lepidoptera (scale wing), diptera (two wing), coleoptera (sheath wing).",
  "pteryx": "wing, from greek. archaeopteryx (old wing), sharovipteryx.",
  "ala": "wing, from latin. alate (winged), alula (little wing), aileron (little wing, by way of french).",
  "aero": "air, from greek. aeroplane, aerofoil."
};
