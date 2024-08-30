import { WalrusClient } from "../src/client";
import {
    getBlobFromAssets,
    assetTxtBlobId as testTxtBlobId,
    assetImgBlobId as testImgBlobId,
    assetJsonBlobId as testJsonBlobId,
} from "./util"

const textTest = ".txt"
const blobPath = "./test/assets/test.txt"

const imgText = ".jpg"
const blobImgPath = "./test/assets/test.jpg"

const jsonText = ".json"
const blobJsonPath = "./test/assets/test.json"

describe("File Blob Tests", () => {
    describe(`${textTest} Blob Tests`, () => {
        it(`should store a ${textTest} from filesystem`, async () => {
            // Arrange
            const expectedData = getBlobFromAssets(blobPath);
            const client = new WalrusClient();

            // Act
            const result = await client.store(expectedData)
            // console.log(result)

            // Assert
            expect(result).not.toBeNull();
        }, 30000);

        it(`should retrieve a ${textTest} file and its content as Blob`, async () => {
            // Arrange
            const testId = testTxtBlobId;
            const expectedData = getBlobFromAssets(blobPath);
            const expectedText = await expectedData.text();
            const client = new WalrusClient();

            // Act
            const actualData: Blob = await client.retrieve(testId)
            const actualText = await actualData.text()

            // // Assert
            expect(actualData).not.toBeNull();
            expect(actualText).toEqual(expectedText)
        }, 30000);

        it(`should retrieve a ${textTest} and its content as type`, async () => {
            // Arrange
            const testId = testTxtBlobId;
            const expectedData = getBlobFromAssets(blobPath);
            const expectedText = await expectedData.text();
            const client = new WalrusClient();

            // Act
            const actualText: string = await client.retrieve(testId, {
                asBlob: false
            })

            // Assert
            expect(actualText).not.toBeNull();
            expect(actualText).toEqual(expectedText)
        }, 30000);
    })

    describe(`${imgText} Blob Tests`, () => {
        it(`should store a ${imgText} from filesystem`, async () => {
            // Arrange
            const expectedData = getBlobFromAssets(blobImgPath);
            const client = new WalrusClient();

            // Act
            const result = await client.store(expectedData)
            // console.log(result)

            // Assert
            expect(result).not.toBeNull();
        }, 30000);

        it(`should retrieve a ${imgText} file and its content as Blob`, async () => {
            // Arrange
            const testId = testImgBlobId;
            const expectedData = getBlobFromAssets(blobImgPath);
            const expectedBuffer = await expectedData.arrayBuffer();
            const client = new WalrusClient();

            // Act
            const actualData: Blob = await client.retrieve(testId)
            const actualBuffer = await actualData.arrayBuffer()

            // // Assert
            expect(actualData).not.toBeNull();
            expect(actualBuffer).toEqual(expectedBuffer)
        }, 30000);
    })

    describe(`${jsonText} Blob Tests`, () => {
        it(`should store a ${jsonText} from filesystem`, async () => {
            // Arrange
            const expectedData = getBlobFromAssets(blobJsonPath);
            const client = new WalrusClient();

            // Act
            const result = await client.store(expectedData)
            // console.log(result)

            // Assert
            expect(result).not.toBeNull();
        }, 30000);

        it(`should retrieve a ${jsonText} file and its content as Blob`, async () => {
            // Arrange
            const testId = testJsonBlobId;
            const expectedData = getBlobFromAssets(blobJsonPath);
            const expectedJSON = JSON.parse(await expectedData.text())
            const client = new WalrusClient();

            // Act
            const actualData: Blob = await client.retrieve(testId)
            const actualJson = JSON.parse(await actualData.text())

            // Assert
            expect(actualData).not.toBeNull();
            expect(Object.keys(actualJson)).toEqual(Object.keys(expectedJSON))
        }, 30000);

        it(`should retrieve a ${jsonText} and its content as type`, async () => {
            // Arrange
            const testId = testJsonBlobId;
            const expectedData = getBlobFromAssets(blobJsonPath);
            const expectedText = JSON.parse(await expectedData.text());
            const client = new WalrusClient();

            // Act
            const actualText = await client.retrieve(testId, {
                asBlob: false
            })

            // Assert
            expect(actualText).not.toBeNull();
            expect(JSON.stringify(actualText)).toEqual(JSON.stringify(expectedText))
        }, 30000);
    })
})