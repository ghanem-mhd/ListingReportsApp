import { getRepository } from 'typeorm';
import { ListingEntity } from '@entity/listings.entity';
import { Listing } from '@interfaces/listings.interface';

class ListingService {
  public listings = ListingEntity;

  public async findAllListing(): Promise<Listing[]> {
    const listingRepository = getRepository(this.listings);
    const listings: Listing[] = await listingRepository.find({ relations: ['contacts'] });
    return listings;
  }

  public async createListing(listing: Listing): Promise<Listing> {
    const listingRepository = getRepository(this.listings);
    const createListing: Listing = await listingRepository.save(listing);
    return createListing;
  }

  public saveListings(listings: Listing[]): void {
    const listingRepository = getRepository(this.listings);
    listingRepository.save(listings);
  }
}

export default ListingService;
