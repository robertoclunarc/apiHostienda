const host = process.env.MYSQL_SERVER || 'rds-mysql-hostienda.clvh7n4aj2bf.us-east-2.rds.amazonaws.com';/*'localhost'*/;
const user = process.env.MYSQL_USER || 'admin'/*'root'*/;
const password = process.env.MYSQL_PW || 'rlunar2023';
const namedatabase = process.env.MYSQL_DB || 'rds-mysql-hostienda'/*'bd_hostienda'*/;
const port = process.env.MYSQL_PORT || '3306';
const conLimit= 10;

const key = {
    host: host,
    database: namedatabase,
    user: user,
    password: password,
    port:port,
    connectionLimit: conLimit
}

export {key};