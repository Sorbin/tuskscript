import { ExistingBlob, NewBlob } from "./interface";
import { parse } from "./parser";

export const store = async ({
    publisher,
    data,
    type = "text/plain",
    epoch = 1,
    name = "file"
}: {
    publisher: string,
    data: string | Blob,
    type?: string,
    epoch?: number,
    name?: string
}
) => {
    const requestOptions: RequestInit = {
        method: "PUT",
        body: data,
        redirect: "follow"
    };

    if (data instanceof Blob) {
        requestOptions.body = data
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", data.type);
        requestOptions.headers = myHeaders
    } else {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", type);
        requestOptions.headers = myHeaders
        requestOptions.body = data
    }


    let url = `${publisher}/v1/store`
    if (epoch > 1) {
        url += `?epochs=${epoch}`
    }

    const resp = await fetch(url, requestOptions)
    if (!resp.ok) {
        throw Error()
    }

    return await resp.json() as NewBlob | ExistingBlob
}

export const retrieve = async ({
    aggregator,
    id,
    type = "application/octet-stream",
    asBlob = true,
}: {
    aggregator: string,
    id: string,
    type?: string,

    /**
     * asBlob is used to force native type as string or object
     */
    asBlob?: boolean
}): Promise<any> => {
    const response = await fetch(`${aggregator}/v1/${id}`);

    if (!asBlob) {
        // Object/JSON check
        let clone = response.clone();
        try {
            return await clone.json();
        } catch (error: any) { }

        // Numeric check
        clone = response.clone();
        try {
            const text = await clone.text()
            if (!Number.isNaN(text))
                throw Error()

            return Number(text)
        } catch (error: any) { }

        // Fallback, string
        return response.text();
    }

    const blob = await response.blob();
    return new Blob([blob], { type });
}