# Finance Tracker
A nice private way to track your expenses and income month over month


# Setup
1) `npm install`

2) Copy `.env.local.example` to `.env.local`

3) Configure Google OAuth
[Follow the steps](https://support.google.com/cloud/answer/6158849?hl=en) to generate a Client ID and Client Secret.




Access patterns
ui.userId = ?
AND i.type = ?
AND i.date BETWEEN ? AND ?



PK userID#Type
SortKey: Date

@key(fields: ["user_uuid", "type"])
@key(name: "itemsByDate", fields: ["date"], queryField: "itemsByDate")

----

amplify init