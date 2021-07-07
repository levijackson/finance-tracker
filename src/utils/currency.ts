/**
 * Convert a given number into a float.
 * Useful to do computations.
 * @param amount
 * @returns 
 */
const formatNumberToFloat = (amount: number): number => {
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

/**
 * Convert a given number into the user's locally currency
 * @param amount
 * @param type 
 * @returns 
 */
const formatCurrency = (amount: number, type: string): string => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: type,
        minimumFractionDigits: 2
    });

    return formatter.format(amount);
};

export {
    formatNumberToFloat,
    formatCurrency
};