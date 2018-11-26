module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nick_name: DataTypes.STRING,
      avatar_url: DataTypes.STRING,
      gender: DataTypes.INTEGER,
      open_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      session_key: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      tableNames: 'users',
    }
  );
