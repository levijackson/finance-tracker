import FinanceForm from 'src/components/FinanceForm';
import { UserInterface } from 'src/components/interfaces/User';

interface AddProps {
  user: UserInterface;
}

const AddForm = (props: AddProps) => {
  return (
    <>
      <h1 className="col-xs-12">Add</h1>
      <FinanceForm user={props.user} type="expense" />
    </>
  );
}

export default AddForm;