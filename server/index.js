if (process.env.NODE_ENV === `development` || process.env.NODE_ENV === `test`) {
	require(`dotenv`).config();
	console.log(`Running in ${process.env.NODE_ENV} environment mode`);
}

const express = require(`express`);
const app = express();
const cors = require(`cors`);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/`, require(`./routes`));

app.use(require(`./middleware/errorHandler`));

module.exports = app;
