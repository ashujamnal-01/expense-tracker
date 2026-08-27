<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expense Tracker</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">

        <header>
            <h1>💰 Expense Tracker</h1>
            <p>Track your spending and manage your money.</p>
        </header>

        <!-- Summary -->
        <section class="summary">
            <div class="card">
                <h3>Total Expenses</h3>
                <p id="totalAmount">₹0</p>
            </div>

            <div class="card">
                <h3>Transactions</h3>
                <p id="transactionCount">0</p>
            </div>

            <div class="card">
                <h3>Top Category</h3>
                <p id="topCategory">-</p>
            </div>
        </section>

        <!-- Add Expense -->
        <section class="form-section">
            <h2>Add Expense</h2>

            <form id="expenseForm">

                <div class="form-group">
                    <label for="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        placeholder="e.g. Lunch"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="amount">Amount (₹)</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="e.g. 250"
                        min="1"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="category">Category</label>
                    <select id="category" required>
                        <option value="">Select category</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Bills">Bills</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        required
                    >
                </div>

                <button type="submit">Add Expense</button>

            </form>
        </section>

        <!-- Transactions -->
        <section class="transactions">
            <div class="transaction-header">
                <h2>Transactions</h2>

                <input
                    type="text"
                    id="search"
                    placeholder="Search expenses..."
                >
            </div>

            <div id="expenseList">
                <p class="empty-message">No expenses yet.</p>
            </div>
        </section>

    </div>

    <script src="script.js"></script>
</body>
</html> * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f4f6f8;
    color: #222;
}

.container {
    width: 90%;
    max-width: 1000px;
    margin: 40px auto;
}

/* Header */

header {
    text-align: center;
    margin-bottom: 30px;
}

header h1 {
    font-size: 36px;
    margin-bottom: 10px;
}

header p {
    color: #666;
}

/* Summary */

.summary {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}

.card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card h3 {
    color: #666;
    margin-bottom: 10px;
}

.card p {
    font-size: 26px;
    font-weight: bold;
}

/* Form */

.form-section,
.transactions {
    background: white;
    padding: 25px;
    border-radius: 12px;
    margin-bottom: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.form-section h2,
.transactions h2 {
    margin-bottom: 20px;
}

#expenseForm {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 8px;
    font-weight: bold;
}

.form-group input,
.form-group select,
#search {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 15px;
}

button {
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: #222;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background: #444;
}

/* Transactions */

.transaction-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

#search {
    width: 250px;
}

.expense-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
}

.expense-info h3 {
    margin-bottom: 5px;
}

.expense-info p {
    color: #777;
    font-size: 14px;
}

.expense-right {
    display: flex;
    align-items: center;
    gap: 15px;
}

.expense-amount {
    font-weight: bold;
}

.delete-btn {
    background: #e74c3c;
    padding: 8px 12px;
    font-size: 13px;
}

.delete-btn:hover {
    background: #c0392b;
}

.empty-message {
    text-align: center;
    color: #888;
    padding: 20px;
}

/* Mobile */

@media (max-width: 700px) {

    .summary {
        grid-template-columns: 1fr;
    }

    #expenseForm {
        grid-template-columns: 1fr;
    }

    .transaction-header {
        flex-direction: column;
        align-items: stretch;
        gap: 15px;
    }

    #search {
        width: 100%;
    }

    .expense-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .expense-right {
        width: 100%;
        justify-content: space-between;
    }
}// Get elements from HTML
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const transactionCount = document.getElementById("transactionCount");
const topCategory = document.getElementById("topCategory");
const searchInput = document.getElementById("search");

// Load expenses from LocalStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


// Add expense
expenseForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const description = document.getElementById("description").value;
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    const expense = {
        id: Date.now(),
        description: description,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(expense);

    saveExpenses();

    expenseForm.reset();

    displayExpenses();
    updateSummary();
});


// Display expenses
function displayExpenses(searchTerm = "") {

    expenseList.innerHTML = "";

    const filteredExpenses = expenses.filter(function (expense) {

        return expense.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

    });

    if (filteredExpenses.length === 0) {

        expenseList.innerHTML =
            '<p class="empty-message">No expenses found.</p>';

        return;
    }

    filteredExpenses.forEach(function (expense) {

        const expenseElement = document.createElement("div");

        expenseElement.classList.add("expense-item");

        expenseElement.innerHTML = `
            <div class="expense-info">
                <h3>${expense.description}</h3>
                <p>${expense.category} • ${expense.date}</p>
            </div>

            <div class="expense-right">
                <span class="expense-amount">
                    ₹${expense.amount.toLocaleString("en-IN")}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </div>
        `;

        expenseList.appendChild(expenseElement);
    });
}


// Delete expense
function deleteExpense(id) {

    expenses = expenses.filter(function (expense) {
        return expense.id !== id;
    });

    saveExpenses();

    displayExpenses();
    updateSummary();
}


// Update dashboard
function updateSummary() {

    // Total amount
    const total = expenses.reduce(function (sum, expense) {
        return sum + expense.amount;
    }, 0);

    totalAmount.textContent =
        "₹" + total.toLocaleString("en-IN");


    // Number of transactions
    transactionCount.textContent = expenses.length;


    // Find top category
    if (expenses.length === 0) {

        topCategory.textContent = "-";
        return;
    }

    const categoryTotals = {};

    expenses.forEach(function (expense) {

        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }

        categoryTotals[expense.category] += expense.amount;
    });

    let highestCategory = "";
    let highestAmount = 0;

    for (const category in categoryTotals) {

        if (categoryTotals[category] > highestAmount) {

            highestAmount = categoryTotals[category];
            highestCategory = category;
        }
    }

    topCategory.textContent = highestCategory;
}


// Save expenses
function saveExpenses() {

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );
}


// Search
searchInput.addEventListener("input", function () {

    displayExpenses(searchInput.value);

});


// Initial display
displayExpenses();
updateSummary();
