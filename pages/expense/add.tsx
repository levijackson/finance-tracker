import { useRouter } from 'next/router';

import FinanceForm from 'components/FinanceForm';
import useUser from 'lib/useUser';

const Expense = () => {
    const { user } = useUser();
    const router = useRouter();

    if (!user?.isLoggedIn) {
        router.push('/');
    }

    return (
        <>
        <h1 className="col-xs-12">Add Expense</h1>
        <FinanceForm category="expense" className="col-xs-12" />
        </>
    );
}

export default Expense;