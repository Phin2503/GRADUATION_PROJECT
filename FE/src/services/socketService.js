// import { WebSocketServer } from 'ws'

// const wss = new WebSocketServer({ port: 8080 })

// let reservedSeats = {} // Đối tượng lưu danh sách ghế đã đặt theo ID showtime

// wss.on('connection', (ws) => {
//   console.log('New client connected')

//   // Gửi danh sách ghế đã đặt cho client khi kết nối
//   ws.send(JSON.stringify({ reservedSeats }))

//   ws.on('message', (message) => {
//     if (typeof message === 'string') {
//       const data = JSON.parse(message)
//       console.log('Received message:', data)

//       if (data.type === 'updateSeats') {
//         const { showtimeId, seats } = data

//         // Cập nhật danh sách ghế đã đặt cho showtime cụ thể
//         if (!reservedSeats[showtimeId]) {
//           reservedSeats[showtimeId] = []
//         }

//         const newReservedSeats = [...new Set([...reservedSeats[showtimeId], ...seats])]
//         reservedSeats[showtimeId] = newReservedSeats

//         // Gửi danh sách ghế đã đặt cho tất cả client
//         wss.clients.forEach((client) => {
//           if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify({ reservedSeats }))
//           }
//         })
//       }
//     }
//   })
// })

// console.log('WebSocket server is running on ws://localhost:8080')
