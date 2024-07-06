import getClients from "./clients";
import getEmployees from "./employees";
import getFinancials from "./financial";
import getProducts from "./products";
import getProjects from "./products";

export default async function getData(id: number | null) {
  switch (id) {
    case 1:
      return await getProducts();
    case 2:
      return await getClients();
    case 3:
      return await getEmployees();
    case 4:
      return await getProjects();
    case 5:
      return await getFinancials();
  }
}
