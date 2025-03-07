import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";
import { db } from "./config";
import { doc, setDoc, getDocs, collection, userData } from "firebase/firestore";




onAuthStateChanged(auth, async (user)=>{
    if(user)
    {
       console.log("Logged In User: ", user.email) 
       await fetchUserData(user.uid)
    }
    else{
        console.log("No User is Signed in")
    }    
})

async function fetchUserData(userID)
{
    try
    {
        const userDoc = await getDocs(collection(db, "users"))
        const userData = userDoc.docs.find(doc => doc.id===userID)?.data()
        console.log("User data: ", userData)
        document.getElementById("greeting").innerHTML = "<h1> Hi, "+userData.firstname+"</h1>"

    }
    catch(error)
    {
        console.error("Error getting user data: ", error)
    }
}

export async function signUp(firstName, lastName, email, password)
{
    try
    {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log("User signed up: ", userCredential.user.email)
        console.log("User ID: ", userCredential.user.id)
        const userRef = doc(db, "users", userCredential.user.uid)

        await setDoc(userRef,{
            firstname:firstName,
            lastname:lastName,
            timestamp: new Date()
        })
    }
    catch(error)
    {
        console.error("Error fetching user data ", error)
    }
}



export async function login(email, password)
{
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        window.location.href = "cityManager.html"
    }
    catch(error)
    {
        console.error("Login Error: ", error.message)
    }
}

export async function logout()
{
    try{
        await signOut(auth)
        console.log("User Logged Out")
    }
    catch(error)
    {
        console.error("Logout error: "+ error)
    }
}