// Calculation futures*************************************************************
function calculateLotSizeFutures(accountSizeFutures, riskPercentageFutures, slPipsFutures) {
    // Convert risk percentage to decimal
    const riskAmountFutures = accountSizeFutures * (riskPercentageFutures / 100);

    // Calculate position size
    const positionSizeFutures = riskAmountFutures / (slPipsFutures * 1);

    return positionSizeFutures;
    // Return the lot size
}

// const lotSizeFutures = calculateLotSizeFutures(accountSizeFutures, riskPercentageFutures, slPipsFutures);


document.getElementById('calculateButtonFutures').addEventListener('click', () => {
    const accountSizeFutures = parseFloat(document.getElementById('accountSizeFutures').value);
    const riskPercentageFutures = parseFloat(document.getElementById('riskPercentageFutures').value);
    const slPipsFutures = parseFloat(document.getElementById('slPipsFutures').value);

    if (isNaN(accountSizeFutures) || isNaN(riskPercentageFutures) || isNaN(slPipsFutures)) {
        document.getElementById('futuresLotSizeRes').innerText = 'Please enter valid numbers.';
        return;
    }

    const lotSizeFutures = calculateLotSizeFutures(accountSizeFutures, riskPercentageFutures, slPipsFutures);

    document.getElementById('futuresLotSizeRes').innerText = `Lot Size: ${lotSizeFutures.toFixed(2)} units`;
});

// Calculation forex**************************************************************
function calculateLotSizeForex(accountSizeForex, riskPercentageForex, slPipsForex) {
    // Convert risk percentage to decimal
    const riskAmountForex = accountSizeForex * (riskPercentageForex / 100);

    // Calculate position size
    const positionSizeForex = riskAmountForex / (slPipsForex * 1);

    return positionSizeForex;
    // Return the lot size
}

// const lotSizeForex = calculateLotSizeForex(accountSizeForex, riskPercentageForex, slPipsForex);


document.getElementById('calculateButtonForex').addEventListener('click', () => {
    const accountSizeForex = parseFloat(document.getElementById('accountSizeForex').value);
    const riskPercentageForex = parseFloat(document.getElementById('riskPercentageForex').value);
    const slPipsForex = parseFloat(document.getElementById('slPipsForex').value);

    if (isNaN(accountSizeForex) || isNaN(riskPercentageForex) || isNaN(slPipsForex)) {
        document.getElementById('forexLotSizeRes').innerText = 'Please enter valid numbers.';
        return;
    }

    const lotSizeForex = calculateLotSizeForex(accountSizeForex, riskPercentageForex, slPipsForex);

    document.getElementById('forexLotSizeRes').innerText = `Lot Size: ${lotSizeForex.toFixed(2)} units`;
});

//reset futures form fields
function resetForm() {
    const form1 = document.getElementById('positionSizeFuturesForm');
    form1.reset();
}
document.getElementById('resetFutures').addEventListener('click', resetForm);

//reset forex form fields
function resetForm2() {
    const form2 = document.getElementById('positionSizeForexForm');
    form2.reset();
}
document.getElementById('resetForex').addEventListener('click', resetForm2);


