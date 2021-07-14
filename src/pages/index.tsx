
import React from 'react';
import { GetServerSideProps } from 'next'

import Amplify, { withSSRContext } from 'aws-amplify';
import awsconfig from 'aws-exports.js';

import Recent from 'components/Recent';
import { ItemInterface } from 'components/interfaces/Item';
import { UserInterface } from 'components/interfaces/User';
import { getData, toJson } from 'helpers/item';
import { cloneObject } from 'utils/object';
import { formatCurrency } from 'utils/currency';
import SummaryTable from 'components/SummaryTable';


Amplify.configure({ ...awsconfig, ssr: true });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { Auth, API } = withSSRContext(context);
  let user = null;
  try {
    // todo: whydoesn't this work on home page?
    user = await Auth.currentAuthenticatedUser();
  } catch (e) {
    console.log(e);
  }

  if (!user) {
    return {
      props: {
        chartData: [],
        financeData: null
      }
    }
  }

  let chartData = [];
  let financeData = await getData(API, user.attributes.sub, 3);

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

  const tableData = props.chartData.map((item) => {
    item = cloneObject(item);
    item.saved = formatCurrency(item.income - item.expense, 'USD');
    item.income = formatCurrency(item.income, 'USD');
    item.expense = formatCurrency(item.expense, 'USD');
    return item;
  });

  // get just the last month of transactions
  let recentData = {};
  if (props.financeData) {
    recentData = [props.financeData[0]];
  }

  return (
    <>
      { (props.chartData.length > 0) ?
        <div className="col-xs-12 col-sm-6">
          <SummaryTable data={tableData} />
        </div>
        : ''
      }
      { props.financeData ? 
        <div className="col-xs-12 col-sm-6">
          <Recent data={recentData} />
          </div>
      : ''}
      
    </>
  )
}
