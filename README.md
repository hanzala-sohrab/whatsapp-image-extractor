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
6. Update line `23` with your chatId of choice in [client.ts](./client.ts)
    ```ts
    await client.sendImage(
        "919XXXXXXXXX@c.us",
        imageBase64,
        filename,
        `You just received this ${message.type} from *${message.sender.name}* with id ${message.sender.id}, at ${message.timestamp}, in group *${message.chat.formattedTitle}* (id: ${message.chat.id})`
    );
    ```
7. Update line `41` with a valid URL in [client.ts](./client.ts) where the request must be sent
    ```ts
    post("Enter URL here", ...
    ```
8. Run the TypeScript file
    ```shell
    tsc client.ts
    ```
9. Run the JavaScript file
    ```shell
    node client.js
    ```
10. Scan the QR-Code with your phone using Whatsapp to create a new session

