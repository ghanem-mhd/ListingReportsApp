import { Router } from 'express';
import ImportController from '@controllers/import.controller';
import Route from '@interfaces/routes.interface';
import HttpException from '@exceptions/HttpException';
import multer from 'multer';

class ImportRoute implements Route {
  public path = '/api/rest/import';
  public uploadsPath = 'uploads/';
  public router = Router();
  public importController = new ImportController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/listings`,
      multer({ dest: this.uploadsPath, fileFilter: ImportRoute.csvFileFilter }).single('csvFile'),
      this.importController.importListingsFile,
    );
    this.router.post(
      `${this.path}/contacts`,
      multer({ dest: this.uploadsPath, fileFilter: ImportRoute.csvFileFilter }).single('csvFile'),
      this.importController.importContactsFile,
    );
  }

  static csvFileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(csv)$/) || file.mimetype != 'text/csv') {
      return cb(new HttpException(422, 'Only csv files are allowed.'), false);
    }
    cb(null, true);
  }
}

export default ImportRoute;
