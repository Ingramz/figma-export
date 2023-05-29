import { optimize, Config } from 'svgo';

import * as FigmaExport from '@figma-export/types';

export default (options: Config): FigmaExport.StringTransformer => {
    return async (svg) => {
        const result = optimize(svg, options);

        if (!('data' in result)) {
            return undefined;
        }

        return result.data;
    };
};
