import React from 'react';
import { useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie } from 'recharts';

import { sumItemsByDay, groupItemsByCategory } from '../../helpers/item';
import { cloneObject } from '../../utils/object';
import { formatNumberToFloat } from '../../utils/currency';
import { formatDate } from '../../utils/date';
import { UserInterface } from 'components/interfaces/User';

import styles from 'styles/dashboard.module.scss';

interface DashboardOptions {
  user: UserInterface
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
    const [ date, setDate ] = useState('');
    const [ data, setData ] = useState([]);
    
    const chartColors = [
      '#545E75',
      '#63ADF2',
      '#A7CCED',
      '#304D6D',
      '#82A0BC',
      '#3C4353'
    ];
    

    useEffect(() => {
        if (!date) {
          return;
        }

        setData([]);

        try {
          fetch('/api/item/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({'date': date, 'type': 'expense'}),
          }).then((response) => {
            response.json().then((expenseData) => {
              fetch('/api/item/search', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({'date': date, 'type': 'income'}),
              }).then((response) => {
                response.json().then((incomeData) => {
                  let mergedData = [...expenseData.items, ...incomeData.items];
                  mergedData.map((item) => {
                    item.date = new Date(item.date);
                  });
                  setData(mergedData);
                });            
              });
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
    let colorCounter = 0;
    for (const key in categoryData.income) {
        incomePieChartData.push({ 'name': key, 'value': categoryData.income[key], 'fill': chartColors[colorCounter] });
        colorCounter++;
    }

    let expensePieChartData = [];
    colorCounter = 0;
    for (const key in categoryData.expenses) {
        expensePieChartData.push({ 'name': key, 'value': categoryData.expenses[key], 'fill': chartColors[colorCounter] });
        colorCounter++;
    }

    return (
        <>
            <div className="col-xs-12">
                <h1 className={styles.heading}>Analyze</h1>
                <label htmlFor="type" className={styles.dateSelector}>
                    Month
                    <select name="date" value={date} onChange={e => setDate(e.target.value)}>
                      <option value="2021-01">2021-01</option>
                      <option value="2021-02">2021-02</option>
                      <option value="2021-03">2021-03</option>
                      <option value="2021-04">2021-04</option>
                      <option value="2021-05">2021-05</option>
                      <option value="2021-06">2021-06</option>
                      <option value="2021-07">2021-07</option>
                    </select>
                </label>
            </div>
            { date ? <div className="col-xs-12 col-sm-6"><Table columns={columns} data={tableData} /></div> : '' }
            
            { chartData.length > 0 ?
                <div className="col-xs-12 col-sm-6">
                    <LineChart
                        width={500}
                        height={300}
                        data={chartData}
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
                </div>
                : ''
            }
                
            { incomePieChartData.length > 0 ?
                <div className="col-xs-12 col-sm-6">
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
                        />
                        <Tooltip formatter={(value) => '$' + formatNumberToFloat(value)} />
                    </PieChart>
                </div>
                : ''
            }

            { expensePieChartData.length > 0 ?
                <div className="col-xs-12 col-sm-6">
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
                        />
                        <Tooltip formatter={(value) => '$' + formatNumberToFloat(value)} />
                    </PieChart>
                </div>
                : ''
            }
        </>
    );
}

export default DashboardIndex;