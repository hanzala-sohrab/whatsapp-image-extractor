# whatsapp-image-extractor
Extract images sent from all the users in a Whatsapp group

## Steps
1. Clone this repository
    ```shell
    git clone https://github.com/hanzala-sohrab/whatsapp-image-extractor.git
    ```
2. Change directory
    ```shell
    cd whatsapp-image-extractor
    ```
3. Upgrade `node` version using `nvm`
    ```shell
    nvm install 14.15
    ```
    If `nvm` is not already installed, visit https://github.com/nvm-sh/nvm#installing-and-updating
4. Install
    ```shell
    npm install
    ```
5. Install TypeScript
    ```shell
    npm install -g typescript
    ```
6. For fetching the image uploaded by a user in a group, update line `23` with your chatId of choice in [client.ts](https://github.com/hanzala-sohrab/whatsapp-image-extractor/blob/c600f9a20be3ba233ffccc2eee6d5f359ac1bed3/client.ts#L23)
    ```ts
    await client.sendImage(
        "919XXXXXXXXX@c.us",
        imageBase64,
        filename,
        `You just received this ${message.type} from *${message.sender.name}* with id ${message.sender.id}, at ${message.timestamp}, in group *${message.chat.formattedTitle}* (id: ${message.chat.id})`
    );
    ```
7. For fetching the image uploaded by a user in a group, update line `37` with a valid URL in [client.ts](https://github.com/hanzala-sohrab/whatsapp-image-extractor/blob/412aee4616ab4ec1ddf537cea758e056ec8d979a/client.ts#L37) where the request must be sent
    ```ts
    post("Enter URL here", ...
    ```
8. For fetching the details of a user who recently joined a group, update line `64` with your chatId of choice in [client.ts](https://github.com/hanzala-sohrab/whatsapp-image-extractor/blob/412aee4616ab4ec1ddf537cea758e056ec8d979a/client.ts#L64)
    ```ts
    await client.sendText(
      "919XXXXXXXXX@c.us",
      `who: ${participantAdded.who}\nwhat: ${participantAdded.action}\ngroup: ${participantAdded.chat}`
    );
    ```
9. For fetching the details of a user who recently joined a group, update line `68` with a valid URL in [client.ts](https://github.com/hanzala-sohrab/whatsapp-image-extractor/blob/412aee4616ab4ec1ddf537cea758e056ec8d979a/client.ts#L68) where the request must be sent
    ```ts
    post("Enter URL here", ...
    ```
10. Run the TypeScript file
    ```shell
    tsc client.ts
    ```
10. Run the JavaScript file
    ```shell
    node client.js
    ```
11. Scan the QR-Code with your phone using Whatsapp to create a new session

