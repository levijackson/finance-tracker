import FinanceForm from 'components/financeForm';
import Layout from 'components/layout';

const Expense = () => {

    return (
        <Layout>
            <FinanceForm category="expense" />
        </Layout>
    );
}

export default Expense;