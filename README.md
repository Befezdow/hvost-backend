# Installation

```bash
$ npm install
```

# Running the app

Config file path: `./src/config.ts`. 
There you can set up Mongo URI (field `mongoURI`; default: `mongodb://localhost:27018`) and application port (field `port`; default: `3000`).
Also, you can configure used database (field `mongoDatabase`) and collection (`animalsCollection`).

## Local

Backend URL: `http://localhost:3000`

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# create build
$ npm run build

# production mode
$ npm run start:prod
```

## Docker

Backend URL: `http://localhost:80`<br />
Mongo URL: `http://localhost:27018`

```bash
$ docker compose up
```

# API methods

## Create animal

Method: `POST /animals`

Request body:
```typescript
{
  name: string;
  description: string;
  questions: {
    text: string;
    options: {
      id: number;
      text: string;
    }[];
    answer: number;
  }[];
}
```

Response body:
```typescript
{
  id: string;
}
```

### Example:

`POST http://localhost:3000/animals`

Request body:
```json
{
  "name": "Test animal name",
  "description": "Test animal description",
  "questions": [
    {
      "text": "Question 1",
      "options": [
        {
          "id": 1,
          "text": "Option 1"
        },
        {
          "id": 2,
          "text": "Option 2"
        }
      ],
      "answer": 1
    },
    {
      "text": "Question 2",
      "options": [
        {
          "id": 1,
          "text": "Option 1"
        },
        {
          "id": 2,
          "text": "Option 2"
        }
      ],
      "answer": 2
    }
  ]
}
```

Response body:
```json
{
  "id": "64162f3e4ad1038b41c39cc7"
}
```

## Get one animal

Method: `/animals/QUIZ_ID`

Response body:
```typescript
{
  id: string;
  name: string;
  description: string;
  questions: {
    text: string;
    options: {
      id: number;
      text: string;
    }[];
    answer: number;
  }[];
}
```

### Example:

`GET http://localhost:3000/animals/64162b0ad366dddcca73aeeb`

Response body:
```json
{
  "id": "64162b0ad366dddcca73aeeb",
  "name": "Test animal name",
  "description": "Test animal description",
  "questions": [
    {
      "text": "Question 1",
      "answer": 1,
      "options": [
        {
          "id": 1,
          "text": "Option 1"
        },
        {
          "id": 2,
          "text": "Option 2"
        }
      ]
    },
    {
      "text": "Question 2",
      "answer": 2,
      "options": [
        {
          "id": 1,
          "text": "Option 1"
        },
        {
          "id": 2,
          "text": "Option 2"
        }
      ]
    }
  ]
}
```

## Get all animals

Method: `/animals`

Response body:
```typescript
{
  id: string;
  name: string;
  description: string;
}[];
```

### Example:

`GET http://localhost:3000/animals`

Response body:
```json
[
  {
    "id": "64162b0ad366dddcca73aeeb",
    "name": "Test animal name",
    "description": "Test animal description"
  },
  {
    "id": "64162b7fd53cfaf5f8f0d5d9",
    "name": "Test animal name",
    "description": "Test animal description"
  },
  {
    "id": "64162ba1ca39e4c097c92926",
    "name": "Test animal name",
    "description": "Test animal description"
  },
  {
    "id": "64162bc6f87148884b551b7f",
    "name": "Test animal name",
    "description": "Test animal description"
  },
  {
    "id": "64162f3e4ad1038b41c39cc7",
    "name": "Test animal name",
    "description": "Test animal description"
  },
  {
    "id": "641630ddf45e91ce95772157",
    "name": "Test animal name",
    "description": "Test animal description"
  }
]
```

# Stay in touch

- Author - [Befezdow](https://github.com/Befezdow)
