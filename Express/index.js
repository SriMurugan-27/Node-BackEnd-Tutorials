const express = require('express');
const app = express();
const debug = require('debug')('app:start');
const morgan =  require('morgan');

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan Enabled...');
}

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Lisening to port ${port}`));