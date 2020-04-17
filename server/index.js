if (process.env.NODE_ENV === `development` || process.env.NODE_ENV === `test`) {
	require(`dotenv`).config();
}

const express = require(`express`);
const app = express();
const port = process.env.PORT || 3000;
const cors = require(`cors`);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`/`, (req, res, next) => {
    res.status(200).json(`Home`)
})

module.exports = app