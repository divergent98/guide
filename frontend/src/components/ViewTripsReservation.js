import React, { useState, useEffect } from "react";
import axios from "axios";
const ViewTripsReservation = ({ userInterests }) => {
  const [trips, setTrips] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchTrips();
    fetchUsers();
  }, []);

  async function fetchTrips() {
    try {
        const response = await axios.get(`/trips`);
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
  }


  // Calculate the number of matching interests between user and a trip
  const calculateMatchingInterests = (trip) => {
    return trip.tags.filter((interest) => userInterests.includes(interest))
      .length;
  };

  // Sort trips based on the number of matching interests

  const userIdCounts = {};

  // Iterate through the trips array
  trips.forEach((trip) => {
    const tripId = trip.id;
    const userIDs = trip.userIds;

    // Iterate through the userIDs array and count occurrences
    userIDs.forEach((userId) => {
      if (!userIdCounts[userId]) {
        userIdCounts[userId] = [];
      }

      userIdCounts[userId].push({ userId, tripId });
    });
  });

  // Create an array with the counts, userIDs, and tripIds
  const resultArray = Object.entries(userIdCounts).map(([userId, data]) => ({
    userId: userId,
    count: data.length,
    tripId: data[0].tripId,
  }));

  console.log(resultArray);

  async function fetchUsers() {
    axios
    .get("/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
               <table className="custom-table">
                <thead>
                  <tr>
                    <th scope="col" className="franklin custom-table-header">UserId</th>
                    <th scope="col" className="franklin custom-table-header">Username</th>
                    <th scope="col" className="franklin custom-table-header">Phone</th> 
                    <th scope="col" className="franklin custom-table-header">Email</th>
                    <th scope="col" className="franklin custom-table-header">Trip</th>
                    <th scope="col" className="franklin custom-table-header">Reservations</th>
                    <th scope="col" className="franklin custom-table-header">Capacity</th>
                  </tr>
                </thead>
                <tbody>
        {resultArray.map(({ userId, count, tripId }) => {
          let userName = "";
          let userPhone = "";
          let userEmail = "";
          let tripDescription = "";
          let capacity = "";
          users.map((user) => {
            if (user.id === userId) {
              userName = user.userName;
              userPhone = user.userPhone;
              userEmail = user.userEmail;
            }
          });
          console.log("these are trips------------", trips);
          trips.map((trip) => {
            if (trip.id === tripId) {
              console.log("this is trip id=", trip.id);

              tripDescription = trip.description;
              capacity = trip.capacity
            }
          });
          console.log(userId); // Add this line to log the user ID
          return (
            <>
  
                  <tr key={userId}>
                   
                    <td className="franklin custom-table-row">{userId}</td>
                    <td className="franklin custom-table-row">{userName}</td>
                    <td className="franklin custom-table-row">{userPhone}</td>
                    <td className="franklin custom-table-row">{userEmail}</td>
                    <td className="franklin custom-table-row">{tripDescription}</td>
                    <td className="franklin custom-table-row">{count}</td>
                    <td className="franklin custom-table-row">{capacity}</td>
                  </tr>
            

            </>
          );
        })}
           </tbody>
              </table>

    </div>
  );
};

export default ViewTripsReservation;
