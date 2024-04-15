import { MongoClient, Db, ObjectId } from 'mongodb';
import { NewAnimalDbo, AnimalDetailsDbo, AnimalListDbo } from './animals.dbo';
import { config } from '../config';

export class AnimalsService {
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

    if (!collectionNames.includes(config.animalsCollection)) {
      await this._database.createCollection<NewAnimalDbo>(
        config.animalsCollection,
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

  async find(id: string): Promise<AnimalDetailsDbo | null> {
    const database = await this.getDatabase();
    // TODO: use aggregation to map shelterId into shelter object
    const collection = database.collection<AnimalDetailsDbo>('animals');
    return collection.findOne({ _id: new ObjectId(id) });
  }

  async findAll(): Promise<AnimalListDbo[]> {
    const database = await this.getDatabase();
    const collection = database.collection<AnimalListDbo>('animals');
    return collection.find({}).toArray();
  }

  async create(data: NewAnimalDbo): Promise<string> {
    const database = await this.getDatabase();
    const collection = database.collection<NewAnimalDbo>('animals');
    return (await collection.insertOne(data)).insertedId.toString();
  }
}
