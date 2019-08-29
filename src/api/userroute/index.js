import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { token } from '../../services/passport';
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';
export Userroute, { schema } from './model';

const router = new Router();
const { bla } = schema.tree;

/**
 * @api {post} /userroutes Create userroute
 * @apiName CreateUserroute
 * @apiGroup Userroute
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam bla Userroute's bla.
 * @apiSuccess {Object} userroute Userroute's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Userroute not found.
 * @apiError 401 user access only.
 */
router.post('/', token({ required: true }), body({ bla }), create);

/**
 * @api {get} /userroutes Retrieve userroutes
 * @apiName RetrieveUserroutes
 * @apiGroup Userroute
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} userroutes List of userroutes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/', token({ required: true }), query(), index);

/**
 * @api {get} /userroutes/:id Retrieve userroute
 * @apiName RetrieveUserroute
 * @apiGroup Userroute
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} userroute Userroute's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Userroute not found.
 * @apiError 401 user access only.
 */
router.get('/:id', token({ required: true }), show);

/**
 * @api {put} /userroutes/:id Update userroute
 * @apiName UpdateUserroute
 * @apiGroup Userroute
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam bla Userroute's bla.
 * @apiSuccess {Object} userroute Userroute's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Userroute not found.
 * @apiError 401 user access only.
 */
router.put('/:id', token({ required: true }), body({ bla }), update);

/**
 * @api {delete} /userroutes/:id Delete userroute
 * @apiName DeleteUserroute
 * @apiGroup Userroute
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Userroute not found.
 * @apiError 401 user access only.
 */
router.delete('/:id', token({ required: true }), destroy);

export default router;
