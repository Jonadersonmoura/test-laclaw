import Employees from "../types/employees";
import httpAdapter from "./httpAdapter";

export default async function getFinancials(): Promise<Employees[]> {
  return await httpAdapter("/financial");
}
