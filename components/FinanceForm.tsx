import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useSession } from 'next-auth/client';

import { ItemInterface } from 'components/interfaces/Item';
import { formatCurrency } from 'utils/currency';
import { EXPENSE_ITEM_CATEGORIES, INCOME_ITEM_CATEGORIES, ITEM_TYPES } from 'helpers/item';

import styles from 'styles/financeForm.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

interface FinanceFormProps {
    type: string;
    item?: ItemInterface;
}

const FinanceForm = (props: FinanceFormProps) => {
    let editing = false;
    if (props.hasOwnProperty('item')) {
        // react-datepicker needs a Date object
        props.item.date = new Date(props.item.date);
        editing = true;
    }

    const defaultState: ItemInterface = {
        date: new Date(),
        amount: 0,
        type: 'expense',
        note: '',
        category: ''
    };

    const [ state, setState ] = useState((props.item ? props.item : defaultState));
    const [ message, setMessage ] = useState('');
    const [ session, loading ] = useSession();
    
    const isValid = (state: ItemInterface) => {
        if (state.amount === 0) {
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid(state)) {
            setMessage('Missing fields');
            return false;
        }

        let url: string = '/api/item';

        if (editing) {
            url += '/' + props.item.id;
        }

        try {
            const data: object = { ...state, userId: session.userId };
            await fetch(url, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
                body: JSON.stringify(data),
            }).then(() => {
                if (editing) {
                    setMessage('Updated!');
                } else {
                    setState(defaultState);
                    setMessage('Added!');
                }
            });
        } catch (error) {
            setMessage('Failed to add ' + props.type);
        }
    };

    const handleInputChange = (e) => {
        let name: string = e.target.name;
        let value: any = e.target.value;
        if (name === 'amount') {
            value = formatCurrency(value);
            if (isNaN(value)) {
                return;
            }
        }

        setState({ ...state, [name]: value });
    }

    let itemCategories = INCOME_ITEM_CATEGORIES;
    if (state.type === 'expense') {
        itemCategories = EXPENSE_ITEM_CATEGORIES;
    }

    return (
        <div className={styles.financeForm}>
            { message ? <p>{message}</p> : '' }
            <form onSubmit={handleSubmit}>
            <label htmlFor="type">
                    Type
                    <select name="type" value={state.type} onChange={handleInputChange}>
                        { ITEM_TYPES.map((item, index) => {
                            return <option value={item} key={index}>{item}</option>
                        })}
                    </select>
                </label>
                <label htmlFor="date">
                    Date
                    <DatePicker 
                        dateFormat="yyyy-MM-dd"
                        selected={state.date}
                        onChange={(date: string) => setState({ ...state, date: date })}
                    />
                </label>
                <label htmlFor="category">
                    Category
                    <select name="category" value={state.category} onChange={handleInputChange}>
                        { itemCategories.map((item, index) => {
                            return <option value={item} key={index}>{item}</option>
                        })}
                    </select>
                </label>
                <label htmlFor="amount">
                    Amount
                    <input type="text" name="amount" value={state.amount} onChange={handleInputChange} />
                </label>
                <label htmlFor="note">
                    Note
                    <textarea name="note" value={state.note} onChange={handleInputChange} />
                </label>
                <input type="submit" name="submit" value="Save" />
            </form>
        </div>
    );
}

export default FinanceForm;