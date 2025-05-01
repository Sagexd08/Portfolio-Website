export interface Project {
  id?: string;
  title: string;
  description: string;
  longDescription?: string;
  slug: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSubmission {
  title: string;
  description: string;
  longDescription?: string;
  slug: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
}