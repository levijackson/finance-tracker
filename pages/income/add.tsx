import FinanceForm from 'components/financeForm';

const Income = () => {

    return (
        <>
        <h1 className="col-xs-12">Add Income</h1>
        <FinanceForm category="income" className="col-xs-12" />
        </>
    );
}

export default Income;