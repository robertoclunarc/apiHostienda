const host = process.env.MYSQL_SERVER || 'localhost';
const user = process.env.MYSQL_USER || 'root';
const password = process.env.MYSQL_PW || '';
const namedatabase = process.env.MYSQL_DB || 'bd_hostienda';
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