import {signUp, logout, login, onAuthStateChanged} from "./auth";
import { db } from "./config";
import { doc, setDoc, collection,deleteDoc, onSnapshot } from "firebase/firestore";

const saveCity =  async function() 
{
    const cityName = document.getElementById("cityname").value.trim()
    const population = document.getElementById("population").value.trim()
    const country = document.getElementById("country").value.trim()

    try{
        const cityRef = doc(db,"cities",cityName.toLowerCase()+"-"+country.toLowerCase())

        await setDoc(cityRef,{
            name:cityName,
            population:population,
            country:country,
            time: new Date()
        })
        console.log("City Successfully created")
        document.getElementById("cityname").value = ""
        document.getElementById("population").value = ""
        document.getElementById("country").value = ""

    }catch(error)
    {
        console.error("Error saving city: ", error)
    }
}

const deleteCity = async function(collection, docID){
    try{
        await deleteDoc(doc(db, collection, docID))
        console.log(`Document with ID ${docID} deleted successfully`)
    }catch(error){
        console.error("Error deleting city", error)
    }
}

const cityCollection = collection(db, "cities")
onSnapshot(cityCollection, (snapshot)=>{
    const tableBody = document.getElementById("table-body")
    tableBody.innerHTML = ""

    snapshot.forEach((doc)=>{
        const data = doc.data()
        const row = document.createElement("tr")

        row.innerHTML = `
        <td> ${doc.id}</td>
        <td> ${data.name}</td>
        <td> ${data.country}</td>
        <td> ${data.population}</td>
        `
        tableBody.appendChild(row)
    })
})


const addCityForm = document.querySelector("#addCity")
addCityForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    saveCity()
})

const deleteCityForm = document.querySelector("#deleteCity")
deleteCityForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    const city = document.getElementById("cityID").value
    deleteCity("cities", city)
})