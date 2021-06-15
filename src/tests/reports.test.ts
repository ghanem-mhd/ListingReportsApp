import request from 'supertest';
import { createConnection } from 'typeorm';
import App from '@/app';
import { dbConnection } from '@databases';
import ReportsRoute from '@routes/reports.route';

beforeAll(async () => {
  await createConnection(dbConnection);
});

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 50));
});

describe('Testing Reports', () => {
  describe('[GET] seller-average-contribution', () => {
    it('should return 200', function (done) {
      const reportsRoute = new ReportsRoute();

      reportsRoute.reportsController.reportsService.calculateSellerAverageContribution = jest.fn().mockReturnValue({});

      const app = new App([reportsRoute]);

      request(app.getServer())
        .get(`${reportsRoute.path}/seller-average-contribution`)
        .expect(200)
        .then(response => {
          expect(response.body).toMatchObject({});
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('[GET] make-distribution', () => {
    it('should return 200', function (done) {
      const reportsRoute = new ReportsRoute();

      reportsRoute.reportsController.reportsService.calculateMakeDistribution = jest.fn().mockReturnValue({});

      const app = new App([reportsRoute]);

      request(app.getServer())
        .get(`${reportsRoute.path}/make-distribution`)
        .expect(200)
        .then(response => {
          expect(response.body).toMatchObject({});
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('[GET] average-price-for-most-contacted-listings', () => {
    it('should return 200', function (done) {
      const reportsRoute = new ReportsRoute();

      reportsRoute.reportsController.reportsService.calculateAveragePriceForMostContactedListings = jest.fn().mockReturnValue({});

      const app = new App([reportsRoute]);

      request(app.getServer())
        .get(`${reportsRoute.path}/average-price-for-most-contacted-listings`)
        .query({ percentage: '0.5' })
        .expect(200)
        .then(response => {
          expect(response.body).toMatchObject({});
          done();
        })
        .catch(err => done(err));
    });

    it('should return 400 when no percentage paramter', function (done) {
      const reportsRoute = new ReportsRoute();

      reportsRoute.reportsController.reportsService.calculateAveragePriceForMostContactedListings = jest.fn().mockReturnValue({});

      const app = new App([reportsRoute]);

      request(app.getServer())
        .get(`${reportsRoute.path}/average-price-for-most-contacted-listings`)
        .expect(400)
        .then(response => {
          expect(response.body).toMatchObject({});
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('[GET] most-contacted-listings-per-month', () => {
    it('should return 200', function (done) {
      const reportsRoute = new ReportsRoute();

      reportsRoute.reportsController.reportsService.calculateMostContactedListingsPerMonth = jest.fn().mockReturnValue({});

      const app = new App([reportsRoute]);

      request(app.getServer())
        .get(`${reportsRoute.path}/most-contacted-listings-per-month`)
        .expect(200)
        .then(response => {
          expect(response.body).toMatchObject({});
          done();
        })
        .catch(err => done(err));
    });
  });
});
