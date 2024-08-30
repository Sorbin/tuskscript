/**
 * For multiformdata
 * @param payload 
 * @returns 
 */
export const parse = (payload: string): Blob[] => {
    if (!payload.startsWith("--")) {
        throw Error("Invalid Format")
    }

    const boundary = (payload.split("\n").shift() || "").trim()
    if (!boundary) {
        throw Error("No boundary")
    }

    // const endBoundary = (payload.split("\n").pop() || "").trim()
    // if (!endBoundary) {
    //     throw Error("No boundary")
    // }
    // if (!endBoundary.trim().endsWith(`${boundary}--`)) {
    //     throw Error("Invalid boundary")
    // }

    let ret: Blob[] = []
    const parts = payload.split(boundary)

    for (let index = 0; index < parts.length; index++) {
        const raw = parts[index]
        const lines = removeEmptyLinesUntilContent(raw.split("\n"))
        let headerLineNumber = 0
        let filename: string | null = null;
        let contentType: string | null = null;

        for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
            let line = lines[lineNumber];
            if (filename && contentType) {
                headerLineNumber = lineNumber
                break;
            }

            if (line.toLocaleLowerCase().startsWith('content-disposition') && !filename) {
                line = line.toLocaleLowerCase()
                // Extract the filename from the Content-Disposition header
                const match = line.match(/filename="(.+?)"/);
                if (match) {
                    filename = match[1];  // Capture the filename
                }
            } else if (line.toLocaleLowerCase().startsWith('content-type') && !contentType) {
                // Extract the Content-Type
                line = line.toLocaleLowerCase()
                const match = line.match(/content-type:\s*(.+)/);
                if (match) {
                    contentType = match[1].trim();  // Capture the content type
                }
            }
        };

        if (!(headerLineNumber > 0) || !contentType) {
            continue;
        }

        const content = stripEmptyLines(lines.slice(headerLineNumber).join("\n"));
        const b = new Blob([content], { type: contentType });
        ret.push(b)
    }

    if (ret.length === 0) {
        throw Error("Parse nothing")
    }

    return ret
}

function removeEmptyLinesUntilContent(lines: string[]): string[] {
    let hasContentBeenFound = false;

    return lines.filter(line => {
        if (!hasContentBeenFound && line.trim() === "") {
            // Skip empty lines until content is found
            return false;
        } else {
            // Mark that content has been found, and keep this and subsequent lines
            hasContentBeenFound = true;
            return true;
        }
    });
}


function stripEmptyLines(content: string): string {
    // Split the content into lines and filter out empty lines
    const lines = content.split('\n')
        .map(line => line.trim()) // Remove leading and trailing spaces from each line
        .filter(line => line.length > 0); // Remove empty lines

    // Join the cleaned lines back into a single string with newline characters
    return lines.join('\n');
}