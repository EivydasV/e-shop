import mongoose from 'mongoose'
import config from 'config'
import log from './logger'
import { ProductModel } from '../models'
import { Categories, OS, Product } from '../models/product.model'
import faker from 'faker'
async function connectToDb() {
  const dbUri = config.get<string>('mongoUri')

  await mongoose.connect(dbUri)
  const products = await ProductModel.estimatedDocumentCount()

  if (!products) {
    log.info('Seeding products...')
    const fakeProducts: Product[] = []
    for (let i = 0; i < 30; i++) {
      fakeProducts.push({
        categories: faker.random.arrayElements(Object.values(Categories)),
        createdBy: new mongoose.Types.ObjectId('6264585907cce137d41449d1'),
        description: faker.lorem.sentence(40),
        inStock: faker.datatype.number(100),
        os: faker.random.arrayElements(Object.values(OS)),
        price: Number(faker.commerce.price()),
        title: faker.commerce.productName(),
        trailer: 'https://www.youtube.com/watch?v=VbF6REQyel4',
        images: faker.random.arrayElements([
          'GYYeK_sPNHVZEwEnXRLJH.jpeg',
          'rJZD68_f9_98apSEQNB1G.jpeg',
        ]),
        soldCount: 0,
      })
    }
    log.info('Seeded')
    await ProductModel.create(fakeProducts)
  }

  log.info('connected to mongoDB')
}

export default connectToDb
