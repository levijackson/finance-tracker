
import React, { useEffect, useState } from 'react';

import Recent from 'components/Recent';
import { ItemInterface } from 'components/interfaces/Item';
import { UserInterface } from 'components/interfaces/User';
import { getSummarizedData } from 'helpers/item';
import { cloneObject } from 'utils/object';
import { formatCurrency } from 'utils/currency';
import SummaryTable from 'components/SummaryTable';


interface ChartData {
  month: string;
  expense: number;
  income: number;
  saved: number;
}
interface HomeProps {
  user: UserInterface
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
  if (!props.user) {
    return (
      <>
        <p>You must log in to use this.</p>
      </>
    );
  }

  const [chartData, setChartData] = useState([]);
  const [financeData, setFinanceData] = useState([]);

  useEffect(() => {
    getSummarizedData(3).then((response) => {
      setFinanceData(response.data);

      let formattedChartData = [];
      for (let i in response.data) {
        formattedChartData.push(
          {
              'month': response.data[i].month,
              'income': response.data[i].income.sum,
              'expense': response.data[i].expense.sum
          }
        );
      }

      setChartData(formattedChartData);
    });
  }, []);


  const tableData = chartData.map((item) => {
    item = cloneObject(item);
    item.saved = formatCurrency(item.income - item.expense, 'USD');
    item.income = formatCurrency(item.income, 'USD');
    item.expense = formatCurrency(item.expense, 'USD');
    return item;
  });

  // get just the last month of transactions
  let recentData = {};
  if (financeData) {
    recentData = [financeData[0]];
  }

  return (
    <>
      <div className="col-xs-12 col-sm-6">
        <SummaryTable data={tableData} />
      </div>

      <div className="col-xs-12 col-sm-6">
        <Recent data={recentData} />
      </div>
    </>
  )
}
