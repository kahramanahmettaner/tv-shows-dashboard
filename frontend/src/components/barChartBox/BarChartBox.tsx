import styles from './barChartBox.module.css'
import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts'

type Props = {
    title:string;
    color:string;
    dataKey:string;
    chartData:object[];
}

type TooltipProps = {
    active?: boolean;
    payload?: any[];
    label?: any;
    chartData: any[];
    descriptionTitle: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label, chartData, descriptionTitle }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{
            backgroundColor: '#2a3447', borderRadius:'5px', padding:'1em',  border: '1px solid #fff'
        }}>
          <p className="label" style={{ color: '#AAA' }}>{`${chartData[label].name}`}</p>
          <p className="desc" style={{ color: '#FF8042' }}>{`${descriptionTitle}: ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
};

const BarChartBox = (props: Props) => {
  return (
    <div className={styles['bar-chart-box']}>
        <h1>{props.title}</h1>

        <div className={styles.chart}>
            <ResponsiveContainer width="99%" height={150}>
                <BarChart width={150} height={40} data={props.chartData}>
                    <Tooltip 
                        content={<CustomTooltip chartData={props.chartData} descriptionTitle={props.dataKey.replace(/_/g, ' ')}/>}
                        cursor={{fillOpacity:'0.1'}}
                    />    
                    <Bar dataKey={props.dataKey} fill={props.color} />
                </BarChart>
            </ResponsiveContainer>
        </div>

    </div>
  )
}


export default BarChartBox