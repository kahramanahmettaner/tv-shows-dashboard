import styles from './barChartReusable.module.css'
import { Bar, BarChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts'

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

const BarChartReusable = (props: Props) => {

  const minValue = Math.min(...props.chartData.map((item: any) => item[props.dataKey]));

  const maxBarSize = 10;
  const minBarSize = minValue - 0.5;

  return (
    <div className={styles['bar-chart-container']}>
        <h3>{props.title}</h3>

        <div className={styles.chart}>
            <ResponsiveContainer width="99%" height={150}>
                <BarChart width={150} height={40} data={props.chartData} >
                  
                  {/* Set width to 30 as a workaround to eliminate the gap between the YAxis labels and the chart bars. */}
                  {/* Related issue on GitHub: https://github.com/recharts/recharts/issues/2027 */}
                  <YAxis domain={[minBarSize, maxBarSize]} width={30}/>

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


export default BarChartReusable