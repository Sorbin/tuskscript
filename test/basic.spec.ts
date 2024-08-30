import { WalrusClient } from "../src/client";
import {
    testString,
    testStringBlobId,

    testNumber,
    testNumberBlobId,

    testObject,
    testObjectBlobId,
} from "./util"

const stringTest = "string"
const numberTest = "number"
const jsonTest = "number"

describe("Varialbe Tests", () => {
    describe(`${stringTest} Tests`, () => {
        it(`should store a ${stringTest} variable`, async () => {
            // Arrange
            const data = testString
            const client = new WalrusClient();

            // Act
            const result = await client.store(data)
            // console.log(result)

            // Assert
            expect(result).not.toBeNull();
        }, 30000);

        it(`should retrieve the ${stringTest} as Blob`, async () => {
            // Arrange
            const testId = testStringBlobId
            const expectedText = testString
            const client = new WalrusClient();

            // Act
            const actualData: Blob = await client.retrieve(testId)
            const actualText = await actualData.text()

            // Assert
            expect(actualData).not.toBeNull();
            expect(actualText).toEqual(expectedText)
        }, 30000);

        it(`should retrieve the ${stringTest} as variable`, async () => {
            // Arrange
            const testId = testStringBlobId
            const expectedText = testString
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

    describe(`${numberTest} Tests`, () => {
        it(`should store a ${numberTest} variable`, async () => {
            // Arrange
            const data = testNumber
            const client = new WalrusClient();

            // Act
            const result = await client.store(data)
            // console.log(result)

            // Assert
            expect(result).not.toBeNull();
        }, 30000);

        it(`should retrieve the ${numberTest} as Blob`, async () => {
            // Arrange
            const testId = testNumberBlobId
            const expectedText = testNumber.toString()
            const client = new WalrusClient();

            // Act
            const actualData: Blob = await client.retrieve(testId)
            const actualText = await actualData.text()

            // Assert
            expect(actualData).not.toBeNull();
            expect(actualText).toEqual(expectedText)
        }, 30000);

        it(`should retrieve the ${numberTest} as variable`, async () => {
            // Arrange
            const testId = testNumberBlobId
            const expectedText = testNumber
            const client = new WalrusClient();

            // Act
            const actualText: number = await client.retrieve(testId, {
                asBlob: false
            })

            // Assert
            expect(actualText).not.toBeNull();
            expect(actualText).toEqual(expectedText)
        }, 30000);
    })

    describe(`${jsonTest} Tests`, () => {
        it(`should store a ${jsonTest} variable`, async () => {
            // Arrange
            const data = testObject
            const client = new WalrusClient();

            // Act
            const result = await client.store(data)
            // console.log(result)

            // Assert
            expect(result).not.toBeNull();
        }, 30000);

        it(`should retrieve the ${jsonTest} as Blob`, async () => {
            // Arrange
            const testId = testObjectBlobId
            const expectedJSON = testObject
            const client = new WalrusClient();

            // Act
            const actualData: Blob = await client.retrieve(testId)
            const actualJson = JSON.parse(await actualData.text())

            // Assert
            expect(actualData).not.toBeNull();
            expect(Object.keys(actualJson)).toEqual(Object.keys(expectedJSON))
        }, 30000);

        it(`should retrieve the ${jsonTest} as variable`, async () => {
            // Arrange
            const testId = testNumberBlobId
            const expectedText = testNumber
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