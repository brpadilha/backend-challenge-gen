module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'clients',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
