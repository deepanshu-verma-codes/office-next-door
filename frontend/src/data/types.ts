export type Tech = "JavaScript" | "React" | "TypeScript" | "Node.js";
export type DiagramType = "event-loop" | "tree" | "memory" | "terminal" | "types";

export interface AnimationStep {
  title: string;
  description: string;
  diagramState: any;
}

export interface LearnTopic {
  id: string;
  title: string;
  tech: Tech;
  description: string; // Brief intro for the card
  definition: string;
  interviewAsk: string;
  interviewAnswer: string;
  syntax: string;
  codeExample: string;
  diagramType: DiagramType;
  animationSteps: AnimationStep[];
}
