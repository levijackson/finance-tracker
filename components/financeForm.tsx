import { useState } from 'react';
import styles from 'styles/financeForm.module.scss';

const AddForm = (props) => {
    const defaultState = {
        date: '',
        amount: '',
        category: props.category,
        note: ''
    };

    const [state, setState] = useState(defaultState);
    const [message, setMessage] = useState('');
    
    const isValid = (state) => {
        if (state.date === '') {
            return false;
        }
        if (state.amount === '') {
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

        let url = '/api/' + state.category;

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
                body: JSON.stringify(state),
            }).then(response => {
                setState(defaultState);
                setMessage('Added!');
            });
        } catch (error) {
            setMessage('Failed to add ' + props.category);
        }
    };

    const handleInputChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    return (
        <div className={styles.financeForm}>
            { message ? <p>{message}</p> : '' }
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">
                    Date
                    <input type="text" name="date" value={state.date} onChange={handleInputChange} />
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