import { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from 'styles/summaryTable.module.scss';


const SummaryTable = ({ data }) => {
  if (data.length === 0)  {
    return (
      <>
        <h2>Summary</h2>
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      </>
    );
  }
  

  const columns = useMemo(
    () => [
      {
        Header: 'Summary',
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

return (
  <>
    <h2>Summary</h2>
    <Table columns={columns} data={data} />
  </>
);

};

export default SummaryTable;