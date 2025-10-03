import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MotivationalQuote from "../MotivationalQuote";

const curriculumData: Record<
  string,
  Record<string, Record<string, string[]>>
> = {
  "10": {
    Mathematics: {
       "Real Numbers": [
      "Euclid’s Division Lemma",
      "Fundamental Theorem of Arithmetic",
      "HCF and LCM",
      "Irrational Numbers",
      "Decimal Expansions"
    ],
    "Polynomials": [
      "Degree of a Polynomial",
      "Zeros of a Polynomial",
      "Relationship Between Zeros and Coefficients",
      "Division Algorithm for Polynomials"
    ],
    "Pair of Linear Equations in Two Variables": [
      "Graphical Method of Solution",
      "Substitution Method",
      "Elimination Method",
      "Cross-Multiplication Method",
      "Consistency and Inconsistency"
    ],
    "Arithmetic Progressions": [
      "General Term",
      "Sum of First n Terms",
      "Real-life Applications of A.P."
    ],
    "Triangles": [
      "Similarity of Triangles",
      "Criteria for Similarity",
      "Pythagoras Theorem",
      "Area of Similar Triangles"
    ],
    "Coordinate Geometry": [
      "Distance Formula",
      "Section Formula",
      "Mid-Point Formula",
      "Area of a Triangle"
    ],
    "Introduction to Trigonometry": [
      "Trigonometric Ratios",
      "Trigonometric Identities",
      "T-ratios of Specific Angles",
      "Complementary Angles"
    ],
    "Some Applications of Trigonometry": [
      "Heights and Distances",
      "Angle of Elevation and Depression",
      "Real-life Problems Using Trigonometry"
    ],
    "Circles": [
      "Tangent to a Circle",
      "Number of Tangents from a Point",
      "Properties of Tangents"
    ],
    "Areas Related to Circles": [
      "Area and Perimeter of Circle",
      "Sector and Segment of a Circle",
      "Area of Combinations of Plane Figures"
    ],
    "Surface Areas and Volumes": [
      "Surface Area and Volume of Cube, Cuboid, Sphere, Cone, and Cylinder",
      "Conversion of Solids",
      "Combination of Solids"
    ],
    "Statistics": [
      "Mean, Median and Mode of Grouped Data",
      "Cumulative Frequency Graphs",
      "Ogive Curves"
    ],
    "Probability": [
      "Classical Definition of Probability",
      "Simple Problems on Single Events"
    ]

    },
    Science: {
      "Control and Coordination": [
  "Nervous System in Humans",
  "Reflex Action and Reflex Arc",
  "Human Brain",
  "Coordination in Plants",
  "Hormones in Animals"
],
"Electricity": [
  "Electric Current and Circuit",
  "Ohm’s Law",
  "Resistance and Resistivity",
  "Factors Affecting Resistance",
  "Combination of Resistors",
  "Heating Effect of Current",
  "Electric Power"
],
"Heredity": [
  "Heredity and Genes",
  "Mendel’s Laws of Inheritance",
  "Dominant and Recessive Traits",
  "Sex Determination in Humans",
  "Variation and Evolution"
],
"How Do Organisms Reproduce": [
  "Asexual Reproduction",
  "Sexual Reproduction in Plants",
  "Reproduction in Humans",
  "Male and Female Reproductive Systems",
  "Fertilization and Birth Control"
],
"Light Reflection and Refraction": [
  "Reflection of Light by Spherical Mirrors",
  "Image Formation by Mirrors",
  "Mirror Formula",
  "Refraction of Light",
  "Refraction through a Glass Slab",
  "Refraction by Spherical Lenses",
  "Lens Formula and Magnification"
],
"Magnetic Effects of Electric Current": [
  "Magnetic Field and Field Lines",
  "Magnetic Field due to Current-Carrying Conductor",
  "Right-Hand Thumb Rule",
  "Force on Current-Carrying Conductor",
  "Electric Motor",
  "Electromagnetic Induction",
  "Electric Generator"
],
"Our Environment": [
  "Ecosystem",
  "Biodegradable and Non-Biodegradable Substances",
  "Food Chains and Food Webs",
  "Ozone Layer and Its Depletion",
  "Waste Management"
],
"The Human Eye and the Colourful World": [
  "Structure and Functioning of the Human Eye",
  "Defects of Vision and their Correction",
  "Refraction through a Prism",
  "Dispersion of Light",
  "Atmospheric Refraction",
  "Scattering of Light"
],
"Acids Bases and Salts": [
  "Chemical Properties of Acids and Bases",
  "Reactions with Metals and Carbonates",
  "pH Scale",
  "Importance of pH in Everyday Life",
  "Preparation and Uses of Salts"
],
"Carbon and Its Compounds": [
  "Covalent Bonding in Carbon Compounds",
  "Versatile Nature of Carbon",
  "Chemical Properties of Carbon Compounds",
  "Soap and Detergents",
  "Homologous Series and Functional Groups"
],
"Life Processes": [
  "Nutrition in Plants and Animals",
  "Respiration",
  "Transportation in Animals and Plants",
  "Excretion in Animals and Plants"
],
"Chemical Reactions and Equations": [
  "Types of Chemical Reactions",
  "Balanced Chemical Equations",
  "Writing and Balancing Equations",
  "Effects of Oxidation and Reduction"
],
"Metals and Non metals": [
  "Physical and Chemical Properties",
  "Reactivity Series",
  "Occurrence of Metals",
  "Corrosion and Prevention",
  "Uses of Metals and Non-Metals"
]
    },
    "Social Science": {
      "Nationalism in India": [
    "The First World War and Nationalist Movement",
    "Rowlatt Act and Jallianwala Bagh Massacre",
    "Non-Cooperation Movement",
    "Salt March and Civil Disobedience",
    "Impact of National Movements on Different Social Groups"
  ],
  "The Age of Industrialisation": [
    "Before the Industrial Revolution",
    "Hand Labour and Steam Power",
    "Industrialisation in Colonies",
    "Factories Come Up in India",
    "Market for Goods"
  ],
  "Events and Processes": [
    "French Revolution and Its Impact",
    "Russian Revolution – Causes and Consequences",
    "Nazism and the Rise of Hitler",
    "Impact on World History"
  ],
  "Everyday Life Culture and Politics": [
    "Print Culture and the Modern World",
    "Novels, Society and History",
    "Mass Media and Nationalism",
    "Impact on Literacy and Awareness"
  ],
  "Livelihoods Economies and Societies": [
    "Colonialism and Indian Economy",
    "Agricultural Practices and Changes",
    "Tribal and Peasant Movements",
    "Growth of Industries and Urbanisation"
  ]

    },
    English: {
      "A Letter to God": [
    "Faith and Optimism",
    "Human Greed and Irony",
    "Power of Nature"
  ],
  "Nelson Mandela Long Walk to Freedom": [
    "Apartheid and Racism",
    "Struggle for Freedom",
    "Sacrifice and Leadership"
  ],
  "Two Stories About Flying": [
    "Fear and Courage",
    "Self-reliance",
    "Overcoming Obstacles"
  ],
  "From the Diary of Anne Frank": [
    "Life in Hiding",
    "Teenage Emotions",
    "Hope Amidst Suffering"
  ],
  "The Hundred Dresses – I": [
    "Bullying and Teasing",
    "Empathy and Kindness",
    "Poverty and Talent"
  ],
  "The Hundred Dresses – II": [
    "Remorse and Realization",
    "Moral Reflection",
    "Power of Words"
  ],
  "Glimpses of India": [
    "Diversity in Culture",
    "Heritage and Regional Flavors",
    "Unity in Diversity"
  ],
  "Mijbil the Otter": [
    "Human-Animal Bond",
    "Travel and Challenges",
    "Companionship"
  ],
  "Madam Rides the Bus": [
    "Childhood Curiosity",
    "Life Lessons",
    "Social Awareness"
  ],
  "The Sermon at Benares": [
    "Buddhist Philosophy",
    "Life and Death",
    "Detachment and Peace"
  ],
  "The Proposal": [
    "Comedy of Manners",
    "Marriage and Social Status",
    "Irrational Arguments"
  ]

    },
  },
  "11": {
    Mathematics: {
      "Sets": [
    "Types of Sets",
    "Venn Diagrams",
    "Union and Intersection of Sets",
    "Complement of a Set",
    "Difference of Sets"
  ],
  "Relations and Functions": [
    "Ordered Pairs",
    "Cartesian Product of Sets",
    "Relations",
    "Functions",
    "Domain and Range"
  ],
  "Trigonometric Functions": [
    "Angles and Their Measurements",
    "Trigonometric Ratios",
    "Trigonometric Identities",
    "Graphs of Trigonometric Functions",
    "General Solutions of Trigonometric Equations"
  ],
  "Complex Numbers and Quadratic Equations": [
    "Introduction to Complex Numbers",
    "Algebra of Complex Numbers",
    "Modulus and Conjugate",
    "Polar Representation",
    "Quadratic Equations with Complex Roots"
  ],
  "Linear Inequalities": [
    "Linear Inequalities in One Variable",
    "Graphical Solution",
    "System of Linear Inequalities in Two Variables"
  ],
  "Permutations and Combinations": [
    "Fundamental Principle of Counting",
    "Permutation as Arrangement",
    "Combination as Selection",
    "Properties of nPr and nCr"
  ],
  "Binomial Theorem": [
    "Binomial Theorem for Positive Integral Index",
    "General and Middle Terms",
    "Simple Applications"
  ],
  "Sequences and Series": [
    "Arithmetic Progression (AP)",
    "Geometric Progression (GP)",
    "nth Term and Sum of First n Terms",
    "Special Series"
  ],
  "Straight Lines": [
    "Slope of a Line",
    "Various Forms of Line Equations",
    "Angle Between Two Lines",
    "Distance from a Point to a Line"
  ],
  "Conic Sections": [
    "Circle",
    "Parabola",
    "Ellipse",
    "Hyperbola",
    "General Equation of a Conic"
  ],
  "Introduction to Three Dimensional Geometry": [
    "Coordinate System in 3D",
    "Distance Between Two Points",
    "Section Formula",
    "Direction Cosines and Ratios"
  ],
  "Limits and Derivatives": [
    "Intuitive Idea of Limits",
    "Limits of Polynomials and Rational Functions",
    "Derivatives from First Principles",
    "Derivatives of Standard Functions"
  ],
  "Statistics": [
    "Measures of Dispersion",
    "Mean Deviation",
    "Variance and Standard Deviation"
  ],
  "Probability": [
    "Random Experiments and Sample Space",
    "Events and Their Types",
    "Addition and Multiplication Theorems",
    "Independent and Dependent Events"
  ]
    },
    "Physics": {
      "Units and Measurement": [
    "Physical Quantities",
    "THE INTERNATIONAL SYSTEM OF UNITS",
    "Measurement of Length, Mass, and Time",
    "Accuracy and Precision",
    "Errors in Measurement"
  ],
  "Motion in a Straight Line": [
    "Position Path Length and Displacement",
    "Average and Instantaneous Velocity",
    "Uniform and Non-uniform Motion",
    "Graphical Representation of Motion"
  ],
  "Motion in a Plane": [
    "Scalars and Vectors",
    "Position and Displacement Vectors",
    "Projectile Motion",
    "Uniform Circular Motion"
  ],
  "Laws of Motion": [
    "Newton’s Laws of Motion",
    "Inertia and Mass",
    "Impulse and Momentum",
    "Law of Conservation of Momentum",
    "Equilibrium of a Particle"
  ],
  "Work Energy and Power": [
    "Work Done by a Constant Force",
    "Kinetic and Potential Energy",
    "Work-Energy Theorem",
    "Power",
    "Conservation of Energy"
  ],
  "Systems of Particles and Rotational Motion": [
    "Centre of Mass",
    "Torque and Angular Momentum",
    "Moment of Inertia",
    "Rotational Motion Equations"
  ],
  "Gravitation": [
    "Universal Law of Gravitation",
    "Acceleration Due to Gravity",
    "Motion of Planets",
    "Kepler’s Laws",
    "Gravitational Potential Energy"
  ],
      "Mechanical Properties of Solids": [
    "Stress and Strain",
    "Hooke’s Law",
    "Young’s Modulus",
    "Elastic Behaviour"
  ],
  "Mechanical Properties of Fluids": [
    "Pressure",
    "Pascal’s Law",
    "Viscosity",
    "Surface Tension"
  ],
  "Thermal Properties of Matter": [
    "Heat and Temperature",
    "Specific Heat Capacity",
    "Calorimetry",
    "Thermal Expansion",
    "Heat Transfer"
  ],
  "Thermodynamics": [
    "Thermal Equilibrium",
    "Zeroth and First Law of Thermodynamics",
    "Isothermal and Adiabatic Processes",
    "Second Law of Thermodynamics"
  ],
  "Kinetic Theory": [
    "Molecular Nature of Matter",
    "Boyle’s Law and Charles’s Law",
    "Ideal Gas Equation",
    "Degree of Freedom",
    "Law of Equipartition of Energy"
  ],
  "Oscillations": [
    "Periodic and Oscillatory Motion",
    "Simple Harmonic Motion",
    "Energy in SHM",
    "Damped and Forced Oscillations"
  ],
  "Waves": [
    "Types of Waves",
    "Sound Waves",
    "Principle of Superposition",
    "Standing Waves",
    "Beats and Doppler Effect"
  ]
    },
    "Chemistry": {
       "Some Basic Concepts of Chemistry": [
    "Laws of Chemical Combination",
    "Dalton’s Atomic Theory",
    "Mole Concept",
    "Empirical and Molecular Formula",
    "Stoichiometry"
  ],
  "Structure of Atom": [
    "Subatomic Particles",
    "Bohr’s Model of Atom",
    "Quantum Mechanical Model",
    "Atomic Orbitals",
    "Quantum Numbers",
    "Electron Configuration"
  ],
  "Classification of Elements and Periodicity in Properties": [
    "Modern Periodic Table",
    "Periodic Trends",
    "Electronic Configuration and Properties",
    "Valency and Atomic Size",
    "Ionization Enthalpy"
  ],
  "Chemical Bonding and Molecular Structure": [
    "Ionic Bonding",
    "Covalent Bonding",
    "VSEPR Theory",
    "Hybridization",
    "Molecular Orbital Theory",
    "Hydrogen Bonding"
  ],
  "Thermodynamics": [
    "System and Surroundings",
    "Types of Systems",
    "First Law of Thermodynamics",
    "Enthalpy Changes",
    "Hess’s Law",
    "Spontaneity and Gibbs Energy"
  ],
  "Equilibrium": [
    "Chemical Equilibrium",
    "Law of Mass Action",
    "Le Chatelier’s Principle",
    "Ionic Equilibrium",
    "pH and Buffer",
    "Solubility Product"
  ],
    
      "Redox Reactions": [
    "Oxidation and Reduction",
    "Redox Reactions in Terms of Electron Transfer",
    "Balancing Redox Equations",
    "Electrochemical Series"
  ],
  "Organic Chemistry Some Basic Principles and Techniques": [
    "Classification and Nomenclature of Organic Compounds",
    "Electronic Effects in Organic Compounds",
    "Types of Organic Reactions",
    "Purification and Characterization of Organic Compounds"
  ],
  "Hydrocarbons": [
    "Alkanes and their Properties",
    "Alkenes and Alkynes",
    "Aromatic Hydrocarbons",
    "Chemical Reactions of Hydrocarbons",
    "Environmental Effects"
  ]
    },
    Biology: {
      "Diversity in the Living World": [
    "What is Living?",
    "Taxonomic Categories",
    "Taxonomical Aids",
    "Five Kingdom Classification",
    "Nomenclature"
  ],
  "Biological Classification": [
    "Kingdom Monera",
    "Kingdom Protista",
    "Kingdom Fungi",
    "Kingdom Plantae and Animalia",
    "Lichens and Viruses"
  ],
  "Plant Kingdom": [
    "Algae",
    "Bryophyta",
    "Pteridophyta",
    "Gymnosperms",
    "Angiosperms",
    "Alternation of Generations"
  ],
  "Animal Kingdom": [
    "Basis of Classification",
    "Levels of Organization",
    "Phyla of Animal Kingdom",
    "Coelom and Germ Layers"
  ],
  "Morphology of Flowering Plants": [
    "Root, Stem, Leaf",
    "Inflorescence",
    "Flower, Fruit and Seed",
    "Floral Formula and Diagram"
  ],
  "Anatomy of Flowering Plants": [
    "Tissues",
    "Anatomy of Dicot and Monocot Plants",
    "Secondary Growth"
  ],
  "Structural Organisation in Animals": [
    "Animal Tissues",
    "Morphology and Anatomy of Earthworm",
    "Cockroach and Frog"
  ],
  "Cell The Unit of Life": [
    "Cell Theory",
    "Prokaryotic and Eukaryotic Cells",
    "Cell Organelles",
    "Structure of Plasma Membrane"
  ],
  "Biomolecules": [
    "Carbohydrates, Proteins and Fats",
    "Nucleic Acids",
    "Enzymes",
    "Structure and Functions of Biomolecules"
  ],
  "Cell Cycle and Cell Division": [
    "Cell Cycle Phases",
    "Mitosis",
    "Meiosis",
    "Significance of Cell Division"
  ],
  "Transport in Plants": [
    "Means of Transport",
    "Plant-Water Relations",
    "Long Distance Transport of Water",
    "Transpiration",
    "Transport of Food"
  ],
  "Mineral Nutrition": [
    "Essential Minerals",
    "Deficiency Symptoms",
    "Nitrogen Cycle and Fixation",
    "Mechanism of Uptake"
  ],
  "Photosynthesis in Higher Plants": [
    "Light Reaction",
    "Calvin Cycle",
    "Photorespiration",
    "C4 Pathway"
  ],
  "Respiration in Plants": [
    "Glycolysis",
    "Fermentation",
    "Krebs Cycle",
    "Electron Transport Chain",
    "ATP Synthesis"
  ],
  "Plant Growth and Development": [
    "Growth Phases",
    "Plant Growth Regulators",
    "Photoperiodism",
    "Vernalisation"
  ],
  "Digestion and Absorption": [
    "Digestive Organs",
    "Enzymes and Glands",
    "Process of Digestion",
    "Absorption and Assimilation"
  ],
  "Breathing and Exchange of Gases": [
    "Respiratory System",
    "Mechanism of Breathing",
    "Exchange of Gases",
    "Transport of Gases"
  ],
  "Body Fluids and Circulation": [
    "Blood and Lymph",
    "Human Heart",
    "Cardiac Cycle",
    "Blood Pressure",
    "ECG"
  ],
  "Excretory Products and Their Elimination": [
    "Human Excretory System",
    "Urine Formation",
    "Osmoregulation",
    "Disorders of Excretory System"
  ],
  "Locomotion and Movement": [
    "Types of Movement",
    "Skeletal System",
    "Muscle Contraction",
    "Joints and Disorders"
  ],
  "Neural Control and Coordination": [
    "Structure of Neuron",
    "Central Nervous System",
    "Reflex Action",
    "Sense Organs (Eye and Ear)"
  ],
  "Chemical Coordination and Integration": [
    "Endocrine Glands",
    "Hormones and their Actions",
    "Mechanism of Hormonal Action",
    "Disorders of Endocrine System"
  ]
    },
  },
  "12": {
    "Mathematics": {
      "Relations and Functions": [
    "Types of Relations",
    "Reflexive, Symmetric, Transitive Relations",
    "Equivalence Relations",
    "Types of Functions",
    "Composition of Functions",
    "Inverse of a Function"
  ],
  "Inverse Trigonometric Functions": [
    "Definition and Range",
    "Principal Value Branches",
    "Properties of Inverse Trigonometric Functions",
    "Graphs and Domains"
  ],
  "Matrices": [
    "Concept of Matrix and Types",
    "Matrix Operations (Addition, Multiplication)",
    "Transpose of a Matrix",
    "Symmetric and Skew Symmetric Matrices",
    "Invertible Matrices and Properties"
  ],
  "Determinants": [
    "Determinant of Order 2 and 3",
    "Properties of Determinants",
    "Minors and Cofactors",
    "Adjoint and Inverse of a Matrix",
    "Solving System of Linear Equations using Determinants"
  ],
  "Continuity and Differentiability": [
    "Continuity of Functions",
    "Differentiability and Derivatives",
    "Chain Rule",
    "Implicit and Logarithmic Differentiation",
    "Exponential and Trigonometric Differentiation"
  ],
  "Applications of Derivatives": [
    "Rate of Change of Quantities",
    "Increasing and Decreasing Functions",
    "Tangents and Normals",
    "Maxima and Minima",
    "Applications in Economics and Real Life"
  ],
  "Integrals": [
    "Indefinite Integrals",
    "Integration by Substitution, Parts and Partial Fractions",
    "Definite Integrals and Properties",
    "Fundamental Theorem of Calculus"
  ],
  "Application of Integrals": [
    "Area under Simple Curves",
    "Area between Two Curves"
  ],
  "Differential Equations": [
    "Basic Concepts and Definitions",
    "General and Particular Solutions",
    "Formation of Differential Equations",
    "First Order Linear Equations",
    "Separable Variable Method"
  ],
  "Vector Algebra": [
    "Vectors and Their Types",
    "Addition and Multiplication of Vectors",
    "Scalar and Vector (Dot and Cross) Products",
    "Applications in Geometry"
  ],
  "Three Dimensional Geometry": [
    "Direction Cosines and Direction Ratios",
    "Equation of a Line in Space",
    "Equation of a Plane",
    "Angle Between Lines and Planes",
    "Shortest Distance Between Lines"
  ],
  "Linear Programming": [
    "Formulation of LPP",
    "Graphical Method of Solution",
    "Feasible Region and Optimal Solution"
  ],
  "Probability": [
    "Conditional Probability",
    "Bayes’ Theorem",
    "Random Variables and Probability Distributions",
    "Mean and Variance of a Probability Distribution"
  ]
    },
    
    "Physics": {
      "Electric Charges and Fields": [
    "Basic Properties of Electric Charge",
    "Coulomb's Law",
    "Superposition Principle",
    "Electric Field and Field Lines",
    "Electric Dipole",
    "Electric Flux",
    "Gauss’s Law and Its Applications"
  ],
  "Electrostatic Potential and Capacitance": [
    "Electric Potential",
    "Potential Due to a Point Charge and Dipole",
    "Equipotential Surfaces",
    "Relation Between Field and Potential",
    "Capacitors and Capacitance",
    "Parallel Plate Capacitor",
    "Combination of Capacitors",
    "Energy Stored in a Capacitor"
  ],
  "Current Electricity": [
    "Electric Current",
    "Drift of Electrons and Resistance",
    "Ohm’s Law and Conductance",
    "Resistivity and Factors Affecting Resistance",
    "Combination of Resistors",
    "Kirchhoff’s Laws",
    "Wheatstone Bridge",
    "Meter Bridge",
    "Potentiometer"
  ],
  "Moving Charges and Magnetism": [
    "Magnetic Force on Moving Charges",
    "Motion in Magnetic Field",
    "Cyclotron",
    "Current-Carrying Conductors",
    "Ampere’s Circuital Law",
    "Magnetic Field Due to Long Straight Wire, Circular Loop, Solenoid",
    "Torque on a Current Loop",
    "Moving Coil Galvanometer"
  ],
  "Magnetism and Matter": [
    "Bar Magnet and Magnetic Field Lines",
    "Magnetic Field Due to a Magnetic Dipole",
    "Torque on a Magnetic Dipole",
    "Earth’s Magnetism",
    "Magnetisation and Magnetic Intensity",
    "Magnetic Properties of Materials",
    "Hysteresis"
  ],
  "Electromagnetic Induction": [
    "Faraday’s Laws of Induction",
    "Lenz’s Law",
    "Eddy Currents",
    "Induced EMF and Current",
    "Self and Mutual Inductance",
    "Energy Stored in Inductor"
  ],
  "Alternating Current": [
    "AC Voltage Applied to Resistor, Inductor and Capacitor",
    "LCR Series Circuit",
    "Impedance and Reactance",
    "Resonance in AC Circuit",
    "Power in AC Circuit",
    "Power Factor",
    "Transformers"
  ],
  "Electromagnetic Waves": [
    "Displacement Current",
    "Maxwell’s Equations (Qualitative)",
    "Electromagnetic Spectrum",
    "Properties and Applications of EM Waves"
  ],
    
      "Ray Optics and Optical Instruments": [
    "Reflection of Light by Spherical Mirrors",
    "Refraction of Light",
    "Total Internal Reflection",
    "Refraction Through Lenses",
    "Lens Formula and Magnification",
    "Power of Lens",
    "Prism and Dispersion",
    "Microscopes and Telescopes"
  ],
  "Wave Optics": [
    "Huygens Principle",
    "Interference of Light",
    "Young’s Double Slit Experiment",
    "Diffraction and Polarisation",
    "Coherent Sources"
  ],
  "Dual Nature of Radiation and Matter": [
    "Photoelectric Effect",
    "Einstein’s Photoelectric Equation",
    "Dual Nature of Matter",
    "de Broglie Wavelength",
    "Davisson-Germer Experiment"
  ],
  "Atoms": [
    "Rutherford’s Model of Atom",
    "Bohr’s Model and Postulates",
    "Energy Levels and Spectra",
    "Hydrogen Spectrum"
  ],
  "Nuclei": [
    "Atomic Mass Unit and Binding Energy",
    "Mass Defect",
    "Nuclear Fission and Fusion",
    "Radioactivity Laws",
    "Nuclear Reactions"
  ],
  "Semiconductor Electronics Materials Devices and Simple Circuits": [
    "Classification of Materials",
    "Intrinsic and Extrinsic Semiconductors",
    "p-n Junction and Diode",
    "Zener Diode and its Applications",
    "Transistor and Logic Gates",
    "LED, Photodiode, Solar Cell"
  ]
},
    "Chemistry": {
      "Solutions": [
    "Types of Solutions",
    "Concentration of Solutions",
    "Solubility",
    "Vapour Pressure of Liquid Solutions",
    "Raoult’s Law",
    "Ideal and Non-Ideal Solutions",
    "Colligative Properties",
    "Abnormal Molar Masses"
  ],
  "Electrochemistry": [
    "Electrochemical Cells",
    "Galvanic Cells",
    "Nernst Equation",
    "Conductance and Molar Conductivity",
    "Electrolytic Cells",
    "Batteries and Fuel Cells",
    "Corrosion"
  ],
  "Chemical Kinetics": [
    "Rate of Reaction",
    "Order and Molecularity",
    "Integrated Rate Equations",
    "Half Life",
    "Effect of Temperature (Arrhenius Equation)",
    "Catalysis"
  ],
  "The d and f Block Elements": [
    "Electronic Configuration",
    "General Properties of d-block",
    "Transition Metals",
    "Lanthanides and Actinides",
    "Oxidation States and Color",
    "Magnetic Properties"
  ],
  "Coordination Compounds": [
    "Coordination Number",
    "Nomenclature",
    "Bonding in Coordination Compounds",
    "Werner’s Theory",
    "VBT and Crystal Field Theory",
    "Isomerism",
    "Applications"
  ],
    
      "Haloalkanes and Haloarenes": [
    "Nomenclature",
    "Nature of C–X Bond",
    "Preparation of Haloalkanes and Haloarenes",
    "Physical and Chemical Properties",
    "Substitution Reactions",
    "Uses and Environmental Effects"
  ],
  "Alcohols Phenols and Ethers": [
    "Classification and Nomenclature",
    "Preparation Methods",
    "Properties of Alcohols and Phenols",
    "Reactions of Ethers",
    "Mechanisms",
    "Distinguishing Tests"
  ],
  "Aldehydes Ketones and Carboxylic Acids": [
    "Structure of Carbonyl Group",
    "Preparation and Properties",
    "Nucleophilic Addition Reactions",
    "Oxidation and Reduction",
    "Uses and Tests"
  ],
  "Amines": [
    "Classification and Structure",
    "Preparation of Amines",
    "Basicity and Reactions",
    "Diazonium Salts",
    "Coupling Reactions",
    "Distinction Tests"
  ],
  "Biomolecules": [
    "Carbohydrates: Monosaccharides, Disaccharides, Polysaccharides",
    "Proteins and Enzymes",
    "Vitamins",
    "Nucleic Acids (DNA & RNA)",
    "Biological Functions"
  ]
    },
    Biology: {
      "Reproduction in Organisms": [
    "Asexual and Sexual Reproduction",
    "Reproductive Structures",
    "Life Span and Reproductive Phases"
  ],
  "Human Reproduction": [
    "Male and Female Reproductive Systems",
    "Gametogenesis",
    "Menstrual Cycle",
    "Fertilization and Implantation",
    "Pregnancy and Embryonic Development"
  ],
  "Reproductive Health": [
    "Need for Reproductive Health",
    "Contraceptive Methods",
    "Medical Termination of Pregnancy (MTP)",
    "Infertility and ART (IVF, IUI etc.)",
    "Sexually Transmitted Infections (STIs)"
  ],
  "Principles of Inheritance and Variation": [
    "Mendel’s Laws",
    "Dihybrid Cross and Law of Independent Assortment",
    "Chromosomal Theory of Inheritance",
    "Sex Determination",
    "Pedigree Analysis"
  ],
  "Molecular Basis of Inheritance": [
    "DNA Structure and Replication",
    "RNA and Transcription",
    "Genetic Code and Translation",
    "Regulation of Gene Expression",
    "Human Genome Project",
    "DNA Fingerprinting"
  ],
  "Evolution": [
    "Origin of Life",
    "Theories of Evolution",
    "Evidences for Evolution",
    "Hardy-Weinberg Principle",
    "Speciation and Adaptive Radiation"
  ],
  "Human Health and Disease": [
    "Common Diseases (Bacterial, Viral, Protozoan)",
    "Immunity and Immune System",
    "Vaccination and Allergies",
    "AIDS and Cancer",
    "Drugs and Alcohol Abuse"
  ],
  "Strategies for Enhancement in Food Production": [
    "Animal Husbandry",
    "Plant Breeding",
    "Single Cell Protein",
    "Tissue Culture Techniques"
  ],
  "Microbes in Human Welfare": [
    "Microbes in Household Products",
    "Microbes in Industrial Production",
    "Microbes in Sewage Treatment",
    "Antibiotics and Bio-Control Agents"
  ],
  "Biotechnology Principles and Processes": [
    "Tools of Recombinant DNA Technology",
    "Cloning Vectors",
    "Steps in Genetic Engineering",
    "PCR and Gel Electrophoresis"
  ],
  "Biotechnology and Its Applications": [
    "Transgenic Animals and Plants",
    "Gene Therapy",
    "GM Crops (Bt Cotton)",
    "Biosafety Issues",
    "Biopiracy and Patents"
  ],
  "Organisms and Populations": [
    "Population Growth Models",
    "Ecological Adaptations",
    "Population Interactions (Predation, Competition, Mutualism)"
  ],
  "Ecosystem": [
    "Ecosystem Structure and Function",
    "Energy Flow and Food Chains",
    "Ecological Pyramids",
    "Nutrient Cycling",
    "Ecosystem Services"
  ],
  "Biodiversity and Conservation": [
    "Levels and Patterns of Biodiversity",
    "Loss of Biodiversity",
    "Conservation Strategies (In-situ, Ex-situ)",
    "Hotspots and Endangered Species"
  ],
  "Environmental Issues": [
    "Air and Water Pollution",
    "Global Warming and Climate Change",
    "Solid Waste Management",
    "Ozone Depletion and Deforestation"
  ]
    },
  },
};

export const DailyCheckIn = () => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedConcept, setSelectedConcept] = useState("");
  const [mood, setMood] = useState("neutral");

  useEffect(() => {
    const storedStudentInfo = localStorage.getItem("studentInfo");
    if (storedStudentInfo) {
      const { fullName } = JSON.parse(storedStudentInfo);
      setStudentName(fullName);
    }
    const hour = new Date().getHours();
    setGreeting(
      hour < 12
        ? "Good morning"
        : hour < 18
        ? "Good afternoon"
        : "Good evening"
    );
  }, []);

  const subjects = selectedClass
    ? Object.keys(curriculumData[selectedClass] || {})
    : [];
  const chapters = selectedSubject
    ? Object.keys(curriculumData[selectedClass]?.[selectedSubject] || {})
    : [];
  const concepts =
    selectedChapter && selectedSubject && selectedClass
      ? curriculumData[selectedClass]?.[selectedSubject]?.[selectedChapter] || []
      : [];

  const handleStart = () => {
    if (
      selectedClass &&
      selectedSubject &&
      selectedChapter &&
      selectedConcept
    ) {
      localStorage.setItem(
        "currentStudySession",
        JSON.stringify({
          classLevel: selectedClass,
          subject: selectedSubject,
          chapter: selectedChapter,
          concept: selectedConcept,
          mood,
          timestamp: new Date().toISOString(),
        })
      );
      navigate("/study");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <MotivationalQuote />

        <div className="mt-8 edu-card animate-fade-in">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {greeting}, {studentName}!
              </h2>
              <p className="text-muted-foreground">
                What would you like to learn today?
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="class" className="block text-sm font-medium">
                Class
              </label>
              <select
                id="class"
                className="edu-input w-full"
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setSelectedSubject("");
                  setSelectedChapter("");
                  setSelectedConcept("");
                }}
              >
                <option value="">Select class</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>

            {selectedClass && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="edu-input w-full"
                    value={selectedSubject}
                    onChange={(e) => {
                      setSelectedSubject(e.target.value);
                      setSelectedChapter("");
                      setSelectedConcept("");
                    }}
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedSubject && (
                  <div className="space-y-2">
                    <label
                      htmlFor="chapter"
                      className="block text-sm font-medium"
                    >
                      Chapter
                    </label>
                    <select
                      id="chapter"
                      className="edu-input w-full"
                      value={selectedChapter}
                      onChange={(e) => {
                        setSelectedChapter(e.target.value);
                        setSelectedConcept("");
                      }}
                    >
                      <option value="">Select a chapter</option>
                      {chapters.map((chapter) => (
                        <option key={chapter} value={chapter}>
                          {chapter}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedChapter && (
                  <div className="space-y-2">
                    <label
                      htmlFor="concept"
                      className="block text-sm font-medium"
                    >
                      Concept
                    </label>
                    <select
                      id="concept"
                      className="edu-input w-full"
                      value={selectedConcept}
                      onChange={(e) => setSelectedConcept(e.target.value)}
                    >
                      <option value="">Select a concept</option>
                      {concepts.map((concept) => (
                        <option key={concept} value={concept}>
                          {concept}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-3">
              <label className="block text-sm font-medium">
                How are you feeling today?
              </label>
              <div className="flex justify-between items-center">
                {[
                  { value: "struggling", emoji: "😓" },
                  { value: "neutral", emoji: "😐" },
                  { value: "confident", emoji: "🙂" },
                ].map(({ value, emoji }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setMood(value)}
                    className={`p-3 flex-1 flex flex-col items-center rounded-xl transition-all ${
                      mood === value
                        ? "bg-soft-purple text-white"
                        : "bg-soft-gray/50"
                    }`}
                  >
                    <span className="text-2xl">{emoji}</span>
                    <span className="text-xs mt-1 capitalize">{value}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleStart}
                disabled={
                  !selectedClass ||
                  !selectedSubject ||
                  !selectedChapter ||
                  !selectedConcept
                }
                className={`w-full rounded-xl px-6 py-3 font-medium transition-all ${
                  selectedClass &&
                  selectedSubject &&
                  selectedChapter &&
                  selectedConcept
                    ? "edu-button-primary"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DailyCheckIn;
