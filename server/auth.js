module.exports = { 

    'facebookAuth' : {
        'clientID'      : '151546705550305', // your App ID
        'clientSecret'  : '3f842e148a893fd78ff1f320b02001db', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    }
    ,

    'twitterAuth' : { 
        'consumerKey'       : 'LXpIwQMNQLphk28kw2TjUommc',
        'consumerSecret'    : 'oVU705dqoZ2fBHaTcdGmK54Epsi2oR412riLafso5ogi3vk6EK',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '473702335598-c7p1hcrmof28quipsp427mpn0nutbb61.apps.googleusercontent.com',
        'clientSecret'  : '5coT7bmXLAcTkPqjJmdlYn4y',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};