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
function format_curency(a) {
    a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return a;
  }

function dateDecrease(date, num) {
	let lastDate = new Date(date) - 86400000 * num
	return (new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(lastDate))
}

const DbUrl = 'mongodb://localhost:27017';
// const DbUrl = 'mongodb+srv://admin:admin123456@develop.o5a0o.mongodb.net/test'
const DbName = 'BookingOnline';

const itemPerPage = 7;
//Table
const User = 'User';
const Train = 'Train'
const Station = 'Station'
const Schedule = 'Schedule'
const Ticket = 'Ticket'
const Order = 'Order'

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const { query } = require("express");
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
	let result1 = await colStation.find().sort({ _id: -1 }).toArray();
	res.status(200).json({
		status: 'success',
		data: result,
		data1: result1
	})
})
app.post('/api/schedule', async (req, res) => {
	await client.connect()
	let arrData = req.body.arrData
	let arrSchedule = []
	console.log(arrData)
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

				} else {
					res.status(200).json({
						status: 'fail',
						message: 'Không có lịch trình phù hợp'
					})
				}
			} else if (result.idShow > 11 && result.idShow < 17) {
				let schedule1 = await colSchedule.find({ dateStart: dateDecrease(item.date, 1), station: 'Hà Nội', time: '15:20' }).toArray();
				let schedule2 = await colSchedule.find({ dateStart: item.date, station: 'Hà Nội', time: '6:00' }).toArray();
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
				let schedule3 = await colSchedule.find({ dateStart: dateDecrease(item.date, 1), station: 'Hà Nội' }).toArray();
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
				let schedule4 = await colSchedule.find({ dateStart: dateDecrease(item.date, 2), station: 'Hà Nội', time: '15:20' }).toArray();
				let schedule41 = await colSchedule.find({ dateStart: dateDecrease(item.date, 1), station: 'Hà Nội', time: '6:00' }).toArray();
				if (schedule4.length > 0 && schedule41.length > 0) {
					schedule4.push(schedule41[0])
					arrSchedule.push(schedule4);
					(index + 1) === arrData.length &&
						res.status(200).json({
							status: 'success',
							schedule: arrSchedule,
							stationFrom: result,
							stationTo: result2
						})

				} else if (schedule4.length > 0 || schedule41.length > 0) {
					schedule4.length > 0 ? arrSchedule.push(schedule4) : arrSchedule.push(schedule41);
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
				let schedule6 = await colSchedule.find({ dateStart: dateDecrease(item.date, 1), station: 'Sài Gòn', time: '15:20' }).toArray();
				let schedule7 = await colSchedule.find({ dateStart: item.date, station: 'Sài Gòn', time: '6:00' }).toArray();
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
				let schedule8 = await colSchedule.find({ dateStart: dateDecrease(item.date, 1), station: 'Sài Gòn' }).toArray();
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
				let schedule9 = await colSchedule.find({ dateStart: dateDecrease(item.date, 2), station: 'Sài Gòn', time: '15:20' }).toArray();
				let schedule91 = await colSchedule.find({ dateStart: dateDecrease(item.date, 1), station: 'Sài Gòn', time: '6:00' }).toArray();
				if (schedule9.length > 0 && schedule91.length > 0) {
					schedule9.push(schedule91[0]);
					arrSchedule.push(schedule91);
					(index + 1) === arrData.length &&
						res.status(200).json({
							status: 'success',
							schedule: arrSchedule,
							stationFrom: result,
							stationTo: result2
						})

				} else if (schedule9.length > 0 || schedule91.length > 0) {
					schedule9.length > 0 ? arrSchedule.push(schedule9) : arrSchedule.push(schedule91)
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
		idShow: '',
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
				idShow: ticket.idShow,
				idSchedule: ticket.idSchedule,
				idOrder: order.idShow,
				customerName: ticket.customerName,
				idCard: ticket.indentityCard,
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
				<h4> 		+ Mã đặt: ${order.idShow}</h4>
				<h4>		+ Họ tên khách hàng: ${order.customerName}</h4>
				<h4>		+ Số điện thoại: ${order.phone}</h4>
				<h4>		+ Ngày đặt: ${order.date}</h4>
				<h4>		+ Tổng tiền: ${format_curency(order.totalPrice.toString()) + " VND"}</h4>
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
		idSchedule: idSchedule, $or: [
			{
				'stationFrom.idShow': {
					$gte: parseInt(idStationFrom),
					$lte: parseInt(idStationTo)
				},
			},
			{
				'stationTo.idShow': {
					$gte: parseInt(idStationFrom),
					$lte: parseInt(idStationTo)
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


//admin
app.get('/api/order-page', async (req, res) => {
	await client.connect()
	let { page } = req.query

	let allOrder = await colOrder.find().toArray()
	let totalPage = Math.ceil(parseInt(allOrder.length) / itemPerPage);
	let result = await colOrder.find({}).sort({ _id: -1 }).limit(itemPerPage).skip(itemPerPage * page).toArray()
	res.status(200).json({
		status: 'success',
		data: result,
		totalPage: totalPage
	})
	// console.log(result)
})
app.get('/api/order-search', async (req, res) => {
	// console.log(req.query.search)
	await client.connect()
	let { page, search } = req.query

	let searchOrder = await colOrder.find({
		$or: [
			{
				idShow: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				customerName: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				email: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				phone: {
					"$regex": search,
					'$options': '$i'
				}
			}
		]
	}).toArray()
	let totalPage = Math.ceil(parseInt(searchOrder.length) / itemPerPage);
	let result = await colOrder.find({
		$or: [
			{
				idShow: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				customerName: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				email: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				phone: {
					"$regex": search,
					'$options': '$i'
				}
			}
		]
	}).sort({ _id: -1 }).limit(itemPerPage).skip(itemPerPage * page).toArray()
	res.status(200).json({
		status: 'success',
		data: result,
		totalPage: totalPage
	})
	// console.log(result)
})
app.get('/api/ticket-page', async (req, res) => {
	await client.connect()
	let { page } = req.query

	let allTicket = await colTicket.find({}).toArray()
	let totalPage = Math.ceil(parseInt(allTicket.length) / itemPerPage);
	let result = await colTicket.find({}).sort({ _id: -1 }).limit(itemPerPage).skip(itemPerPage * page).toArray()
	res.status(200).json({
		status: 'success',
		data: result,
		totalPage: totalPage
	})
})
app.get('/api/ticket-search', async (req, res) => {
	await client.connect()
	let { page, search } = req.query

	let searchOrder = await colTicket.find({

		$or: [
			{
				idShow: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				customerName: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				idOrder: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				seat: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				date: {
					"$regex": search,
					'$options': '$i'
				}
			}
		]
	}).toArray()
	let totalPage = Math.ceil(parseInt(searchOrder.length) / itemPerPage);
	let result = await colTicket.find({
		$or: [
			{
				idShow: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				customerName: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				idOrder: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				seat: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				date: {
					"$regex": search,
					'$options': '$i'
				}
			}
		]
	}).sort({ _id: -1 }).limit(itemPerPage).skip(itemPerPage * page).toArray()
	res.status(200).json({
		status: 'success',
		data: result,
		totalPage: totalPage
	})
	// console.log(result)
})
app.get('/api/ticket-idorder', async (req, res) => {
	let { idOrder } = req.query
	await client.connect()
	let result = await colTicket.find({ idOrder: idOrder }).toArray()
	res.status(200).json({
		status: 'success',
		data: result
	})
})
app.get('/api/ticket-idorder-4', async (req, res) => {
	let { idOrder } = req.query
	await client.connect()
	let result = await colTicket.find({ idOrder: idOrder, status: { $ne: 4 } }).toArray()
	res.status(200).json({
		status: 'success',
		data: result
	})
})
app.put('/api/ticket-status', async (req, res) => {
	let { id } = req.query
	await client.connect()
	let result = await colTicket.updateOne({ _id: ObjectId(id) }, { $set: { status: 2 } })
	res.status(200).json({
		status: 'success',
		message: 'In vé thành công'
	})
})
app.put('/api/ticket-delete', async (req, res) => {
	let { id } = req.query
	await client.connect()
	await colTicket.updateOne({ _id: ObjectId(id) }, { $set: { status: 4 } })
	res.status(200).json({
		status: 'success',
		message: 'Đã hủy vé'
	})
})
app.put('/api/tickets-delete', async (req, res) => {
	let { idOrder } = req.query
	await client.connect()
	let result = await colTicket.find({ idOrder: idOrder }).toArray()
	result.forEach(async ticket => {
		await colTicket.updateOne({ _id: ObjectId(ticket._id) }, { $set: { status: 4 } })
	})
	res.status(200).json({
		status: 'success',
		message: 'Đã hủy vé'
	})
})
app.put('/api/ticket-status-3', async (req, res) => {
	let { id } = req.query
	await client.connect()
	await colTicket.updateOne({ _id: ObjectId(id) }, { $set: { status: 3 } })
	res.status(200).json({
		status: 'success',
		message: 'Yêu cầu đã được gửi đợi BookingOnile xác nhận'
	})
})
app.get('/api/schedule-page', async (req, res) => {
	await client.connect()
	let { page } = req.query

	let allOrder = await colSchedule.find().toArray()
	let totalPage = Math.ceil(parseInt(allOrder.length) / itemPerPage);
	let result = await colSchedule.find({}).sort({ dateStart: -1 }).limit(itemPerPage).skip(itemPerPage * page).toArray()
	res.status(200).json({
		status: 'success',
		data: result,
		totalPage: totalPage
	})
})
app.get('/api/schedule-search', async (req, res) => {
	await client.connect()
	let { page, search } = req.query

	let searchSchedule = await colSchedule.find({
		$or: [
			{
				dateStart: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				time: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				'train.idShow': {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				station: {
					"$regex": search,
					'$options': '$i'
				}
			}
		]
	}).toArray()
	let totalPage = Math.ceil(parseInt(searchSchedule.length) / itemPerPage);
	let result = await colSchedule.find({
		$or: [
			{
				dateStart: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				time: {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				'train.idShow': {
					"$regex": search,
					'$options': '$i'
				}
			},
			{
				station: {
					"$regex": search,
					'$options': '$i'
				}
			}
		]
	}).sort({ _id: -1 }).limit(itemPerPage).skip(itemPerPage * page).toArray()
	res.status(200).json({
		status: 'success',
		data: result,
		totalPage: totalPage
	})
	// console.log(result)
})
app.post('/api/schedule-value', async (req, res) => {
	// 0 se12
	// 1 se34
	// 2 se56
	// 3 se78
	let dateDefault = new Date('1/1/2022')
	let dateDefault2 = new Date(req.body.schedule.dateStart)
	let numDate = ((Math.abs(dateDefault2 - dateDefault)) / 86400000) % 4

	let date = req.body.schedule.dateStart
	let time = req.body.schedule.time

	// console.log(time + " " + numDate)
	await client.connect()
	let result = await colSchedule.findOne({ dateStart: date, time: time, station: "Hà Nội" })
	if (result) {
		res.status(200).json({
			status: 'success',
			message: 'Đã có lịch trình',
			data: result
		})
	} else {
		if (time === '6:00' && numDate === 0) {
			let result1 = await colTrain.findOne({ idShow: 'SE1' })
			res.status(200).json({
				status: 'fail',
				data: result1
			})
		} else if (time === '15:20' && numDate === 0) {
			let result2 = await colTrain.findOne({ idShow: 'SE2' })
			res.status(200).json({
				status: 'fail',
				data: result2
			})
		} else if (time === '6:00' && numDate === 1) {
			let result3 = await colTrain.findOne({ idShow: 'SE3' })
			res.status(200).json({
				status: 'fail',
				data: result3
			})
		} else if (time === '15:20' && numDate === 1) {
			let result4 = await colTrain.findOne({ idShow: 'SE4' })
			res.status(200).json({
				status: 'fail',
				data: result4
			})
		} else if (time === '6:00' && numDate === 2) {
			let result5 = await colTrain.findOne({ idShow: 'SE5' })
			res.status(200).json({
				status: 'fail',
				data: result5
			})
		} else if (time === '15:20' && numDate === 2) {
			let result6 = await colTrain.findOne({ idShow: 'SE6' })
			res.status(200).json({
				status: 'fail',
				data: result6
			})
		} else if (time === '6:00' && numDate === 3) {
			let result7 = await colTrain.findOne({ idShow: 'SE7' })
			res.status(200).json({
				status: 'fail',
				data: result7
			})
		} else if (time === '15:20' && numDate === 3) {
			let result8 = await colTrain.findOne({ idShow: 'SE8' })
			res.status(200).json({
				status: 'fail',
				data: result8
			})
		}else{
			res.status(200).json({
				status: 'waitting',
			})
		}
	}
})

app.post('/api/schedule-add', async (req, res) => {
	let { schedule } = req.body
	let schedule1 = {
		dateStart: schedule.dateStart,
		time: schedule.time,
		station: schedule.station,
		trainId: schedule.train._id,
		train: schedule.train
	}
	let schedule2 = {
		dateStart: schedule.dateReturn,
		time: schedule.time,
		station: schedule.stationRev,
		trainId: schedule.train._id,
		train: schedule.train
	}
	let result = colSchedule.insertMany([schedule1, schedule2])
	if (result) {
		res.status(200).json({
			status: 'success',
			message: 'Thêm lịch trình thành công'
		})
	} else {
		res.status(200).json({
			status: 'fail',
			message: 'Thêm lịch thất bại'
		})
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
				name: result.name,
				token: token
			});

		}
	}
})

function dateDecrease1(date, num) {
	let lastDate = (new Date(date).getTime() + 86400000)
	return (new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(lastDate))
}
app.get('/demo', async (req, res) => {
	console.log(dateDecrease1('1/1/2021', 2))
})