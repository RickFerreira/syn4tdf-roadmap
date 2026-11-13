import Hero from "./Hero";
import PhaseMap from "./PhaseMap";
import ProjectIntro from "./ProjectIntro";
import Roadmap from "./Roadmap";

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <PhaseMap />
      <ProjectIntro />
      <Roadmap />
    </div>
  );
}
