const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);
const Model = Sequelize.Model;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

class Reservation extends Model {

}
Reservation.init({
  // attributes
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
      type: Sequelize.DATE
    // allowNull defaults to true
  },
  time: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
}, {
  sequelize,
  modelName: 'reservation'
  // options
});

Reservation.sync();

module.exports = {
  Reservation
}