import React, { useState, useEffect } from 'react';
import TrainSeatMap from './TrainSeatMap';
import "./App.css";
import 'firebase/firestore';
import db from './firebase';
import { onSnapshot, collection, query, addDoc, getDocs, deleteDoc } from "firebase/firestore";

const App = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [reservedSeats, setReservedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  let reserved = [];

  async function datFetch() {
    const reservedd = [];
    const q = query(collection(db, "reservedSeats"));
    const reservedSeatData = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.map((d) => {
        reservedd.push(d.data().reservedSeat);
      });
      setReservedSeats([...reservedd]);
    });
  }

  useEffect(() => {
    datFetch();
  }, [bookedSeats]);


  const rows = [
    [
      { id: 1, number: "A1" },
      { id: 2, number: "A2" },
      { id: 3, number: "A3" },
      { id: 4, number: "A4" },
      { id: 5, number: "A5" },
      { id: 6, number: "A6" },
      { id: 7, number: "A7" },
    ],
    [
      { id: 8, number: "B1" },
      { id: 9, number: "B2" },
      { id: 10, number: "B3" },
      { id: 11, number: "B4" },
      { id: 12, number: "B5" },
      { id: 13, number: "B6" },
      { id: 14, number: "B7" },
    ],
    [
      { id: 15, number: "C1" },
      { id: 16, number: "C2" },
      { id: 17, number: "C3" },
      { id: 18, number: "C4" },
      { id: 19, number: "C5" },
      { id: 20, number: "C6" },
      { id: 21, number: "C7" },
    ],
    [
      { id: 22, number: "D1" },
      { id: 23, number: "D2" },
      { id: 24, number: "D3" },
      { id: 25, number: "D4" },
      { id: 26, number: "D5" },
      { id: 27, number: "D6" },
      { id: 28, number: "D7" },
    ],
    [
      { id: 29, number: "E1" },
      { id: 30, number: "E2" },
      { id: 31, number: "E3" },
      { id: 32, number: "E4" },
      { id: 33, number: "E5" },
      { id: 34, number: "E6" },
      { id: 35, number: "E7" },
    ],
    [
      { id: 36, number: "F1" },
      { id: 37, number: "F2" },
      { id: 38, number: "F3" },
      { id: 39, number: "F4" },
      { id: 40, number: "F5" },
      { id: 41, number: "F6" },
      { id: 42, number: "F7" },
    ],
    [
      { id: 43, number: "G1" },
      { id: 44, number: "G2" },
      { id: 45, number: "G3" },
      { id: 46, number: "G4" },
      { id: 47, number: "G5" },
      { id: 48, number: "G6" },
      { id: 49, number: "G7" },
    ],
    [
      { id: 50, number: "H1" },
      { id: 51, number: "H2" },
      { id: 52, number: "H3" },
      { id: 53, number: "H4" },
      { id: 54, number: "H5" },
      { id: 55, number: "H6" },
      { id: 56, number: "H7" },
    ],
    [
      { id: 57, number: "I1" },
      { id: 58, number: "I2" },
      { id: 59, number: "I3" },
      { id: 60, number: "I4" },
      { id: 61, number: "I5" },
      { id: 62, number: "I6" },
      { id: 63, number: "I7" },
    ],
    [
      { id: 64, number: "J1" },
      { id: 65, number: "J2" },
      { id: 66, number: "J3" },
      { id: 67, number: "J4" },
      { id: 68, number: "J5" },
      { id: 69, number: "J6" },
      { id: 70, number: "J7" },
    ],
    [
      { id: 71, number: "K1" },
      { id: 72, number: "K2" },
      { id: 73, number: "K3" },
      { id: 74, number: "K4" },
      { id: 75, number: "K5" },
      { id: 76, number: "K6" },
      { id: 77, number: "K7" },
    ],
    [
      { id: 78, number: "L1" },
      { id: 79, number: "L2" },
      { id: 80, number: "L3" },
    ],
  ];

  const [seats, setSeats] = useState(rows);


  // Function for booking selected seats
  async function booking() {
    for (let i = 0; i < selectedSeats.length; i++) {
      const collectionRef = collection(db, "reservedSeats");
      addDoc(collectionRef, {
        reservedSeat: selectedSeats[i],
      });
    }
  }

  // Function to handle seat reservation
  const handleSeatReservation = async () => {
    await booking();
    setBookedSeats([...reservedSeats, ...selectedSeats]);
    setNumberOfSeats('');
  };

  async function deleteAllDocuments() {
    try {
      const collectionRef = collection(db, 'reservedSeats');
      // Get all documents in the collection
      const snapshot = await getDocs(collectionRef);

      // Delete each document
      snapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      console.log('All documents deleted successfully.');
    } catch (error) {
      console.error('Error deleting documents: ', error);
    }
  }


  // Function to handle unbooking all seats
  async function unbookAllSeats() {

  }

  // Function to check available consecutive seats
  function makeSelection(numSeats) {

    let selectedSeatIds = [];
    reserved = [...reservedSeats];
    const reserverdStatus = Array(81).fill(0);

    // Mark reserved seats in the reserverdStatus array
    for (let i = 0; i < reserved.length; i++) {
      reserverdStatus[reserved[i]] = 1;
    }

    if (numSeats > 80 - reserved.length) {
      alert("Seats are not available!");

    } else {
      const map = new Map();
      let count = 0;
      let str = "";
      let temp = "";

      // Find continuous available seats and store them in a map based on length
      for (let i = 1; i <= 80; i++) {
        if (reserverdStatus[i] === 1) {
          if (map.has(count)) {
            temp = map.get(count);
            map.set(count, temp + "#" + str);
          } else {
            map.set(count, str);
          }
          str = "";
          count = 0;
        } else {
          str = str + "-" + i;
          count += 1;
        }
      }

      // Check if the last seat is available and add it to the map
      if (reserverdStatus[80] !== 1) {
        if (map.has(count)) {
          temp = map.get(count);
          map.set(count, temp + "#" + str);
        } else {
          map.set(count, str);
        }
        str = "";
        count = 0;
      }

      // Sort the map in descending order of seat length
      const sortedMap = new Map([...map.entries()].sort((a, b) => b[0] - a[0]));

      // Find available seats with required length and in the same row
      for (const [key, value] of sortedMap) {
        const sameLengthSeats = sortedMap.get(key);
        const continuousSeats = sameLengthSeats.split("#");

        for (let i = 0; i < continuousSeats.length; i++) {
          let path = continuousSeats[i].split("-");
          if (path.length - 1 >= numSeats) {
            for (let j = 1; j < path.length; j++) {
              let stIndex = path[j];
              let enIndex = Number(stIndex) + numSeats - 1;
              //seats in a single available row found
              if (Math.ceil(stIndex / 7) === Math.ceil(enIndex / 7)) {
                // Add selected seat IDs to the array
                for (let k = stIndex; k <= enIndex; k++) {
                  selectedSeatIds.push(k);
                }
              }
              // if selectedSeatIds has data seats in a single available row is already found no need to loop
              if (selectedSeatIds.length > 0) {
                break;
              }
            }
            if (selectedSeatIds.length > 0) {
              break;
            }
          }
        }

        if (selectedSeatIds.length > 0) {
          break;
        }
      }

      // If no continuous seats are available, select seats from separate sections
      // This approach selects seats in a sequential manner from the largest continuous available row to the second largest, and so on, until the requested number of seats is fulfilled.
      if (selectedSeatIds.length == 0) {
        for (const [key, value] of sortedMap) {
          const sameLengthSeats = sortedMap.get(key);
          const continuousSeats = sameLengthSeats.split("#");

          for (let i = 0; i < continuousSeats.length; i++) {
            let path = continuousSeats[i].split("-");
            for (let u = 1; u < path.length; u++) {
              if (numSeats == selectedSeatIds.length) {
                break;
              }
              // Add selected seat IDs to the array
              selectedSeatIds.push(path[u]);
            }
            if (numSeats == selectedSeatIds.length) {
              break;
            }
          }
          if (numSeats == selectedSeatIds.length) {
            break;
          }
        }
      }
    }

    setSelectedSeats([...selectedSeatIds]);



  }

  // Function to handle consecutive  or near by seat selection   
  const handleConsecutiveSeatSelection = async (event) => {
    const numSeats = parseInt(event.target.value);

    if (isNaN(numSeats)) {
      setNumberOfSeats('');
      setSelectedSeats([]);
    } else if (!(numSeats <= 7 && numSeats >= 1)) {
      alert('Only digits 1 to 7 are allowed.');
    } else {
      setNumberOfSeats(numSeats);
      makeSelection(numSeats);
    }
  };

  return (
    <div className="my-2 text-center container">
      <h1>Train Seat Booking</h1>
      {(reservedSeats.length == 80 && <div className="actions my-2"> <button
        className="book-button"
        onClick={async () => {
          await deleteAllDocuments()
          setBookedSeats([])
          setSelectedSeats([])
        }}

      > UnBook </button></div>)}
      <div className="d-flex justify-content-center">
        <label className=" mx-2 " for="numberOfSeats"><b>Number of Seats: </b></label>
        <input
          className="my-1"
          id="numberOfSeats"
          value={numberOfSeats}
          onChange={handleConsecutiveSeatSelection}
        />
      </div>

      <div className="actions my-2">
        <button
          className="book-button"
          onClick={handleSeatReservation}
          disabled={selectedSeats.length === 0}
        >
          Book
        </button>
      </div>

      <TrainSeatMap
        seats={seats}
        selectedSeats={selectedSeats}
        reservedSeats={reservedSeats}
      />
    </div>
  );
};

export default App;
