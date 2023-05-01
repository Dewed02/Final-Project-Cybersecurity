import { connect } from './database';

export const newUser = async (name: string, address:string, userName: string,  password: string, 
    balance: number, email: string, accountType: string) => {
        console.log(name, address, userName, password, balance, email, accountType);
    const db = await connect();
    if (balance < 200) {
        throw new Error("Balance must be at least $200");
    }
    let userExists = await db.get(`SELECT * FROM LoginInfo WHERE userName = :userName AND password = :password`, {
        ':userName': userName,
        ':password': password
    });
    if (userExists) {
        throw new Error("Username or password already exists");
    }
    const verifyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!verifyEmail.test(email)) {
        throw new Error("Invalid email");
    }
    await db.run(`INSERT INTO PersonalInfo (name, address, email) VALUES (name, address, email)`, {
        ':name': name,
        ':address': address,
        ':email': email
    });
    return enterAccountInfo(userName, password, balance, accountType);
}

export const enterAccountInfo = async (userName: string, password: string, balance: number, accountType: string) => {
    const db = await connect();
    await db.run(`INSERT INTO LoginInfo (userName, password) VALUES (userName, password)`, {
        ':userName': userName,
        ':password': password
    });
    const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    if (accountType === "savings") {
        await db.run(`INSERT INTO Savings (accountNumber, balance) VALUES (accountNumber, balance)`, {
            ':accountNumber': accountNumber,
            ':balance': balance
        });
    }
    else if (accountType === "checkings") {
    await db.run(`INSERT INTO Checkings (accountNumber, balance) VALUES (accountNumber, balance)`, {
        ':accountNumber': accountNumber,
        ':balance': balance
    });
    }
}