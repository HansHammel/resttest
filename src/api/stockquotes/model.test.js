import { Stockquotes } from '.';

let stockquotes;

beforeEach(async () => {
  stockquotes = await Stockquotes.create({
    isin: 'test',
    wkn: 'test',
    symbol: 'test',
    date: 'test',
    currency: 'test',
    high: 'test',
    low: 'test',
    price: 'test',
    marketcap: 'test',
    kgv: 'test',
    dividentprecent: 'test',
    vola: 'test',
    high52: 'test',
    low52: 'test',
    country: 'test',
    exchange: 'test',
  });
});

describe('view', () => {
  it('returns simple view', () => {
    const view = stockquotes.view();
    expect(typeof view).toBe('object');
    expect(view.id).toBe(stockquotes.id);
    expect(view.isin).toBe(stockquotes.isin);
    expect(view.wkn).toBe(stockquotes.wkn);
    expect(view.symbol).toBe(stockquotes.symbol);
    expect(view.date).toBe(stockquotes.date);
    expect(view.currency).toBe(stockquotes.currency);
    expect(view.high).toBe(stockquotes.high);
    expect(view.low).toBe(stockquotes.low);
    expect(view.price).toBe(stockquotes.price);
    expect(view.marketcap).toBe(stockquotes.marketcap);
    expect(view.kgv).toBe(stockquotes.kgv);
    expect(view.dividentprecent).toBe(stockquotes.dividentprecent);
    expect(view.vola).toBe(stockquotes.vola);
    expect(view.high52).toBe(stockquotes.high52);
    expect(view.low52).toBe(stockquotes.low52);
    expect(view.country).toBe(stockquotes.country);
    expect(view.exchange).toBe(stockquotes.exchange);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it('returns full view', () => {
    const view = stockquotes.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(stockquotes.id);
    expect(view.isin).toBe(stockquotes.isin);
    expect(view.wkn).toBe(stockquotes.wkn);
    expect(view.symbol).toBe(stockquotes.symbol);
    expect(view.date).toBe(stockquotes.date);
    expect(view.currency).toBe(stockquotes.currency);
    expect(view.high).toBe(stockquotes.high);
    expect(view.low).toBe(stockquotes.low);
    expect(view.price).toBe(stockquotes.price);
    expect(view.marketcap).toBe(stockquotes.marketcap);
    expect(view.kgv).toBe(stockquotes.kgv);
    expect(view.dividentprecent).toBe(stockquotes.dividentprecent);
    expect(view.vola).toBe(stockquotes.vola);
    expect(view.high52).toBe(stockquotes.high52);
    expect(view.low52).toBe(stockquotes.low52);
    expect(view.country).toBe(stockquotes.country);
    expect(view.exchange).toBe(stockquotes.exchange);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});
