import express from 'express'

const app = express()
const PORT = 3000
const router = express.Router()

app.use(express.json())

app.use((req, res, next) => {
    const timeStamp = new Date().toISOString()
    console.log(`[${timeStamp}] ${req.method} ${req.url}`)
    next()
})

let cars = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2020 },
    { id: 2, make: 'Honda', model: 'Civic', year: 2019 },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2021 },
    { id: 4, make: 'Tesla', model: 'Model 3', year: 2022 }
]


// route
app.get('/', (req, res) => {
    res.send('Hello, form the cars API')
})

router.get('/cars', (req, res) => {
    res.json(cars)
})

router.get('/cars/:id', (req, res) => {
    const car = cars.find(car => car.id === parseInt(req.params.id))
    if (!car) return res.status(404).json({ error: 'Car not found' })

    res.json(car)
})


// chalange: add POST, PUT, DELETE routes for cars

router.post('/cars', (req, res) => {
    const { make, model, year } = req.body

    if (!make || !model || !year) {
        return res.status(400).json({ error: 'Make, model, and year are required' })
    }

    const newCar = {
        id: cars.length + 1,
        make,
        model,
        year
    }
    cars.push(newCar)
    res.status(201).json(newCar)
})

router.put('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const carIndex = cars.findIndex(car => car.id === id)

    if (carIndex === -1) {
        return res.status(404).json({ error: 'Car not found' })
    }

    const { make, model, year } = req.body
    if (make) cars[carIndex].make = make
    if (model) cars[carIndex].model = model
    if (year) cars[carIndex].year = year
    res.json(cars[carIndex])
})


router.delete('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const carIndex = cars.findIndex(car => car.id === id)

    if (carIndex === -1) {
        return res.status(404).json({ error: 'Car not found' })
    }

    const deletedCar = cars.splice(carIndex, 1)
    res.json({ message: 'Car deleted', car: deletedCar[0] })
})


app.use('/api/v1/cars', router)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))