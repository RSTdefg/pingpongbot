import {
  createSlashCommandHandler,
  ApplicationCommand,
  InteractionHandler,
  Interaction,
  InteractionResponse,
  InteractionResponseType,
} from "@glenstack/cf-workers-discord-bot";

const helloCommand: ApplicationCommand = {
  name: "hello",
  description: "Bot will say hello to you!",
};

const helloHandler: InteractionHandler = async (
  interaction: Interaction
): Promise<InteractionResponse> => {
  const userID = interaction.member.user.id;

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `Hello, <@${userID}>!`,
      allowed_mentions: {
        users: [userID],
      },
    },
  };
};

const slashCommandHandler = createSlashCommandHandler({
  applicationID: "900169297832329238",
  applicationSecret: 'OTAwMTY5Mjk3ODMyMzI5MjM4.YW9Z_A.qCOPr3629-D0EWFt3HhUTCNr-ys', // You should store this in a secret
  publicKey: "9c3c12352e4c73d4d4bfb6c385ba7da7683829cc0ccc2c7ced1ca1daea6bcd8d",
  commands: [[helloCommand, helloHandler]],
});

addEventListener("fetch", (event) => {
  event.respondWith(slashCommandHandler(event.request));
});
