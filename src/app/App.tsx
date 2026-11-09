import { phases } from "../features/roadmap/data";
import { Track } from "../features/roadmap/components/Track";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function App() {
  return <>
    <Header phases={phases} />
    <Track phases={phases} />
    <Footer />
  </>;
}
