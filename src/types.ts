import { Step } from "react-joyride";

export type TourState = {
  // if the tour for the current page started (false after navigating)
  run: boolean;
  // if the entire tour is still running
  active: boolean;
  // active step
  stepIndex: number;
  steps: Step[];
};

export type Blog = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: number;
  author: string;
  content?: string;
  image?: string;
};

export enum STATUS {
  completed = "completed",
  processing = "processing",
}
