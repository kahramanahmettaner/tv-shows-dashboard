import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './simpleAreaChartReusable.module.css'

type Props = {
    title:string;
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

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, descriptionTitle }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{
            backgroundColor: '#2a3447', borderRadius:'5px', padding:'1em',  border: '1px solid #fff'
        }}>
            <p className="label" style={{ color: '#AAA' }}>{`${payload[0].payload.name}`}</p>
            <p className="desc" style={{ color: '#FF8042' }}>{`${descriptionTitle}: ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
};


const SimpleAreaChartReusable = ( props: Props ) => {

    const minValue = Math.min(...props.chartData.map((item: any) => item[props.dataKey]));

    const maxBarSize = 10;
    const minBarSize = minValue - 0.5;

    return (
        <div className={styles['simple-area-chart']}>
            <h3>{props.title}</h3>

            <div className={styles.chart} >
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                    width={500}
                    height={400}
                    data={props.chartData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                        dataKey="index" 
                        // tickFormatter={(_value, index) => (index + 1).toString()} // To display the index as a label (1-based index)
                        tick={{ fill: '#AAA' }}
                        tickLine={false}
                        axisLine={{ stroke: '#8884d8' }}
                    />

                    {/* Set width to 30 as a workaround to eliminate the gap between the YAxis labels and the chart bars. */}
                    {/* Related issue on GitHub: https://github.com/recharts/recharts/issues/2027 */}
                    <YAxis domain={[minBarSize, maxBarSize]} width={30}/>
                    
                    <Tooltip 
                      content={<CustomTooltip chartData={props.chartData} descriptionTitle={props.dataKey.replace(/_/g, ' ')}/>}
                      cursor={{fillOpacity:'0.1'}}
                    />    
                    <Area type="monotone" dataKey={props.dataKey} stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default SimpleAreaChartReusable