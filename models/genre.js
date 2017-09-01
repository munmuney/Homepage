module.exports = function(sequelize, DataTypes) {
  var Genre = sequelize.define("Genre", {
    title: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2,100]
    }
  });

  Genre.associate = function(models) {
    // Associating Genre with Websites
    // When an Genre is deleted, also delete any associated Websites
    Genre.hasMany(models.Website, {
      onDelete: "cascade"
    });
    Genre.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

};

  return Genre;
};
