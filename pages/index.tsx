import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client';
import Recent from 'components/Recent';
import { ItemInterface } from 'components/interfaces/Item';
import { getData } from 'helpers/item';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export const getServerSideProps: GetServerSideProps = async (context) => {
    let chartData = [];

    let incomeData = await getData('income', 2);
    incomeData.data.reduce((item) => {
      chartData.push(
          {
            'name': item.month, 'label': 'income', 'sum': item.sum,
          }
      );
    });

    let expenseData = await getData('expense', 2);
    expenseData.data.reduce((item) => {
      chartData.push(
          {
            'name': item.month, 'label': 'expense', 'sum': item.sum,
          }
      );
    });
    
    return {
      props: {
        // incomeData,
        // expenseData,
        chartData,
      }
    }
}

interface ChartProps {
  name: string;
  expense: number;
  income: number;
}
interface HomeProps {
  incomeData: {
    month: string;
    items: Array<ItemInterface>;
  };
  expenseData: {
    month: string;
    items: Array<ItemInterface>;
  };
  chartData: Array<ChartProps>
}

export default function Home(props: HomeProps) {
    const [ session, loading ] = useSession();

    if (!session) {
      return (
          <>
              <p>You must log in to use this.</p>
          </>
      );
    }

    return (
      <>
        <h1 className="col-xs-12">
          Welcome
          { session && session.user.name && <span> {session.user.name}</span>}
          !
        </h1>
        <BarChart
            width={500}
            height={300}
            data={props.chartData}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sum" fill="#8884d8" />
            <Bar dataKey="expense" fill="#82ca9d" />
        </BarChart>
        {/* <Recent title="Income" data={props.incomeData} />
        <Recent title="Expenses" data={props.expenseData} /> */}
      </>
    )
}
