import { create, Client, decryptMedia } from "@open-wa/wa-automate";

const axios = require("axios");
import mime from "mime-types";

function start(client: Client) {
  client.onMessage(async (message) => {
    if (message.mimetype) {
      const filename = `${message.t}-${Math.floor(
        Math.random() * 1000
      )}.${mime.extension(message.mimetype)}`;
      const mediaData = await decryptMedia(message);
      const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
        "base64"
      )}`;

      const sender = {
        id: message.sender.id,
        name: message.sender.pushname,
        group: message.chat.formattedTitle,
        time: message.timestamp,
      };
      await client.sendImage(
        "919XXXXXXXXX@c.us",
        imageBase64,
        filename,
        `You just received this ${message.type} from *${message.sender.name}* with id ${message.sender.id}, at ${message.timestamp}, in group *${message.chat.formattedTitle}* (id: ${message.chat.id})`
      );

      const foo = {
        imageURL: imageBase64,
        sender: sender,
      };
      axios
        .post("Enter URL here", {
          imageURL: imageBase64,
          sender: sender,
        })
        .then((res) => {
          console.log(`statusCode: ${res.statusCode}`);
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(JSON.stringify(foo));
    }
  });
}

create().then((client) => start(client));
