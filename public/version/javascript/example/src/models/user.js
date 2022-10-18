/* eslint-disable new-cap */
// This is an example of what a model looklike
'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static STATUS = {
      ACTIVE: 1,
      INACTIVE: -1,
    };

    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM({
        values: Object.values(User.STATUS)
      }),
      defaultValue: User.STATUS.ACTIVE
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    scopes: {
      active: {
        where: {
          status: User.STATUS.ACTIVE,
        },
      },
      noPassword: {
        attribute: {
          exclude: ['password'],
        },
      },
    },
  }, );
  return User;
};