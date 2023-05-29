// @ts-check

import { camelCase } from '@figma-export/utils'

import outputComponentsAsEs6 from '../output-components-as-es6/dist/index.js'
import outputComponentsAsSvg from '../output-components-as-svg/dist/index.js'
import outputComponentsAsSvgr from '../output-components-as-svgr/dist/index.js'
import outputComponentsAsSvgstore from '../output-components-as-svgstore/dist/index.js'
import outputStylesAsSass from '../output-styles-as-sass/dist/index.js'
import transformSvgWithSvgo from '../transform-svg-with-svgo/dist/index.js'

export default {

    commands: [
        ['styles', {
            fileId: 'fzYhvQpqwhZDUImRz431Qo',
            outputters: [
                outputStylesAsSass({
                    output: './output/figma-styles'
                }),
            ]
        }],

        ['components', {
            fileId: 'fzYhvQpqwhZDUImRz431Qo',
            onlyFromPages: ['octicons-by-github'],
            outputters: [
                outputComponentsAsEs6({
                    output: './output/es6-dataurl-octicons',
                    getVariableName: (options) => camelCase(`icon ${options.componentName}`),
                    useDataUrl: true,
                }),

                outputComponentsAsSvgr({
                    output: './output/svgr-octicons',
                    getSvgrConfig: () => ({
                        template: ({ componentName, props, jsx, exports }, { tpl }) => tpl`
                            const ${componentName} = (${props}) => (${jsx});
                            ${exports}
                        `
                    })
                }),
            ]
        }],

        ['components', {
            fileId: 'fzYhvQpqwhZDUImRz431Qo',
            onlyFromPages: ['icons', 'unit-test'],
            transformers: [
                transformSvgWithSvgo({
                    plugins: [
                        {
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    removeViewBox: false,
                                }
                            }
                        },
                        {
                            name: 'removeDimensions'
                        }
                    ]
                })
            ],
            outputters: [
                outputComponentsAsSvg({
                    output: './output/svg',
                }),

                outputComponentsAsSvgr({
                    output: './output/svgr',
                    getSvgrConfig: () => ({
                        
                    })
                }),

                outputComponentsAsEs6({
                    output: './output/es6-base64',
                    useBase64: true,
                }),
                outputComponentsAsEs6({
                    output: './output/es6-dataurl',
                    useDataUrl: true,
                }),

                outputComponentsAsSvgstore({
                    output: './output/svgstore',
                }),

                outputComponentsAsSvgstore({
                    output: './output/svgstore-monochrome',
                    getIconId: (options) => `[unfilled] ${options.pageName}/${options.componentName}`,
                    svgstoreConfig: {
                        cleanSymbols: ['fill']
                    }
                }),
            ]
        }]
    ]

};
