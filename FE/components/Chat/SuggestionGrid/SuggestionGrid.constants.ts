import {
  Code2,
  FileText,
  Plane,
  Lightbulb,
} from "lucide-react";

import type { Suggestion } from "./SuggestionGrid.types";

export const SUGGESTIONS: Suggestion[] = [
  {
    id: "generate-code",
    title: "Generate Code",
    description: "Build components and APIs.",
    icon: Code2,
  },
  {
    id: "write-content",
    title: "Write Content",
    description: "Emails, blogs and documentation.",
    icon: FileText,
  },
  {
    id: "plan-trip",
    title: "Plan a Trip",
    description: "Create itineraries and budgets.",
    icon: Plane,
  },
  {
    id: "brainstorm",
    title: "Brainstorm Ideas",
    description: "Explore creative solutions.",
    icon: Lightbulb,
  },
];