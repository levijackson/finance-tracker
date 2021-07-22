import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { formatNumberToFloat } from 'src/utils/currency';
import { chartColors } from 'src/helpers/chart';


interface DataItem {
  date: string,
  income: number,
  expenses: number
}
interface IncomeExpenseLineChartProps {
  data: Array<DataItem>
}

const IncomeExpenseLineChart = (props: IncomeExpenseLineChartProps) => {
  if (props.data.length === 0)  {
    return (
      <>
        <h2>Summary</h2>
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      </>
    );
  }

  return (
    <ResponsiveContainer width="95%" height={300}>
      <LineChart
        data={props.data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip 
          formatter={(value) => '$' + formatNumberToFloat(value)}
        />
        <Legend />
        <Line type="monotone" dataKey="income" stroke={chartColors[0]} />
        <Line type="monotone" dataKey="expenses" stroke={chartColors[1]} />
      </LineChart>
    </ResponsiveContainer>
  );

};

export default IncomeExpenseLineChart;