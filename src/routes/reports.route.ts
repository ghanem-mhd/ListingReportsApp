import { Router } from 'express';
import ReportsController from '@controllers/reports.controller';
import Route from '@interfaces/routes.interface';

class ReportsRoute implements Route {
  public path = '/api/rest/report';
  public router = Router();
  public reportsController = new ReportsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/seller-average-contribution`, this.reportsController.getSellerAverageContribution);
    this.router.get(`${this.path}/make-distribution`, this.reportsController.getMakeDistribution);
    this.router.get(`${this.path}/average-price-for-most-contacted-listings`, this.reportsController.getAveragePriceForMostContactedListings);
    this.router.get(`${this.path}/most-contacted-listings-per-month`, this.reportsController.getMostContactedListingsPerMonth);
  }
}

export default ReportsRoute;
