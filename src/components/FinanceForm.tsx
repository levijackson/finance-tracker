import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';

import { ItemInterface } from 'src/components/interfaces/Item';
import { UserInterface } from 'src/components/interfaces/User';
import { formatNumberToFloat } from 'src/utils/currency';
import { formatDate } from 'src/utils/date';
import { EXPENSE_ITEM_CATEGORIES, INCOME_ITEM_CATEGORIES, ITEM_TYPES } from 'src/helpers/item';

import styles from 'src/styles/financeForm.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

interface FinanceFormProps {
  type: string;
  user: UserInterface;
  item?: ItemInterface;
}

const FinanceForm = (props: FinanceFormProps) => {
  let editing = false;
  if (props.hasOwnProperty('item')) {
    editing = true;
  }

  const defaultState: ItemInterface = {
    date: '',
    amount: 0,
    type: 'expense',
    note: '',
    category: ''
  };

  const [ state, setState ] = useState((props.item ? props.item : defaultState));
  const [ date, setDate ] = useState(props.item?.date ? new Date(props.item?.date) : new Date());
  const [ message, setMessage ] = useState('');
  const router = useRouter();
  
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
      url += '/' + props.item.item_uuid;
    }

    try {
      const data: ItemInterface = { ...state, user_uuid: props.user.uuid, date: formatDate(date) };

      await fetch(url, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
        body: JSON.stringify(data),
      }).then(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });

        if (editing) {
            setMessage('Updated!');
        } else {
            setState(defaultState);
            setMessage('Added!');
        }

        setTimeout(() => {
          setMessage('');
        }, 3000);
      });
    } catch (error) {
      setMessage('Failed to add ' + props.type);
    }
  };

  const handleInputChange = (e) => {
    let name: string = e.target.name;
    let value: any = e.target.value;
    if (name === 'amount') {
      value = formatNumberToFloat(value);
      if (isNaN(value)) {
        return;
      }
    }

    setState({ ...state, [name]: value });
  };

  const handleDelete = async (e) => {
    if (!confirm('Are you sure you want to delete?')) {
      e.preventDefault();
      return;
    }

    const url: string = '/api/item/' + props.item.item_uuid;

    try {
      await fetch(url, {
        method: 'DELETE',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
        body: JSON.stringify({id: props.item.item_uuid}),
      }).then(() => {
        router.push('/');
      });
    } catch (error) {
      console.log(error);
      setMessage('Failed to delete ' + props.item.item_uuid);
    }
  };

  let itemCategories = [...INCOME_ITEM_CATEGORIES];
  if (state.type === 'expense') {
    itemCategories = [...EXPENSE_ITEM_CATEGORIES];
  }
  itemCategories.unshift('');

  return (
    <div className={styles.financeForm}>
      { message ? <p className={styles.message}>{message}</p> : '' }
      <form onSubmit={handleSubmit}>
        { editing ? <a className={styles.delete} onClick={handleDelete}>DELETE</a> : '' }
        <label htmlFor="type">
          Type
          <select name="type" value={state.type} onChange={handleInputChange}>
            { ITEM_TYPES.map((item, index) => {
                return <option value={item} key={index}>{item}</option>
            })}
          </select>
        </label>
        <label htmlFor="date">
          When
          <DatePicker 
            dateFormat="yyyy-MM-dd"
            selected={date}
            onChange={(date) => setDate(date)}
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