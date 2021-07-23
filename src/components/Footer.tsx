import styles from 'src/styles/footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.wrapper + " row"}>
      <div className="name col-xs-12 end-xs">
        <a href="https://github.com/levijackson/finance-tracker" target="_blank">GitHub</a>
        <span>|</span>
        Finance Tracker <small>{(new Date().getFullYear())}</small>
      </div>
    </footer>
  );
};

export default Footer;