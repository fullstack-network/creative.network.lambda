const AWS = require("aws-sdk");
const Sharp = require("sharp");

exports.handler = (event, context, callback) => {
  const local = true;

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  const bucketName = "creative-network-uploads";
  let key = event.queryStringParameters.key;
  const m = key.match(/(.*)\/(.*)\/(\d+)x(\d+)\/(.*)\.([a-zA-Z]{3,4})$/)

  const directory = m[1];
  const imageId = m[2];
  const width = parseInt(m[3], 10);
  const height = parseInt(m[4], 10);
  const imageName= m[5];
  const extension = m[6];

  console.log(key);

  key = key.replace(extension, "png");

  const originalKey = `${directory}/${imageId}/${imageName}.${extension}`

  s3.getObject({ Bucket: bucketName, Key: key }).promise().then((data) => {
    console.log("Image is already there");
  }).catch((error) => {
    s3.getObject({Bucket: bucketName, Key: originalKey }).promise().then((data) => {
      console.log(data);
      Sharp(data.Body)
        .resize(width, height)
        .toFormat("png")
        .toBuffer()
        .then((buffer) => {
          console.log(`Buffer: ${buffer}`)
          s3.putObject({
            ContentType: "image/png",
            Body: buffer,
            Bucket: bucketName,
            Key: key
          }).promise().catch(error => console.log(error))
        })
        .catch((error) => {
          console.log(error);
        })
    }).catch((error) => {
      console.log(error);
    });
  });

};
