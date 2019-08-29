import { success, notFound } from '../../services/response/';
import { Adminroute } from '.';

export const create = ({ bodymen: { body } }, res, next) =>
  Adminroute.create(body)
    .then((adminroute) => adminroute.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Adminroute.find(query, select, cursor)
    .then((adminroutes) => adminroutes.map((adminroute) => adminroute.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Adminroute.findById(params.id)
    .then(notFound(res))
    .then((adminroute) => (adminroute ? adminroute.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Adminroute.findById(params.id)
    .then(notFound(res))
    .then((adminroute) =>
      adminroute ? Object.assign(adminroute, body).save() : null
    )
    .then((adminroute) => (adminroute ? adminroute.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Adminroute.findById(params.id)
    .then(notFound(res))
    .then((adminroute) => (adminroute ? adminroute.remove() : null))
    .then(success(res, 204))
    .catch(next);
