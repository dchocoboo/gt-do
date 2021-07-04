# Notarise Devops Assignment

## System Requirements

- NodeJS 12.x
- NPM 6.x (usually preinstalled with the NodeJS)

## Setup

1. Execute on the root directory, it will install necessary npm packages and the serverless

	`npm run start`
	
## Directory Structure

```bash
├── README.md
├── jest-dynamodb-config.dynamic.js
├── jest-dynamodb-config.js (only use for running jest testing)
├── package-lock.json
└── package.json (nodejs related configs here)
├── serverless (Serverless config files goes below)
│   ├── dynamo.yml
│   ├── example
│   │   └── serverless.yml
│   ├── kms.yml
│   └── waf.yml
└── serverless.yml
├── src (Sourcecode for the lambda functions)
│   └── todos
│       ├── __tests__
│       │   ├── create.test.js
│       │   ├── delete.test.js
│       │   ├── get.test.js
│       │   ├── list.test.js
│       │   └── update.test.js
│       ├── create.js
│       ├── create.service.js
│       ├── delete.js
│       ├── delete.service.js
│       ├── dynamodb.js
│       ├── get.js
│       ├── get.service.js
│       ├── list.js
│       ├── list.service.js
│       ├── update.js
│       └── update.service.js
└── yarn.lock
```

## Testing

1. Testing is ran using JEST, setup is automatic via jest code block inside package.json 

1. Just need to run test

	`npm test`
	
1. Note that the files must follow the structure above

## Local Development

1. Running this command will spawn a dynamodb + lambda http server at port 3000

	`npm run offline`
	
	its a syntatic sugar of, but i package everything inside the npm so easier to keep track
	
	`npx sls offline start`
	
## Serverless Deployment

Serverless deployment currently spinning up few services below

1. Lambda (serving HTTPS requests)

1. Dynamodb (datastore)

1. WAFv2 (firewall and first layer security checks)

1. KMS (dynamodb encryption at rest

## CI/CD

Yamls parked under .github folder for github actions
Actions are split into three files

1. check

	run security, vulnerability, and code quality checks
	
1. release development

	run npm test and deploy to development environment if pass
	
1. release staging

	release to staging environment for other stakeholders (biz / management)
	
	github actions dependency on check + dev release
	
1.	release production.

	release to production environment (public/private). github actions dependency on check + staging release


## Known Issues Identified

### DynamoDB-local bug
1. package serverless-dynamodb-local cannot be started on 0.2.31

	vulnerability detected at 0.2.30

	stable currently at 0.2.40 fixed in the package.json	