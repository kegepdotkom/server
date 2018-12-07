const { Storage } = require('@google-cloud/storage')

const storage = new Storage ({
    projectId: 'golden-record-221510',
    keyFilename: './keyfile.json'
})

const bucketName = 'kegepdotkom'
const bucket = storage.bucket(bucketName)

module.exports = {
    googleStorage: function(req, res, next){
        if(!req.file){
            res.status(400).json({
                msg: "image needed"
            })
        }
        const gcsname = Date.now()+req.file.originalname
        const file = bucket.file(gcsname)

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            },
            resumable: true
        })

        stream.on('error', (err) => {
            req.file.cloudStorageError = err;
            console.log(err)
            res.status(400).json({
                msg: 'error on upload'
            })
          });
        
          stream.on('finish', () => {
            req.file.cloudStorageObject = gcsname;
            file.makePublic().then(() => {
              req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucketName}/${gcsname}`
              next();
            });
          });
        
          stream.end(req.file.buffer);
        
    }
}