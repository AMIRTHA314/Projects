// Configuration constants for the revision companion app

// Revision modes
export const REVISION_MODES = {
  MORNING: "morning" as const,
  NIGHT: "night" as const,
};

// Education system IDs and names
export const EDUCATION_BOARDS = [
  { id: "cbse", name: "CBSE Board" }
];

// Available classes from 10th to 12th
export const AVAILABLE_CLASSES = [
  { id: "10", name: "10" },
  { id: "11", name: "11" },
  { id: "12", name: "12" }
];

// Subject mapping (could be expanded based on board and class in real API)
export const SUBJECTS = [
  { id: "math", name: "Mathematics" },
  { id: "physics", name: "Physics" },
  { id: "chemistry", name: "Chemistry" },
  { id: "biology", name: "Biology" },
  { id: "english", name: "English" },
  { id: "social", name: "Social Science" }
];

// Chapter mapping by subject
export const CHAPTERS_BY_SUBJECT = {
  math: [
    { id: "math1", name: "Algebra" },
    { id: "math2", name: "Geometry" },
    { id: "math3", name: "Trigonometry" },
    { id: "math4", name: "Statistics" }
  ],
  physics: [
    { id: "phys1", name: "Motion and Force" },
    { id: "phys2", name: "Energy and Work" },
    { id: "phys3", name: "Sound" },
    { id: "phys4", name: "Light" }
  ],
  chemistry: [
    { id: "chem1", name: "Matter" },
    { id: "chem2", name: "Periodic Table" },
    { id: "chem3", name: "Chemical Reactions" },
    { id: "chem4", name: "Acids and Bases" }
  ]
};

// Concepts by chapter ID
export const CONCEPTS_BY_CHAPTER = {
  phys1: [
    {
      id: "phys1_c1",
      title: "Newton's First Law",
      content: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.",
      audioUrl: "/placeholder.svg"
    },
    {
      id: "phys1_c2",
      title: "Newton's Second Law",
      content: "The acceleration of an object depends directly on the net force acting on the object and inversely on its mass. F = ma",
      audioUrl: "/placeholder.svg"
    },
    {
      id: "phys1_c3",
      title: "Newton's Third Law",
      content: "For every action, there is an equal and opposite reaction.",
      audioUrl: "/placeholder.svg"
    }
  ],
  math1: [
    {
      id: "math1_c1",
      title: "Linear Equations",
      content: "Equations that form a straight line when graphed, typically in the form ax + b = c.",
      audioUrl: "/placeholder.svg"
    },
    {
      id: "math1_c2",
      title: "Quadratic Equations",
      content: "Equations of the form ax² + bx + c = 0, which can be solved using the quadratic formula.",
      audioUrl: "/placeholder.svg"
    }
  ]
};

// Morning revision cards
export const MORNING_REVISIONS = [
  {
    id: "m1",
    title: "Newton's Laws of Motion",
    content: "1. An object at rest stays at rest, and an object in motion stays in motion unless acted upon by a force. 2. F=ma. 3. For every action, there is an equal and opposite reaction.",
    audioUrl: "/placeholder.svg",
    subject: "Physics",
  },
  {
    id: "m2",
    title: "Periodic Table Structure",
    content: "Elements are arranged by increasing atomic number. Groups (vertical) have similar properties. Periods (horizontal) show trends in properties.",
    audioUrl: "/placeholder.svg",
    subject: "Chemistry",
  },
  {
    id: "m3",
    title: "Quadratic Formula",
    content: "x = (-b ± √(b² - 4ac)) / 2a is used to solve any quadratic equation in the form ax² + bx + c = 0",
    audioUrl: "/placeholder.svg",
    subject: "Mathematics",
  }
];

// Night revision cards
export const NIGHT_REVISIONS = [
  {
    id: "n1",
    title: "Photosynthesis Story",
    content: "Imagine tiny solar panels inside leaves, collecting sunlight and transforming it into food energy for the plant...",
    audioUrl: "/placeholder.svg",
    subject: "Biology",
  },
  {
    id: "n2",
    title: "Magnets and Fields",
    content: "Invisible forces reach out between magnets, creating pull and push that we can feel but not see...",
    audioUrl: "/placeholder.svg",
    subject: "Physics",
  },
  {
    id: "n3",
    title: "Pythagorean Theorem",
    content: "In any right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.",
    audioUrl: "/placeholder.svg",
    subject: "Mathematics",
  }
];

// Response formats for DoubtAsker component
export const AI_RESPONSES = {
  "Mathematics-Linear Equations": "Great question about Linear Equations! Linear equations are equations that form a straight line when plotted on a graph. The general form is ax + b = c, where a, b, and c are constants. To solve them, isolate the variable on one side. For example, with 2x + 3 = 9, subtract 3 from both sides to get 2x = 6, then divide by 2 to get x = 3.",
  "default": "Thanks for your question about {concept} in {subject}. In a full implementation, this would connect to an AI to provide a helpful, detailed response specific to your doubt."
};
