const Store = require("./store.model");

const findLastSerialNumber = async () => {
    const lastSerialNumber = await Store.findOne({}, { username: 1, _id: 0 })
        .sort({
            createdAt: -1,
        })
        .lean();

    if (lastSerialNumber) {
        const username = lastSerialNumber.username.split("-");
        console.log(parseInt(username[1]))
        return parseInt(username[1]);
    } else {
        return null; // Or any other appropriate value
    }
};




const generateUserSerialNumber = async () => {
    const currentId =
        (await findLastSerialNumber()) || (0).toString().padStart(8, "0"); //00000
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(8, "0");
    return incrementedId;
};

module.exports = {
    generateUserSerialNumber,
};