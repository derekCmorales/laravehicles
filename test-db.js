const { DataSource } = require('typeorm');
const db = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'laravehicles',
});
db.initialize().then(async () => {
  const v = await db.query('SELECT * FROM vehiculo LIMIT 1;');
  const cat = await db.query('SELECT * FROM catalogo_iscv LIMIT 1;');
  const tax = await db.query('SELECT * FROM contribuyente LIMIT 1;');
  const prof = await db.query('SELECT * FROM perfil LIMIT 1;');
  console.log({v, cat, tax, prof});
  process.exit(0);
}).catch(console.error);
