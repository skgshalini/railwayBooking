## Title

Train Seat Booking System

## Description

This project is a Train Seat Booking System that allows users to select and book seats within a train(max 7 at a time). The system provides a user-friendly interface where users can input the number of seats they want to book. The available seats are displayed initially in green color, and as the user gives valid input those seats turn blue. Once the user clicks the book button, the selected seats are stored in a Firestore database, marked as booked (orange color), and become unavailable for further booking. When all seats are booked, an "unbook" button appears, allowing the user to unbook all seats, making them available again and unbook button disappers.

## Features

- Input box that only accepts numeric values between 1 and 7.
- Display of available seats in green color.
- When user enter a number if that much seat is available in consecutive manner in a row those seats would be selected
- If not Selection of seats are done from the largest continuous available row to the second largest, and so on, until the requested number of seats is fulfilled.
- Selected seats displayed in blue color.
- Book button to confirm the seat selection and store the information in the Firestore database.
- Booked seats displayed in orange color, indicating their unavailability.
- Unbook button to reset all seats, making them available again.

## Technologies Used

- Front-end: HTML, CSS, ReactJS
- Back-end: Firestore (Firebase Firestore)


 Visit the Train Seat Booking System at [https://trainseatbooking-69d90.web.app/](https://trainseatbooking-69d90.web.app/).
