import Projects from "../types/projects";
import httpAdapter from "./httpAdapter";

export default async function getProjects(): Promise<Projects[]> {
  return await httpAdapter("/projects");
}
