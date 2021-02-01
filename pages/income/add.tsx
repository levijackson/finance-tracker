import { useRouter } from 'next/router';

import FinanceForm from 'components/FinanceForm';
import useUser from 'lib/useUser';

const Income = () => {

    const { user } = useUser();
    const router = useRouter();

    if (!user?.isLoggedIn) {
        router.push('/');
    }

    return (
        <>
        <h1 className="col-xs-12">Add Income</h1>
        <FinanceForm category="income" className="col-xs-12" />
        </>
    );
}

export default Income;