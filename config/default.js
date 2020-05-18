module.exports = {
    port: 3000,
    session: {
        secret: 'pet',
        key: 'pet',
        maxAge: 2592000000,
    },
    mongodb: 'mongodb+srv://team:team@teamproject-9em6o.mongodb.net/test?retryWrites=true&w=majority',
}
