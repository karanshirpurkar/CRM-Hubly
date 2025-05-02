const reshandler = (req, res, next) => {
    const originalSend = res.send;
    res.send = function(data){
        console.log(new Date().toLocaleDateString(), "Response", data);
        originalSend.call(this, data);
    }
    next();
}
module.exports = reshandler;