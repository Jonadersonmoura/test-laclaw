import ReactECharts from 'echarts-for-react';

import type { ComposeOption } from "echarts/core";

import type {
    // The series option types are defined with the SeriesOption suffix
    BarSeriesOption,
    LineSeriesOption,
} from "echarts/charts";
import type {
    // The component option types are defined with the ComponentOption suffix
    TitleComponentOption,
    TooltipComponentOption,
    GridComponentOption,
    DatasetComponentOption,
} from "echarts/components";
import { useEffect } from 'react';

type ECOption = ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
>;

interface Props {
    axis: string[];
    data: any;
    currency: boolean;
}

export default function ChartBar({ axis, data, currency }: Props) {

    useEffect(() => {
        // console.log(axis)
        // console.log(data)
    }, [])

    const options: ECOption = {
        tooltip: {
            show: true
        },
        legend: {
            show: true
        },
        grid: {
            left: "5%",
            top: "5%",
            right: "3%",
        },
        xAxis: {
            type: 'category',
            data: axis
        },
        yAxis: {
            type: 'value'
        },
        series: data
    }

    return (
        <ReactECharts
            option={options}
            style={{
                width: "100%",
                height: "550px"
            }}
        />)
}