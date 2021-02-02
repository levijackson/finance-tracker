import FinanceForm from 'components/FinanceForm';

const Expense = () => {
    return (
        <>
        <h1 className="col-xs-12">Add Expense</h1>
        <FinanceForm category="expense" className="col-xs-12" />
        </>
    );
}

export default Expense;