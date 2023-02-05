const { PutObjectCommand, CreateBucketCommand, ListBucketsCommand, GetObjectCommand, ListObjectsCommand, GetObjectTaggingCommand, HeadObjectCommand } = require('@aws-sdk/client-s3')
const { s3Client } = require('./s3Client')

let params = {
    Bucket: "hunger-roulette",
    Key: "puff.jpg",
}

exports.run = async () => {
    try {
        const data = await s3Client.send(
            new CreateBucketCommand({ Bucket: params.Bucket })
        );
        console.log(data);
        console.log("Successfully created bucket called", data.location);
        return data;
    } catch (err) {
        console.log("error: ", err)
    }
    try {
        const results = await s3Client.send(new PutObjectCommand(params));
        console.log(
            "Successfully created " +
            params.Key +
            " and uploaded it to " +
            params.Bucket +
            "/" +
            params.Key
        );
        return results;
    } catch (err) {
        console.log("Error", err);
    }
};

exports.fetch = async (res, bucketName, key, cacheExpiration, streamTags) => {
    const params = {
        Bucket: bucketName,
        Key: key
    }
    console.log
    try {
        const headResponse = await s3Client.send(new HeadObjectCommand({ Bucket: bucketName, Key: key }))
        res.set({
            "Content-Length": headResponse.ContentLength,
            "Content-Type": headResponse.ContentType,
            "ETag": headResponse.ETag
        });
        if (streamTags === true) {
            const taggingResponse = await s3Client.send(new GetObjectTaggingCommand({ Bucket: bucketName, Key: key }));
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
    }
}