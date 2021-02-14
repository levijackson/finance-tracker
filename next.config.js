module.exports = {
    webpack: (config) => {
        return {
            ...config,
            node: {
                // resolves Module not found: Can't resolve 'fs'
                // error coming from MySQL usage
                fs: 'empty',
                net: 'empty',
                tls: 'empty'
            },    
            }
        }
  };