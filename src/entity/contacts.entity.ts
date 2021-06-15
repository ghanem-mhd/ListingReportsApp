import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contact } from '@interfaces/contacts.interface';
import { ListingEntity } from './listings.entity';

@Entity()
export class ContactEntity implements Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  listingId: number;

  @Column()
  @IsNotEmpty()
  date: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => ListingEntity, listing => listing.contacts)
  listing: ListingEntity;
}
