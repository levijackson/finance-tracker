const Recent = (props) => {
    if (props.items.length === 0) {
        return null;
    }
    
    return (
        <div className="col-xs-12 col-sm-6">
            <h4>{props.title}</h4>
            <ul>
                {props.items.map((item, index) => {
                    return <li key={index}>
                        ${item.amount} ({item.date})
                    </li>;
                })}
            </ul>
        </div>
    );
};

export default Recent;