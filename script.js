// Simple data
let members = [];
let expenses = [];

// Load from storage
function load() {
    const m = localStorage.getItem('members');
    const e = localStorage.getItem('expenses');
    if (m) members = JSON.parse(m);
    if (e) expenses = JSON.parse(e);
    show();
}

// Save to storage
function save() {
    localStorage.setItem('members', JSON.stringify(members));
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Add member
function addMember() {
    const name = document.getElementById('memberName').value.trim();
    if (name) {
        members.push({ id: Date.now(), name: name });
        document.getElementById('memberName').value = '';
        save();
        show();
    }
}

// Delete member
function deleteMember(id) {
    members = members.filter(m => m.id !== id);
    expenses = expenses.filter(e => e.paidBy !== id);
    save();
    show();
}

// Add expense
function addExpense() {
    const name = document.getElementById('expenseName').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const paidBy = parseInt(document.getElementById('paidBy').value);
    
    if (name && amount && paidBy) {
        expenses.push({
            id: Date.now(),
            name: name,
            amount: amount,
            paidBy: paidBy
        });
        
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
        save();
        show();
    }
}

// Delete expense
function deleteExpense(id) {
    expenses = expenses.filter(e => e.id !== id);
    save();
    show();
}

// Calculate who owes what
function calculate() {
    const balances = {};
    members.forEach(m => balances[m.id] = 0);

    expenses.forEach(exp => {
        const perPerson = exp.amount / members.length;
        balances[exp.paidBy] += exp.amount;
        members.forEach(m => balances[m.id] -= perPerson);
    });

    return balances;
}

// Show members
function showMembers() {
    const list = document.getElementById('memberList');
    list.innerHTML = members.map(m => `
        <div class="item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px 10px; font-size: 18px;">
            <span>${m.name}</span>
            <button onclick="deleteMember(${m.id})">Delete</button>
        </div>
    `).join('');

    const select = document.getElementById('paidBy');
    select.innerHTML = '<option value="">Who paid?</option>' + 
        members.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
}

// Show expenses
function showExpenses() {
    const list = document.getElementById('expenseList');
    if (expenses.length === 0) {
        list.innerHTML = '<p>No expenses yet</p>';
        return;
    }

    list.innerHTML = expenses.map(exp => {
        const payer = members.find(m => m.id === exp.paidBy);
        return `
            <div class="item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px 10px; font-size: 18px; line-height: 1.6;">
                <div>
                    <strong style="font-size: 20px;">${exp.name}</strong><br>
                    <span style="font-size: 16px;">₹${exp.amount} paid by ${payer?.name}</span>
                </div>
                <button onclick="deleteExpense(${exp.id})">Delete</button>
            </div>
        `;
    }).join('');
}

// Show balances
function showBalances() {
    const list = document.getElementById('balanceList');
    const balances = calculate();

    list.innerHTML = members.map(m => {
        const bal = balances[m.id];
        const color = bal > 0 ? 'green' : bal < 0 ? 'red' : 'gray';
        return `
            <div class="item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px 10px; font-size: 18px;">
                <span>${m.name}</span>
                <span style="color: ${color}; font-weight: bold;">₹${bal.toFixed(2)}</span>
            </div>
        `;
    }).join('');
}

// Show settlements
function showSettlements() {
    const list = document.getElementById('settlementList');
    const balances = calculate();
    
    const owes = members.filter(m => balances[m.id] < -0.01)
        .map(m => ({ name: m.name, amt: -balances[m.id] }))
        .sort((a, b) => b.amt - a.amt);
    
    const owed = members.filter(m => balances[m.id] > 0.01)
        .map(m => ({ name: m.name, amt: balances[m.id] }))
        .sort((a, b) => b.amt - a.amt);

    if (owes.length === 0) {
        list.innerHTML = '<div style="padding: 20px; font-size: 20px; text-align: center;">All settled! 🎉</div>';
        return;
    }

    const settlements = [];
    let i = 0, j = 0;
    
    while (i < owes.length && j < owed.length) {
        const amount = Math.min(owes[i].amt, owed[j].amt);
        settlements.push(`${owes[i].name} → ${owed[j].name}: ₹${amount.toFixed(2)}`);
        
        owes[i].amt -= amount;
        owed[j].amt -= amount;
        
        if (owes[i].amt < 0.01) i++;
        if (owed[j].amt < 0.01) j++;
    }

    list.innerHTML = settlements.map(s => `<div class="item" style="padding: 15px 10px; font-size: 18px; line-height: 1.6;">${s}</div>`).join('');
}

// Show everything
function show() {
    showMembers();
    showExpenses();
    showBalances();
    showSettlements();
}

// Start
load();
