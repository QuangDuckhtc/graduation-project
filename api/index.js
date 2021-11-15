var cors = require('cors')
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var port = (process.env.PORT || 8800);
var server = require('http').Server(app);
server.listen(port, () => console.log('Server running in port ' + port));


var _findIndex = require('lodash/findIndex'); // npm install lodash --save
var jwt = require('jsonwebtoken');

// const pdu_list = smsPdu.generateSubmit(number, text);
// console.log(pdu_list);

function slugName(str) {
	str = str.toLowerCase();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
	str = str.replace(/đ/g, "d");
	str = str.replace(/ /g, "-");
	return str;
}

// const DbUrl = 'mongodb://localhost:27017';
const DbUrl = 'mongodb+srv://admin:admin123456@develop.o5a0o.mongodb.net/test'
const DbName = 'BookingOnline';

const itemPerPage = 8;
//Table
const User = 'NguoiDung';
const Train = 'Train'
const Station = 'Station'

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const { result } = require('lodash');
const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const colUser = client.db(DbName).collection(User);
const colTrain = client.db(DbName).collection(Train);
const colStation = client.db(DbName).collection(Station);


app.get('/', (req, res) => {
	res.send("Home page. Server running okay.");
})
app.get('/user', async (req, res) => {
	await client.connect()
	let result = await colTrain.find().toArray();
	res.status(200).json({
		data: result
	})
})
app.get('/api/train', async (req, res) => {
	await client.connect()
	let result = await colTrain.find().toArray();
	res.status(200).json({
		data: result
	})
})
app.get('/api/carriage', async (req, res) => {
	// console.log(req.query.id)
	let idTrain = req.query.id
	await client.connect()
	let result = await colTrain.findOne({ _id: ObjectId(idTrain) });
	res.status(200).json({
		data: result
	})
})
app.get('/api/seat', async (req, res) => {
	let idTrain = req.query.idtrain
	let idCarriage = req.query.idcarriage

	await client.connect()
	let result = await colTrain.findOne({ _id: ObjectId(idTrain) });
	result.carriage.forEach(item => {
		if (item.idShow === idCarriage) {
			res.status(200).json({
				status: 'success',
				data: item
			})
		}
	});
})

app.get('/api/station', async (req, res) => {
	await client.connect()
	let result = await colStation.find().toArray();
	res.status(200).json({
		status: 'success',
		data: result
	})
})


app.post('/api/schedule', async (req, res) => {
	await client.connect()
	let result = await colStation.find().toArray();
	// console.log(req.body.arrData)
	res.status(200).json({
		status: 'success',
		data: result
	})
})