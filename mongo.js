const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length > 4) {
    console.log(
        `Incorrect # of arguments! Use one of the following options:
        node mongo.js <password> --> to see all records
        node mongo.js <password> "<name>" <number> --> to add new records`)
    process.exit(1)
}

const [ , , password, name, number ] = process.argv
const userName = 'someuser'
const dbName = 'somedb'

    
const url = 
    `mongodb+srv://${userName}:${password}@cluster0.yoddp.mongodb.net/${dbName}?retryWrites=true&w=majority`
mongoose.connect(url)

const recordSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Record = mongoose.model('Record', recordSchema)

const addRecord = (name, number) => {
    const record = new Record({
        name: name,
        number: number
    })

    record.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

const getRecords = () => {
    console.log('phonebook:')
    Record.find({}).then(result => {
        result.forEach(record => {
            console.log(`${record.name} ${record.number}`)
        })
        mongoose.connection.close()
    })
}

if (name && number) {
    addRecord(name, number)
} else {
    getRecords()
}