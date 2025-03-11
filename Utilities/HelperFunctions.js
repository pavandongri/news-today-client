const moment = require('moment');


const getFormatedDate = (date) => {
    return moment(date).format('DD-MMMM-YYYY HH:mm');
}

const capitalizeString = (s) => {
    if (!s || typeof s !== "string") return s;
    return s?.[0]?.toUpperCase() + s.slice(1);
}


module.exports = {
    getFormatedDate,
    capitalizeString
}