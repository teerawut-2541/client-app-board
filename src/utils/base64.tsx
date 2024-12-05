export const encodeBase64 = (data: string): string => {
    return Buffer.from(data, "utf-8").toString("base64")
}

export const decodeBase64 = <T,>(data: string): T | null => {
    try {
        const decodedString = Buffer.from(data, "base64").toString("utf-8")
        // console.log("Decoded String:", decodedString)
        return JSON.parse(decodedString) as T
    } catch (error) {
        console.error("Failed to decode or parse Base64 string:", error)
        return null
    }
}
