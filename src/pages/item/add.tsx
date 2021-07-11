import FinanceForm from 'components/FinanceForm';
import { UserInterface } from 'components/interfaces/User';

interface AddProps {
    user: UserInterface;
}

const AddForm = (props: AddProps) => {
    return (
        <>
            <h1 className="col-xs-12">Add</h1>
            <FinanceForm user={props.user} type="expense" className="col-xs-12" />
        </>
    );
}

export default AddForm;