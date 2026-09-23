// the wing database
// each group has subgroups, each subgroup has entries
// fields: id, name, note, examples, flight (how it moves through air or water), material, tags

const wings = [
  {
    group: "airplane wings",
    subgroups: [
      {
        name: "planform (top-down shape)",
        entries: [
          { id: "straight", name: "straight wing", note: "extends straight out from the body. simple, stable, good at low speed.", examples: ["cessna 172", "piper cub"], flight: "powered", material: "aluminum", tags: ["low speed", "trainer", "simple"] },
          { id: "tapered", name: "tapered wing", note: "narrows toward the tip. saves weight and spreads lift more evenly.", examples: ["beechcraft bonanza"], flight: "powered", material: "aluminum", tags: ["efficient", "general aviation"] },
          { id: "elliptical", name: "elliptical wing", note: "oval outline that gives near-ideal lift spread. hard to build.", examples: ["supermarine spitfire"], flight: "powered", material: "aluminum", tags: ["efficient", "fighter", "classic"] },
          { id: "swept", name: "swept wing", note: "angled back to delay shock waves near the speed of sound.", examples: ["boeing 737", "airbus a320"], flight: "powered", material: "aluminum", tags: ["high speed", "airliner", "jet"] },
          { id: "forward-swept", name: "forward-swept wing", note: "angled forward. very agile but twists under load, so it needs stiff composites.", examples: ["grumman x-29", "sukhoi su-47"], flight: "powered", material: "composite", tags: ["experimental", "agile", "rare"] },
          { id: "delta", name: "delta wing", note: "triangle shape. strong, roomy for fuel, and good at supersonic speed.", examples: ["concorde", "dassault mirage iii"], flight: "powered", material: "aluminum", tags: ["supersonic", "fighter"] },
          { id: "cropped-delta", name: "cropped delta wing", note: "a delta with the tips cut off to cut drag and weight.", examples: ["f-16 (partly)", "saab draken (double delta)"], flight: "powered", material: "aluminum", tags: ["supersonic", "fighter"] },
          { id: "ogive", name: "ogival delta wing", note: "a delta with smooth curved leading edges.", examples: ["concorde"], flight: "powered", material: "aluminum", tags: ["supersonic", "airliner"] },
          { id: "variable-sweep", name: "variable-sweep wing", note: "swings between straight for takeoff and swept for speed.", examples: ["f-14 tomcat", "b-1 lancer", "panavia tornado"], flight: "powered", material: "titanium", tags: ["swing wing", "fighter", "complex"] },
          { id: "oblique", name: "oblique wing", note: "one wing that pivots as a whole, one side forward and one side back.", examples: ["nasa ad-1"], flight: "powered", material: "composite", tags: ["experimental", "rare"] },
          { id: "flying-wing", name: "flying wing", note: "no separate body or tail. the whole plane is the wing.", examples: ["b-2 spirit", "horten ho 229"], flight: "powered", material: "composite", tags: ["stealth", "efficient", "tailless"] },
          { id: "blended", name: "blended wing body", note: "wing and body merge smoothly so the body also makes lift.", examples: ["boeing x-48"], flight: "powered", material: "composite", tags: ["experimental", "efficient"] },
          { id: "high-aspect", name: "high aspect ratio wing", note: "very long and thin. low drag for long, slow, efficient flight.", examples: ["u-2", "schempp-hirth nimbus glider"], flight: "gliding", material: "composite", tags: ["efficient", "glider", "high altitude"] },
          { id: "annular", name: "annular (ring) wing", note: "a wing bent into a closed ring or tube.", examples: ["snecma coléoptère"], flight: "powered", material: "aluminum", tags: ["experimental", "rare"] }
        ]
      },
      {
        name: "mounting position",
        entries: [
          { id: "low-wing", name: "low wing", note: "attached at the bottom of the body. good view up, easy landing gear.", examples: ["piper cherokee", "boeing 777"], flight: "powered", material: "aluminum", tags: ["common", "airliner"] },
          { id: "mid-wing", name: "mid wing", note: "attached through the middle of the body. good for aerobatics.", examples: ["extra 300"], flight: "powered", material: "composite", tags: ["aerobatic", "fighter"] },
          { id: "high-wing", name: "high wing", note: "on top of the body. stable, good ground clearance, good view down.", examples: ["cessna 152", "c-130 hercules"], flight: "powered", material: "aluminum", tags: ["stable", "cargo", "trainer"] },
          { id: "parasol", name: "parasol wing", note: "held above the body on struts.", examples: ["pietenpol air camper"], flight: "powered", material: "wood and fabric", tags: ["classic", "homebuilt"] },
          { id: "gull", name: "gull wing", note: "bends up near the root, then flattens out.", examples: ["pzl p.11"], flight: "powered", material: "aluminum", tags: ["classic"] },
          { id: "inverted-gull", name: "inverted gull wing", note: "bends down near the root to shorten the landing gear.", examples: ["f4u corsair", "ju 87 stuka"], flight: "powered", material: "aluminum", tags: ["classic", "fighter"] }
        ]
      },
      {
        name: "number of wings",
        entries: [
          { id: "monoplane", name: "monoplane", note: "one main wing. the modern standard.", examples: ["almost all modern planes"], flight: "powered", material: "aluminum", tags: ["common"] },
          { id: "biplane", name: "biplane", note: "two stacked wings. strong and light with old materials.", examples: ["wright flyer", "sopwith camel", "pitts special"], flight: "powered", material: "wood and fabric", tags: ["classic", "aerobatic"] },
          { id: "triplane", name: "triplane", note: "three stacked wings. climbs well but has lots of drag.", examples: ["fokker dr.i"], flight: "powered", material: "wood and fabric", tags: ["classic", "rare"] },
          { id: "tandem", name: "tandem wing", note: "two wings one behind the other, both making lift.", examples: ["rutan quickie"], flight: "powered", material: "composite", tags: ["homebuilt", "rare"] },
          { id: "box", name: "box wing (closed wing)", note: "upper and lower wings joined at the tips to cut tip drag.", examples: ["prandtlplane concept"], flight: "powered", material: "composite", tags: ["experimental", "efficient"] }
        ]
      },
      {
        name: "wing parts and add-ons",
        entries: [
          { id: "winglet", name: "winglet", note: "small upturned tip that weakens tip vortices and saves fuel.", examples: ["boeing 737 max", "airbus a350"], flight: "powered", material: "composite", tags: ["efficient", "airliner"] },
          { id: "flap", name: "flap", note: "hinged back section that adds lift and drag for slow flight.", examples: ["fowler flap", "split flap", "slotted flap"], flight: "powered", material: "aluminum", tags: ["control", "landing"] },
          { id: "slat", name: "slat", note: "front section that slides out to keep air flowing at high angles.", examples: ["most airliners"], flight: "powered", material: "aluminum", tags: ["control", "landing"] },
          { id: "aileron", name: "aileron", note: "hinged surface near the tip that rolls the plane.", examples: ["almost all planes"], flight: "powered", material: "aluminum", tags: ["control"] },
          { id: "spoiler", name: "spoiler", note: "panel on top that pops up to kill lift and slow down.", examples: ["most airliners"], flight: "powered", material: "aluminum", tags: ["control", "landing"] },
          { id: "canard", name: "canard", note: "small front wing ahead of the main wing.", examples: ["eurofighter typhoon", "rutan long-ez"], flight: "powered", material: "composite", tags: ["control", "fighter"] }
        ]
      }
    ]
  },
  {
    group: "animal wings",
    subgroups: [
      {
        name: "vertebrate flyers",
        entries: [
          { id: "bird", name: "bird wing", note: "feathers on a fused arm and hand. flaps, glides, soars, or hovers.", examples: ["pigeon", "eagle", "hummingbird"], flight: "flapping", material: "feathers and bone", tags: ["true flight", "living"] },
          { id: "bat", name: "bat wing", note: "skin stretched over long fingers. changes shape every beat.", examples: ["fruit bat", "little brown bat"], flight: "flapping", material: "skin and bone", tags: ["true flight", "living", "mammal"] },
          { id: "pterosaur", name: "pterosaur wing", note: "skin membrane held mostly by one huge fourth finger.", examples: ["pteranodon", "quetzalcoatlus"], flight: "flapping", material: "skin and bone", tags: ["true flight", "extinct", "reptile"] }
        ]
      },
      {
        name: "insect wings",
        entries: [
          { id: "dragonfly", name: "dragonfly wing", note: "two pairs that move on their own. can hover and fly backward.", examples: ["emperor dragonfly"], flight: "flapping", material: "chitin", tags: ["true flight", "living", "insect", "agile"] },
          { id: "butterfly", name: "butterfly wing", note: "big wings covered in tiny colored scales.", examples: ["monarch", "swallowtail"], flight: "flapping", material: "chitin and scales", tags: ["true flight", "living", "insect"] },
          { id: "beetle", name: "beetle wing (elytra)", note: "hard front wings shield folded flying back wings.", examples: ["ladybug", "stag beetle"], flight: "flapping", material: "chitin", tags: ["true flight", "living", "insect", "armored"] },
          { id: "fly", name: "fly wing (halteres)", note: "one pair of wings. the back pair shrank into balance knobs.", examples: ["housefly", "mosquito"], flight: "flapping", material: "chitin", tags: ["true flight", "living", "insect", "fast"] },
          { id: "bee", name: "bee and wasp wing", note: "front and back wings hook together in flight.", examples: ["honeybee", "yellowjacket"], flight: "flapping", material: "chitin", tags: ["true flight", "living", "insect"] },
          { id: "thrips", name: "fringed wing", note: "tiny wings made of bristles. air acts thick at that size.", examples: ["thrips", "fairyfly"], flight: "flapping", material: "chitin", tags: ["true flight", "living", "insect", "tiny"] }
        ]
      },
      {
        name: "gliders",
        entries: [
          { id: "flying-squirrel", name: "flying squirrel membrane", note: "skin between front and back legs for gliding.", examples: ["northern flying squirrel"], flight: "gliding", material: "skin", tags: ["glide", "living", "mammal"] },
          { id: "sugar-glider", name: "sugar glider membrane", note: "a marsupial version of the same gliding skin.", examples: ["sugar glider"], flight: "gliding", material: "skin", tags: ["glide", "living", "mammal"] },
          { id: "colugo", name: "colugo membrane", note: "skin from neck to tail tip, the most complete gliding membrane of any mammal.", examples: ["sunda colugo"], flight: "gliding", material: "skin", tags: ["glide", "living", "mammal"] },
          { id: "draco", name: "draco lizard wing", note: "stretched ribs hold out skin flaps.", examples: ["flying dragon lizard"], flight: "gliding", material: "skin and rib", tags: ["glide", "living", "reptile"] },
          { id: "flying-frog", name: "flying frog feet", note: "huge webbed feet used as parachutes.", examples: ["wallace's flying frog"], flight: "gliding", material: "skin", tags: ["glide", "living", "amphibian"] },
          { id: "flying-snake", name: "flying snake body", note: "flattens its body and wiggles to glide.", examples: ["paradise tree snake"], flight: "gliding", material: "scales", tags: ["glide", "living", "reptile", "odd"] },
          { id: "flying-fish", name: "flying fish fins", note: "big stiff fins used to glide above the waves.", examples: ["four-wing flying fish"], flight: "gliding", material: "fin rays", tags: ["glide", "living", "fish"] }
        ]
      },
      {
        name: "underwater wings",
        entries: [
          { id: "penguin", name: "penguin flipper", note: "a stiff wing used to fly through water.", examples: ["emperor penguin"], flight: "swimming", material: "feathers and bone", tags: ["flightless", "living", "bird", "water"] },
          { id: "manta", name: "manta ray fin", note: "wide fins that flap like wings.", examples: ["giant manta ray"], flight: "swimming", material: "cartilage", tags: ["living", "fish", "water"] },
          { id: "sea-turtle", name: "sea turtle flipper", note: "long front flippers that flap like wings.", examples: ["green sea turtle"], flight: "swimming", material: "skin and bone", tags: ["living", "reptile", "water"] },
          { id: "sea-angel", name: "sea angel wing", note: "a small sea snail whose foot became two flapping wings.", examples: ["clione limacina"], flight: "swimming", material: "soft tissue", tags: ["living", "water", "odd"] }
        ]
      },
      {
        name: "flightless wings",
        entries: [
          { id: "ostrich", name: "ostrich wing", note: "used for balance, display, and shade, not flight.", examples: ["ostrich", "emu", "rhea"], flight: "none", material: "feathers and bone", tags: ["flightless", "living", "bird"] },
          { id: "kiwi", name: "kiwi wing", note: "a tiny leftover wing hidden in the feathers.", examples: ["brown kiwi"], flight: "none", material: "feathers and bone", tags: ["flightless", "living", "bird", "tiny"] }
        ]
      }
    ]
  },
  {
    group: "bird wing shapes",
    subgroups: [
      {
        name: "by flight style",
        entries: [
          { id: "elliptical-bird", name: "elliptical bird wing", note: "short and round. fast takeoffs and tight turns.", examples: ["sparrow", "crow", "pheasant"], flight: "flapping", material: "feathers and bone", tags: ["agile", "living", "bird"] },
          { id: "high-speed-bird", name: "high-speed bird wing", note: "long, pointed, and slim for speed.", examples: ["peregrine falcon", "swift", "duck"], flight: "flapping", material: "feathers and bone", tags: ["fast", "living", "bird"] },
          { id: "active-soaring", name: "active soaring wing", note: "very long and narrow. rides wind over waves.", examples: ["albatross", "gannet"], flight: "gliding", material: "feathers and bone", tags: ["efficient", "living", "bird", "sea"] },
          { id: "passive-soaring", name: "passive soaring wing", note: "broad with spread tip feathers. rides rising warm air.", examples: ["eagle", "vulture", "stork"], flight: "gliding", material: "feathers and bone", tags: ["efficient", "living", "bird"] },
          { id: "hovering", name: "hovering wing", note: "stiff wing that twists to lift on both strokes.", examples: ["hummingbird"], flight: "flapping", material: "feathers and bone", tags: ["hover", "living", "bird", "agile"] }
        ]
      },
      {
        name: "feather parts",
        entries: [
          { id: "primaries", name: "primary feathers", note: "outer flight feathers on the hand. give thrust.", examples: ["all flying birds"], flight: "flapping", material: "keratin", tags: ["anatomy", "bird"] },
          { id: "secondaries", name: "secondary feathers", note: "inner flight feathers on the forearm. give lift.", examples: ["all flying birds"], flight: "flapping", material: "keratin", tags: ["anatomy", "bird"] },
          { id: "alula", name: "alula", note: "a small thumb feather that acts like a slat at slow speed.", examples: ["most birds"], flight: "flapping", material: "keratin", tags: ["anatomy", "bird", "control"] },
          { id: "coverts", name: "covert feathers", note: "small feathers that smooth the wing surface.", examples: ["all birds"], flight: "flapping", material: "keratin", tags: ["anatomy", "bird"] }
        ]
      }
    ]
  },
  {
    group: "machine and other wings",
    subgroups: [
      {
        name: "rotating wings",
        entries: [
          { id: "rotor", name: "helicopter rotor blade", note: "a spinning wing that lifts and steers a helicopter.", examples: ["bell 206", "black hawk"], flight: "powered", material: "composite", tags: ["rotating", "hover"] },
          { id: "autogyro", name: "autogyro rotor", note: "spun by air moving past it, not by an engine.", examples: ["cierva autogiro"], flight: "powered", material: "composite", tags: ["rotating", "rare"] },
          { id: "propeller", name: "propeller blade", note: "a twisted wing that pulls forward instead of up.", examples: ["most small planes"], flight: "powered", material: "wood or composite", tags: ["rotating", "thrust"] },
          { id: "turbine", name: "wind turbine blade", note: "a long wing that turns wind into spinning power.", examples: ["offshore wind turbines"], flight: "none", material: "fiberglass", tags: ["rotating", "energy"] },
          { id: "maple-seed", name: "maple seed (samara)", note: "a natural one-bladed rotor that slows a falling seed.", examples: ["maple", "ash", "sycamore"], flight: "gliding", material: "plant tissue", tags: ["rotating", "living", "plant"] }
        ]
      },
      {
        name: "soft and unpowered wings",
        entries: [
          { id: "hang-glider", name: "hang glider wing", note: "fabric over a light frame. the pilot shifts weight to steer.", examples: ["rogallo wing"], flight: "gliding", material: "fabric and aluminum", tags: ["glide", "sport"] },
          { id: "paraglider", name: "paraglider wing", note: "no frame. air fills cells in the fabric to hold its shape.", examples: ["ram-air wing"], flight: "gliding", material: "fabric", tags: ["glide", "sport", "soft"] },
          { id: "wingsuit", name: "wingsuit", note: "fabric between arms and legs that lets a person glide.", examples: ["skydiving wingsuit"], flight: "gliding", material: "fabric", tags: ["glide", "sport", "human"] },
          { id: "kite", name: "kite", note: "a wing held on a line, lifted by wind.", examples: ["delta kite", "box kite", "kitesurf kite"], flight: "gliding", material: "fabric", tags: ["tethered", "sport"] },
          { id: "sailplane", name: "sailplane wing", note: "very long, thin wings for staying up without an engine.", examples: ["ask 21"], flight: "gliding", material: "composite", tags: ["glide", "efficient", "sport"] }
        ]
      },
      {
        name: "vehicle and water wings",
        entries: [
          { id: "race-wing", name: "race car wing", note: "an upside-down wing that pushes the car onto the road.", examples: ["formula 1 rear wing"], flight: "none", material: "carbon fiber", tags: ["downforce", "sport"] },
          { id: "sail", name: "sail", note: "a wing standing on its side that pulls a boat.", examples: ["sloop mainsail", "wing sail"], flight: "none", material: "fabric", tags: ["water", "sport"] },
          { id: "keel", name: "keel", note: "an underwater wing that stops a sailboat from sliding sideways.", examples: ["fin keel"], flight: "swimming", material: "lead or steel", tags: ["water"] },
          { id: "hydrofoil", name: "hydrofoil", note: "an underwater wing that lifts a hull out of the water.", examples: ["foiling sailboat", "efoil board"], flight: "swimming", material: "carbon fiber", tags: ["water", "fast"] },
          { id: "ekranoplan", name: "ground effect wing", note: "a wing flown just above water to ride a cushion of air.", examples: ["lun-class ekranoplan"], flight: "powered", material: "aluminum", tags: ["water", "rare", "experimental"] },
          { id: "missile-fin", name: "missile fin", note: "small wings that steer and steady a missile or rocket.", examples: ["model rocket fins"], flight: "powered", material: "aluminum", tags: ["control", "fast"] }
        ]
      },
      {
        name: "drone and robot wings",
        entries: [
          { id: "ornithopter", name: "ornithopter wing", note: "a machine wing that flaps like a bird.", examples: ["festo smartbird"], flight: "flapping", material: "composite", tags: ["robot", "experimental"] },
          { id: "robobee", name: "micro flapping wing", note: "tiny insect-like wings driven by fast vibrating parts.", examples: ["harvard robobee"], flight: "flapping", material: "polymer film", tags: ["robot", "tiny", "experimental"] },
          { id: "fixed-drone", name: "fixed-wing drone", note: "a small plane-style wing for long, quiet flights.", examples: ["survey drones"], flight: "powered", material: "foam", tags: ["drone", "efficient"] }
        ]
      }
    ]
  },
  {
    group: "fictional and symbolic wings",
    subgroups: [
      {
        name: "myth and story",
        entries: [
          { id: "dragon", name: "dragon wing", note: "huge bat-like wings, often too small to really lift a dragon.", examples: ["european dragons"], flight: "flapping", material: "skin and bone", tags: ["myth", "fiction"] },
          { id: "angel", name: "angel wing", note: "large feathered wings from the back, a sign of the divine.", examples: ["religious art"], flight: "flapping", material: "feathers", tags: ["myth", "symbol"] },
          { id: "fairy", name: "fairy wing", note: "thin wings like a butterfly or dragonfly.", examples: ["folklore fairies"], flight: "flapping", material: "membrane", tags: ["myth", "fiction"] },
          { id: "icarus", name: "wax and feather wings", note: "the wings of icarus, which melted when he flew too near the sun.", examples: ["greek myth"], flight: "flapping", material: "wax and feathers", tags: ["myth", "cautionary"] },
          { id: "pegasus", name: "pegasus wing", note: "bird wings on a horse.", examples: ["greek myth"], flight: "flapping", material: "feathers", tags: ["myth"] },
          { id: "hermes", name: "winged sandals and helmet", note: "small wings on the feet or head, a sign of speed.", examples: ["hermes", "mercury"], flight: "none", material: "feathers", tags: ["myth", "symbol"] }
        ]
      },
      {
        name: "symbols",
        entries: [
          { id: "pilot-wings", name: "pilot wings badge", note: "a pin shaped like wings given to trained pilots.", examples: ["military aviator badge"], flight: "none", material: "metal", tags: ["symbol", "badge"] },
          { id: "caduceus", name: "winged staff", note: "a staff with wings on top, linked to messengers and trade.", examples: ["caduceus"], flight: "none", material: "metal", tags: ["symbol"] },
          { id: "winged-sun", name: "winged sun disk", note: "a sun with spread wings, an old sign of power.", examples: ["ancient egyptian art"], flight: "none", material: "stone", tags: ["symbol", "ancient"] }
        ]
      }
    ]
  }
];
