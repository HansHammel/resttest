import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';
export Masterroute, { schema } from './model';

const router = new Router();
const { bla } = schema.tree;

/**
 * @api {post} /masterroutes Create masterroute
 * @apiName CreateMasterroute
 * @apiGroup Masterroute
 * @apiParam bla Masterroute's bla.
 * @apiSuccess {Object} masterroute Masterroute's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Masterroute not found.
 */
router.post('/', body({ bla }), create);

/**
 * @api {get} /masterroutes Retrieve masterroutes
 * @apiName RetrieveMasterroutes
 * @apiGroup Masterroute
 * @apiUse listParams
 * @apiSuccess {Object[]} masterroutes List of masterroutes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', query(), index);

/**
 * @api {get} /masterroutes/:id Retrieve masterroute
 * @apiName RetrieveMasterroute
 * @apiGroup Masterroute
 * @apiSuccess {Object} masterroute Masterroute's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Masterroute not found.
 */
router.get('/:id', show);

/**
 * @api {put} /masterroutes/:id Update masterroute
 * @apiName UpdateMasterroute
 * @apiGroup Masterroute
 * @apiParam bla Masterroute's bla.
 * @apiSuccess {Object} masterroute Masterroute's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Masterroute not found.
 */
router.put('/:id', body({ bla }), update);

/**
 * @api {delete} /masterroutes/:id Delete masterroute
 * @apiName DeleteMasterroute
 * @apiGroup Masterroute
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Masterroute not found.
 */
router.delete('/:id', destroy);

export default router;
