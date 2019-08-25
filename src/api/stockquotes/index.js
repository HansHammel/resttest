import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Stockquotes, { schema } from './model'

const router = new Router()
const { isin, wkn, symbol, date, currency, high, low, price, marketcap, kgv, dividentprecent, vola, high52, low52, country, exchange } = schema.tree

/**
 * @api {post} /stockquotes Create stockquotes
 * @apiName CreateStockquotes
 * @apiGroup Stockquotes
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam isin Stockquotes's isin.
 * @apiParam wkn Stockquotes's wkn.
 * @apiParam symbol Stockquotes's symbol.
 * @apiParam date Stockquotes's date.
 * @apiParam currency Stockquotes's currency.
 * @apiParam high Stockquotes's high.
 * @apiParam low Stockquotes's low.
 * @apiParam price Stockquotes's price.
 * @apiParam marketcap Stockquotes's marketcap.
 * @apiParam kgv Stockquotes's kgv.
 * @apiParam dividentprecent Stockquotes's dividentprecent.
 * @apiParam vola Stockquotes's vola.
 * @apiParam high52 Stockquotes's high52.
 * @apiParam low52 Stockquotes's low52.
 * @apiParam country Stockquotes's country.
 * @apiParam exchange Stockquotes's exchange.
 * @apiSuccess {Object} stockquotes Stockquotes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Stockquotes not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ isin, wkn, symbol, date, currency, high, low, price, marketcap, kgv, dividentprecent, vola, high52, low52, country, exchange }),
  create)

/**
 * @api {get} /stockquotes Retrieve stockquotes
 * @apiName RetrieveStockquotes
 * @apiGroup Stockquotes
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} stockquotes List of stockquotes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /stockquotes/:id Retrieve stockquotes
 * @apiName RetrieveStockquotes
 * @apiGroup Stockquotes
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} stockquotes Stockquotes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Stockquotes not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /stockquotes/:id Update stockquotes
 * @apiName UpdateStockquotes
 * @apiGroup Stockquotes
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam isin Stockquotes's isin.
 * @apiParam wkn Stockquotes's wkn.
 * @apiParam symbol Stockquotes's symbol.
 * @apiParam date Stockquotes's date.
 * @apiParam currency Stockquotes's currency.
 * @apiParam high Stockquotes's high.
 * @apiParam low Stockquotes's low.
 * @apiParam price Stockquotes's price.
 * @apiParam marketcap Stockquotes's marketcap.
 * @apiParam kgv Stockquotes's kgv.
 * @apiParam dividentprecent Stockquotes's dividentprecent.
 * @apiParam vola Stockquotes's vola.
 * @apiParam high52 Stockquotes's high52.
 * @apiParam low52 Stockquotes's low52.
 * @apiParam country Stockquotes's country.
 * @apiParam exchange Stockquotes's exchange.
 * @apiSuccess {Object} stockquotes Stockquotes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Stockquotes not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ isin, wkn, symbol, date, currency, high, low, price, marketcap, kgv, dividentprecent, vola, high52, low52, country, exchange }),
  update)

/**
 * @api {delete} /stockquotes/:id Delete stockquotes
 * @apiName DeleteStockquotes
 * @apiGroup Stockquotes
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Stockquotes not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
