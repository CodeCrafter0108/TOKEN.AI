import { StyledChart } from './styles';
import { useEffect, useRef } from 'react';
import EChartsReact from 'echarts-for-react';
import { EChartsOption } from 'echarts';

export const Chart = () => {
  const chartRef = useRef<EChartsReact | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.getEchartsInstance().resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const option: EChartsOption = {
    title: {
      text: 'Chart name',
      left: '16px',
      top: '5px',
      textStyle: {
        color: '#262626',
        fontSize: '24px',
        fontWeight: 600,
        lineHeight: 1.5,
        fontFamily: 'Montserrat, sans-serif'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#7ec425',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '12px'
        }
      },
      backgroundColor: '#262626',
      borderColor: 'transparent',
      textStyle: {
        color: '#fff',
        fontSize: '12px',
        fontFamily: 'Montserrat, sans-serif'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['2000', '2001', '2002', '2003', '2004', '2005'],
        axisLabel: {
          color: '#262626',
          fontSize: '12px',
          fontFamily: 'Montserrat, sans-serif'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        max: 200,
        interval: 25,
        axisLabel: {
          color: '#262626',
          fontSize: '12px',
          fontFamily: 'Montserrat, sans-serif'
        }
      }
    ],
    series: [
      {
        name: 'Test1',
        data: [0, 60, 60, 90, 150, 30],
        type: 'line',
        areaStyle: {},
        color: '#898C90',
        lineStyle: {
          width: 4
        },
        symbolSize: 0
      },
      {
        name: 'Test2',
        data: [0, 30, 125, 60, 60, 45],
        type: 'line',
        areaStyle: {},
        color: '#7ec425',
        lineStyle: {
          width: 4
        },
        symbolSize: 0
      }
    ]
  };
  return <StyledChart option={option} lazyUpdate={true} ref={chartRef} style={{ gridArea: 'chart' }} />;
};
