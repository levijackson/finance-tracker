import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useSession } from 'next-auth/client';
import { ItemInterface } from 'components/interfaces/Item';
import styles from 'styles/financeForm.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

interface AddFormProps {
    type: string;
    item?: ItemInterface;
    id?: string;
}

const AddForm = (props: AddFormProps) => {
    const defaultState: ItemInterface = {
        date: '',
        amount: 0,
        type: props.type,
        note: '',
        category: ''
    };

    const categoryOptions = [
        'other',
        'utilities',
        'transportation',
        'groceries',
        'health',
        'insurance',
        'restaurants',
        'entertainment',
        'travel',
        'giving',
        'education',
        'payroll'
    ];

    if (props.hasOwnProperty('item')) {
        props.item.date = new Date(props.item.date);
    }

    const [ state, setState ] = useState((props.item ? props.item : defaultState));
    const [ message, setMessage ] = useState('');
    const [ session, loading ] = useSession();
    
    const isValid = (state: ItemInterface) => {
        if (state.date === '') {
            return false;
        }
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

        if (props.hasOwnProperty('id')) {
            url += '/' + props.id;
        }

        try {
            const email: string = session.user.email;
            const data: object = { ...state, email };
            await fetch(url, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
                body: JSON.stringify(data),
            }).then(() => {
                setState(defaultState);
                setMessage('Added!');
            });
        } catch (error) {
            setMessage('Failed to add ' + props.type);
        }
    };

    const handleInputChange = (e) => {
        let name: string = e.target.name;
        let value: any = e.target.value;
        if (name === 'amount') {
            value = parseFloat(value);
        }

        setState({ ...state, [name]: value });
    }

    return (
        <div className={styles.financeForm}>
            { message ? <p>{message}</p> : '' }
            <form onSubmit={handleSubmit}>
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
                        { categoryOptions.map((item, index) => {
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

export default AddForm;