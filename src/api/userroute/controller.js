import { success, notFound, authorOrAdmin } from '../../services/response/';
import { Userroute } from '.';

export const create = ({ user, bodymen: { body } }, res, next) =>
  Userroute.create({ ...body, user })
    .then((userroute) => userroute.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Userroute.find(query, select, cursor)
    .populate('user')
    .then((userroutes) => userroutes.map((userroute) => userroute.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Userroute.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((userroute) => (userroute ? userroute.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Userroute.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((userroute) =>
      userroute ? Object.assign(userroute, body).save() : null
    )
    .then((userroute) => (userroute ? userroute.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ user, params }, res, next) =>
  Userroute.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((userroute) => (userroute ? userroute.remove() : null))
    .then(success(res, 204))
    .catch(next);
