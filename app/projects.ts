export interface Project {
  id: string
  name: string
  status: "completed" | "in-progress"
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  image?: string
  extendedDescription?: string
  keyFeatures?: string[]
  technicalDetails?: string
  uniqueAspect?: string
}

export const projects: Project[] = [
  {
    id: "0",
    name: "RoboVibe",
    status: "completed",
    description:
      "A browser-based, real-time multiplayer game hub where players program their in-game units using natural language prompts.",
    technologies: ["React", "Express.js", "PostgreSQL", "OpenAI API", "WebSocket", "TypeScript"],
    githubUrl: "https://github.com/bhitov/robovibe",
    liveUrl: "https://robovibe.raspyaspie.com",
    image: "/screenshots/robovibe.png",
    extendedDescription: "RoboVibe transforms natural language descriptions into executable bot behavior, allowing players to update code mid-match and dynamically evolve game strategy. The platform supports 2-16 player matches in team or free-for-all modes.",
    keyFeatures: [
      "Real-time AI coding with multiple AI model options",
      "Token-based economy system",
      "Multiple game modes including Orb Collect and Tank Combat",
      "Guest mode for instant play",
      "Server-authoritative WebSocket communication",
      "Dynamic bot behavior updates mid-match"
    ],
    technicalDetails: "Built as a TypeScript monorepo using Turborepo and pnpm workspaces. Features a server-authoritative game engine with Express.js backend, Drizzle ORM with PostgreSQL, and React frontend with Tailwind CSS. Integrates OpenAI API with custom prompt templates for natural language programming.",
    uniqueAspect: "The unique ability to program game units using natural language, making coding accessible to non-programmers while providing depth for experienced developers."
  },
  {
    id: "1",
    name: "Consenstris",
    status: "completed",
    description:
      "A multiplayer, crowd-controlled browser-based Tetris game where all visitors watch the same single-player game and collectively vote on piece movements.",
    technologies: ["JavaScript", "Node.js", "WebSocket", "Heroku"],
    githubUrl: "https://github.com/bhitov/consenstris",
    liveUrl: "https://consenstris-2b45921068e5.herokuapp.com/",
    image: "/screenshots/consenstris.png",
    extendedDescription: "Consenstris reinvents the classic Tetris experience as a social experiment in collective decision-making. All connected players view the same game instance and vote on how to move each falling piece, creating a unique collaborative gaming experience.",
    keyFeatures: [
      "NES-accurate Tetris gameplay",
      "Real-time multiplayer voting system",
      "Live vote display and activity feed",
      "High score tracking",
      "20-second cooldown after game over",
      "Keyboard controls (Arrow keys + Space)"
    ],
    technicalDetails: "Developed with vanilla JavaScript for broad compatibility, deployed on Heroku for scalability. Features WebSocket-based real-time communication for instantaneous vote synchronization across all connected clients.",
    uniqueAspect: "Transforms the solitary experience of Tetris into a social experiment where collective intelligence (or chaos) determines gameplay outcomes."
  },
  {
    id: "2",
    name: "SongPad",
    status: "completed",
    description:
      "A Next.js web application for creative songwriting and lyrics management, built as part of the Gauntlet AI bootcamp.",
    technologies: ["Next.js", "TypeScript", "React", "Vercel"],
    githubUrl: "https://github.com/bhitov/wordwise-songpad",
    image: "/screenshots/songpad.jpeg",
    extendedDescription: "SongPad provides a modern web interface for songwriters to create, edit, and organize their lyrics and musical ideas. Built with Next.js for optimal performance and developer experience.",
    keyFeatures: [
      "Modern, responsive web interface",
      "TypeScript for type safety",
      "Optimized for Vercel deployment",
      "Fast development workflow"
    ],
    technicalDetails: "Built with Next.js and TypeScript, utilizing modern React patterns and Vercel's edge network for optimal performance. Implements the Geist font family for enhanced readability."
  },
  {
    id: "3",
    name: "BondSnap",
    status: "completed",
    description:
      "A relationship-focused messaging app combining Snapchat-style ephemeral snaps with AI-powered relationship coaching.",
    technologies: ["React Native", "Expo", "Firebase", "OpenAI", "Pinecone"],
    githubUrl: "https://github.com/bhitov/snapconnect",
    image: "/screenshots/bondsnap.jpeg",
    extendedDescription: "BondSnap revolutionizes relationship communication by providing real-time AI analysis of conversation dynamics. The app combines ephemeral messaging with persistent coaching insights to help couples and friends improve their communication patterns.",
    keyFeatures: [
      "Private 'coach chat' with AI relationship insights",
      "GPT-4 analysis of conversation dynamics",
      "Measures 5:1 positivity ratio in communications",
      "Detects communication 'Four Horsemen' patterns",
      "Identifies relationship 'Love-Map' gaps",
      "Supports both romantic and platonic relationships"
    ],
    technicalDetails: "Built with React Native and Expo for cross-platform mobile deployment. Uses Firebase Realtime Database and Cloud Functions for backend, OpenAI for conversational analysis, and Pinecone vector database for semantic search capabilities.",
    uniqueAspect: "The only messaging app with an AI relationship coach that reviews messages and provides real-time, plain-English advice to improve communication patterns."
  },
  {
    id: "4",
    name: "Shortcut Finder",
    status: "in-progress",
    description:
      "A macOS menu bar app that records screen activity and uses AI to suggest keyboard shortcuts for clicked UI elements.",
    technologies: ["Python", "OpenAI API", "macOS APIs", "uv", "just"],
    githubUrl: "https://github.com/bhitov/shortcut-finder",
    image: "/screenshots/shortcut-finder.jpeg",
    extendedDescription: "Shortcut Finder solves the frustration of repeatedly performing actions without knowing their keyboard shortcuts. It watches your screen activity and intelligently suggests the shortcuts you could have used instead.",
    keyFeatures: [
      "Start/stop recording with Cmd+Ctrl+S",
      "Automatic UI element detection",
      "AI-powered shortcut recommendations",
      "Results in 'App - action - shortcut' format",
      "Mock OpenAI mode for testing",
      "Native macOS menu bar integration"
    ],
    technicalDetails: "Built with Python using modern dependency management (uv) and task automation (just). Integrates with macOS screen recording APIs and OpenAI for intelligent shortcut detection. Requires screen recording permissions.",
    uniqueAspect: "Uses AI to automatically learn and suggest keyboard shortcuts based on your actual usage patterns, eliminating the need to manually memorize shortcuts."
  },
  {
    id: "5",
    name: "EmailSmart",
    status: "in-progress",
    description:
      "An AI-powered email assistant that helps compose, manage, and optimize email communications.",
    technologies: ["React", "Node.js", "AI/ML", "Natural Language Processing"],
    image: "/placeholder.svg?height=200&width=300",
    extendedDescription: "EmailSmart leverages advanced AI to help users write more effective emails, manage their inbox intelligently, and improve communication productivity."
  },
]
