const webpack = require('webpack');
module.exports={
  chainWebpack: config=>{
    config
    .plugin('html')
    .tap(args=>{
        args[0].title="Mainôralho"
        return args;
    })
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'url_api':JSON.stringify('https://mainoralho.herokuapp.com/'),
        'env': JSON.stringify(process.env.NODE_ENV)
      })
    ]
  },
  pwa:{
    name:"Mainôralho",
    themeColor:"#2a578c",
    msTileColor: '#FFFFFF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    manifestOptions:{
      "background_color": "#FFFFFF"
    },
    workboxOptions: {
      skipWaiting: true
    }
  }
}
