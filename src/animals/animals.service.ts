import { MongoClient, Db, ObjectId } from 'mongodb';
import {
  NewAnimalDbo,
  AnimalDetailsDbo,
  AnimalListDbo,
  UpdateAnimalDbo,
  AnimalListRequestDbo,
  AnimalListFiltersDbo,
} from './animals.dbo';
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

  async findById(id: string): Promise<AnimalDetailsDbo | null> {
    const database = await this.getDatabase();
    const collection = database.collection<AnimalDetailsDbo>('animals');

    const aggregationPipeline = [
      {
        $match: { _id: new ObjectId(id) },
      },
      {
        $lookup: {
          from: 'shelters',
          localField: 'shelterId',
          foreignField: '_id',
          as: 'shelters',
        },
      },
      {
        $addFields: {
          shelter: {
            $first: '$shelters',
          },
        },
      },
      {
        $project: {
          nickname: true,
          gender: true,
          species: true,
          minBirthDate: true,
          maxBirthDate: true,
          breed: true,
          color: true,
          size: true,
          description: true,
          photos: true,
          shelter: {
            id: '$shelter._id',
            name: '$shelter.name',
            address: '$shelter.address',
            phoneNumber: '$shelter.phoneNumber',
            email: '$shelter.email',
            links: '$shelter.links',
          },
        },
      },
    ];
    const aggregationResult = await collection
      .aggregate<AnimalDetailsDbo>(aggregationPipeline)
      .toArray();
    if (aggregationResult.length === 0) {
      return null;
    }

    return aggregationResult[0];
  }

  async findAll(params: AnimalListRequestDbo): Promise<AnimalListDbo[]> {
    const { offset, limit, filters } = params;
    const database = await this.getDatabase();
    const collection = database.collection<AnimalListDbo>('animals');

    let cursor = collection.find(filters);
    if (offset != null) {
      cursor = cursor.skip(offset);
    }
    if (limit != null) {
      cursor = cursor.limit(limit);
    }
    return cursor.toArray();
  }

  async totalAmount(filters?: AnimalListFiltersDbo): Promise<number> {
    const database = await this.getDatabase();
    const collection = database.collection<AnimalListDbo>('animals');
    return collection.countDocuments(filters);
  }

  async create(data: NewAnimalDbo): Promise<string> {
    const database = await this.getDatabase();
    const collection = database.collection<NewAnimalDbo>('animals');
    return (await collection.insertOne(data)).insertedId.toString();
  }

  async deleteById(id: string, shelterId?: string): Promise<boolean> {
    const database = await this.getDatabase();
    const collection = database.collection<AnimalDetailsDbo>('animals');
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      shelterId: shelterId ? new ObjectId(shelterId) : undefined,
    });
    return result.deletedCount !== 0;
  }

  async update(id: string, data: UpdateAnimalDbo): Promise<void> {
    const database = await this.getDatabase();
    const collection = database.collection<AnimalDetailsDbo>('animals');
    const result = await collection.updateOne({ _id: new ObjectId(id) }, data);
    if (result.modifiedCount === 0) {
      throw new Error(`The animal with id ${id} not found`);
    }
  }
}
