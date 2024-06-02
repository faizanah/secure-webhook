# Implementing Secure Webhooks using node.js


<p align="center">
  <img src="./banner.png" alt="Implementing Secure Webhooks using node.js" width="1000" height="400" />
</p>

<h1 align="center"Implementing Secure Webhooks using node.js</h1>

<hr />

<p>This is a Node.js application to create a secure webhook server using Express. The server verifies incoming webhook requests by validating their signatures and timestamps. It provides a middleware function to verify the signature and timestamp of incoming webhook requests and an endpoint to receive webhook payloads.</p>


## ❯ Up and Running


Before starting, make sure you have at least those components on your workstation:

-   Install [Node.js and NPM](https://nodejs.org/en/download/). (20.14.x recommended)
    -   on OSX use [homebrew](http://brew.sh) `brew install node`
    -   on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`


#### Step 1: Clone this repository

```sh
git clone https://github.com/faizanah/secure-webhook.git # or clone your own fork
```
#### Step 2: Install dependencies.

```sh
cd secure-webhook
npm install
```
#### Step 3: Set up environment variables
- `PORT`: The port on which the server will run. If not specified, it defaults to port 3000.
- `SECRET`: Your shared secret key used for generating and verifying signatures.
- `MAX_TIME_DIFFERENCE`: The maximum allowed time difference (in seconds) between the current time and the timestamp provided in the webhook request headers. If not specified, it defaults to 60 seconds.

Export environment variables through terninals
```
    * export SECRET="My Shared Secret"
    * export MAX_TIME_DIFFERENCE=60
    * export PORT=3000
```
Or rename the `/env.example` to `.env` update the values file for your environment
```
SECRET=My Shared Secret
PORT=3000
MAX_TIME_DIFFERENCE=60
```
#### Step 4: Serve your App
Go to the project dir and start your app with this npm script.

```bash
# Launch the development server
$ node server.js
```
Secure webhook server running on `http://localhost:3000/`.
