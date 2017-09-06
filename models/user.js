
module.exports = function(sequelize, DataTypes) {

	var User = sequelize.define('user', {
		id: { 
			type: DataTypes.INTEGER,
			autoIncrement: true, 
			primaryKey: true
		},
		firstname: { 
			type: DataTypes.STRING,
			notEmpty: true
		},
		lastname: { 
			type: DataTypes.STRING,
			notEmpty: true
		},
		username: {
			type:DataTypes.STRING,
			notEmpty: true
		},
		email: { 
			type:DataTypes.STRING, 
			validate: {
				isEmail:true
			} 
		},
		password : {
			type: DataTypes.STRING,
			allowNull: false 
		}, 
        status: {
        	type: DataTypes.ENUM('active','inactive'),defaultValue:'active' 
        }

	});

	User.associate = function(models) {
		User.hasMany(models.Genre, {
			onDelete: "cascade"     
		});
	};

	return User;

}