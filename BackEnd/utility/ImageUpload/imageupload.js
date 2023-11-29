function uploadfunc(req, res, next) {
    console.log(JSON.stringify(req.file))
    console.log("img file ===> ", JSON.stringify(req.file.filename))
    return res.send(JSON.stringify(req.file.filename))
  }

  module.exports={uploadfunc}