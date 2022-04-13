import { Query, Resolver } from '@nestjs/graphql';
import { PurchasesService } from 'src/services/purchases.service';
import { Purchase } from '../models/purchase';

@Resolver()
export class PurchasesResolver {
  constructor(private purchasesService: PurchasesService) {}

  @Query(() => [Purchase])
  // @UseGuards(AuthorizationGuard)
  products() {
    return this.purchasesService.listAllPurchases();
  }
}
