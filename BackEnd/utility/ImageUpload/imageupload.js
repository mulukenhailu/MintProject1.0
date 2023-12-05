function uploadfunc(req, res) {
    console.log(JSON.stringify(req))
    // console.log("img file ===> ", JSON.stringify(req.file.filename))
    return res.send(JSON.stringify(req.file.filename))
  }

  module.exports={uploadfunc}
