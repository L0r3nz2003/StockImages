class Image {

    constructor(filename, uploadTime, beschreibung, uid, tags, hashValue) {
        this.filename = filename;
        this.uploadTime = uploadTime;
        this.beschreibung = beschreibung;
        this.uid = uid;
        this.tags = tags;
        this.hashValue = hashValue;
    }
}

module.exports = Image;