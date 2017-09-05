module.exports = function(sequelize, DataTypes) {
  var Website = sequelize.define("Website", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    url: {
      // type: DataTypes.TEXT("medium"),
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   isUrl: true,
      //   notEmpty: true
      // }
    },
    png: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   len: [1]
      // }
    }   
  },
  {
    timestamps: false
  });

  Website.associate = function(models) {
    // We're saying that a Website should belong to an Genre
    // A Website can't be created without an Genre due to the foreign key constraint
    Website.belongsTo(models.Genre, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Website;
};


