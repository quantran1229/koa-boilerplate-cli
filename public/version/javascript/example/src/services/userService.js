import {
    User
} from '../models';
import bcrypt from 'bcrypt';
import {
    sign
} from 'jsonwebtoken';
import Constant from '../constants';

export default class UserService {
    // Find list of all user
    findAll = async (condition) => {
        const users = await User.findAll({
            where: condition,
        });

        return users;
    };

    // Hash plain password to save to DB
    hashPassword = (password) => {
        const saltRounds = Constant.instance.DEFAULT_SALT_ROUND;

        return bcrypt.hashSync(password, saltRounds);
    };

    // Generate Token with info
    generateToken = async (info) => {
        const token = sign(info, Constant.instance.PRIVATE_KEY, {
            algorithm: 'HS256',
            expiresIn: '1d',
        });

        return token;
    };

    // Compare hash password in db with plain password
    comparePassword = (password, {
        password: hashPassword
    }) => {
        return bcrypt.compareSync(password, hashPassword);
    };

    // Find user with user id or username
    findOne = async (id) => {
        const condition = {};
        if (!isNaN(id)) {
            condition.id = id;
        } else {
            condition.username = id;
        }
        const user = await User.findOne({
            where: condition,
        });

        return user;
    };

    // Create new user
    create = async (info) => {
        info.password = this.hashPassword(info.password);
        const user = await User.create(info);

        return user;
    };

    // Delete user with id
    delete = async (id) => {
        await User.destroy({
            where: {
                id,
            },
        });

        return null;
    };
}