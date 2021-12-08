require("dotenv").config();
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
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer')


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

function dateIncrease(date) {
	let day = new Date(date).getDate()
	let month = new Date(date).getMonth() + 1
	let year = new Date(date).getFullYear()
	if (day === 31 && month === 12) {
		year++
		return ('1/1/' + year)
	} else if (day === 28 && month === 2 && year % 4 !== 0) {
		month++
		return (month + '/1/' + year)
	} else if (day === 29 && month === 2) {
		month++
		return (month + '/1/' + year)
	} else if (day === 31) {
		month++
		return (month + '/1/' + year)
	} else if ((day === 30 && month === 4) || (day === 30 && month === 6) || (day === 30 && month === 9) || day === 30 && month === 1) {
		month++
		return (month + '/1/' + year)
	} else {
		day++
		return (month + '/' + day + '/' + year)
	}
}

function dateDecrease(date) {
	let day = new Date(date).getDate()
	let month = new Date(date).getMonth() + 1
	let year = new Date(date).getFullYear()
	if (day === 1) {
		if (month === 1) { //ngay 1/1
			year--
			return ('12/31/' + year)
		} else if (month === 2 || month === 4 || month === 6 || month === 8 || month === 9 || month === 11) {//31 ngay
			month--
			return (month + '31/' + year)
		} else if (month === 3) {
			month--
			if (year % 4 === 0) {
				return (month + '/29/' + year)
			} else {
				return (month + '/28/' + year)
			}
		} else {
			return (month + '/30/' + year)
		}
	} else {
		day--
		return (month + '/' + day + '/' + year)
	}
}

const DbUrl = 'mongodb://localhost:27017';
// const DbUrl = 'mongodb+srv://admin:admin123456@develop.o5a0o.mongodb.net/test'
const DbName = 'BookingOnline';

const itemPerPage = 8;
//Table
const User = 'User';
const Train = 'Train'
const Station = 'Station'
const Schedule = 'Schedule'
const Ticket = 'Ticket'
const Order = 'Order'

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const colUser = client.db(DbName).collection(User);
const colOrder = client.db(DbName).collection(Order);
const colTrain = client.db(DbName).collection(Train);
const colTicket = client.db(DbName).collection(Ticket);
const colStation = client.db(DbName).collection(Station);
const colSchedule = client.db(DbName).collection(Schedule);


app.get('/', (req, res) => {
	res.send("Home page. Server running okay.");
})

app.get('/demo123', async (req, res) => {
	// res.send('helo')
	await client.connect()
	let result = await colUser.find().toArray();
	res.json({
		data: result
	})
	console.log(result)
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
	let arrData = req.body.arrData
	let arrSchedule = []
	arrData.forEach(async (item, index) => {
		let result = await colStation.findOne({ _id: ObjectId(item.stationFrom) });
		let result2 = await colStation.findOne({ _id: ObjectId(item.stationTo) });
		if (result.idShow < result2.idShow) {
			if (result.idShow < 12) {
				let schedule0 = await colSchedule.find({ dateStart: item.date, station: 'Hà Nội' }).toArray();
				if (schedule0.length > 0) {
					arrSchedule.push(schedule0);
					(index + 1) === arrData.length &&
						res.status(200).json({
							status: 'success',
							schedule: arrSchedule,
							stationFrom: result,
							stationTo: result2
						})
					// console.log(arrSchedule);

				} else {
					res.status(200).json({
						status: 'fail',
						message: 'Không có lịch trình phù hợp'
					})

				}
			} else if (result.idShow > 11 && result.idShow < 17) {
				let schedule1 = await colSchedule.find({ dateStart: item.date, station: 'Hà Nội', time: '6:00' }).toArray();
				let schedule2 = await colSchedule.find({ dateStart: dateDecrease(item.date), station: 'Hà Nội', time: '15:20' }).toArray();
				if (schedule1.length > 0 && schedule2.length > 0) {
					schedule1.push(schedule2[0])
					arrSchedule.push(schedule1);
					(index + 1) === arrData.length &&
						res.status(200).json({
							status: 'success',
							schedule: arrSchedule,
							stationFrom: result,
							stationTo: result2
						})

				} else if (schedule1.length > 0 || schedule2.length > 0) {
					schedule1.length > 0 ? arrSchedule.push(schedule1) : arrSchedule.push(schedule2);
					(index + 1) === arrData.length &&
						res.status(200).json({
							status: 'success',
							schedule: arrSchedule,
							stationFrom: result,
							stationTo: result2
						})

				} else {
					res.status(200).json({
						status: 'fail',
						message: 'Không có lịch trình phù hợp'
					})
				}
			} else if (result.idShow > 16 && result.idShow < 28) {
				let schedule3 = await colSchedule.find({ dateStart: dateDecrease(item.date), station: 'Hà Nội' }).toArray();
				if (schedule3.length > 0) {
					arrSchedule.push(schedule3);
					(index + 1) === arrData.length &&
						res.status(200).json({
							status: 'success',
							schedule: arrSchedule,
							stationFrom: result,
							stationTo: result2
						})

				} else {
					res.status(200).json({
						status: 'fail',
						message: 'Không có lịch trình phù hợp'
					})
				}
			} else {
				let schedule4 = await colSchedule.find({ dateStart: dateDecrease(item.date), station: 'Hà Nội', time: '6:00' }).toArray();
				if (schedule4.length > 0) {
					arrSchedule.push(schedule4);
					(index + 1) === arrData.length &&
						res.status(200).json({
							status: 'success',
							schedule: arrSchedule,
							stationFrom: result,
							stationTo: result2
						})

				} else {
					res.status(200).json({
						status: 'fail',
						message: 'Không có lịch trình phù hợp'
					})
				}
			}
		} else {
			if (result.idShow > 21) {
				let schedule5 = await colSchedule.find({ dateStart: item.date, station: 'Sài Gòn' }).toArray();
				if (schedule5.length > 0) {
					arrSchedule.push(schedule5);
					(index + 1) === arrData.length &&
						res.status(200).json({
							status: 'success',
							schedule: arrSchedule,
							stationFrom: result,
							stationTo: result2
						})

				} else {
					res.status(200).json({
						status: 'fail',
						message: 'Không có lịch trình phù hợp'
					})
				}
			} else if (result.idShow < 22 && result.idShow > 16) {
				let schedule6 = await colSchedule.find({ dateStart: item.date, station: 'Sài Gòn', time: '6:00' }).toArray();
				let schedule7 = await colSchedule.find({ dateStart: dateDecrease(item.date), station: 'Sài Gòn', time: '15:20' }).toArray();
				if (schedule6.length > 0 && schedule7.length > 0) {
					schedule6.push(schedule7[0]);
					arrSchedule.push(schedule7);
					(index + 1) === arrData.length &&
						res.status(200).json({
							status: 'success',
							schedule: arrSchedule,
							stationFrom: result,
							stationTo: result2
						})

				} else if (schedule6.length > 0 || schedule7.length > 0) {
					schedule6.length > 0 ? arrSchedule.push(schedule6) : arrSchedule.push(schedule7)
						(index + 1) === arrData.length &&
						res.status(200).json({
							status: 'success',
							schedule: arrSchedule,
							stationFrom: result,
							stationTo: result2
						})

				} else {
					res.status(200).json({
						status: 'fail',
						message: 'Không có lịch trình phù hợp'
					})
				}
			} else if (result.idShow < 17 && result.idShow > 5) {
				let schedule8 = await colSchedule.find({ dateStart: dateDecrease(item.date), station: 'Sài Gòn' }).toArray();
				if (schedule8.length > 0) {
					arrSchedule.push(schedule8);
					(index + 1) === arrData.length &&
						res.status(200).json({
							status: 'success',
							schedule: arrSchedule,
							stationFrom: result,
							stationTo: result2
						})
				} else {
					res.status(200).json({
						status: 'fail',
						message: 'Không có lịch trình phù hợp'
					})
				}
			} else {
				let schedule9 = await colSchedule.find({ dateStart: dateDecrease(item.date), station: 'Sài Gòn', time: '6:00' }).toArray();
				if (schedule9.length > 0) {
					arrSchedule.push(schedule9);
					(index + 1) === arrData.length &&
						res.status(200).json({
							status: 'success',
							schedule: arrSchedule,
							stationFrom: result,
							stationTo: result2
						})

				} else {
					res.status(200).json({
						status: 'fail',
						message: 'Không có lịch trình phù hợp'
					})
				}
			}
		}
	});
})
app.get('/api/schedule-detail', async (req, res) => {
	// console.log(req.query.idTrain)
	let idTrain = req.query.idTrain
	await client.connect()
	let result = await colTrain.findOne({ _id: ObjectId(idTrain) });
	if (result) {
		res.status(200).json({
			status: 'success',
			data: result
		})
	}
})
app.post('/api/ticket', async (req, res) => {
	// console.log(req.body.tickets)
	let { tickets, order, statusTicket } = req.body
	let dataTicket = {
		idSchedule: '',
		idOrder: '',
		nameCustomer: '',
		idCart: '',
		seat: '',
		carriage: '',
		timeStart: '',
		dataStart: '',
		stationFrom: {
			idShow: '',
			name: '',
		},
		stationTo: {
			idShow: '',
			name: '',
		},
		price: '',
		status: '',
	}
	await client.connect()
	let resultOrder = await colOrder.insertOne(order)

	if (resultOrder.acknowledged) {
		let err = false

		tickets.forEach(async ticket => {
			dataTicket = {
				idSchedule: ticket.idSchedule,
				idOrder: resultOrder.insertedId.toString(),
				customerName: ticket.customerName,
				idCart: ticket.indentityCard,
				seat: ticket.idSeat,
				carriage: ticket.nameCarriage,
				timeStart: ticket.timeStart,
				dateStart: ticket.dateStart,
				stationFrom: {
					idShow: ticket.stationFrom.idShow,
					name: ticket.stationFrom.name,
				},
				stationTo: {
					idShow: ticket.stationTo.idShow,
					name: ticket.stationTo.name,
				},
				price: ticket.priceDiscount,
				status: statusTicket
			}
			let resultTicket = await colTicket.insertOne(dataTicket)
			!resultTicket.acknowledged && true
		})

		if (!err) {
			console.log('success')
			let transporter = nodemailer.createTransport({
				host: 'smtp.gmail.com',
				port: 587,
				secure: false,
				auth: {
					user: process.env.EMAIL,
					pass: process.env.PASS_EMAIL,
				}
			});
			let mailOptions = {
				from: process.env.EMAIL,
				to: order.email,
				subject: 'Xác thực email mua vé trên Booking Online',
				html: `
				<h1>Cảm ơn bạn đã tin tưởng và đồng hành cùng vé tàu Online</h1>
				<h4> 		+ Mã đặt: ${resultOrder.insertedId}</h4>
				<h4>		+ Họ tên khách hàng: ${order.customerName}</h4>
				<h4>		+ Số điện thoại: ${order.phone}</h4>
				<h4>		+ Ngày đặt: ${order.date}</h4>
				<h4>		+ Tổng tiền: ${order.totalPrice}</h4>
				<h4>		+ Tổng vé: ${order.countTicket}</h4>
				`
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error)
				} else {
					// console.log('xac thuc thanh cong');
					res.status(200).json({
						status: 'success',
						message: 'Thông tin đặt vé đã được gửi đên email của bạn'
					})
					console.log('mail success')
				}
			})
		} else {
			res.status(200).json({
				status: 'faile',
				message: 'Lỗi hệ thống đặt vé thất bại'
			})
		}
	} else {
		res.status(200).json({
			status: 'faile',
			message: 'Lỗi hệ thống đặt vé thất bại'
		})
	}
})
app.get('/api/ticket', async (req, res) => {
	let { idSchedule, idStationFrom, idStationTo } = req.query
	let result = await colTicket.find({
		idSchedule: idSchedule, status: { $ne: 4 }, $or: [
			{
				'stationFrom.idShow': {
					$gt: parseInt(idStationFrom),
					$lt: parseInt(idStationTo)
				},
			},
			{
				'stationTo.idShow': {
					$gt: parseInt(idStationFrom),
					$lt: parseInt(idStationTo)
				},
			}]
	}).toArray()
	if (result) {
		res.status(200).json({
			status: 'success',
			data: result
		})
	} else {
		console.log(err)
	}

})



app.post('/api/login', async (req, res) => {
	// console.log(req.body.account)
	let username = req.body.account.username
	let password = req.body.account.password
	await client.connect()
	let result = await colUser.findOne({ 'account.username': username })
	if (!result) {
		res.status(200).json({
			status: 'fail',
			message: 'Tài khoản không tồn tại'
		});
	} else {
		if (result.account.password !== password) {
			res.status(200).json({
				status: "fail",
				message: "Tài khoản hoặc mật khẩu không hợp lệ",
			});
		} else {
			var secretKey = process.env.SECRET_KEY;
			var payload = {
				userID: result._id,
				role: result.role,
			};

			//7 ngày hết hạn token
			var token = jwt.sign({ payload }, secretKey, { expiresIn: 60 * 1220 * 7 });
			// console.log(JSON.stringify(payload));
			res.status(200).json({
				status: 'success',
				message: 'Đăng nhập thành công !',
				userID: result._id,
				userName: result.account.username,
				vaiTro: result.vaiTro,
				role: result.role,
				name: result,
				token: token
			});

		}
	}
})
app.get('/demo', async (req, res) => {
	// var arr = []
	// for (var i = 1; i < 41; i++) {
	// 	var string = `SE2-NM1-G${i}`
	// 	arr.push(string)
	// }
	// let date = new Date('10/1/2021').getDate()-1
	// res.json({
	// 	date,
	// })
})