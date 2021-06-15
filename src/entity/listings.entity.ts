import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Listing } from '@interfaces/listings.interface';
import { ContactEntity } from './contacts.entity';

@Entity()
export class ListingEntity implements Listing {
  @PrimaryColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  make: string;

  @Column()
  @IsNotEmpty()
  price: number;

  @Column()
  @IsNotEmpty()
  mileage: number;

  @Column()
  @IsNotEmpty()
  sellerType: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(type => ContactEntity, contact => contact.listing)
  contacts: ContactEntity[];
}
