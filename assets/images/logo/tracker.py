import datetime

def add_transaction():
    date = datetime.date.today().strftime("%d/%m")
    note = input("Enter note (e.g., Lunch, Bus, Salary): ")
    amount = input("Enter amount (use + for income, - for expense): ")

    with open("tracker.txt", "a") as file:
        file.write(f"{date} {note} {amount}\n")

    print("✅ Saved to tracker.txt")

def show_summary():
    income = 0
    expense = 0
    try:
        with open("tracker.txt", "r") as file:
            for line in file:
                parts = line.strip().split()
                if len(parts) == 3:
                    _, _, amt = parts
                    amt = float(amt)
                    if amt > 0:
                        income += amt
                    else:
                        expense += abs(amt)
        print("\n📊 Monthly Summary:")
        print(f"  💰 Total Income: ₹{income}")
        print(f"  💸 Total Expense: ₹{expense}")
        print(f"  📈 Profit: ₹{income - expense}")
    except FileNotFoundError:
        print("⚠️ No data yet!")

while True:
    print("\n1️⃣ Add Transaction")
    print("2️⃣ View Summary")
    print("3️⃣ Exit")
    choice = input("Choose: ")

    if choice == "1":
        add_transaction()
    elif choice == "2":
        show_summary()
    elif choice == "3":
        break
    else:
        print("Invalid choice!")
