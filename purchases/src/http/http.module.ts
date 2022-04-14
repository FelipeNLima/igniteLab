import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { CustomersService } from '../services/customers.service';
import { PurchasesService } from '../services/purchases.service';
import { DatabaseModule } from '../database/database.module';
import { ProductsResolver } from '../http/graphql/resolvers/products.resolver';
import { ProductsService } from '../services/products.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    //Resolvers
    ProductsResolver, 
    PurchasesResolver, 
    CustomersResolver,

    //Services
    ProductsService, 
    PurchasesService, 
    CustomersService,
  ],
})
export class HttpModule {}
