import { getManager } from 'typeorm';

class ReportingService {
  public async calculateSellerAverageContribution(): Promise<any[]> {
    try {
      const reportQuery = `
        SELECT sellertype,
              Avg(price) AS avgPrice
        FROM   listing_entity
        GROUP  BY sellertype;
      `;
      const result = await getManager().query(reportQuery);
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async calculateMakeDistribution(): Promise<any[]> {
    try {
      const reportQuery = `
        SELECT make,
              ( ( 100 * Count(contact_entity.listingid) ) / (SELECT Count(*)
                                                              FROM   contact_entity c) )
              AS
              percentual
        FROM   contact_entity,
              listing_entity
        WHERE  listing_entity.id = contact_entity.listingid
        GROUP  BY make
        ORDER  BY percentual DESC;
      `;
      const result = await getManager().query(reportQuery);
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async calculateAveragePriceForMostContactedListings(percentage: Number): Promise<any[]> {
    try {
      const reportQuery = `
        SELECT Avg(price) AS avgPrice
        FROM   (
                        SELECT   listingid,
                                Count(*) contactscounts
                        FROM     contact_entity
                        GROUP BY listingid
                        ORDER BY contactscounts DESC limit
                                (
                                        SELECT ${percentage} * count(DISTINCT (listingid))
                                        FROM   contact_entity))
        JOIN   listing_entity
        ON     listingid = id
      `;
      const result = await getManager().query(reportQuery);
      if (result && result[0] && result[0].avgPrice) {
        return result[0].avgPrice;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  public async calculateMostContactedListingsPerMonth(count: Number): Promise<any[]> {
    try {
      const reportQuery = `
        SELECT *
        FROM   (SELECT Row_number()
                        OVER (
                          partition BY month
                          ORDER BY contactscount DESC) AS rank,
                      listingid,
                      make,
                      price,
                      mileage,
                      contactscount,
                      month
                FROM   (SELECT listingid,
                              Strftime('%m-%Y', date / 1000, 'unixepoch') AS month,
                              price,
                              make,
                              mileage,
                              Count(*) contactscount
                        FROM   contact_entity
                              JOIN listing_entity
                                ON listingid = listing_entity.id
                        GROUP  BY listingid,
                                  month))
        WHERE  rank <= ${count}
      `;
      const result = await getManager().query(reportQuery);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default ReportingService;
