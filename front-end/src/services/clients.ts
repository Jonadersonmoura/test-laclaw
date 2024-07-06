import Clients from "../types/clients";
import httpAdapter from "./httpAdapter";

export default async function getClients(): Promise<Clients[]> {
  return await httpAdapter("/clients");
}
