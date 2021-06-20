let vehicleList = []
let bookedList = []
class Vehicle{
    constructor(license_number, passenger_capacity, barcode, status, model, manufacture_year,type,price) {
        this.license_number = license_number
        this.passenger_capacity = passenger_capacity
        this.barcode = barcode
        this.status = status
        this.model = model
        this.manufacture_year = manufacture_year
        this.type = type
        this.price = price
        this.log = []
    }
    reserve_vehicle() {
        this.status = 'Booked'
    }
    return_vehicle() {
        this.status = 'Available'
    }
    getVehicleType() {
        return this.type
    }
    getVehicleLicense() {
        return this.license_number
    }

    getVehiclePrice() {
        return this.price
    }

    getVehicleStatus() {
        return this.status
    }
}

class Car{
    constructor() {
        this.license_number = null
        this.license_number = null
        this.passenger_capacity = null
        this.barcode = null
        this.status = null
        this.model = null
        this.manufacture_year = null
        this.price = null
    }
    onBoardcar(carObject) {
        carObject.type = 'car'
        carObject.status = 'Available'
        let {license_number, passenger_capacity, barcode, status, model, manufacture_year,type,price} = carObject
        let newCar = new Vehicle(license_number, passenger_capacity, barcode, status, model, manufacture_year,type,price)
        vehicleList.push(newCar)
    }
}
class Truck{
    constructor() {
        this.license_number = null
        this.license_number = null
        this.passenger_capacity = null
        this.barcode = null
        this.status = null
        this.model = null
        this.manufacture_year = null
        this.price = null
    }
    onBoardtruck(truckObject) {
        truckObject.type = 'truck'
        truckObject.status = 'Available'
        let {license_number, passenger_capacity, barcode, status, model, manufacture_year,type,price} = truckObject
        let newtruck = new Vehicle(license_number, passenger_capacity, barcode, status, model, manufacture_year,type,price)
        vehicleList.push(newtruck)
    }
}

class Motorcycles{
    constructor() {
        this.license_number = null
        this.license_number = null
        this.passenger_capacity = null
        this.barcode = null
        this.status = null
        this.model = null
        this.manufacture_year = null
        this.price = null
    }
    onBoardMotorcycles(motorCyclesObject) {
        motorCyclesObject.type = 'motorCycles'
        motorCyclesObject.status = 'Available'
        let {license_number, passenger_capacity, barcode, status, model, manufacture_year,type,price} = motorCyclesObject
        let newmotorCycles = new Vehicle(license_number, passenger_capacity, barcode, status, model, manufacture_year,type)
        vehicleList.push(newmotorCycles)
    }
}

// similar you can create for other vehicle types also

class reserveVehicle{
    constructor(reservationNumber,reservationFromDate,reservationToDate,customer,vehicle) {
        this.reservationNumber = reservationNumber
        this.reservationCreatedDate = Date.now()
        this.status = 'Booked'
        this.reservationFromDate = reservationFromDate
        this.reservationToDate = reservationToDate
        this.customer = customer
        this.bill = 0
        this.vehicle = vehicle
    }
    confirmReserve(reservationNumber,reservationFromDate,reservationToDate,customer,vehicle) {
        let bookingDetails = {
            reservationNumber,
            reservationFromDate,
            reservationToDate,
            customer,
            vehicle
        }
        bookingDetails.license_number = vehicle.license_number
        vehicleList = vehicleList.map((vehicle) => {
            if (vehicle.getVehicleLicense() == bookingDetails.license_number) {
                vehicle.return_vehicle()
            }
        })
        bookedList.push(bookingDetails)
    }
    returnVehicle(reservationNumber) {
        let getreserVation = bookedList.find((booked) => {
            return booked.reservationNumber == reservationNumber
        })
        if (getreserVation) {
            vehicleList = vehicleList.map((vehicle) => {
                if (vehicle.getVehicleLicense() == getreserVation.license_number) {
                    vehicle.reserve_vehicle()
                    this.bill = vehicle.getVehiclePrice().price
                }
                return vehicle
            })
        }
        
        bookingDetails.bill = this.bill
        bookedList.push(bookingDetails)
    }
}
function getAvailableVehicle(type, available, timeFrame) {
    let listOfAvailable = vehicleList
    if (type) {
        listOfAvailable = vehicleList.filter((vehicle) => {
            let vType = vehicle.getVehicleType()
            return vType == type
        })
    }
    if (available) {
        let availVehicle = listOfAvailable.filter((vehicle) => {
            return vehicle.getVehicleStatus() =='Available'
        })
        
        if (availVehicle.length != listOfAvailable.length) {
            let bookedVehicle = listOfAvailable.filter((vehicle) => {
                return vehicle.getVehicleStatus() == 'Booked'
            })
            let availableBookedList = []

            for (let booked of bookedList) {
                let getVehicle = bookedVehicle.find((bVehicle) => {
                    bVehicle.license_number == booked.vehicle.license_number
                })
                if (getVehicle) {
                    if ((getVehicle.reservationFromDate > timeFrame.from && getVehicle.reservationToDate > timeFrame.to) || (getVehicle.reservationFromDate < timeFrame.from && getVehicle.reservationToDate < timeFrame.to)) {
                        availableBookedList.push(getVehicle)
                    }
                }
            }
            availVehicle.concat(availableBookedList)
        }
        listOfAvailable.concat(availVehicle)
    }
    return listOfAvailable
}
let car1 = new Car()
car1.onBoardcar({ license_number: 11, passenger_capacity: 4, barcode: '23##44', model: 'AUDI Q4', manufacture_year: 2020,price:100 })
let car2 = new Car()
car2.onBoardcar({ license_number: 12, passenger_capacity: 4, barcode: '23##344', model: 'AUDI Q3', manufacture_year: 2018 ,price:200})

let list = getAvailableVehicle('car')

let reserveVehicleclass = new reserveVehicle()
reserveVehicleclass.confirmReserve(1,Date.now(),Date.now()+1000*60*60,'test',list[0])
console.log(vehicleList)
