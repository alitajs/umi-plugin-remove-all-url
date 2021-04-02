const path = require("path");

class RemoveURLPlugin {
  constructor(options) {
    const defaulOptions = {
      whitelist: [],
      removeSomeThing: []
    };
    this.options = Object.assign(defaulOptions, options);
  }

  apply(compiler) {
    const options = this.options;
    compiler.hooks.emit.tapAsync('RemoveURLPlugin', (compilation, callback) => {
      Object.keys(compilation.assets).map((i) => {
        if (i.endsWith(".js")) {
          const abc = ['w3.org'].concat(options.whitelist);
          const regexp = new RegExp(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g);
          let content = compilation.assets[i].source();
          const regArr = content.match(regexp);
          for (let key = 0; key < regArr.length; key++) {
            for (let key2 = 0; key2 < abc.length; key2++) {
              if (regArr[key].includes(abc[key2])) {
                regArr.splice(key, 1);
                break;
              }
            }
          }
          regArr.forEach(x => {
            content = content.replace(new RegExp(x, "gm"), 'alitaremoveallurl');
          });
          options.removeSomeThing.forEach(y => {
            content = content.replace(new RegExp(y, "gm"), 'alitaremovesomething');
          });
          compilation.assets[i] = {
            source: () => content,
            size: () => content.length
          }
        }
      })
      callback();
    });
  }
}

module.exports = RemoveURLPlugin;
