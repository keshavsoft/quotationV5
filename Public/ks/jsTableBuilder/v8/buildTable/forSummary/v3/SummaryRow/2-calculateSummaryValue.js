export function calculateSummaryValue({ inData, inColumnOptions, inDataKey }) {
    const localData = inData;
    const localColumnOptions = inColumnOptions;
    const localDataKey = inDataKey;

    let summaryValue = "";

    if (localColumnOptions) {
        if (localColumnOptions.summaryLabel) {
            summaryValue = localColumnOptions.summaryLabel;
        } else if (localColumnOptions.summary === "sum") {
            const total = localData.reduce((sum, row) => {
                // Extract numeric value from potentially string data
                const val = parseFloat(row[localDataKey]);
                return sum + (isNaN(val) ? 0 : val);
            }, 0);

            // Keep it clean with up to 2 decimal places if needed
            summaryValue = Number.isInteger(total) ? total.toString() : total.toFixed(2);
        } else if (localColumnOptions.summary === "count") {
            summaryValue = localData.length.toString();
        }
    }
    return summaryValue;
}
