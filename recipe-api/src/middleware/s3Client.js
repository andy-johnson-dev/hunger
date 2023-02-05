const { S3Client } = require("@aws-sdk/client-s3")
const { GetObjectCommand, HeadObjectCommand, GetObjectTaggingCommand } = require('@aws-sdk/client-s3')

const REGION = 'us-west-2'
const s3Client = new S3Client({ region: REGION })

exports.fetch = async (res, bucketName, key, cacheExpiration, streamTags) => {
    const params = {
        Bucket: bucketName,
        Key: key
    }
    console.log(params)
    try {
        const headResponse = await s3Client.send(new HeadObjectCommand(params))
        res.set({
            "Content-Length": headResponse.ContentLength,
            "Content-Type": headResponse.ContentType,
            "ETag": headResponse.ETag
        });
        if (streamTags === true) {
            const taggingResponse = await s3Client.send(new GetObjectTaggingCommand(params));
            taggingResponse.TagSet.forEach((tag) => {
                res.set("X-TAG-" + tag.Key, tag.Value);
            });
        }
        // Prepare cache headers
        if (typeof cacheExpiration === "number") {
            res.setHeader("Cache-Control", "public, max-age=" + cacheExpiration / 1000);
            res.setHeader("Expires", new Date(Date.now() + cacheExpiration).toUTCString());
        } else {
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Expires", 0);
        }

        const response = await s3Client.send(new GetObjectCommand(params))
        const stream = response.Body
        stream.on("data", (chunk) => res.write(chunk));
        stream.once("end", () => {
            res.end();
        });
        stream.once("error", () => {
            res.end();
        });
    } catch (err) {
        console.log("Error", err)
        throw err
    }
}