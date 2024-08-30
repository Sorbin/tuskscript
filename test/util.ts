import fs from "fs"

export const getBlobFromAssets = (file: string) => {
    let buffer = fs.readFileSync(file);
    return new Blob([buffer]);
}

/**
 * Note the blobId are subjected to change
 */

export const assetTxtBlobId = "BvAHEn6EyoAzbWXAK2rZh9ICFEht6tDhV8oTbXn0vjc"
export const assetJsonBlobId = "ReBJmgwP1pMyIWwcjPHLVNFR7Ct4BbiMl63KvYjxdHM"
export const assetImgBlobId = "UnVePu5JippzefwA4n4sh1RLBm0-Silj7EYfZFwtJ8s"

export const testString = "I am the walrus"
export const testNumber = 101
export const testObject = {
    "sui": "walrus",
    "language": "move",
    "coin": "sui"
}
export const testStringBlobId = "TKh-odANhXPuiUcmcPz7KnmHhNHTFqvxfoEbi0C45A0"
export const testNumberBlobId = "eMusY0mMuqPsDx_mDIHfBSSqZRxi3BLDLOMXz0eem6M"
export const testObjectBlobId = "1hM95hQ3oSoMMNrzW9CBxTeLwKFQTMjjfGfUC8V556k"