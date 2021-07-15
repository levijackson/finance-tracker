import React from 'react';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { sumItemsByDay, groupItemsByCategory, getMonthlyData } from 'helpers/item';
import { cloneObject } from 'utils/object';
import { formatNumberToFloat, formatCurrency } from 'utils/currency';
import { formatDate, getMonthName } from 'utils/date';
import { UserInterface } from 'components/interfaces/User';
import ItemTable from 'components/ItemTable';

import styles from 'styles/dashboard.module.scss';

interface DashboardOptions {
  user: UserInterface
}



const DashboardIndex = (props: DashboardOptions) => {
    const [ date, setDate ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ data, setData ] = useState([]);
    const [ message, setMessage ] = useState(null);
    
    const chartColors = [
      '#545E75',
      '#63ADF2',
      '#A7CCED',
      '#304D6D',
      '#82A0BC',
      '#3C4353'
    ];
    

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
        { (date && data.length > 0) ? <div className="col-xs-12 col-sm-6"><ItemTable data={tableData} /></div> : '' }
        { loading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : '' }
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