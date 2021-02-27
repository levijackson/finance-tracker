import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import { useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie } from 'recharts';

import ItemService from '../../services/ItemService';
import { sumItemsByDay, groupItemsByCategory } from '../../helpers/item';
import { cloneObject } from '../../utils/object';
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/date';

import styles from 'styles/dashboard.module.scss';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            props: {}
        };
    }

    const service = new ItemService();
    let options = {};
    await service.getDateOptions(session.userId).then(function (results) {
        options = results.map(function(item) {
            return {
                'year': item.year,
                'month': item.month
            }
        });
    });

    return {
        props: {
            options
        }
    }
}

interface MonthOption {
    year: number,
    month: number
}
interface DashboardOptions {
    options: Array<MonthOption>
}

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

const DashboardIndex = (props: DashboardOptions) => {
    const [ session, loading ] = useSession();
    const [ date, setDate ] = useState('');
    const [ data, setData ] = useState([]);
    

    useEffect(() => {
        if (!date) {
            return;
        }

        try {
            fetch('/api/item/search', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({'date': date, 'userId': session.userId}),
            }).then((response) => {
                response.json().then((data) => {
                    let mergedData = [...data.income, ...data.expenses];
                    mergedData.map((item) => {
                        item.date = new Date(item.date);
                    });
                    setData(mergedData);
                });            
            });
        } catch (error) {

        }
    }, [date]);

    const columns = React.useMemo(
        () => [
          {
            Header: 'Data',
            columns: [
              {
                Header: 'Amount',
                accessor: 'amount',
              },
              {
                Header: 'Category',
                accessor: 'category',
              },
              {
                Header: 'Date',
                accessor: 'date',
              },
              {
                Header: 'Type',
                accessor: 'type',
              },
            ],
          },
        ],
        []
      );

    let chartData = sumItemsByDay(data);
    chartData = chartData.map((item) => {
        item.date = formatDate(new Date(item.date));
        return item;
    });
    

    const tableData = data.map((item) => {
        item = cloneObject(item);
        item.date = formatDate(new Date(item.date));
        return item;
    });


    const categoryData = groupItemsByCategory(data);
    let incomePieChartData = [];
    for (const key in categoryData.income) {
        incomePieChartData.push({ 'name': key, 'value': categoryData.income[key] });
    }

    let expensePieChartData = [];
    for (const key in categoryData.expenses) {
        expensePieChartData.push({ 'name': key, 'value': categoryData.expenses[key] });
    }

    return (
        <>
          <div className="col-xs-12">
            <h1 className={styles.heading}>Analyze</h1>
            <label htmlFor="type" className={styles.dateSelector}>
                Month
                <select name="date" value={date} onChange={e => setDate(e.target.value)}>
                    { props.options.map((item, index) => {
                        const value = item.year + '-' + item.month;
                        return <option value={value} key={index}>{value}</option>
                    })}
                </select>
            </label>
            { date ? <Table columns={columns} data={tableData} /> : '' }
            
            { chartData.length > 0 ? 
                <LineChart
                    width={500}
                    height={300}
                    data={chartData}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                        formatter={(value) => '$' + formatCurrency(value)}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#8884d8" />
                    <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
                </LineChart>
                : ''
            }
                
            { incomePieChartData ?
                <div>
                    <h3>Income</h3>
                    <PieChart width={400} height={200}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={incomePieChartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip />
                    </PieChart>
                </div>
                : ''
            }

            { expensePieChartData ?
                <div>
                    <h3>Expenses</h3>
                    <PieChart width={400} height={200}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={expensePieChartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip />
                    </PieChart>
                </div>
                : ''
            }
          
          </div>
        </>
    );
}

export default DashboardIndex;