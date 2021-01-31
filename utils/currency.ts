const formatCurrency = (amount: number) => {
    const stringAmount = amount.toString();
    const pieces = stringAmount.split('.');

    if (pieces.length < 2) {
        return parseFloat((Math.round(amount * 100) / 100).toFixed(2));
    }

    if (pieces[1].length === 1) {
        return parseFloat((Math.round(amount * 100) / 100).toFixed(2));
    } else {
        return amount;
    }
};

export {
    formatCurrency
};