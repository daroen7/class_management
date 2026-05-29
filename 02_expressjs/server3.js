import express from 'express';
const app = express();
const router = express.Router();
const port = 2002;

app.use(express.json());

app.use((req, res, next) => {
    const timeStamp = new Date().toISOString();
    console.log(`[${timeStamp}] ${req.method} ${req.url}`);
    next()
});

let clubs = [
    { id: 1, name: 'FC Barcelona', country: 'Spain', founded: 1899 },
    { id: 2, name: 'Manchester United', country: 'England', founded: 1878 },
    { id: 3, name: 'Bayern Munich', country: 'Germany', founded: 1900 },
    { id: 4, name: 'Juventus', country: 'Italy', founded: 1897 }
]

app.get('/', (req, res) => {
    res.send('Hello, from the football clubs API')
})

app.get('/clubs', (req, res) => {
    res.json(clubs)
})

router.get('/clubs', (req, res) => {
    res.json(clubs)
})

router.get('/clubs/:id', (req, res) => {
    const club = clubs.find(club => club.id === parseInt(req.params.id))
    if(!club) return res.status(404).json({error: 'club tidak ada'})
    res.json(club)
})

router.post('/clubs', (req, res) => {
    const { name, country, founded } = req.body
    if(!name||!country||!founded) return res.status(400).json({error: "name, country, founded are required"})
    
    const newClub = {
        id: clubs.length + 1,
        name,
        country,
        founded: parseInt(founded)
    }

    clubs.push(newClub)
    res.status(201).json(newClub)
})

app.use('/api/v1', router)

app.listen(port, () => {
    console.log(`Server is running on localhost: ${port}`)
})