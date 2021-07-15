import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { sumItemsByDay, groupItemsByCategory, getMonthlyData } from 'helpers/item';
import { chartColors } from 'helpers/chart';
import { cloneObject } from 'utils/object';
import { formatCurrency } from 'utils/currency';
import { formatDate, getMonthName } from 'utils/date';
import { UserInterface } from 'components/interfaces/User';
import ItemTable from 'components/ItemTable';
import CategoryPieChart from 'components/CategoryPieChart';
import IncomeExpenseLineChart from 'components/IncomeExpenseLineChart';

import styles from 'styles/dashboard.module.scss';


interface DashboardProps {
  user: UserInterface
}

const DashboardIndex = (props: DashboardProps) => {
    const [ date, setDate ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ data, setData ] = useState([]);
    const [ message, setMessage ] = useState(null);
    

    useEffect(() => {
      setData([]);  
      if (!date) {
        return;
      }
      setLoading(true);

      try {
        getMonthlyData(date).then((response) => {
          setData(response);
          setLoading(false);
        });
      } catch (error) {

      }
    }, [date]);


    let chartData = sumItemsByDay(data);
    chartData = chartData.map((item) => {
      item.date = formatDate(new Date(item.date));
      return item;
    });
    

    const tableData = data.map((item) => {
      item = cloneObject(item);
      item.date = formatDate(new Date(item.date));
      item.amount = formatCurrency(item.amount, 'USD');
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

    const getMonthOptions = () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      let options = [];
      for (let i=currentMonth; i>=1;i--) {
        // the slice if a fancy trick to always make sure there is a leading "0"
        const value = currentDate.getFullYear() + '-' + ('0' + i).slice(-2);
        const display = getMonthName(i-1) + ' ' + currentDate.getFullYear();
        options.push(<option key={i} value={value}>{display}</option>);
      }

      return options;
    };

    return (
      <>
        <div className="col-xs-12">
            <h1 className={styles.heading}>Analyze</h1>
            {
              message ? <p className="msg">{message}</p> : ''
            }
            <label htmlFor="type" className={styles.dateSelector}>
                Month
                <select name="date" value={date} onChange={e => setDate(e.target.value)}>
                  <option value="">Select Month</option>
                  {getMonthOptions()}
                </select>
            </label>
        </div>

        <div className="col-xs-12 col-sm-6">
          <h3>Itemized</h3>
          { loading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : '' }
          { (date && data.length > 0) ? 
            <ItemTable data={tableData} />
            : '' 
          }
        </div> 
    
        <div className="col-xs-12 col-sm-6">
          <h3>Trend</h3>
          { loading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : '' }
          { chartData.length > 0 ?
            <IncomeExpenseLineChart data={chartData} />
            : ''
          }
        </div>

        <div className="col-xs-12 col-sm-6">
            <h3>Income Breakdown</h3>
            { loading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : '' }
            { incomePieChartData.length > 0 ?
              <CategoryPieChart data={incomePieChartData} />
              : ''
            }
        </div>

        <div className="col-xs-12 col-sm-6">
          <h3>Expense Breakdown</h3>
          { loading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : '' }
          { expensePieChartData.length > 0 ?
            <CategoryPieChart data={expensePieChartData} />
            : ''
          }
        </div>
      </>
  );
}

export default DashboardIndex;