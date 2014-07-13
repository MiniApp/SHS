function JSLoaderEnvironment() {
	// Default
	this.prefix = "/assets/";

	// Auto-discover location
	var _remote = false;
	var s = 0;
	var _script_tags = document.getElementsByTagName("script");
	var endsWith = function(str, substr) {
		return (str && str.indexOf(substr) == (str.length - substr.length));
	};
	for (s = 0; s < _script_tags.length; ++s) {
		var src = _script_tags[s].src;
		var src_orig = src;
		if (src) {
			if (src.indexOf("://") > -1) {
				src = src.substring(src.indexOf("://") + 3);
				src = src.substring(src.indexOf("/"));
			}
			if (endsWith(src, "jsloader.js")
					|| endsWith(src, "jsloader-debug.js")) {
				// If the domain is remote, assume we're running in hosted mode
				_remote = (src_orig.indexOf(document.domain) == -1);
				if (_remote)
					src = src_orig;

				this.prefix = src.substring(0, src.lastIndexOf("/") + 1);
			}
		}
	}

	/**
	 * @private
	 */
	this.suffix = ".js";

	/**
	 * @private Make the Path of a module to meta/proj/release
	 */
	this.makeJSLoaderPath = function(m, p, r, suff) {
		// if just a url is specified, use it
		if (!p && !r)
			return this.stripExternalRef(m);

		// build the m/p/r path
		return this.prefix + m + "/" + p + "/incr/versions/" + r
				+ ((suff) ? this.suffix : "");
	}

	/**
	 * The generate the path prefix for a MPR linked into the JSLoader
	 * Environmentiables
	 * 
	 * @param m
	 *            meta
	 * @param p
	 *            project
	 * @param r
	 *            release
	 */
	this.makePath = function(m, p, r) {
		// if just a url is specified, use it
		if (!p && !r)
			return this.stripExternalRef(m);

		// build the m/p/r path
		return this.prefix + m + "/" + p + "/" + r + "/";
	}

	/**
	 * @private
	 */
	this.env = new Object();

	/**
	 * @private
	 */
	this.loaders = new Object();

	/**
	 * The sets an environment variable (make sure it's safe for JS Object[key]
	 * notation) The idea here is that modules could set this, and pages which
	 * load the module can then get the Environment variables
	 * 
	 * @param k
	 *            javascript object[key]
	 * @param v
	 *            value (technically could be of any type...)
	 */
	this.setEnv = function(k, v) {
		this.env[k] = v;
	}

	/**
	 * The gets an environment variable previously set
	 * 
	 * @param k
	 *            javascript object[key]
	 * @returns the value set for this key
	 */
	this.getEnv = function(k) {
		return this.env[k];
	}

	/**
	 * Lists all modules loaded in this environment.
	 * 
	 * @private
	 */
	this._loadedJSLoaders = new Object();

	/**
	 * This makes a normalized key to stick into loaded_modules and verify if
	 * things are loaded.
	 * 
	 * @private
	 */
	this.normalize = function(m, p, r) {
		return (m + "__" + p + "__" + r).toLowerCase();
	};

	/**
	 * This checks whether the given meta/project/release is already loaded.
	 * 
	 * @param m
	 *            metaproject (or the path of a JS file, if no other args are
	 *            passed)
	 * @param p
	 *            project
	 * @param r
	 *            release
	 * @type boolean
	 * @returns Whether m/p/r is loaded
	 */
	this.isLoaded = function(m, p, r) {
		var xkey = this.normalize(m, p, r);
		return (this._loadedJSLoaders[xkey] != null);
	};

	/**
	 * Gets a "loader" based on the MPR specified in the arguments This is
	 * useful for loading subpackages. You can call {@link JSSubLoader#load} or
	 * {@link JSSubLoader#loadAll} on this and it will load submodules under a
	 * folder with the "release" number
	 * 
	 * @see JSSubLoader
	 * @param m
	 *            metaproject
	 * @param p
	 *            project
	 * @param r
	 *            release
	 * @returns void
	 */
	this.getLoader = function(m, p, r) {
		var key = this.normalize(m, p, r);
		var loader = this.loaders[key];
		if (loader) {
			return loader;
		} else {
			loader = new JSSubLoader(this, this
					.makeJSLoaderPath(m, p, r, false)
					+ "/");
			var __path = this.makePath(m, p, r);
			this.setEnv(p.toUpperCase() + "_PATH", __path);
			this.loaders[key] = loader;
			return loader;
		}
	}

	/**
	 * Loads the requested module into the environment You can also load your
	 * own module by calling loadJavascript(url) if you want
	 * 
	 * @param m
	 *            metaproject
	 * @param p
	 *            project
	 * @param r
	 *            release
	 * @type boolean
	 * @returns void
	 */
	this.load = function(m, p, r) {
		var key = this.normalize(m, p, r);
		var url = this.makeJSLoaderPath(m, p, r, true);
		try {
			if (this.isLoaded(m, p, r)) {
				return;
			}
			this.loadJavaScript(url);
			this._loadedJSLoaders[key] = "true";
		} catch (e) {
			this.handleError(e);
		}
	};

	/**
	 * Loads a JavaScript file into the page
	 * 
	 * @param {String}
	 *            url the url of the javascript file
	 */
	this.loadJavaScript = function(url) {
		// url = this.stripExternalRef(url);
		window.document.writeln("<scri" + "pt src='" + url
				+ "' type='text/javascript'></sc" + "ript>");
	};

	/**
	 * Loads a JavaScript file into the page
	 * 
	 * @param {String}
	 *            url the url of the javascript file
	 */
	this.loadStyleSheet = function(url) {
		// url = this.stripExternalRef(url);
		document.writeln("<li" + "nk rel='stylesheet' href='" + url
				+ "' type='text/css'></li" + "nk>");
	};

	/**
	 * Strips out any double slashes, double dots, or cross domain references.
	 * 
	 * @param s
	 *            string
	 */
	this.stripExternalRef = function(s) {
		var exprs = [ /\.\.+/g, /\/\/+/g, /\\\\+/g, /\:+/g, /\'+/g, /\%+/g ];

		// If it's hosted, we relax the protocol related regex
		exprs = [ /\.\.+/g, /\\\\+/g, /\'+/g, /\%+/g ];

		if (_remote)

			for ( var i = 0; i < exprs.length; i++) {
				s = s.replace(exprs[i], '');
			}

		return s;
	}

	/**
	 * Overwritable error handler
	 */
	this.handleError = function(e) {
	}

	return this;
};

/**
 * Construct a new JSSubLoader instance. You shoudl never need to call this, as
 * {@link JSLoaderEnvironment#getLoader} gets you one of these from the
 * environment.
 * 
 * @class JSSubLoader is designed to load "sub" modules This is a wrapper which
 *        is produced when you call {@link JSLoaderEnvironment#getLoader} It is
 *        designed to allow sub-packages within a given MPR to be loaded easily.
 *        This is constructed by JSLoader.getLoader() call so you should never
 *        really need to construct one of these.
 * @constructor
 * @param {JSLoaderEnvironment}
 *            env_
 * @param {String}
 *            prefix_ The path underneath which the submodules reside
 * 
 */

function JSSubLoader(env_, prefix_) {
	/**
	 * @private
	 */
	this.environment = env_;

	/**
	 * @private
	 */
	this.prefix = prefix_;

	/**
	 * @private
	 */

	this.loaded = new Object();

	/**
	 * @private
	 */
	this.normalize = function(str) {
		return str.toLowerCase();
	}

	/**
	 * Loads an array of subpackages
	 * 
	 * @param {Array}
	 *            pkgs an array of packages.
	 */

	this.loadAll = function(pkgs_) {
		for (i = 0; i < pkgs_.length; ++i)
			this.load(pkgs_[i]);
	};

	/**
	 * Loads a subpackage, if it's not already loaded
	 * 
	 * @param {String}
	 *            url the url of the sub-package module file
	 *            (m/p/r/submodule.js)
	 */
	this.load = function(pkg) {
		var p = this.normalize(pkg);
		if (this.loaded[p]) {
			return;
		}
		this.loaded[p] = pkg;
		this.environment.loadJavaScript(prefix_ + pkg + ".js");
	};
};

JSLoader = new JSLoaderEnvironment();

// LocalWords: fileoverview
