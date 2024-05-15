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
  nickname: string;
  gender: 'BOY' | 'GIRL';
  species: 'CAT' | 'DOG';
  minBirthDate: string;
  maxBirthDate: string;
  breed: string;
  color: string;
  size: 'SMALL' | 'MEDIUM' | 'LARGE';
  description: string;
  photos: Array<string>;
  shelterId: string;
}
```

Response body:
```typescript
{
  id: string;
}
```

## Get one animal

Method: `GET /animals/ANIMAL_ID`

Response body:
```typescript
{
  id: string;
  nickname: string;
  gender: 'BOY' | 'GIRL';
  species: 'CAT' | 'DOG';
  minBirthDate: string;
  maxBirthDate: string;
  breed: string;
  color: string;
  size: 'SMALL' | 'MEDIUM' | 'LARGE';
  description: string;
  photos: Array<string>;
  shelter: {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    links: Array<string>;
  };
}
```

## Get animals list

Method: `POST /animals`

Request body:
```typescript
{
  limit?: number;
  offset?: number;
}
```

Response body:
```typescript
{
  totalAmount: number;
  list: {
    id: string;
    nickname: string;
    photo: string;
    gender: 'BOY' | 'GIRL';
    minBirthDate: string;
    maxBirthDate: string;
  }[];
```

## Delete one animal

Method: `DELETE /animals/ANIMAL_ID`

Response body:
```typescript
{}
```

## Create shelter

Method: `POST /shelters`

Request body:
```typescript
{
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  email: string;
  photos: Array<string>;
  links: Array<string>;
  login: string;
  password: string;
}
```

Response body:
```typescript
{
  id: string;
}
```

## Get one shelter

Method: `GET /shelters/SHELTER_ID`

Response body:
```typescript
{
  id: string;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  email: string;
  photos: Array<string>;
  links: Array<string>;
}
```

## Get shelter list

Method: `POST /shelters`

Request body:
```typescript
{
  limit?: number;
  offset?: number;
}
```

Response body:
```typescript
{
  totalAmount: number;
  list: {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    photos: Array<string>;
  }[];
```

# Stay in touch

- Author - [Befezdow](https://github.com/Befezdow)
