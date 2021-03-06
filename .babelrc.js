module.exports = {
    "presets": [
        [
            "@babel/preset-env"
        ],
        "@babel/preset-typescript",
        "@babel/preset-react"
    ],
    "plugins": [
        [
            "import", {
                libraryName: 'antd-mobile',
                libraryDirectory: "lib",
                style: true,
            }
        ],
        "transform-class-properties",
        "@babel/plugin-syntax-dynamic-import",
        "react-hot-loader/babel"
    ]
}