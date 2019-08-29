import { success, notFound } from '../../services/response/';
import { Stockquotes } from '.';

export const create = ({ bodymen: { body } }, res, next) =>
  Stockquotes.create(body)
    .then((stockquotes) => stockquotes.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Stockquotes.find(query, select, cursor)
    .then((stockquotes) => stockquotes.map((stockquotes) => stockquotes.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Stockquotes.findById(params.id)
    .then(notFound(res))
    .then((stockquotes) => (stockquotes ? stockquotes.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Stockquotes.findById(params.id)
    .then(notFound(res))
    .then((stockquotes) =>
      stockquotes ? Object.assign(stockquotes, body).save() : null
    )
    .then((stockquotes) => (stockquotes ? stockquotes.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Stockquotes.findById(params.id)
    .then(notFound(res))
    .then((stockquotes) => (stockquotes ? stockquotes.remove() : null))
    .then(success(res, 204))
    .catch(next);
