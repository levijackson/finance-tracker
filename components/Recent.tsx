import { ItemInterface } from 'components/interfaces/Item';

interface RecentProps {
    data: {
        month: string;
        items: Array<ItemInterface>
    };
    title: string;
}

const Recent = (props: RecentProps) => {    
    return (
        <div className="col-xs-12 col-sm-6">
            {props.data.map((data, monthIndex) => {
            return <>
                <h4>{props.title} - {data.month}</h4>
                <ul>
                    {
                        data.items.map((item, itemIndex) => {
                            return <li key={itemIndex}>
                                ${item.amount} ({item.date})
                            </li>;
                        })
                    }
                </ul>
            </>
            })}
        </div>
    );
};

export default Recent;