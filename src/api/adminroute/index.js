import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { token } from '../../services/passport';
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';
export Adminroute, { schema } from './model';

const router = new Router();
const { bla } = schema.tree;

/**
 * @api {post} /adminroutes Create adminroute
 * @apiName CreateAdminroute
 * @apiGroup Adminroute
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam bla Adminroute's bla.
 * @apiSuccess {Object} adminroute Adminroute's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Adminroute not found.
 * @apiError 401 admin access only.
 */
router.post(
  '/',
  token({ required: true, roles: ['admin'] }),
  body({ bla }),
  create
);

/**
 * @api {get} /adminroutes Retrieve adminroutes
 * @apiName RetrieveAdminroutes
 * @apiGroup Adminroute
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} adminroutes List of adminroutes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/', token({ required: true, roles: ['admin'] }), query(), index);

/**
 * @api {get} /adminroutes/:id Retrieve adminroute
 * @apiName RetrieveAdminroute
 * @apiGroup Adminroute
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} adminroute Adminroute's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Adminroute not found.
 * @apiError 401 admin access only.
 */
router.get('/:id', token({ required: true, roles: ['admin'] }), show);

/**
 * @api {put} /adminroutes/:id Update adminroute
 * @apiName UpdateAdminroute
 * @apiGroup Adminroute
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam bla Adminroute's bla.
 * @apiSuccess {Object} adminroute Adminroute's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Adminroute not found.
 * @apiError 401 admin access only.
 */
router.put(
  '/:id',
  token({ required: true, roles: ['admin'] }),
  body({ bla }),
  update
);

/**
 * @api {delete} /adminroutes/:id Delete adminroute
 * @apiName DeleteAdminroute
 * @apiGroup Adminroute
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Adminroute not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id', token({ required: true, roles: ['admin'] }), destroy);

export default router;
