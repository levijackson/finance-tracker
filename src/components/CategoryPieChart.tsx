import { Tooltip, PieChart, Pie } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { formatNumberToFloat } from 'src/utils/currency';


interface DataItem {
  fill: string,
  name: string,
  value: number
}
interface CategoryPieChartProps {
  data: Array<DataItem>
}

const CategoryPieChart = (props: CategoryPieChartProps) => {
  if (props.data.length === 0)  {
    return (
      <>
        <h2>Summary</h2>
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      </>
    );
  }

return (
  <>
    <PieChart width={400} height={200}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={props.data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
      />
      <Tooltip formatter={(value) => '$' + formatNumberToFloat(value)} />
    </PieChart>
  </>
);

};

export default CategoryPieChart;