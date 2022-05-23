const plugin = {};
let winston = module.parent.require('winston');
const helpers = require.main.require('./src/controllers/helpers');

plugin.privateforum = async (data, callback) => {
        var path = data.req.path;

        //These will be set in an admin view later
        let privatePages = ['/categories','/recent','/tags','/popular','/users','/groups', '/unread'];

        winston.verbose(`Path is = ${path}, allowed is = ${privatePages.includes(path)}`);

        if (data.req.loggedIn || privatePages.includes(path)) {
                winston.verbose("[plugin-nodebb-private-forum] User is logged or URL is allowed ("+ req.url +"), no redirect.");
        } else {
                winston.verbose("[plugin-nodebb-private-forum] User is not logged and URL is not allowed ("+ data.req.url +"), redirecting to login page.");
                helpers.notAllowed(data.req, data.res);
        }
};
plugin.init = async (params) => {
	const { router, middleware, controllers } = params;

	routeHelpers.setupPageRoute(router, '/private-plug', middleware, [(req, res, next) => {
		setImmediate(next);
	}], (req, res) => {
		winston.info(`[plugins/private] Navigated to ${nconf.get('relative_path')}/private-plug`);
		res.render('private-plug', { uid: req.uid });
	});

	routeHelpers.setupAdminPageRoute(router, '/admin/plugins/private', middleware, [], controllers.renderAdminPage);
};

module.exports = plugin;
