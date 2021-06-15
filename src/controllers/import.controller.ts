import { NextFunction, Request, Response } from 'express';
import ImportService from '@services/import.service';
import HttpException from '@exceptions/HttpException';

class ImportController {
  public importService = new ImportService();

  public importListingsFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const listingsFile = req.file;
      if (listingsFile) {
        const result = await this.importService.importListingsFile(listingsFile.path);
        if (result.isValidFile) {
          res.status(200).json({ validListings: result.validObjects.length });
        } else {
          res.status(400).json(result);
        }
      } else {
        throw new HttpException(400, 'No file.');
      }
    } catch (error) {
      next(error);
    }
  };

  public importContactsFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contactsFile = req.file;
      if (contactsFile) {
        const result = await this.importService.importContactsFile(contactsFile.path);
        if (result.isValidFile) {
          res.status(200).json({ validContacts: result.validObjects.length });
        } else {
          res.status(400).json(result);
        }
      } else {
        throw new HttpException(400, 'No file.');
      }
    } catch (error) {
      next(error);
    }
  };
}
export default ImportController;
