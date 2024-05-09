import { MongoClient, Db, ObjectId } from 'mongodb';
import {
  NewShelterDbo,
  ShelterDetailsDbo,
  ShelterListDbo,
  UpdateShelterDbo,
} from './shelters.dbo';
import { config } from '../config';

export class SheltersService {
  async init() {
    let client;
    try {
      console.log(`MongoDB URI: ${config.mongoURI}`);
      client = await new MongoClient(config.mongoURI).connect();
      console.log('MongoDB connection established');
    } catch (err) {
      console.log('Connection error: ', err);
      throw err;
    }

    this._database = client.db(config.mongoDatabase);

    const collectionNames = await this._database
      .listCollections()
      .map((elem) => elem.name)
      .toArray();

    if (!collectionNames.includes(config.sheltersCollection)) {
      await this._database.createCollection<NewShelterDbo>(
        config.sheltersCollection,
      );
    }
  }

  _database: Db | null = null;

  async getDatabase(): Promise<Db> {
    if (this._database === null) {
      await this.init();
    }

    return this._database!;
  }

  async findById(id: string): Promise<ShelterDetailsDbo | null> {
    const database = await this.getDatabase();
    const collection = database.collection<ShelterDetailsDbo>('shelters');
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async findByLogin(login: string): Promise<ShelterDetailsDbo | null> {
    const database = await this.getDatabase();
    const collection = database.collection<ShelterDetailsDbo>('shelters');
    return collection.findOne({ login: login });
  }

  async findAll(offset?: number, limit?: number): Promise<ShelterListDbo[]> {
    const database = await this.getDatabase();
    const collection = database.collection<ShelterListDbo>('shelters');
    let cursor = collection.find();
    if (offset != null) {
      cursor = cursor.skip(offset);
    }
    if (limit != null) {
      cursor = cursor.limit(limit);
    }
    return cursor.toArray();
  }

  async totalAmount(): Promise<number> {
    const database = await this.getDatabase();
    const collection = database.collection<ShelterListDbo>('shelters');
    return collection.countDocuments();
  }

  async create(data: NewShelterDbo): Promise<string> {
    const database = await this.getDatabase();
    const collection = database.collection<NewShelterDbo>('shelters');
    return (await collection.insertOne(data)).insertedId.toString();
  }

  async update(id: string, data: UpdateShelterDbo): Promise<void> {
    const database = await this.getDatabase();
    const collection = database.collection<ShelterDetailsDbo>('shelters');
    const result = await collection.updateOne({ _id: new ObjectId(id) }, data);
    if (result.modifiedCount === 0) {
      throw new Error(`The shelter with id ${id} not found`);
    }
  }
}
