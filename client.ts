import { create, Client, decryptMedia } from "@open-wa/wa-automate";

const axios = require("axios");
const mime = require("mime-types");
// const fs = require("fs");

function start(client: Client) {
  client.onMessage(async (message) => {
    if (message.mimetype && !message.chatId.endsWith("@c.us")) {
      const filename = `${message.t}-${Math.floor(Math.random() * 1000)}.${mime.extension(message.mimetype)}`;
      const mediaData = await decryptMedia(message);
      const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
        "base64"
      )}`;
      const sender = {
        id: message.sender.id,
        name: message.sender.pushname,
        group: message.chat.formattedTitle,
        time: message.timestamp,
        isPersonal: message.chatId.includes("c.us"),
      };
/**
      await client.sendImage(
        "972533500951@c.us",
        imageBase64,
        filename,
        `You just received this ${message.type} from *${message.sender.name}* with id ${message.sender.id}, at ${message.timestamp}, in group *${message.chat.formattedTitle}* (id: ${message.chat.id})`
      );
*/  
      // Uncomment the below snippet to save the image
      // fs.writeFile(filename, mediaData, function (err) {
      //   if (err) {
      //     return console.log(err);
      //   }
      //   console.log("The file was saved!");
      // });
      axios
        .post("http://localhost:8080/api/predict/", {
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
      // Uncomment below snippet to see the request body.
      //   const foo = {
      //     imageURL: imageBase64,
      //     sender: sender,
      //   };
      // console.log(JSON.stringify(foo));
    }
  });

  client.onGlobalParticipantsChanged(async (participantAdded) => {
/**
    await client.sendText(
      "972533500951@c.us",
      `who: ${participantAdded.who}\nwhat: ${participantAdded.action}\ngroup: ${participantAdded.chat}`
    );
*/
    axios
      .post("http://127.0.0.1:8080/api/new-user/", {
        who: participantAdded.who,
        action: participantAdded.action,
        group: participantAdded.chat,
      })
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
    // const newUser = {
    //   who: participantAdded.who,
    //   action: participantAdded.action,
    //   group: participantAdded.chat,
    // };
    // console.log(JSON.stringify(newUser));
  });
}

create().then((client) => start(client));
