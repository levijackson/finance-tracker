import FinanceForm from 'components/FinanceForm';

const AddForm = () => {
    return (
        <>
        <h1 className="col-xs-12">Add</h1>
        <FinanceForm type="expense" className="col-xs-12" />
        </>
    );
}

export default AddForm;