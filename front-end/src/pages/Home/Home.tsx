import { useEffect, useState } from "react";

import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import HttpClient from "../../services/httpClient";
import { Button } from "primereact/button";

interface IdName {
  id: number;
  name: string;
}

interface IFontList extends IdName {
  url: string;
}

const fontList: IFontList[] = [
  {
    id: 1,
    name: "Produtos",
    url: "../../data/products.json",
  },
  {
    id: 2,
    name: "Clientes",
    url: "../../data/clients.json",
  },
  {
    id: 3,
    name: "Funcionários",
    url: "../../data/employees.json",
  },
  {
    id: 4,
    name: "Projetos",
    url: "../../data/projects.json",
  },
  {
    id: 5,
    name: "Financeiro",
    url: "../../data/financial.json",
  },
];

// Styles
const styles = {
  home: {
    height: "calc(100vh - 72px)",
  },
};

export default function Home() {
  const [currentFontData, setCurrentFontData] = useState<IFontList>();
  const [fieldValues, setFieldValues] = useState<string[]>([]);
  const [fieldDetails, setFieldDetails] = useState<string[]>([]);

  const [fieldValueSelected, setFieldValueSelected] = useState<any>(null);
  const [fieldDetailSelected, setFieldDetailSelected] = useState<any>(null);

  const [data, setData] = useState([]);

  const http = new HttpClient();

  useEffect(() => {
    const getData = async () => {
      const data = await http.get(currentFontData?.url!);
      setData(data);
    };
    getData();
  }, [currentFontData]);

  useEffect(() => {
    if (data && data.length > 0) splitValueDetail(data);
    splitValueDetail;
  }, [data]);

  const splitValueDetail = (data: any) => {
    const obj = data[0];
    const keys = Object.keys(obj);

    let values: string[] = [];
    let details: string[] = [];

    keys.forEach((key) => {
      typeof obj[key] === "string" ? details.push(key) : values.push(key);
    });

    setFieldValues(values);
    setFieldDetails(details);
  };

  const filterData = () => {
    const sum = data?.reduce((acc: any, arr: any) => {
      return [...acc, arr[fieldDetailSelected]];
    }, []);

    const uniqueNames = [...new Set(sum)];

    const total = uniqueNames.map((item) => {
      return {
        [item]: data
          .filter((i) => i[fieldDetailSelected] === item)
          .reduce((acc: any, arr: any) => {
            return acc + arr[fieldValueSelected];
          }, 0),
      };
    });
  };

  return (
    <div className="bg-white m-3 py-5 px-3" style={styles.home}>
      <div className="flex gap-2">
        <FloatLabel>
          <Dropdown
            inputId="fontData"
            value={currentFontData}
            onChange={(e) => setCurrentFontData(e.value)}
            options={fontList}
            optionLabel="name"
            className="w-full sm:w-16rem md:w-20rem"
          />
          <label htmlFor="fontData">Fonte de dados</label>
        </FloatLabel>

        <FloatLabel>
          <Dropdown
            inputId="sumTotal"
            value={fieldValueSelected}
            onChange={(e) => setFieldValueSelected(e.value)}
            options={fieldValues}
            // optionLabel="name"
            className="w-full sm:w-16rem md:w-20rem"
          />
          <label htmlFor="sumTotal">Soma / Totalização</label>
        </FloatLabel>

        <FloatLabel>
          <Dropdown
            inputId="sumTotal"
            value={fieldDetailSelected}
            onChange={(e) => setFieldDetailSelected(e.value)}
            options={fieldDetails}
            // optionLabel="name"
            className="w-full sm:w-16rem md:w-20rem"
          />
          <label htmlFor="sumTotal">Detalhamento dos Valores</label>
        </FloatLabel>

        <Button label="Filtrar" onClick={() => filterData()} />
      </div>
    </div>
  );
}
