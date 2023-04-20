var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const port = 50000;

var app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

var jsonParser = bodyParser.json();

app.post("/nft", jsonParser, async function (req, res) {
  try {
    const data = req.body;

    let nfts = await fs.promises.readFile("./store/nfts.json");
    let nftsMinting = await fs.promises.readFile("./store/nfts-minting.json");

    nfts = JSON.parse(nfts);
    nftsMinting = JSON.parse(nftsMinting);

    const indexNftMinting = nftsMinting.findIndex(
      (nftMinting) => nftMinting.name === data.name
    );

    nfts.push(data);
    nftsMinting.splice(indexNftMinting, 1);

    await fs.promises.writeFile("./store/nfts.json", JSON.stringify(nfts));
    await fs.promises.writeFile(
      "./store/nfts-minting.json",
      JSON.stringify(nftsMinting)
    );

    res.send({ success: "Success!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong!" });
  }
});

app.post("/nft-minting", jsonParser, async function (req, res) {
  try {
    const data = req.body;

    let nftsMinting = await fs.promises.readFile("./store/nfts-minting.json");

    nftsMinting = JSON.parse(nftsMinting);

    const indexNftMinting = nftsMinting.findIndex(
      (nftMinting) => nftMinting.name === data.name
    );

    indexNftMinting === -1 && nftsMinting.push(data);

    await fs.promises.writeFile(
      "./store/nfts-minting.json",
      JSON.stringify(nftsMinting)
    );

    res.send({ success: "Success!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong!" });
  }
});

app.post("/check-nft-exist", async function (req, res) {
  try {
    const name = req.body.name;

    let nfts = await fs.promises.readFile("./store/nfts.json");
    let nftsMinting = await fs.promises.readFile("./store/nfts-minting.json");

    nfts = JSON.parse(nfts);
    nftsMinting = JSON.parse(nftsMinting);

    const isExistNft = nfts.findIndex((nft) => nft.name === name) >= 0;
    const isExistNftMinting =
      nftsMinting.findIndex((nftMinting) => nftMinting.name === name) >= 0;

    res.send({ success: "Success!", isExist: isExistNft || isExistNftMinting});
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong!" });
  }
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
