import { FirebaseService } from './firebaseService';
import { Project, ProjectSubmission } from '../types/Project';

class ProjectsService extends FirebaseService<Project> {
  constructor() {
    super('projects');
  }
  
  // Get featured projects
  async getFeaturedProjects(): Promise<Project[]> {
    return this.query(
      [{ field: 'featured', operator: '==', value: true }],
      'order',
      'asc'
    );
  }
  
  // Get project by slug
  async getProjectBySlug(slug: string): Promise<Project | null> {
    const projects = await this.query(
      [{ field: 'slug', operator: '==', value: slug }],
      undefined,
      undefined,
      1
    );
    
    return projects.length > 0 ? projects[0] : null;
  }
  
  // Create a new project
  async createProject(project: ProjectSubmission): Promise<Project> {
    const now = new Date().toISOString();
    
    return this.create({
      ...project,
      createdAt: now,
      updatedAt: now,
      order: (await this.getAll()).length + 1
    });
  }
  
  // Update a project
  async updateProject(id: string, project: Partial<Project>): Promise<void> {
    const updatedData = {
      ...project,
      updatedAt: new Date().toISOString()
    };
    
    await this.update(id, updatedData);
  }
}

// Create singleton instance
const projectsService = new ProjectsService();
export default projectsService;