
import React from 'react';
import { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/client';
import Recent from 'components/Recent';
import { ItemInterface } from 'components/interfaces/Item';
import { getData, toJson } from 'helpers/item';
import { cloneObject } from 'utils/object';
import { formatCurrency } from 'utils/currency';
import { useTable, useSortBy } from 'react-table';

import styles from 'styles/dashboard.module.scss';

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  return (
    <>
      <table {...getTableProps()} className={styles.tableData}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' -'
                        : ' +'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
    </>
  )
}

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
    let financeData = await getData(session.userId, 3);

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

    const columns = React.useMemo(
      () => [
        {
          Header: 'Progress Report',
          columns: [
            {
              Header: 'Month',
              accessor: 'month',
            },
            {
              Header: 'Income',
              accessor: 'income',
            },
            {
              Header: 'Expenses',
              accessor: 'expense',
            },
            {
              Header: 'Saved',
              accessor: 'saved',
            },
          ],
        },
      ],
      []
    );


    if (!session) {
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
            <Table columns={columns} data={tableData} />
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
