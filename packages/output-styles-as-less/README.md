# @figma-export/output-styles-as-less

> Styles Outputter for [@figma-export](https://github.com/marcomontalbano/figma-export) that exports styles to LESS.

With this outputter you can export all the styles as variables inside a `.less` file.

This is a sample of the output:

```sh
$ tree output/
# output/
# └── _variables.less
```


## .figmaexportrc.js

You can easily add this outputter to your `.figmaexportrc.js`:

```js
module.exports = {
    commands: [
        ['styles', {
            fileId: 'fzYhvQpqwhZDUImRz431Qo',
            outputters: [
                require('@figma-export/output-styles-as-less')({
                    output: './output'
                })
            ]
        }],
    ]
}
```

`output` is **mandatory**.

`getFilename` and `getVariableName` are **optional**.

```js
const { kebabCase } = require('@figma-export/utils');

...

require('@figma-export/output-styles-as-less')({
    output: './output',
    getFilename: () => '_variables',
    getVariableName = (style, descriptor) => `${kebabCase(style.name).toLowerCase()}${descriptor != null ? `-${descriptor}` : ''}`,
})
```

> *defaults may change, please refer to `./src/index.ts`*

## Install

Using npm:

```sh
npm install --save-dev @figma-export/output-styles-as-less
```

or using yarn:

```sh
yarn add @figma-export/output-styles-as-less --dev
```
