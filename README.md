# Finance Tracker
A nice private way to track your expenses and income month over month


# Setup
1) `npm install`

2) Copy `.env.local.example` to `.env.local`

3) Configure MySQL
- Set the `MYSQL_URI` environment variable in `.env`.
```
MYSQL_URI=mysql://user:password@localhost:3306/db_name
```
- [Create the table schemas](https://next-auth.js.org/schemas/mysql)

6) Configure Google OAuth
[Follow the steps](https://support.google.com/cloud/answer/6158849?hl=en) to generate a Client ID and Client Secret.

7) Update the [Next Auth](https://next-auth.js.org) config.
- `NEXTAUTH_URL` should be your application URL. My development URL is http://localhost:3000
- `NEXTAUTH_GOOGLE_CLIENT_ID` and `NEXTAUTH_GOOGLE_CLIENT_SECRET` will be the values you generated in step 6.

