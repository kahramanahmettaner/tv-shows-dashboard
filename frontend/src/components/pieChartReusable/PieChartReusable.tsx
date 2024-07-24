import styles from './pieChartReusable.module.css'
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip } from 'recharts';

type Props = {
  title: string;
  chartData: {
      name: string;
      value: number;
  }[];
  color: string;
  labelTitle: string;
  descriptionTitle: string;
}

type TooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: any;
  chartData: any[];
  labelTitle: string;
  descriptionTitle: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, labelTitle, descriptionTitle }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{
            backgroundColor: '#2a3447', borderRadius:'5px', padding:'1em',  border: '1px solid #fff'
        }}>
          <p className="label" style={{ color: '#AAA' }}>{`${labelTitle}: ${payload[0].name}`}</p>
          <p className="desc" style={{ color: '#FF8042' }}>{`${descriptionTitle}: ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };

const PieChartReusable: React.FC<Props> = ({ chartData, title, labelTitle, descriptionTitle }) => {

    return (
      <div className={styles['pie-chart-box']}>

        <h1>{title}</h1>

        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie dataKey="value" data={chartData} fill="#8884d8" label />
              <Tooltip content={
                <CustomTooltip 
                  chartData={chartData} 
                  descriptionTitle={descriptionTitle} 
                  labelTitle={labelTitle}
                />
              }/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );


}

export default PieChartReusable