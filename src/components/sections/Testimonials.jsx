import SectionHeder from "../ui/SectionHeder";
import TestimonialsCard from "../ui/TestimonialsCard";

function Testimonials({ scrollToSection }) {
  return (
    <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
         
          <SectionHeder title="What Our Clients Say" 
          subtitle="We take pride in delivering exceptional service and solutions that exceed expectations." 
          titleTextColor={"text-helixaa-green"}
          subtitleTextColor={"text-helixaa-green"}/>

          <TestimonialsCard/>
        </div>
      </section>
  )
}

export default Testimonials