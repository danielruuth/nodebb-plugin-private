const plugin = {};
let winston = module.parent.require('winston');
const helpers = require.main.require('./src/controllers/helpers');

plugin.privateforum = async (data, callback) => {
  var path = data.req.path;

  //These will be set in an admin view later
  let privatePages = ['/categories','/recent','/tags','/popular','/users','/groups', '/unread'];
  winston.verbose(`Path is = ${path}, private is = ${privatePages.includes(path)}`);

  if (!data.req.loggedIn && privatePages.includes(path)){
    winston.verbose("[plugin-nodebb-private] This is a private path, we should redirect to login");
    helpers.redirect(data.res, '/login');// 307 for everything else
  }else{
    winston.verbose("[plugin-nodebb-private] Oh goodie, you are allowed here");
    //callback(null, data);
  }
  //callback(null, data);
};
plugin.admin = {};
plugin.admin.menu = function (custom_header) {
  custom_header.plugins.push({
    route: '/plugins/dr-private',
    icon: 'fa-usd',
    name: 'Private forum',
  });
  return custom_header;
};

plugin.admin.onLoad = async function (params) {
    helpers.setupAdminPageRoute(params.router, '/admin/plugins/dr-private', params.middleware, [], async (req, res) => {
      res.render('admin/plugins/dr-private', {});
    });
};


module.exports = plugin;
