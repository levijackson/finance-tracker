const Footer = () => {
    return (
        <footer className="row">
            <div className="name col-xs-12">
                Finance Tracker <small>{(new Date().getFullYear())}</small>
            </div>
        </footer>
    );
};

export default Footer;