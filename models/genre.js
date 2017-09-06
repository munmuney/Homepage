module.exports = function(sequelize, DataTypes) {
  var Genre = sequelize.define("Genre", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,100]
      }
    },
    boxNum: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      // validate: {
      //   len: [1]
      // }
    },
    iconname: {
      type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [2,100]
    //   }
    }
  },
  {
    timestamps: false
  });

  Genre.associate = function(models) {
    // Associating Genre with Websites
    // When an Genre is deleted, also delete any associated Websites
    Genre.hasMany(models.Website, {
      onDelete: "cascade"
    });
    // Genre.belongsTo(models.User, {
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });

};

  return Genre;
};
