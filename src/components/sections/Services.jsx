import Image from "next/image"
import { motion } from "framer-motion";
import SectionHeder from "../ui/SectionHeder";
import ServicesCard from "../ui/ServicesCard";

function Services({scrollToSection}) {
  return (
    <section id="services" className="py-20">
            <div className="container mx-auto px-4">
            
              <SectionHeder title="What We Offer" subtitle="Explore our range of services designed to elevate your business." />

              <ServicesCard/>
            </div>
          </section>
  )
}

export default Services