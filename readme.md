## estkpm

Adobe ExtendScript package manager (download js or jsx script, generate merged script file)

## Install

    $ npm install -g estkpm

## Usage

write `/path/to/package.jsx` file

```js
{
  "underscore.js": "http://underscorejs.org/underscore.js",
  "moment.js": "https://raw.github.com/moment/moment/develop/moment.js"
}
```

then

   $ estkpm -c /path/to/package.jsx

output `./build.jsx`

## TODO

- download via HTTP Authentication
