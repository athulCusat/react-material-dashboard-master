const firebase = require("firebase-admin");
const sortByDistance = require('sort-by-distance');
// Required for side-effects
require("firebase/firestore");
var serviceAccount = require("./serviceAccount.json");

firebase.initializeApp({
    // apiKey: "AIzaSyBriwSEzrQnePbE_3fiIB4r61QkQO-kRA8",
    // authDomain: "kwil-a2fc9.firebaseapp.com",
    databaseURL: "https://kwil-a2fc9.firebaseio.com",
    // projectId: "kwil-a2fc9",
    // storageBucket: "kwil-a2fc9.appspot.com",
    // messagingSenderId: "592156859177",
    // appId: "1:592156859177:web:ba9df431ee04420dab7538",
    // measurementId: "G-3LS9C5Z341",
    credential: firebase.credential.cert(serviceAccount)
});

var db = firebase.firestore();
const data = require("./Kollam-Kovalam.json")
const data1 = require("./maincoordinates.json")
//addFullLine()

function addBoatJetty(){
data.features.forEach(function(obj){
    if(obj.properties.category === 'Boat Jetty'){
        const cords = {
            latitude : obj.geometry.coordinates[1],
            longitude : obj.geometry.coordinates[0]
        }
           db.collection("Boat jetty").doc(obj.properties.name).set({
               'jetty name' : obj.properties.name,
               //Coordinates : new firebase.firestore.GeoPoint(obj.geometry.coordinates[0],obj.geometry.coordinates[1]),
               Coordinates : cords, 
               'jetty details' : 'No Description added yet',
               'district' : '',
               altitude : obj.geometry.coordinates[2]
           }).then(function(docRef) {
            console.log("Document written with ID: ", docRef);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}
})
}

function addBrigdes() {
    data.features.forEach(function(obj){
        if(obj.properties.category === 'Bridge'){
            if(typeof obj.geometry.coordinates[2]!=='undefined'){
                const cords = {
                    latitude : obj.geometry.coordinates[1],
                    longitude : obj.geometry.coordinates[0]
                }
               db.collection("Bridges").doc(obj.id).set({
                   name : obj.properties.name,
                   Coordinates : cords,
                   altitude : obj.geometry.coordinates[2],
                   width : obj.properties.width,
                   verticalClearance : obj.properties["vertical clearance"]
               }).then(function(docRef) {
                console.log("Document written with ID: ", docRef);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
    }
}
    })
    }


    function addLines(){
        var fullArray = []

        const origin = { x: 76.5819, y: 8.8912}
        const opts = {
            yName: 'latitude',
            xName: 'longitude'
        }
        data.features.forEach(function(obj,i,arr){
            console.log(arr.length)
            if(obj.geometry.type === 'LineString'){
                // obj.geometry.coordinates.forEach(function(value,index,array){
                // console.log(obj.geometry.coordinates)
                // for (let j = 0; j < obj.geometry.coordinates.length; j++) {
                //     const arr[] = obj.geometry.coordinates[j][1];
                //     console.log(arr)
                // }
                   
            //      var array = new firebase.firestore.GeoPoint(value.geometry.coordinates[index][1],value.geometry.coordinates[index][1])
            //        console.log(array)
            //    })
                if(typeof obj.properties.width !== 'undefined'){
                    var cordsArray = []
                    obj.geometry.coordinates.forEach(element => {
                        cordsArray.push(new firebase.firestore.GeoPoint(element[1],element[0]))
                        fullArray.push(cordsArray)
                    });
                   db.collection("LineStrings").doc(obj.id).set({
                       depth : obj.properties.Depth,
                       Coordinates : cordsArray,
                       width : obj.properties.width,
                   }).then(function(docRef) {
                    console.log("Document written with ID: ", docRef);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
                console.log(sortByDistance(origin,fullArray,opts))
            }
        }
        })
        }

        function addFullLine(){
            //console.log(data1.features.geometry.coordinates)
                   data1.features.forEach(function(obj,i,arr) {
                    var arra = []
                    obj.geometry.coordinates.forEach(element => {
                        arra.push(new firebase.firestore.GeoPoint(element[1],element[0]))
                    });
                        //var a = [{x : obj.geometry.coordinates[j][1], y : obj.geometry.coordinates[j][0]}]
                         //arr.push(obj.geometry.coordinates[1],obj.geometry.coordinates[0])
                        // console.log(obj.geometry.coordinates[1])
                        //arr.push(new firebase.firestore.GeoPoint(obj.geometry.coordinates[j[1]],obj.geometry.coordinates[j[0]]))
                   
                   console.log(arra)
                        db.collection("FullRoute").doc("routes").set({
                            route : arra
                        }).then(function(docRef) {
                         console.log("Document written with ID: ", docRef);
                     })
                     .catch(function(error) {
                         console.error("Error adding document: ", error);
                     });

                    })
        }