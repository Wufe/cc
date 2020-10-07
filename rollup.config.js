const rollupTypescript = require('rollup-plugin-typescript2');
const { terser } = require("rollup-plugin-terser");
const pkg = require('./package.json');

export default [
    {
        input: 'src/index.ts',
        plugins: [rollupTypescript({ useTsconfigDeclarationDir: true }), terser()],
        output: {
            file: pkg.main,
            format: 'umd',
            name: 'CC'
        }
    }
];