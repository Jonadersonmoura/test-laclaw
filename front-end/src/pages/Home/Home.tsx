import { useEffect, useState } from "react";

// Prime
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from "primereact/columngroup";
import { RadioButton } from 'primereact/radiobutton';
import { Row } from "primereact/row";

// Hooks
import useHttpGetDataProducts from "../../hooks/httpHook";

// Utils
import Timeout from "../../utils/timeout";

// Components
import ChartBar from "../../components/Chart/ChartBar";
import Loading from "../../components/Loading/Loading";
import Nodata from "../../components/Nodata/Nodata";
import Search from "../../components/Search/Search";
import Error from "../../components/Error/Error";
import Capitalize from "../../utils/capitalize";

interface IdName {
  id: number;
  name: string;
}

interface KeyType {
  key: string;
  label: string;
  type?: string;
}

interface ColumnTable {
  key: string;
  field: string;
  header: string;
}

type StatusType = "SUCCESS" | "LOADING" | "NODATA" | "ERROR" | "SEARCH"

enum Status {
  LOADING = "LOADING",
  NODATA = "NODATA",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  SEARCH = "SEARCH",
}

const fontList: IdName[] = [
  {
    id: 1,
    name: "Produtos",
  },
  {
    id: 2,
    name: "Clientes",
  },
  {
    id: 3,
    name: "Funcionários",
  },
  {
    id: 4,
    name: "Projetos",
  },
  {
    id: 5,
    name: "Financeiro",
  },
];

// Styles
const styles = {
  home: {
    height: "calc(100vh - 72px)",
  },
  container: {
    height: "calc(100% - 38px)"
  },
  success: {
    alignSelf: "flex-start"
  }
};

export default function Home() {

  const [status, setStatus] = useState<StatusType>("SEARCH")
  const [currentFontData, setCurrentFontData] = useState<any>(null);

  const [fieldsTotal, setFieldsTotal] = useState<KeyType[]>([]);
  const [fieldsView, setFieldsView] = useState<KeyType[]>([]);
  const [fieldsDetails, setFieldsDetail] = useState<KeyType[]>([]);

  const [fieldTotalSelected, setFieldTotalSelected] = useState<any>(null);
  const [fieldViewSelected, setFieldViewSelected] = useState<any>(null);
  const [fieldDetailSelected, setFieldDetailSelected] = useState<any>(null);

  const [dataTable, setDataTable] = useState<any>([])
  const [dataGraph, setDataGraph] = useState<number[]>([])
  const [columnTable, setColumnsTable] = useState<ColumnTable[]>([])
  const [axisGraph, setAxisGraph] = useState<string[]>([])

  const [optionTableChart, setOptionTableChart] = useState<string>("table")

  const [total, setTotal] = useState<number>(0)
  const [currency, setCurrency] = useState<boolean>(false)

  const { data, isLoading } = useHttpGetDataProducts(currentFontData)

  useEffect(() => {
    if (data) splitValueDetail(data);
  }, [data]);

  useEffect(() => {
    console.log(fieldsView)
    console.log(fieldViewSelected)
    const details = fieldsView.filter((field) => fieldViewSelected.key !== field.key)
    setFieldsDetail(details)
  }, [fieldViewSelected]);

  const splitValueDetail = (data: any) => {
    const obj = data[0];
    const keys = Object.keys(obj);

    const total: KeyType[] = [];
    const view: KeyType[] = [];

    keys.forEach((key) => {
      typeof obj[key] === "string" ? view.push({ key: key, label: Capitalize(key) }) : key !== "id" && total.push({
        key: key,
        label: Capitalize(key).replace("_", " "),
      });
    });

    setFieldsTotal(total);
    setFieldsView(view);
  };

  const checkType = (key: string): boolean => {
    const listCurrency = [
      "orcamento",
      "preco",
      "valor",
      "valor_total",
      "salario"
    ]
    return listCurrency.includes(key)
  }

  const filterData = async () => {

    setStatus("LOADING")

    await Timeout(2000)

    setStatus("SUCCESS")

    generateData()
  };

  const generateData = () => {
    const newData: any = data?.map((item: any) => {
      const view = fieldViewSelected['key']
      const total = fieldTotalSelected["key"]
      return {
        [view]: item[view],
        [total]: item[total],
      }
    }).reduce((acc: any, arr: any) => {
      const view = fieldViewSelected['key']
      const total = fieldTotalSelected["key"]

      const includeView = acc?.some((item: any) => item[view] === arr[view])

      if (!includeView) {
        return [
          ...acc,
          arr
        ]
      }
      return [...acc.map((a: any) => {
        return a[view] === arr[view] ? { [view]: arr[view], [total]: a[total] += arr[total] } : a
      })]

    }, []);

    console.log(newData)
    setDataTable(newData)

    const total = data?.reduce((acc: number, arr: any) => {
      return acc + arr[fieldTotalSelected!['key']]
    }, 0)

    setTotal(total!)
    setCurrency(checkType(fieldTotalSelected["key"]))

    const keys = Object.keys(newData![0])?.map((key: any, index: number) => {
      return {
        key: key + index,
        field: key,
        header: key.replace("_", " "),
      }
    })
    setColumnsTable(keys!)

    const axisGraph = newData?.map((axis: any) => axis[fieldViewSelected['key']])
    setAxisGraph(axisGraph!)

    const dataGraph = newData?.map((axis: any) => axis[fieldTotalSelected['key']])
    setDataGraph(dataGraph!)
  }

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column footer="Total:" />
        <Column footer={`${currency ? "R$" : ""} ${total}`} />
      </Row>
    </ColumnGroup>
  )


  const getTableChart = () => {
    switch (optionTableChart) {
      case "table":
        return <DataTable value={dataTable} footerColumnGroup={footerGroup} tableStyle={{ minWidth: '50rem' }}>
          {
            columnTable.map((column) => (
              <Column key={column.key} field={column.field} header={column.header} body={template}></Column>
            ))
          }
        </DataTable>
      case "chart":
        return <ChartBar axis={axisGraph} data={dataGraph} currency={currency} />
    }
  }

  const template = (item: any, option: any) => {
    if (checkType(option.field)) return <> R$ {item[option.field]}</>
    return <>{item[option.field]}</>
  }

  return (
    <div className="bg-white m-3 py-5 px-3" style={styles.home}>
      <div className="flex gap-2">
        <FloatLabel>
          <Dropdown
            inputId="fontData"
            value={currentFontData}
            onChange={(e) => {
              setCurrentFontData(e.value)
            }}
            options={fontList}
            optionLabel="name"
            optionValue="id"
            className="w-full sm:w-16rem md:w-20rem"
            placeholder="Fonte de dados"
          />
          <label htmlFor="fontData">Fonte de dados</label>
        </FloatLabel>

        <FloatLabel>
          <Dropdown
            inputId="sumTotal"
            value={fieldTotalSelected}
            onChange={(e) => setFieldTotalSelected(e.value)}
            optionLabel="label"
            options={fieldsTotal}
            loading={isLoading}
            className="w-full sm:w-16rem md:w-20rem"
            placeholder="Soma / Totalização"
          />
          <label htmlFor="sumTotal">Soma / Totalização</label>
        </FloatLabel>

        <FloatLabel>
          <Dropdown
            inputId="viewBy"
            value={fieldViewSelected}
            onChange={(e) => setFieldViewSelected(e.value)}
            options={fieldsView}
            loading={isLoading}
            className="w-full sm:w-16rem md:w-20rem"
            placeholder="Visualizar por"
          />
          <label htmlFor="viewBy">Visualizar por</label>
        </FloatLabel>

        <FloatLabel>
          <Dropdown
            inputId="viewBy"
            value={fieldDetailSelected}
            onChange={(e) => setFieldDetailSelected(e.value)}
            options={fieldsDetails}
            loading={isLoading}
            className="w-full sm:w-16rem md:w-20rem"
            placeholder="Detalhar por"
          />
          <label htmlFor="viewBy">Detalhar por</label>
        </FloatLabel>

        <Button label="Filtrar" onClick={() => filterData()} disabled={!currentFontData} />
      </div>
      <div className="flex justify-content-center align-items-center my-3" style={styles.container}>
        {status === Status.LOADING && <Loading />}
        {status === Status.NODATA && <Nodata />}
        {status === Status.ERROR && <Error />}
        {status === Status.SEARCH && <Search />}
        {
          status === Status.SUCCESS &&
          <div className="flex flex-column gap-3 w-full" style={styles.success}>
            <div className="flex gap-3">
              <div className="flex align-items-center">
                <RadioButton inputId="table" name="table" value="table" onChange={(e) => setOptionTableChart(e.value)} checked={optionTableChart === 'table'} />
                <label htmlFor="table" className="ml-2">Tabela</label>
              </div>
              <div className="flex align-items-center">
                <RadioButton inputId="chart" name="chart" value="chart" onChange={(e) => setOptionTableChart(e.value)} checked={optionTableChart === 'chart'} />
                <label htmlFor="chart" className="ml-2">Gráfico</label>
              </div>
            </div>
            <div className="mt-3">
              {getTableChart()}
            </div>
          </div>
        }
      </div>
    </div>
  );
}
