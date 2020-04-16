
const mocks = {       
    Query: () => ({
        getAllUsers: () => ([{Address: "das"},{Address: "das"},{Address: "das"},])
    }),
    Int: () => 2,
    Float: () => 2.1
};


module.exports = mocks;