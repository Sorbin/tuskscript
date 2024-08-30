import { retrieve, store } from "./api"
import { ExistingBlob, NewBlob } from ".."

const AGGREGATOR = "https://aggregator-devnet.walrus.space"
const PUBLISHER = "https://publisher-devnet.walrus.space"

export interface StoreOptions {
    epoch?: number
    contentType?: string

    /**
     * Only used when the data is a Blob
     */
    name?: string
}

export interface RetrieveOptions {
    contentType?: string
    asBlob?: boolean
}

export class WalrusClient {
    aggregator: string
    publisher: string

    constructor(
        aggregator: string = AGGREGATOR,
        publisher: string = PUBLISHER
    ) {
        this.aggregator = aggregator
        this.publisher = publisher
    }

    async store(data: string, opts?: StoreOptions): Promise<NewBlob | ExistingBlob>;
    async store(data: number, opts?: StoreOptions): Promise<NewBlob | ExistingBlob>;
    async store(data: object, opts?: StoreOptions): Promise<NewBlob | ExistingBlob>;
    async store(data: Blob, opts?: StoreOptions): Promise<NewBlob | ExistingBlob>;

    async store(data: string | number | object | Blob, opts?: StoreOptions) {
        let type: string = "";

        switch (true) {
            case data instanceof Blob:
                type = data.type
                break;
            case typeof data === 'string':
            case typeof data === 'number':
                data = data.toString()
                type = "text/plain"
                break;
            case typeof data === 'object':
                data = JSON.stringify(data)
                type = "application/json"
                break;
            default:
        }

        // Overwrite type if specify
        if (opts?.contentType) {
            type = opts.contentType
        }

        return store({
            publisher: this.publisher,
            data,
            type,
            epoch: opts?.epoch || 1
        })
    }

    async retrieve(id: string, opts?: RetrieveOptions) {
        return retrieve({
            aggregator: this.aggregator,
            id,
            type: opts?.contentType,
            asBlob: opts?.asBlob,
        })
    }
}