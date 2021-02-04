import { ItemInterface } from 'components/interfaces/Item';
import Link from 'next/link';

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
                                <Link href={"/item/edit/" + item.id}><a>${item.amount} ({item.date})</a></Link>
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