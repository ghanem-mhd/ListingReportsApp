import { NextFunction, Request, Response } from 'express';
import reportsService from '@services/reports.service';
import * as _ from 'lodash';

class IndexController {
  public reportsService = new reportsService();

  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const response = {};

      const report1Rows = await this.reportsService.calculateSellerAverageContribution();
      report1Rows.forEach(object => {
        object['avgPrice'] = this.formatPrice(object['avgPrice']);
      });
      response['report1Rows'] = report1Rows;

      const report2Rows = await this.reportsService.calculateMakeDistribution();
      response['report2Rows'] = report2Rows;

      const report3Value = await this.reportsService.calculateAveragePriceForMostContactedListings(0.3);
      if (report3Value) {
        response['report3Value'] = this.formatPrice(report3Value);
      } else {
        response['report3Value'] = '';
      }

      const report4Rows = await this.reportsService.calculateMostContactedListingsPerMonth(5);
      report4Rows.forEach(object => {
        object['price'] = this.formatPrice(object['price']);
      });
      report4Rows.forEach(object => {
        this.formatMileage(object, 'mileage');
      });
      response['report4Tables'] = _.groupBy(report4Rows, 'month');

      res.render('pages/index', response);
    } catch (error) {
      next(error);
    }
  };

  public formatPrice = (price): any => {
    return `€ ${Math.trunc(price).toLocaleString('de-DE')}._`;
  };

  public formatMileage = (object, mileageProperty): void => {
    object[mileageProperty] = `${object[mileageProperty]} KM`;
  };
}

export default IndexController;
