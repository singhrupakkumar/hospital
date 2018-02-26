module.exports = { 

    'facebookAuth' : {
        'clientID'      : '592159677791214', // your App ID
        'clientSecret'  : 'ee80627af8e3afa08e8ed0004bb115da', // your App Secret
        'callbackURL'   : 'http://hospitalenv.us-east-2.elasticbeanstalk.com/auth/facebook/callback'
    }
    ,

    'twitterAuth' : {   
        'consumerKey'       : 'LXpIwQMNQLphk28kw2TjUommc',
        'consumerSecret'    : 'oVU705dqoZ2fBHaTcdGmK54Epsi2oR412riLafso5ogi3vk6EK',
        'callbackURL'       : 'http://hospitalenv.us-east-2.elasticbeanstalk.com/auth/twitter/callback'
    },    

    'googleAuth' : {
        'clientID'      : '473702335598-c7p1hcrmof28quipsp427mpn0nutbb61.apps.googleusercontent.com',
        'clientSecret'  : '5coT7bmXLAcTkPqjJmdlYn4y',
        'callbackURL'   : 'http://hospitalenv.us-east-2.elasticbeanstalk.com/auth/google/callback'
    }

};