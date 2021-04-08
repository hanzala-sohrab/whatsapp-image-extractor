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
3. Install
    ```shell
    npm install
    ```
4. Update line `23` with your chatId of choice in [client.ts](./client.ts)
    ```ts
    await client.sendImage(
        "919XXXXXXXXX@c.us",
        imageBase64,
        filename,
        `You just received this ${message.type} from *${message.sender.name}* with id ${message.sender.id}, at ${message.timestamp}, in group *${message.chat.formattedTitle}* (id: ${message.chat.id})`
    );
    ```
5. Update line `35` with a valid URL in [client.ts](./client.ts) where the request must be sent
    ```ts
    post("Enter URL here", ...
    ```
6. Run the TypeScript file
    ```shell
    tsc client.ts
    ```
7. Run the JavaScript file
    ```shell
    node client.js
    ```
8. Scan the QR-Code with your phone using Whatsapp to create a new session

