export interface ProjectType {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  screenshots?: string[];
}
