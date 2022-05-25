module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		const poolSql = require('../config/db/db.js');

        console.log(`Total Members: ${client.users.cache.size}.`);
        //DEFINIR RICH-PRESENCE
        client.user.setActivity(`Site da Feb`, {type: 'WATCHING'});

		poolSql.sqlTest();
	},
};