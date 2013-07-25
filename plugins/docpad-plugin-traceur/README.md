# Traceur Plugin for [DocPad](http://docpad.org)

[![Build Status](https://secure.travis-ci.org/pflannery/docpad-plugin-traceur.png?branch=master)](http://travis-ci.org/pflannery/docpad-plugin-traceur "Check this project's build status on TravisCI")
[![NPM version](https://badge.fury.io/js/docpad-plugin-traceur.png)](https://npmjs.org/package/docpad-plugin-traceur "View this project on NPM")

Adds support for [Traceur](https://code.google.com/p/traceur-compiler/) to JavaScript compilation to [DocPad](https://docpad.org)

Convention:  `.js.traceur|.js.tr`


## Install

```
npm install --save docpad-plugin-traceur
```


## Configure
You can customise the compiler optons sent to the traceur compiler via the plugin's `featureOptions` config option
        [docpad pad config]....
            plugins:
                traceur:
                    featureOptions:
                        blockBinding: true
                        privateNameSyntax: true
                        privateNames: true
                        cascadeExpression: true
                        trapMemberLookup: true
                        deferredFunctions: true
                        propertyOptionalComma: true
                        types: true



## License
Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT License](http://creativecommons.org/licenses/MIT/)
<br/>Copyright &copy; 2013+ [Stringz Solutions Ltd]
<br/>Copyright &copy; 2013+ [Peter Flannery](http://github.com/pflannery)
