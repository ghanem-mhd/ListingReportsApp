import request from 'supertest';
import path from 'path';
import { createConnection } from 'typeorm';
import App from '@/app';
import { dbConnection } from '@databases';
import ImportRoute from '@routes/import.route';

beforeAll(async () => {
  await createConnection(dbConnection);
});

describe('Testing Import API', () => {
  describe('[POST] /import/listings', () => {
    it('should return 200 for a valid request with a file', function (done) {
      const importRoute = new ImportRoute();

      const app = new App([importRoute]);

      request(app.getServer())
        .post(`${importRoute.path}/listings`)
        .attach('csvFile', path.resolve(__dirname, './fixtures/listings-one-valid.csv'))
        .expect(200)
        .then(response => {
          expect(response.body).toMatchObject({ validListings: 1 });
          done();
        })
        .catch(err => done(err));
    });

    it('should return 400 for a wrong file format', function (done) {
      const importRoute = new ImportRoute();

      const app = new App([importRoute]);

      request(app.getServer())
        .post(`${importRoute.path}/listings`)
        .attach('csvFile', path.resolve(__dirname, './fixtures/non-csv-file.txt'))
        .expect(422)
        .then(response => {
          expect(response.body).toMatchObject({ message: 'Only csv files are allowed.' });
          done();
        })
        .catch(err => done(err));
    });

    it('should return 400 for a missing column', function (done) {
      const importRoute = new ImportRoute();

      const app = new App([importRoute]);

      request(app.getServer())
        .post(`${importRoute.path}/listings`)
        .attach('csvFile', path.resolve(__dirname, './fixtures/listings-missing-mileage.csv'))
        .expect(400)
        .then(response => {
          expect(response.body).toMatchObject({
            isValidFile: false,
            missingHeaders: ['mileage'],
          });
          done();
        })
        .catch(err => done(err));
    });

    it('should return 400 for a request without a file', function (done) {
      const importRoute = new ImportRoute();

      const app = new App([importRoute]);

      request(app.getServer())
        .post(`${importRoute.path}/listings`)
        .expect(400)
        .then(response => {
          expect(response.body).toMatchObject({ message: 'No file.' });
          done();
        })
        .catch(err => done(err));
    });
  });
});
