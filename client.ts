import { create, Client, decryptMedia } from "@open-wa/wa-automate";

const axios = require("axios");
const mime = require("mime-types");
const fs = require("fs");

function start(client: Client) {
  client.onMessage(async (message) => {
    if (message.mimetype) {
      const filename = `${message.t}-${Math.floor(
        Math.random() * 1000
      )}.${mime.extension(message.mimetype)}`;
      const mediaData = await decryptMedia(message);
      const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString("base64")}`;

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
      fs.writeFile(filename, mediaData, function (err) {
        if (err) {
          return console.log(err);
        }
        let buff = Buffer.from(mediaData.toString("base64"));
        let byteArray = new Uint8Array(buff);
        let arrayBuffer = byteArray.buffer;
        console.log("The file was saved!");
        // req.write(
        //   JSON.stringify({
        //     // image: byteArray,
        //     // metaData: metaData,
        //     imageURL: buff,
        //     sender: sender,
        //   })
        // );
        const foo = {
          imageURL: imageBase64,
          sender: sender,
        };
        // const oReq = new XMLHttpRequest();
        // oReq.open(
        //   "POST",
        //   "http://1ae4b016b387.ngrok.io/api/whatsapp-test",
        //   true
        // );
        // oReq.send(JSON.stringify(foo));
        axios
          .post("http://1ae4b016b387.ngrok.io/api/whatsapp-test", {
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
        
      });
    }
  });
}

create().then((client) => start(client));
