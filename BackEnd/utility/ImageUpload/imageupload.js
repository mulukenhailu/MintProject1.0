function uploadfunc(req, res) {
  console.log(JSON.stringify(req.file))
  return res.send(JSON.stringify(req.file.filename))
}

module.exports={uploadfunc}