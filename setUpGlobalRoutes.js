
module.exports = {
    init: function (app) {

        app.all('/api/debitoor/*', function (req, res) {
            var path = req.url.substr(13);
            var requestConfig = {url: path};
            if (req.body) {
                requestConfig.body = req.body;
            }
            requestConfig.json = true;
            requestConfig.method = req.method;
            var debitoor =  require("debitoor")(glob.config.app.app_token);
            debitoor(path, function (err, response, body) {
                console.log("response:", body);
                console.log('error:',err);
                res.send(body);
            });

        })
    }
}
