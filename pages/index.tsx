import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client';

import Recent from 'components/Recent';
import db from 'helpers/db';
import Item from 'models/item';
import { ItemInterface } from 'components/interfaces/Item';
import { toJson } from 'helpers/item';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export const getServerSideProps: GetServerSideProps = async (context) => {
    await db();
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const numberMonths = 2;
    let currentDate = new Date();

    let chartData = [];
    let incomeData = [];
    let expenseData = [];
    for (let i = 0; i < numberMonths; i++) {
        currentDate.setDate(0); // going to 1st of the month
        currentDate.setHours(-1); // going to last hour before this date even started.
        let monthName = monthNames[currentDate.getMonth()];

        let startDate = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-01';
        let endDate = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();

        let incomeItems = (await Item.find({
          'category': 'income',
          'date': {
              $gt: startDate,
              $lt: endDate
          }
        }).exec()).map((item) => {
              return toJson(item);
        });
        incomeData.push({
            'month': monthName,
            'items': incomeItems
        });

        let expenseItems = (await Item.find({
          'category': 'expense',
          'date': {
              $gt: startDate,
              $lt: endDate
          }
        }).exec()).map((item) => {
            return toJson(item);
        });
        expenseData.push({
            'month': monthName,
            'items': expenseItems
        });

        let expenseSum = 0;
        for (let item in expenseItems) {
            expenseSum += expenseItems[item].amount;
        }

        let incomeSum = 0;
        for (let item in incomeItems) {
            incomeSum += incomeItems[item].amount;
        }

        chartData.push(
            {
                'name': monthName, 'expense': expenseSum, 'income': incomeSum,
            }
        );
    }
    
    return {
      props: {
        incomeData,
        expenseData,
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
            <Bar dataKey="income" fill="#8884d8" />
            <Bar dataKey="expense" fill="#82ca9d" />
        </BarChart>
        <Recent title="Income" data={props.incomeData} />
        <Recent title="Expenses" data={props.expenseData} />
      </>
    )
}
