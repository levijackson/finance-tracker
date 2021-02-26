import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import ItemService from '../../services/ItemService';
import { useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';

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
        <table {...getTableProps()}>
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
                        const date = new Date(item.date);
                        item.date = date.getFullYear() + '-' + ('0' + date.getMonth()).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
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
            Header: 'Info',
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
      )

    return (
        <>
            <h1 className="col-xs-12">Analyze</h1>
            <label htmlFor="type">
                Month
                <select name="date" value={date} onChange={e => setDate(e.target.value)}>
                    { props.options.map((item, index) => {
                        const value = item.year + '-' + item.month;
                        return <option value={value} key={index}>{value}</option>
                    })}
                </select>
            </label>
            <Table columns={columns} data={data} />
        </>
    );
}

export default DashboardIndex;