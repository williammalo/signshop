// Generated by CoffeeScript 1.4.0
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = function(BasePlugin) {
  var UglifyPlugin;
  return UglifyPlugin = (function(_super) {

    __extends(UglifyPlugin, _super);

    function UglifyPlugin() {
      return UglifyPlugin.__super__.constructor.apply(this, arguments);
    }

    UglifyPlugin.prototype.name = 'uglify';

    UglifyPlugin.prototype.config = {
      strict_semicolons: true
    };

    UglifyPlugin.prototype.renderUglify = function(opts, next) {
      var ast, content, file, parser, uglify, uglifyjs;
      content = opts.content, file = opts.file;
      uglifyjs = require("uglify-js");
      parser = uglifyjs.parser, uglify = uglifyjs.uglify;
      try {
        ast = parser.parse(content, this.config.strict_semicolons);
      } catch (err) {
        return next(err);
      }
      ast = uglify.ast_mangle(ast);
      ast = uglify.ast_squeeze(ast);
      opts.content = uglify.gen_code(ast);
      return next();
    };

    UglifyPlugin.prototype.renderDocument = function(opts, next) {
      var extension;
      extension = opts.extension;
      if (extension === 'js') {
        return this.renderUglify(opts, next);
      } else {
        return next();
      }
    };

    return UglifyPlugin;

  })(BasePlugin);
};
