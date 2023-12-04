const tsconfigPaths = require('tsconfig-paths')

module.exports = {
    rootDir: '.',
    roots: ['<rootDir>/src/'],
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                compiler: 'ttypescript',
            },
        ],
    },
}
