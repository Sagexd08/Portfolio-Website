import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { projects } from '@/data/projects';

const Projects = () => {
  const [filter, setFilter] = useState<string | null>(null);

  // Extract all unique tags from projects
  const allTags = Array.from(
    new Set(
      projects.flatMap(project => project.technologies)
    )
  );

  // Filter projects based on selected tag
  const filteredProjects = filter
    ? projects.filter(project => project.technologies.includes(filter))
    : projects;

  return (
    <section id="projects" className="py-24 bg-dark-lighter">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="heading-lg gradient-text mb-4">My Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-xl text-light/70 max-w-3xl mx-auto">
            Explore my latest work in AI and machine learning
          </p>
        </motion.div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === null
                ? 'bg-primary text-white'
                : 'bg-dark-darker text-light/70 hover:text-white'
            }`}
            onClick={() => setFilter(null)}
          >
            All
          </motion.button>

          {allTags.map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === tag
                  ? 'bg-primary text-white'
                  : 'bg-dark-darker text-light/70 hover:text-white'
              }`}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Card
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.technologies}
                demoLink={project.demoUrl}
                githubLink={project.githubUrl}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-light/70 text-lg">No projects found with the selected filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;