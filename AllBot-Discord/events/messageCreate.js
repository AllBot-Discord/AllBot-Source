module.exports = {
    name: 'messageCreate',
	execute(client, msg) {
        
        const config = require("../config.json");
        const prefix = config.prefix;

        const roleAdmin = '881020645868195880';
        const roleMembro = '881020707818070096';

        //#region Code

        //Ignore Others Bot CMD
        if (!msg.content.startsWith(prefix) || msg.author.bot) return;
        //Return DM Cmd
        if (msg.channel.type == "dm") return;
        //Check content is a Prefix without CMD
        if (msg.content == prefix) return;
        
        let content = msg.content.split(" ");
        let command = content[0];
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        
        //checks if message contains a command and runs it
        let commandfile = client.commands.get(command.slice(prefix.length));
        //check if msg is a command
        if(!(commandfile)) return;

        try {
            //Pass to the Command File; Message + Arguments + Cliente (necessary most time) + Role
        if(commandfile) commandfile.run(msg, args, client, roleAdmin, roleMembro);
        } catch (e) {
        console.error(e);
        }

        //#endregion Code

	},
};