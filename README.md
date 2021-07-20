# Finance Tracker
A private way to track your expenses and income month over month. It uses AWS Amplify to build the resources. 

# Local Setup
1) `npm install`

2) If you don't have an access key set up already, you'll want to add one. [How do I create an AWS access key?](https://aws.amazon.com/premiumsupport/knowledge-center/create-access-key/)

3) [Follow the guide on Amplify's documentation](https://docs.amplify.aws/cli/start/install#option-2-follow-the-instructions) to configure the CLI tool. It starts with `amplify configure`

4) Once configured you can push your resources to AWS
```
amplify push
```

5) Start NPM locally
```
npm run dev
```

6) Load it in the browser [http://localhost:3000](http://localhost:3000) and you'll be able to create an account on the site.
