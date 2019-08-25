import mongoose, { Schema } from 'mongoose'

const stockquotesSchema = new Schema({
  isin: {
    type: String
  },
  wkn: {
    type: String
  },
  symbol: {
    type: String
  },
  date: {
    type: String
  },
  currency: {
    type: String
  },
  high: {
    type: String
  },
  low: {
    type: String
  },
  price: {
    type: String
  },
  marketcap: {
    type: String
  },
  kgv: {
    type: String
  },
  dividentprecent: {
    type: String
  },
  vola: {
    type: String
  },
  high52: {
    type: String
  },
  low52: {
    type: String
  },
  country: {
    type: String
  },
  exchange: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

stockquotesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      isin: this.isin,
      wkn: this.wkn,
      symbol: this.symbol,
      date: this.date,
      currency: this.currency,
      high: this.high,
      low: this.low,
      price: this.price,
      marketcap: this.marketcap,
      kgv: this.kgv,
      dividentprecent: this.dividentprecent,
      vola: this.vola,
      high52: this.high52,
      low52: this.low52,
      country: this.country,
      exchange: this.exchange,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Stockquotes', stockquotesSchema)

export const schema = model.schema
export default model
