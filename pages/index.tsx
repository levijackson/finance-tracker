import { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/client';
import Recent from 'components/Recent';
import { ItemInterface } from 'components/interfaces/Item';
import { getData, toJson } from 'helpers/item';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { formatCurrency } from 'utils/currency';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (!session) {
      return {
        props: {
          chartData: [],
          financeData: null
        }
      }
    }

    let chartData = [];
    let financeData = await getData(session.userId, 2);

    for (let i in financeData.data) {
        chartData.push(
            {
                'month': financeData.data[i].month,
                'income': financeData.data[i].income.sum,
                'expense': financeData.data[i].expense.sum
            }
        );

        financeData.data[i].income.items = financeData.data[i].income.items.map((item) => {
            return toJson(item);
        });

        financeData.data[i].expense.items = financeData.data[i].expense.items.map((item) => {
            return toJson(item);
        });
    }

    return {
      props: {
            chartData: chartData,
            financeData: financeData.data
      }
    }
}

interface ChartData {
    month: string;
    expense: number;
    income: number;
}
interface HomeProps {
    financeData: {
      [key: number]: {
            month: string;
            expense: {
                    items: Array<ItemInterface>;
                    sum: number;
            },
            income: {
                    items: Array<ItemInterface>;
                    sum: number;
            }
      }
    }
    chartData: Array<ChartData>;
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
        { (props.chartData.length > 0) ?
          <BarChart
              width={500}
              height={300}
              data={props.chartData}
              margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                  formatter={(value) => '$' + formatCurrency(value)}
              />
              <Legend />
              <Bar dataKey="income" fill="#8884d8" />
              <Bar dataKey="expense" fill="#82ca9d" />
          </BarChart>
          : ''
        }
        { props.financeData ? <Recent data={props.financeData} /> : ''}
        
      </>
    )
}
