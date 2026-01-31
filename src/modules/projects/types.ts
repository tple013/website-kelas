export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: "completed" | "in-progress" | "planned";
  teamMembers: string[];
  githubUrl?: string;
}