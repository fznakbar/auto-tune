if (process.env.NODE_ENV === `development` || process.env.NODE_ENV === `test`) {
	require(`dotenv`).config();
	console.log(`Running in ${process.env.NODE_ENV} environment mode`);
}

const express = require(`express`);
const app = express();
const cors = require(`cors`);
const bodyParser  = require('body-parser');

app.use(cors());
app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))


app.use(`/`, require(`./routes`));

app.use(require(`./middleware/errorHandler`));
// app.listen(3000, () => console.log('running'))

module.exports = app;
