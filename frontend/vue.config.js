module.exports = {
    devServer: {
      proxy: {
        '^/users': {
          target: 'http://localhost:8089',
        },
        '^/projects': {
          target: 'http://localhost:8089'
        }
      }
    }
  }