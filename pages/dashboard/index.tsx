import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client';
import ItemService from '../../services/ItemService';
import { useState, useEffect } from 'react';

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

const DashboardIndex = (props: DashboardOptions) => {
    const [ date, setDate ] = useState('');

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
                body: JSON.stringify({'date': date}),
            }).then(() => {
                
            });
        } catch (error) {

        }
    }, [date]);

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
        </>
    );
}

export default DashboardIndex;