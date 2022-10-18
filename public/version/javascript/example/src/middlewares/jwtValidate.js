import Constant from '../constants';
import Response from '../utils/response';
import {verify} from 'jsonwebtoken';
import Logger from '../utils/logger';
import {cacheService, userService} from '../services';
import fs from 'fs';

const res = new Response();

// Check if version have word Lastest or not
export default async (ctx, next) => {
  try {
    let token = undefined;
    // Check token in authorization header(Bearer)
    if (ctx.header.authorization) {
      // Bearer token
      if (ctx.header.authorization.substring(0, 6) === 'Bearer') {
        token = ctx.header.authorization.substring(7);
      } else token = ctx.header.authorization;
    } else if (ctx.request.query && ctx.request.query.token) {
      token = ctx.request.query.token;
    }
    if (!token || token === '') {
      res.setError(
        'Unauthenticated',
        Constant.instance.HTTP_CODE.Unauthenticated,
      );

      return res.send(ctx);
    }

    // Using node cached to cached token. Only using for caching, if no need => using the default way
    // if (cacheService.get(`jwt-${token}`)) {
    //   ctx.state.user = cacheService.get(`jwt-${token}`);
    // } else {
    //   try {
    //     const a = verify(token, Constant.instance.PRIVATE_KEY);
    //     const user = await userService.findOne(a['id']);
    //     if (!user) throw new Error('Not found');
    //     const saveUser = {
    //       id: user.id,
    //       type: user.type,
    //     };
    //     ctx.state.user = saveUser;
    //     cacheService.set(
    //       // cached token for 5 mins or expired time of token for quick verify
    //       `jwt-${token}`,
    //       saveUser,
    //       Math.min(Math.round(a.exp - Date.now() / 1000), 60 * 5),
    //     );
    //   } catch (e) {
    //     res.setError(
    //       'Unauthenticated',
    //       Constant.instance.HTTP_CODE.Unauthenticated,
    //     );

    //     return res.send(ctx);
    //   }
    // }

    // Default way.
    try {
      const a = verify(token, Constant.instance.PRIVATE_KEY);
      ctx.state.user = {
        id: a['id']
      };
    } catch (e) {
      res.setError(
        'Unauthenticated',
        Constant.instance.HTTP_CODE.Unauthenticated,
      );

      return res.send(ctx);
    }

    return next();
  } catch (e) {
    Logger.error(
      'jwtValidate ' +
        e.message +
        ' ' +
        e.stack +
        ' ' +
        (e.errors && e.errors[0] ? e.errors[0].message : ''),
    );
    res.setError(
      `Error`,
      Constant.instance.HTTP_CODE.InternalError,
      null,
      Constant.instance.ERROR_CODE.SERVER_ERROR,
    );

    return res.send(ctx);
  }
};
