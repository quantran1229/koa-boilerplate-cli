import {
    userService
} from '../services';
import {
    User
} from '../models';
import Response from '../utils/response';
import Constant from '../constants';
import Logger from '../utils/logger';

const res = new Response();

export default class UserController {
    // Login
    static login = async (ctx, next) => {
        try {
            const {
                username,
                password
            } = ctx.request.body;
            const user = await userService.findOne(username);

            // Check if user exist or not
            if (!user) {
                res.setError(
                    'User not found or bad password',
                    Constant.instance.HTTP_CODE.BadRequest,
                    null,
                    Constant.instance.ERROR_CODE.USER_NOT_FOUND_OR_BAD_PASSWORD,
                );

                return res.send(ctx);
            }

            // Check if user is active or not
            if (user.status == User.STATUS.INACTIVE) {
                res.setError(
                    'User is inactive',
                    Constant.instance.HTTP_CODE.BadRequest,
                    null,
                    Constant.instance.ERROR_CODE.USER_IS_INACTIVE,
                );

                return res.send(ctx);
            }

            // Check if password is correct or not
            const check = userService.comparePassword(password, user);
            if (!check) {
                res.setError(
                    'User not found or bad password',
                    Constant.instance.HTTP_CODE.BadRequest,
                    null,
                    Constant.instance.ERROR_CODE.USER_NOT_FOUND_OR_BAD_PASSWORD,
                );

                return res.send(ctx);
            }

            // Generate JWT
            const token = await userService.generateToken({
                id: user.id
            });
            const userInfo = {
                id: user.id,
                username: user.username
            };
            res.setSuccess({
                userInfo: userInfo,
                token: token,
            });

            return res.send(ctx);
        } catch (e) {
            Logger.error(
                'UserController.login ' +
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
    }

    // Get list user
    static getListUsers = async (ctx, next) => {
        try {
            let condition = {};
            const result = await userService.findAll(condition);
            res.setSuccess(result, Constant.instance.HTTP_CODE.Success);

            return res.send(ctx);
        } catch (e) {
            Logger.error(
                'UserController.getListUser ' +
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
    }

    // Create new user
    static postCreateNewUser = async (ctx, next) => {
        try {
            const {
                username,
                password
            } = ctx.request.body;
            const checkDuplicate = await userService.findOne(username);
            // Validate info from database
            if (checkDuplicate) {
                res.setError(
                    `Duplicated`,
                    Constant.instance.HTTP_CODE.Conflict, {
                        field: 'email',
                    },
                    Constant.instance.ERROR_CODE.USERNAME_IS_DUPLICATED,
                );

                return res.send(ctx);
            }

            // Save to database
            const user = await userService.create({
                username,
                password: password,
                status: User.STATUS.ACTIVE
            });

            // Remove password
            delete user.password;
            delete user.dataValues.password;
            res.setSuccess(user, Constant.instance.HTTP_CODE.Created);

            return res.send(ctx);
        } catch (e) {
            Logger.error(
                'UserController.postCreateNewUser ' +
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
    }

    // Delete user
    static deleteUserWithId = async (ctx, next) => {
        try {
            // Get id from params
            const id = ctx.request.params.id;
            const user = await userService.findOne(id);
            // Check if user exist
            if (!user) {
                res.setError('Not found', Constant.instance.HTTP_CODE.NotFound, null, Constant.instance.ERROR_CODE.USER_NOT_FOUND);

                return res.send(ctx);
            }

            // Remove user
            await userService.delete(user.id);
            res.setSuccess(null, Constant.instance.HTTP_CODE.SuccessNoContent);

            return res.send(ctx);
        } catch (e) {
            Logger.error(
                'UserController.deleteUserWithId ' +
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
}