
import dotenv from 'dotenv'
import {connectDB} from './src/db/index.js';
import {app} from './app.js';

dotenv.config({
    "path": "./.env"
});

connectDB().then(() => {
    console.log("Connection Done with DB !");
    app.listen(process.env.PORT || 8080,() => {
        console.log("App is listening on PORT ",process.env.PORT || 8080)
    })
}).catch((err) => {
    console.log("Connection Fail with DB !",err)

});

