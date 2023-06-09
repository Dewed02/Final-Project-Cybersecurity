# Final-Project-CyberSecurity
Final Project for COSC 4010 CyberSecurity, a simple banking website without a GUI. The security design that was used to guide development of the project was a slightly modified version of DREAD assessment that was outlined on page 229-230. However, instead of using it for bug maintenance it was used to decide the level of security that would be used to protect different assets within the program.

# Packages
***
List of packages used in project:
  * body-parser
  * email-validator
  * express
  * sha256
  * sqlite3

# Program Operation
To start the program, use the command 'npm run build' followed by 'node dist/index.js' or 'npm run start'. First create a user using the /user/new endpoint (req body = username) POST request. After successful creation of a user, the user must be logged onto the website to use any of the utilities on the website. To log in use the /user/login (req body = username) PUT request
***
endpoint (req body = username), once successfully logged in, on the user side of things:  
  * the user can view their personal information (i.e., name, address, email) using the /user/info endpoint (req body = username) GET request
  * the can update their address using the /user/address endpoint (req body = username, address(new address to be used)) PUT request 
  *  or the user can change their login password using the /user/password endpoint (req body = username) PUT request
***
on the financial side of things depending on the type of bank account the user initial created (checking/savings) the user can:
  * withdraw funds using the /checkings/withdraw or /savings/withdraw endpoint (req body = amount (amount to withdraw), username) POST request
  * deposit funds using the /checkings/deposit or /savings/deposit endpoint (req body = amount (amount to deposit), username) POST request
  * view available balance using the /checkings/balance or /savings/balance endpoint (req body = username) GET request
  * create a checking or savings account if they do not already have one using the /checkings/new or /savings/new endpoint (req body = username) POST request
Finally, once the user has finished whatever tasks they needed to do on the website they can logout using the /user/logout endpoint (req body = username) PUT request
                
# Program Integrity
The integrity of the program is maintained with a log to monitor all important activity, this involves any process that deals with the movement of finances (i.e., withdraw/deposit) in addition to checking the balance of an account, and creating a new account. The log also notes when changes are made to the user's account including address and password changes, in addition to creation of a new user. 
