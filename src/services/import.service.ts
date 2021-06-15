import fs from 'fs';
import csv from 'csv-parser';
import { Listing } from '@interfaces/listings.interface';
import { ContactDto } from '@dtos/contacts.dto';
import { ImportResult } from '@interfaces/import.result.interface';
import ListingService from '@services/listings.service';
import ContactService from '@services/contacts.service';

class ImportService {
  static ListingFileHeader: string[] = ['id', 'make', 'price', 'mileage', 'seller_type'];
  static ContactsFileHeader: string[] = ['listing_id', 'contact_date'];

  public listingService = new ListingService();
  public contactService = new ContactService();

  public importListingsFile = async (filePath: string): Promise<ImportResult> => {
    try {
      const result = await this.readListingsCSVFile(filePath);
      if (result.isValidFile == true) {
        this.listingService.saveListings(result.validObjects);
      }
      return Promise.resolve(result);
    } catch (error) {
      throw error;
    }
  };

  public importContactsFile = async (filePath: string): Promise<ImportResult> => {
    try {
      const result = await this.readContactsCSVFile(filePath);
      if (result.isValidFile == true) {
        this.contactService.saveContacts(result.validObjects);
      }
      return Promise.resolve(result);
    } catch (error) {
      throw error;
    }
  };

  public readListingsCSVFile = (filePath: string) => {
    return this.readCSVFile(filePath, ImportService.ListingFileHeader, this.parseListingRow);
  };

  public readContactsCSVFile = (filePath: string) => {
    return this.readCSVFile(filePath, ImportService.ContactsFileHeader, this.parseContactRow);
  };

  public readCSVFile = async (filePath: string, mandatoryHeaders: string[], parseFunction: Function) =>
    new Promise<ImportResult>((resolve, reject) => {
      const objects: any = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('headers', fileHeaders => {
          const missingHeaders = [];
          mandatoryHeaders.forEach(mandatoryHeader => {
            if (!fileHeaders.includes(mandatoryHeader)) {
              missingHeaders.push(mandatoryHeader);
            }
          });
          if (missingHeaders.length != 0) {
            resolve({ isValidFile: false, missingHeaders: missingHeaders, validObjects: [] });
          }
        })
        .on('data', row => {
          const object = parseFunction(row);
          if (object) {
            objects.push(object);
          }
        })
        .on('end', () => {
          fs.unlinkSync(filePath);
          resolve({ isValidFile: true, missingHeaders: [], validObjects: objects });
        })
        .on('error', error => {
          fs.unlinkSync(filePath);
          reject(error);
        });
    });

  public parseListingRow = (listingRow: any): Listing => {
    const id = Number(listingRow.id);
    if (isNaN(id)) {
      return null;
    }
    return {
      id: Number(id),
      make: String(listingRow.make),
      price: Number(listingRow.price),
      mileage: Number(listingRow.mileage),
      sellerType: String(listingRow.seller_type),
    };
  };

  public parseContactRow = (contactRow: any): ContactDto => {
    return {
      listingId: Number(contactRow.listing_id),
      date: Number(contactRow.contact_date),
    };
  };
}

export default ImportService;
