import { useState } from 'react';

const AddForm = (props) => {
    const [state, setState] = useState({
        date: '',
        amount: '',
        category: props.category,
        note: ''
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();

        let url = '/api/' + state.category;

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(state)
        };

        fetch(url, options)
        .then(response => {
            console.log(response.status);
        });
    };

    const handleInputChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }


    return (
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
    );
}

export default AddForm;