import { project } from "../content/project";
import { ProjectPresentation } from "./ProjectPresentation";

export const dynamic = "force-static";

export default function Home() {
  return <ProjectPresentation project={project} />;
}
