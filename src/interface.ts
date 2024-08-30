interface BlobStorage {
    id: string;
    startEpoch: number;
    endEpoch: number;
    storageSize: number;
}

interface BlobObject {
    id: string;
    storedEpoch: number;
    blobId: string;
    size: number;
    erasureCodeType: string;
    certifiedEpoch: number;
    storage: BlobStorage;
}

interface NewlyCreated {
    blobObject: BlobObject;
    encodedSize: number;
    cost: number;
}

export interface NewBlob {
    newlyCreated: NewlyCreated;
}

interface Event {
    txDigest: string;
    eventSeq: string;
}

interface AlreadyCertified {
    blobId: string;
    event: Event;
    endEpoch: number;
}

export interface ExistingBlob {
    alreadyCertified: AlreadyCertified;
}