// Grab DOM elements
const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseCategory = document.getElementById('expense-category');
const expenseDate = document.getElementById('expense-date');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

// Load expenses from LocalStorage or initialize empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to calculate and update total spent
function updateTotal() {
    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    totalAmount.textContent = total.toFixed(2);
}

// Function to render expenses to the table
function renderExpenses() {
    expenseList.innerHTML = '';
    
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.name}</td>
            <td><span class="category-badge">${expense.category}</span></td>
            <td>€${expense.amount.toFixed(2)}</td>
            <td>${expense.date}</td>
            <td><button class="delete-btn" onclick="deleteExpense(${index})">✕</button></td>
        `;
        expenseList.appendChild(row);
    });

    updateTotal();
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Add Expense Event Listener
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newExpense = {
        name: expenseName.value,
        amount: parseFloat(expenseAmount.value),
        category: expenseCategory.value,
        date: expenseDate.value
    };

    expenses.push(newExpense);
    renderExpenses();

    // Clear form
    expenseForm.reset();
});

// Delete Expense Function
window.deleteExpense = function(index) {
    expenses.splice(index, 1);
    renderExpenses();
};

// Initial render on page load
renderExpenses();
