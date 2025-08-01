'use client';

import SectionHeder from "../ui/SectionHeder";
import ProjectCard from "../ui/ProjectCard";

function Projects({scrollToSection}) {
  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-helixaa-green/10 to-white">
            <div className="container mx-auto px-4">
              
              <SectionHeder title="Our Projects" subtitle="Innovative solutions that drive success" titleTextColor={"text-helixaa-green"} subtitleTextColor={"text-helixaa-blue"} />
    
              <ProjectCard/>
            </div>
          </section>
  )
}

export default Projects