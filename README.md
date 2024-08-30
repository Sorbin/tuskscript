<p align="center">
  <img src="https://raw.githubusercontent.com/SovaSniper/tuskscript/master/icon.png" width="200" />
</p>

# tuskscript

<a href="https://www.npmjs.com/package/tuskscript">
    <img src="https://badge.fury.io/js/tuskscript.svg" alt="npm version" height="18">
</a>

`tuskscript` is a TypeScript-based npm package that simplifies development for the Walrus network. It provides an easy-to-use API for storing and retrieving data, allowing seamless integration with both Web2 and Web3 applications. Whether you are building decentralized apps (dApps) or traditional applications, TuskScript enables you to leverage the power of the Walrus network with minimal effort.

## Installation

Use the package manager npm to install `tuskscript`.

```bash
npm i tuskscript
```

## Usage

Below is a quick example of how to use TuskScript to store and retrieve data on the Walrus network.

### Storing Data

Start by creating a new instance of `WalrusClient`. You can store any JavaScript object, and the API will return details about the stored blob. If the data is new, it returns a `NewBlob`. If the data has been previously stored, it returns an `ExistingBlob`.

```typescript
import { 
  WalrusClient,
  NewBlob,
  ExistingBlob
} from "tuskscript";

const client = new WalrusClient();
// const publisher = "..."
// const aggregator = "...";
// const client = new WalrusClient(publisher, aggregator);

const data = {
  name: "Walrus",
  language: "Move",
  chain: "Sui",
};

// Store data as a new blob
const result: NewBlob = await client.store(data);
console.log(result);
/*
{
    newlyCreated: {
        blobObject: {
            id: '0xd3ee449b225ae4bfdd3f361982883b1f6312ab25a512a431bad99c87ff12c844',
            storedEpoch: 0,
            blobId: 'BmDTorm0NtVbVZcFXlQaKQ2xLiJ7HvxPuoIoE3hC0Pk',
            size: 49,
            erasureCodeType: 'RedStuff',
            certifiedEpoch: 0,
            storage: {}
        },
        encodedSize: 65023000,
        cost: 3175000
    }
}
*/

// Storing the same data again returns an ExistingBlob
const existingResult: ExistingBlob = await client.store(data);
console.log(existingResult);
/*
{
    alreadyCertified: {
        blobId: 'BmDTorm0NtVbVZcFXlQaKQ2xLiJ7HvxPuoIoE3hC0Pk',
        event: {
            txDigest: 'EW7pCYu7DNfPYpS5j3c8gVA2w3hNiP7dyYARbAxCSSbK',
            eventSeq: '0'
        },
        endEpoch: 1
    }
}
*/
```

### Retrieving Data

You can retrieve stored data by its `blobId`. By default, data is retrieved as a `Blob`, but you can also parse it directly into TypeScript types.

```typescript
import { WalrusClient } from "tuskscript";

const client = new WalrusClient();
const blobId = "BmDTorm0NtVbVZcFXlQaKQ2xLiJ7HvxPuoIoE3hC0Pk";

// Retrieve data as a Blob object
const blob: Blob = await client.retrieve(blobId);
const data = JSON.parse(await blob.text());
console.log(data);
/*
{
    "name": "Walrus",
    "language": "Move",
    "chain": "Sui"
}
*/

// Retrieve data directly as a JavaScript object
const directData = await client.retrieve(blobId, { asBlob: false });
console.log(directData);
/*
{
    "name": "Walrus",
    "language": "Move",
    "chain": "Sui"
}
*/

// Retrieve data with specified content type
const jsonBlob = await client.retrieve(blobId, { type: "application/json" });
```

### Low-Level Services

If you need more granular control over the data storage and retrieval process, you can use the low-level `store` and `retrieve` functions:

```typescript
import { store, retrieve } from "tuskscript";

const publisher = "...";
const aggregator = "...";

const data = {
  name: "Walrus",
  language: "Move",
  chain: "Sui",
};

// Store data with additional options
const result = await store({
  publisher,
  data,
  epoch: 5
});

// Retrieve data using low-level retrieval
const blobId = "BmDTorm0NtVbVZcFXlQaKQ2xLiJ7HvxPuoIoE3hC0Pk";
const retrievedData = await retrieve({
  aggregator,
  id: blobId,
});
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)