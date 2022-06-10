// get the loans from page
function getValue() {
    // step 1 get values from the page
    let lAmount = Number(document.getElementById("lAmount").value);
    let lTerm = parseInt(document.getElementById("lTerm").value);
    let lRate = parseFloat(document.getElementById("lRate").value);

    // check for NaN
    if (isNaN(lAmount)) {
        alert("Enter a valid amount. Must be a number");
        document.getElementById("lAmount").focus();
    } else if (isNaN(lTerm)) {
        document.getElementById("lTerm").focus();
        alert("Enter a valid payment term. Enter the number of monthly payments for the loan")
    } else if (isNaN(lRate)) {
        alert("Enter a valid loan rate. Must be a valid number")
        document.getElementById("lRate")
    } else {
        // convert the annual rate to monthly rate
        let mRate = calcRate(lRate);
        // calculate monthly payment
        let lPayment = calcPayment(lAmount, mRate, lTerm)
        // build our schedlule
        let payments = buildSchedule(lAmount, mRate, lTerm, lPayment)
        // call display data
        displayData(payments, lAmount, lPayment);
    }
}

// builds an amoritization schedule
function buildSchedule(amount, rate, term, payment) {
    let payments = [];

    let balance = amount;
    let totalInterest = 0;
    let monthlyInterest = 0;
    let monthlyPrincipal = 0;


    for (let month = 1; month <= term; month++) {

        monthlyInterest = calcInterest(balance, rate);
        totalInterest += monthlyInterest;
        monthlyPrincipal = payment - monthlyInterest;
        balance = balance - monthlyPrincipal;

        let curPayment = {
            month: month,
            payment: payment,
            principal: monthlyPrincipal,
            interest: monthlyInterest,
            totalInterest: totalInterest,
            balance: balance,
        }

        payments.push(curPayment);

        // return an array of payment objects

    }
    return payments;
}

// display the table of payments at the bottom of page
// add the summary info at the top
function displayData(payments, lAmount, payment, ) {
    let tableBody = document.getElementById("scheduleBody");
    let template = document.getElementById("scheduleTemplate");

    // clear the table of previous values
    tableBody.innerHTML = "";

    for (let index = 0; index < payments.length; index++) {

        // clone the template
        let paymentRow = document.importNode(template.content, true);
        // get an array of columns
        let paymentCols = paymentRow.querySelectorAll("td");

        paymentCols[0].textContent = payments[index].month;
        paymentCols[1].textContent = payments[index].payment.toFixed(2);
        paymentCols[2].textContent = payments[index].principal.toFixed(2);
        paymentCols[3].textContent = payments[index].interest.toFixed(2);
        paymentCols[4].textContent = payments[index].totalInterest.toFixed(2);
        paymentCols[5].textContent = payments[index].balance.toFixed(2);

        // write the payment at the top of the page
        tableBody.appendChild(paymentRow);





    }

    document.getElementById("payment").innerHTML = Number(payment).toLocaleString("en-us", {
        style: "currency",
        currency: "USD"
    });
    document.getElementById("totalPrincipal").innerHTML = Number(lAmount).toLocaleString("en-us", {
        style: "currency",
        currency: "USD"
    });

    let totalInterest = payments[payments.length - 1].totalInterest;
    document.getElementById("totalInterest").innerHTML = Number(totalInterest).toLocaleString("en-us", {
        style: "currency",
        currency: "USD"
    });

    let totalCost = totalInterest + lAmount;
    document.getElementById("totalCost").innerHTML = Number(totalCost).toLocaleString("en-us", {
        style: "currency",
        currency: "USD"
    });

}

// helper funcions
function calcPayment(amount, rate, term) {
    let payment = 0;
    payment = (amount * rate) / (1 - Math.pow(1 + rate, -term));
    return payment;
}

function calcRate(rate) {
    return rate = rate / 1200;

}

function calcInterest(balance, rate) {
    return balance * rate;
}