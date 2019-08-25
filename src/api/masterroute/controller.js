import { success, notFound } from '../../services/response/'
import { Masterroute } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Masterroute.create(body)
    .then((masterroute) => masterroute.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Masterroute.find(query, select, cursor)
    .then((masterroutes) => masterroutes.map((masterroute) => masterroute.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Masterroute.findById(params.id)
    .then(notFound(res))
    .then((masterroute) => masterroute ? masterroute.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Masterroute.findById(params.id)
    .then(notFound(res))
    .then((masterroute) => masterroute ? Object.assign(masterroute, body).save() : null)
    .then((masterroute) => masterroute ? masterroute.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Masterroute.findById(params.id)
    .then(notFound(res))
    .then((masterroute) => masterroute ? masterroute.remove() : null)
    .then(success(res, 204))
    .catch(next)
