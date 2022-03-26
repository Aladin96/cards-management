const ROLE = require("./roleEnum");

const isComptable = (user) => user.role === ROLE.COMPTABLE;

const isRegie = (user) => user.role === ROLE.REGIE;

const isAdmin = (user) => user.role === ROLE.ADMIN;

module.exports = {
    isComptable,
    isRegie,
    isAdmin
}