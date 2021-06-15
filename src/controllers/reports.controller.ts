import { NextFunction, Request, Response } from 'express';
import reportsService from '@services/reports.service';
import HttpException from '@exceptions/HttpException';

class ReportsController {
  public reportsService = new reportsService();

  public getSellerAverageContribution = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reportResult = await this.reportsService.calculateSellerAverageContribution();
      res.json(reportResult);
    } catch (error) {
      next(error);
    }
  };

  public getMakeDistribution = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reportResult = await this.reportsService.calculateMakeDistribution();
      res.json(reportResult);
    } catch (error) {
      next(error);
    }
  };

  public getAveragePriceForMostContactedListings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const percentage = Number(req.query.percentage);
      if (percentage) {
        const reportResult = await this.reportsService.calculateAveragePriceForMostContactedListings(percentage);
        res.json(reportResult);
      } else {
        throw new HttpException(400, 'No percentage query paramter is specified.');
      }
      // TODO: validate query percentage
    } catch (error) {
      next(error);
    }
  };

  public getMostContactedListingsPerMonth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const count = Number(req.query.count);
      // TODO: validate query count
      const reportResult = await this.reportsService.calculateMostContactedListingsPerMonth(count);
      res.json(reportResult);
    } catch (error) {
      next(error);
    }
  };
}

export default ReportsController;
