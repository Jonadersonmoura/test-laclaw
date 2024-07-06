import Employees from "../types/employees";
import httpAdapter from "./httpAdapter";

export default async function getEmployees(): Promise<Employees[]> {
  return await httpAdapter("/employees");
}
