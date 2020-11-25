const bcrypt = require('bcrypt');


exports.keyBcypt = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return (hash);
};

exports.cmpBcypt = (password, password1) => {
    const cmp = bcrypt.compareSync(password ,password1)
    return cmp; 
};

// module.exports = {
//     keyBcypt,
//     cmpBcypt
// };

// export { keyBcypt }