import { useQuery } from "react-query";
import getData from "../services/httpClient";

export default function useHttpGetData(id: number | null) {
  return useQuery(["products", id], () => getData(id), {
    enabled: !!id,
  });
}
