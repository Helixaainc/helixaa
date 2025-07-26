import Image from "next/image"
import { motion } from "framer-motion";
import SectionHeder from "../ui/SectionHeder";
import ProjectCard from "../ui/ProjectCard";

function Projects({scrollToSection}) {
  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-helixaa-green/10 to-white">
            <div className="container mx-auto px-4">
              
              <SectionHeder title="Our Projects" subtitle="Innovative solutions that drive success" />
    
              <ProjectCard/>
            </div>
          </section>
  )
}

export default Projects