import FinanceForm from 'components/FinanceForm';

const AddForm = ({ user }) => {
    return (
        <>
            <h1 className="col-xs-12">Add</h1>
            <FinanceForm user={user} type="expense" className="col-xs-12" />
        </>
    );
}

export default AddForm;