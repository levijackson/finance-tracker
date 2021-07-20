import { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Item } from 'src/API';
import styles from 'src/styles/itemTable.module.scss';


interface ItemTableProps {
  data: Array<Item>
}

const ItemTable = (props: ItemTableProps) => {

  const columns = useMemo(
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
            <tr {...headerGroups[1].getHeaderGroupProps()}>
              {headerGroups[1].headers.map(column => (
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

  return <Table columns={columns} data={props.data} />;
};

export default ItemTable;