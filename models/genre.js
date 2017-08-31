module.exports = function(sequelize, DataTypes) {
  var Genre = sequelize.define("Genre", {
    title: DataTypes.STRING
  });

  Genre.associate = function(models) {
    // Associating Genre with Websites
    // When an Genre is deleted, also delete any associated Websites
    Genre.hasMany(models.Website, {
      onDelete: "cascade"
    });
  };

  return Genre;
};
