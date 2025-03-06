const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const BOT_TOKEN = 'YOUR_BOT_TOKEN';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Command to start the DM check
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    // Only works in DMs
    if (message.channel.type === 1) { // 1 = DM channel type
        if (message.content.toLowerCase() === '!check') {
            const user = message.author;
            
            try {
                let sentMessage = await user.send("Hey! Reply to this message so I know you haven't ignored me.");
                
                // Wait for a reply for 1 minute
                const filter = (response) => response.author.id === user.id;
                const collected = await sentMessage.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] });

                if (collected) {
                    await user.send("Got your reply! You're not ignoring me.");
                }
            } catch (error) {
                await user.send("You might have ignored me, or your DMs are closed.");
            }
        }
    }
});

client.login(1346704929393213450);
