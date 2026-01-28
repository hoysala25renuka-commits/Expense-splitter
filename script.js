* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-image: url("alexander-grey-8lnbXtxFGZw-unsplash.jpg");
    background-size: contain;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.header {
    background: white;
    padding: 30px;
    border-radius: 15px;
    margin-bottom: 30px;
}

.header h1 {
    color: #333;
    font-size: 2em;
    margin-bottom: 10px;
}

.header p {
    color: #666;
    font-size: 1.1em;
}

.main-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 30px;
}

.card {
    background: white;
    padding: 25px;
    border-radius: 15px;
}

.card h2 {
    color: #333;
    margin-bottom: 20px;
    font-size: 1.5em;
    display: flex;
    align-items: center;
    gap: 10px;
}

.input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
}

input, select {
    flex: 1;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1em;
    transition: border 0.5s;
}

input:focus, select:focus {
    outline: none;
    border-color: #83c5be;
}

button {
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    font-size: 1em;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 600;
}

.btn-primary {
    background: #83c5be;
    color: white;
}

.btn-primary:hover {
    background: #83c5be;
    transform: translateY(-2px);
}

.btn-success {
    background: #ffddd2;
    color: white;
    width: 100%;
}

.btn-success:hover {
    background: #e29578;
}

.btn-delete {
    background: #f56565;
    color: white;
    padding: 8px 12px;
    font-size: 0.9em;
}

.btn-delete:hover {
    background: #e53e3e;
}

.member-list, .expense-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.member-item, .expense-item {
    background: #f7fafc;
    padding: 15px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.member-item span {
    font-weight: 600;
    color: #0f0533;
}

.balance-item {
    background: #f7fafc;
    padding: 15px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.balance-positive {
    color: #48bb78;
    font-weight: bold;
}

.balance-negative {
    color: #f56565;
    font-weight: bold;
}

.balance-zero {
    color: #718096;
}

.settlement-item {
    background: #ebf8ff;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    color: #2c5282;
}

.settlement-amount {
    color: #83c5be;
    font-weight: bold;
}

.expense-details {
    color: #4a5568;
    font-size: 0.9em;
    margin-top: 5px;
}

.expense-title {
    font-weight: 600;
    color: #2d3748;
    font-size: 1.1em;
}

label {
    display: block;
    margin-bottom: 8px;
    color: #4a5568;
    font-weight: 600;
    font-size: 0.9em;
}

.all-settled {
    text-align: center;
    padding: 30px;
    color: #718096;
    font-size: 1.1em;
}

.item {
    background: #f7fafc;
    padding: 15px;
    border-radius: 8px;
}
