export interface SellBondInterest {
  Id: number;
  ISIN: string;
  Issuer: string;
  IssuerLEI: string;
  Description: string;
  Security: string;
  Yield: number;
  Maturity: number;
  TransactionType: 'BID' | 'ASK';
  Venue: string;
  Broker: string;
  Quantity: number;
  Price: number;
  Currency: string;
}

export const rowData: SellBondInterest[] = [
  {
    Id: 1,
    ISIN: 'ES0413900608',
    Issuer: 'Banco Santander, S.A.',
    IssuerLEI: '5493006QMFDDMYWIAM13',
    Description: 'SANTAN 0.1 02/27/32',
    Security: 'Santan',
    Yield: 0.1,
    Maturity: 2032,
    TransactionType: 'ASK',
    Venue: 'TWEB',
    Broker: 'CITI',
    Quantity: 5000000,
    Price: 100.76,
    Currency: 'EUR',
  },
  {
    Id: 2,
    ISIN: 'ES0413900608',
    Issuer: 'Banco Santander, S.A.',
    IssuerLEI: '5493006QMFDDMYWIAM13',
    Description: 'SANTAN 0.1 02/27/32',
    Security: 'Santan',
    Yield: 0.1,
    Maturity: 2032,
    TransactionType: 'BID',
    Venue: 'NEPTUNE',
    Broker: 'GS',
    Quantity: 3000000,
    Price: 100.7,
    Currency: 'EUR',
  },
  {
    Id: 3,
    ISIN: 'ES0413900608',
    Issuer: 'Banco Santander, S.A.',
    IssuerLEI: '5493006QMFDDMYWIAM13',
    Description: 'SANTAN 0.1 02/27/32',
    Security: 'Santan',
    Yield: 0.1,
    Maturity: 2032,
    TransactionType: 'BID',
    Venue: 'UBS',
    Broker: 'UBS',
    Quantity: 1000000,
    Price: 100.69,
    Currency: 'EUR',
  },
  {
    Id: 4,
    ISIN: 'ES0413900608',
    Issuer: 'Banco Santander, S.A.',
    IssuerLEI: '5493006QMFDDMYWIAM13',
    Description: 'SANTAN 0.1 02/27/32',
    Security: 'Santan',
    Yield: 0.1,
    Maturity: 2032,
    TransactionType: 'ASK',
    Venue: 'MA',
    Broker: 'HSBC',
    Quantity: 2760000,
    Price: 101,
    Currency: 'EUR',
  },
  {
    Id: 5,
    ISIN: 'DE000HV2AYU9',
    Issuer: 'UniCredit Bank AG',
    IssuerLEI: '2ZCNRR8UK83OBTEK2170',
    Description: 'HVB 0 1/2 02/23/27',
    Security: 'HVB',
    Yield: 0.5,
    Maturity: 2027,
    TransactionType: 'ASK',
    Venue: 'Bloomberg',
    Broker: 'BARC',
    Quantity: 4000000,
    Price: 99,
    Currency: 'USD',
  },
  {
    Id: 6,
    ISIN: 'XS1796209010',
    Issuer: 'Goldman Sachs Group, Inc.',
    IssuerLEI: '784F5XWPLTWKTBV3E584',
    Description: 'GS 2 03/22/28',
    Security: 'GS',
    Yield: 2,
    Maturity: 2028,
    TransactionType: 'BID',
    Venue: 'NEPTUNE',
    Broker: 'MS',
    Quantity: 1500000,
    Price: 94,
    Currency: 'USD',
  },
  {
    Id: 7,
    ISIN: 'XS1796209010',
    Issuer: 'Goldman Sachs Group, Inc.',
    IssuerLEI: '784F5XWPLTWKTBV3E584',
    Description: 'GS 2 03/22/28',
    Security: 'GS',
    Yield: 2,
    Maturity: 2028,
    TransactionType: 'BID',
    Venue: 'TWEB',
    Broker: 'ABN',
    Quantity: 3000000,
    Price: 94.5,
    Currency: 'USD',
  },
  {
    Id: 8,
    ISIN: 'XS1782803503',
    Issuer: 'Svenska Handelsbanken AB',
    IssuerLEI: 'NHBDILHZTYCNBV5UYZ31',
    Description: 'SHBASS 1 1/4 03/02/28',
    Security: 'SHBASS',
    Yield: 1.25,
    Maturity: 2028,
    TransactionType: 'BID',
    Venue: 'JPM',
    Broker: 'JPM',
    Quantity: 1500000,
    Price: 101.5,
    Currency: 'EUR',
  },
  {
    Id: 9,
    ISIN: 'XS1782803503',
    Issuer: 'Svenska Handelsbanken AB',
    IssuerLEI: 'NHBDILHZTYCNBV5UYZ31',
    Description: 'SHBASS 1 1/4 03/02/28',
    Security: 'SHBASS',
    Yield: 1.25,
    Maturity: 2028,
    TransactionType: 'BID',
    Venue: 'NEPTUNE',
    Broker: 'GS',
    Quantity: 2500000,
    Price: 100,
    Currency: 'EUR',
  },
  {
    Id: 10,
    ISIN: 'XS1782803503',
    Issuer: 'Svenska Handelsbanken AB',
    IssuerLEI: 'NHBDILHZTYCNBV5UYZ31',
    Description: 'SHBASS 1 1/4 03/02/28',
    Security: 'SHBASS',
    Yield: 1.25,
    Maturity: 2028,
    TransactionType: 'BID',
    Venue: 'Bloomberg',
    Broker: 'DB',
    Quantity: 2000000,
    Price: 101.75,
    Currency: 'EUR',
  },
  {
    Id: 11,
    ISIN: 'XS1794344827',
    Issuer: 'DNB Bank ASA',
    IssuerLEI: '549300GKFG0RYRRQ1414',
    Description: 'DNBNO 1 1/8 03/20/28',
    Security: 'DNBO',
    Yield: 1.125,
    Maturity: 2028,
    TransactionType: 'BID',
    Venue: 'TWEB',
    Broker: 'HVB',
    Quantity: 5400000,
    Price: 97.9,
    Currency: 'EUR',
  },
  {
    Id: 12,
    ISIN: 'XS1794344827',
    Issuer: 'DNB Bank ASA',
    IssuerLEI: '549300GKFG0RYRRQ1414',
    Description: 'DNBNO 1 1/8 03/20/28',
    Security: 'DNBO',
    Yield: 1.125,
    Maturity: 2028,
    TransactionType: 'BID',
    Venue: 'UBS',
    Broker: 'UBS',
    Quantity: 2900000,
    Price: 97,
    Currency: 'EUR',
  },
  {
    Id: 13,
    ISIN: 'XS1794344827',
    Issuer: 'DNB Bank ASA',
    IssuerLEI: '549300GKFG0RYRRQ1414',
    Description: 'DNBNO 1 1/8 03/20/28',
    Security: 'DNBO',
    Yield: 1.125,
    Maturity: 2028,
    TransactionType: 'BID',
    Venue: 'CITI',
    Broker: 'CITI',
    Quantity: 3400000,
    Price: 96.5,
    Currency: 'EUR',
  },
  {
    Id: 14,
    ISIN: 'XS1794344827',
    Issuer: 'DNB Bank ASA',
    IssuerLEI: '549300GKFG0RYRRQ1414',
    Description: 'DNBNO 1 1/8 03/20/28',
    Security: 'DNBO',
    Yield: 1.125,
    Maturity: 2028,
    TransactionType: 'ASK',
    Venue: 'TWEB',
    Broker: 'HSBC',
    Quantity: 1400000,
    Price: 99,
    Currency: 'EUR',
  },
  {
    Id: 15,
    ISIN: 'XS2250008245',
    Issuer: 'Morgan Stanley',
    IssuerLEI: 'IGJSJL3JD5P30I6NJZ34',
    Description: 'MS 0.495 10/26/29',
    Security: 'MS',
    Yield: 0.495,
    Maturity: 2029,
    TransactionType: 'ASK',
    Venue: 'JPM',
    Broker: 'JPM',
    Quantity: 25000000,
    Price: 98.54,
    Currency: 'USD',
  },
  {
    Id: 16,
    ISIN: 'XS2250008245',
    Issuer: 'Morgan Stanley',
    IssuerLEI: 'IGJSJL3JD5P30I6NJZ34',
    Description: 'MS 0.495 10/26/29',
    Security: 'MS',
    Yield: 0.495,
    Maturity: 2029,
    TransactionType: 'ASK',
    Venue: 'TRUMID',
    Broker: 'GS',
    Quantity: 50000000,
    Price: 98.75,
    Currency: 'USD',
  },
];
