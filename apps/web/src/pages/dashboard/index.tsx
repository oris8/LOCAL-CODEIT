// import { useState } from "react";
// import * as api from "@repo/lib/api/reservation";
// import { Schema } from "@repo/backend/amplify/data/resource";

// type User = Schema["User"]["type"];
// type Resource = Schema["Resource"]["type"];
// type Reservation = Schema["Reservation"]["type"];

// const config = {
//   limit: 10,
//   nextToken: "sdf",
//   filter: {
//     status: { eq: "CONFIRMED" },
//     date: { ge: "2022-01-01" },
//     startTime: { lt: "18:00" },
//     endTime: { gt: "10:00" },
//   },
// };

// export default function Dashboard() {
//   const [fetchedItem, setFetchedItem] = useState<unknown>(null);
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     role: "MEMBER",
//     team: "",
//   });
//   const [resourceData, setResourceData] = useState({
//     name: "",
//     resourceType: "",
//     resourceSubtype: "",
//     description: "",
//   });
//   const [reservationData, setReservationData] = useState({
//     resourceId: "",
//     date: "",
//     startTime: "",
//     endTime: "",
//     status: "CONFIRMED",
//     participants: "",
//   });
//   const [searchData, setSearchData] = useState({
//     userId: "",
//     resourceId: "",
//     reservationId: "",
//     reservationFilter: "",
//   });

//   const handleInputChange = (e, setter) => {
//     const { name, value } = e.target;
//     setter((prev) => ({ ...prev, [name]: value }));
//   };

//   const createUser = async () => {
//     const { data } = await api.createUser(userData as User);
//     console.log(data);
//   };

//   const createResource = async () => {
//     console.log(resourceData);
//     const { data } = await api.createResource(resourceData as Resource);
//     console.log(data);
//   };

//   const createReservation = async () => {
//     console.log(reservationData);
//     const { data } = await api.createReservation({
//       ...reservationData,
//       participants: [reservationData.participants],
//     } as Reservation);
//     console.log(data);
//   };

//   const searchUserById = async () => {
//     const { data } = await api.getUser(searchData.userId);
//     setFetchedItem(data);
//   };

//   const searchResourceById = async () => {
//     const { data } = await api.getResource(searchData.resourceId);
//     setFetchedItem(data);
//   };

//   const searchReservation = async () => {
//     const { data } = await api.searchReservations(searchData.reservationFilter);
//     setFetchedItem(data);
//     alert(`Fetched Reservations on: ${searchData.reservationFilter}`);
//   };

//   return (
//     <div className="ml-100 h-full w-full">
//       <div>
//         <h1>Create Data Examples</h1>
//         <h2>Create User</h2>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={userData.username}
//           onChange={(e) => handleInputChange(e, setUserData)}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={userData.email}
//           onChange={(e) => handleInputChange(e, setUserData)}
//         />
//         <select
//           name="role"
//           value={userData.role}
//           onChange={(e) => handleInputChange(e, setUserData)}
//         >
//           <option value="MEMBER">MEMBER</option>
//           <option value="ADMIN">ADMIN</option>
//         </select>
//         <input
//           type="text"
//           name="team"
//           placeholder="Team"
//           value={userData.team}
//           onChange={(e) => handleInputChange(e, setUserData)}
//         />
//         <button onClick={createUser}>Create User</button>

//         <h2>Create Resource</h2>
//         <input
//           type="text"
//           name="name"
//           placeholder="Resource Name"
//           value={resourceData.name}
//           onChange={(e) => handleInputChange(e, setResourceData)}
//         />
//         <input
//           type="text"
//           name="resourceType"
//           placeholder="Resource Type"
//           value={resourceData.resourceType}
//           onChange={(e) => handleInputChange(e, setResourceData)}
//         />
//         <input
//           type="text"
//           name="resourceSubtype"
//           placeholder="Resource Subtype"
//           value={resourceData.resourceSubtype}
//           onChange={(e) => handleInputChange(e, setResourceData)}
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Description"
//           value={resourceData.description}
//           onChange={(e) => handleInputChange(e, setResourceData)}
//         />
//         <button onClick={createResource}>Create Resource</button>

//         <h2>Create Reservation</h2>
//         <input
//           type="text"
//           name="resourceId"
//           placeholder="Resource ID"
//           value={reservationData.resourceId}
//           onChange={(e) => handleInputChange(e, setReservationData)}
//         />
//         <input
//           type="string"
//           name="date"
//           placeholder="Date"
//           value={reservationData.date}
//           onChange={(e) => handleInputChange(e, setReservationData)}
//         />
//         <input
//           type="string"
//           name="startTime"
//           placeholder="Start Time"
//           value={reservationData.startTime}
//           onChange={(e) => handleInputChange(e, setReservationData)}
//         />
//         <input
//           type="string"
//           name="endTime"
//           placeholder="End Time"
//           value={reservationData.endTime}
//           onChange={(e) => handleInputChange(e, setReservationData)}
//         />
//         <select
//           name="status"
//           value={reservationData.status}
//           onChange={(e) => handleInputChange(e, setReservationData)}
//         >
//           <option value="CONFIRMED">CONFIRMED</option>
//           <option value="CANCELED">CANCELED</option>
//         </select>
//         <input
//           type="text"
//           name="participants"
//           placeholder="Participants (comma separated)"
//           value={reservationData.participants}
//           onChange={(e) => handleInputChange(e, setReservationData)}
//         />
//         <button onClick={createReservation}>Create Reservation</button>
//       </div>

//       <h2>Fetch Data Examples</h2>
//       <h3>Search User by ID</h3>
//       <input
//         type="text"
//         name="userId"
//         placeholder="User ID"
//         value={searchData.userId}
//         onChange={(e) => handleInputChange(e, setSearchData)}
//       />
//       <button onClick={searchUserById}>Search User</button>

//       <h3>Search Resource by ID</h3>
//       <input
//         type="text"
//         name="resourceId"
//         placeholder="Resource ID"
//         value={searchData.resourceId}
//         onChange={(e) => handleInputChange(e, setSearchData)}
//       />
//       <button onClick={searchResourceById}>Search Resource</button>

//       <h3>Search Reservation by ID</h3>
//       <input
//         type="text"
//         name="reservationId"
//         placeholder="Reservation ID"
//         value={searchData.reservationId}
//         onChange={(e) => handleInputChange(e, setSearchData)}
//       />
//       <button onClick={searchResourceById}>Search Resource</button>

//       <h3>Search Reservation</h3>

//       <h5>config를 JSON 형식으로 작성해서 넣어주세요:</h5>
//       <pre
//         style={{
//           // backgroundColor: "#f5f5f5",
//           // padding: "15px",
//           // borderRadius: "5px",
//           // fontFamily: "monospace",
//           // whiteSpace: "pre-wrap",
//           // wordWrap: "break-word",
//           textAlign: "left",
//         }}
//       >
//         {JSON.stringify(config, null, 2)}
//       </pre>
//       <input
//         type="string"
//         name="reservationFilter"
//         placeholder="reservationFilter"
//         value={searchData.reservationFilter}
//         onChange={(e) => handleInputChange(e, setSearchData)}
//       />
//       <button onClick={searchReservation}>Search Reservation</button>

//       {/* <h3>Search Reservation by Participant</h3>
//       <input
//         type="text"
//         name="participantName"
//         placeholder="Participant Name"
//         value={searchData.participantName}
//         onChange={(e) => handleInputChange(e, setSearchData)}
//       />
//       <button onClick={searchReservationByParticipant}>
//         Search Reservation by Participant
//       </button> */}

//       <div>
//         <h2>Fetched Item</h2>
//         {fetchedItem && <pre>{JSON.stringify(fetchedItem, null, 2)}</pre>}
//       </div>

//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   );
// }

import { useState, ChangeEvent } from "react";
import * as api from "@repo/lib/api/reservation";
import { Schema } from "@repo/backend/amplify/data/resource";

type User = Schema["User"]["type"];
type Resource = Schema["Resource"]["type"];
type Reservation = Schema["Reservation"]["type"];

type UserData = {
  username: string;
  email: string;
  role: "MEMBER" | "ADMIN";
  team: string;
};

type ResourceData = {
  name: string;
  resourceType: string;
  resourceSubtype: string;
  description: string;
};

type ReservationData = {
  resourceId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "CONFIRMED" | "CANCELED";
  participants: string;
};

type SearchData = {
  userId: string;
  resourceId: string;
  reservationId: string;
  reservationFilter: string;
};

const config = {
  limit: 10,
  nextToken: "sdf",
  filter: {
    status: { eq: "CONFIRMED" },
    date: { ge: "2022-01-01" },
    startTime: { lt: "18:00" },
    endTime: { gt: "10:00" },
  },
};

export default function Dashboard() {
  const [fetchedItem, setFetchedItem] = useState<unknown>(null);
  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    role: "MEMBER",
    team: "",
  });
  const [resourceData, setResourceData] = useState<ResourceData>({
    name: "",
    resourceType: "",
    resourceSubtype: "",
    description: "",
  });
  const [reservationData, setReservationData] = useState<ReservationData>({
    resourceId: "",
    date: "",
    startTime: "",
    endTime: "",
    status: "CONFIRMED",
    participants: "",
  });
  const [searchData, setSearchData] = useState<SearchData>({
    userId: "",
    resourceId: "",
    reservationId: "",
    reservationFilter: "",
  });

  console.log(fetchedItem);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setter: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    const { name, value } = e.target;
    setter((prev: any) => ({ ...prev, [name]: value }));
  };

  const createUser = async () => {
    const { data } = await api.createUser(userData as User);
    console.log(data);
  };

  const createResource = async () => {
    console.log(resourceData);
    const { data } = await api.createResource(resourceData as Resource);
    console.log(data);
  };

  const createReservation = async () => {
    console.log(reservationData);
    const { data } = await api.createReservation({
      ...reservationData,
      participants: [reservationData.participants],
    } as Reservation);
    console.log(data);
  };

  const searchUserById = async () => {
    const { data } = await api.getUser(searchData.userId);
    setFetchedItem(data);
  };

  const searchResourceById = async () => {
    const { data } = await api.getResource(searchData.resourceId);
    setFetchedItem(data);
  };

  const searchReservation = async () => {
    const { data } = await api.searchReservations(searchData.reservationFilter);
    setFetchedItem(data);
    alert(`Fetched Reservations on: ${searchData.reservationFilter}`);
  };

  return (
    <div className="ml-100 h-full w-full">
      <div>
        <h1>Create Data Examples</h1>
        <h2>Create User</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={(e) => handleInputChange(e, setUserData)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => handleInputChange(e, setUserData)}
        />
        <select
          name="role"
          value={userData.role}
          onChange={(e) => handleInputChange(e, setUserData)}
        >
          <option value="MEMBER">MEMBER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <input
          type="text"
          name="team"
          placeholder="Team"
          value={userData.team}
          onChange={(e) => handleInputChange(e, setUserData)}
        />
        <button onClick={createUser}>Create User</button>

        <h2>Create Resource</h2>
        <input
          type="text"
          name="name"
          placeholder="Resource Name"
          value={resourceData.name}
          onChange={(e) => handleInputChange(e, setResourceData)}
        />
        <input
          type="text"
          name="resourceType"
          placeholder="Resource Type"
          value={resourceData.resourceType}
          onChange={(e) => handleInputChange(e, setResourceData)}
        />
        <input
          type="text"
          name="resourceSubtype"
          placeholder="Resource Subtype"
          value={resourceData.resourceSubtype}
          onChange={(e) => handleInputChange(e, setResourceData)}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={resourceData.description}
          onChange={(e) => handleInputChange(e, setResourceData)}
        />
        <button onClick={createResource}>Create Resource</button>

        <h2>Create Reservation</h2>
        <input
          type="text"
          name="resourceId"
          placeholder="Resource ID"
          value={reservationData.resourceId}
          onChange={(e) => handleInputChange(e, setReservationData)}
        />
        <input
          type="string"
          name="date"
          placeholder="Date"
          value={reservationData.date}
          onChange={(e) => handleInputChange(e, setReservationData)}
        />
        <input
          type="string"
          name="startTime"
          placeholder="Start Time"
          value={reservationData.startTime}
          onChange={(e) => handleInputChange(e, setReservationData)}
        />
        <input
          type="string"
          name="endTime"
          placeholder="End Time"
          value={reservationData.endTime}
          onChange={(e) => handleInputChange(e, setReservationData)}
        />
        <select
          name="status"
          value={reservationData.status}
          onChange={(e) => handleInputChange(e, setReservationData)}
        >
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="CANCELED">CANCELED</option>
        </select>
        <input
          type="text"
          name="participants"
          placeholder="Participants (comma separated)"
          value={reservationData.participants}
          onChange={(e) => handleInputChange(e, setReservationData)}
        />
        <button onClick={createReservation}>Create Reservation</button>
      </div>

      <h2>Fetch Data Examples</h2>
      <h3>Search User by ID</h3>
      <input
        type="text"
        name="userId"
        placeholder="User ID"
        value={searchData.userId}
        onChange={(e) => handleInputChange(e, setSearchData)}
      />
      <button onClick={searchUserById}>Search User</button>

      <h3>Search Resource by ID</h3>
      <input
        type="text"
        name="resourceId"
        placeholder="Resource ID"
        value={searchData.resourceId}
        onChange={(e) => handleInputChange(e, setSearchData)}
      />
      <button onClick={searchResourceById}>Search Resource</button>

      <h3>Search Reservation by ID</h3>
      <input
        type="text"
        name="reservationId"
        placeholder="Reservation ID"
        value={searchData.reservationId}
        onChange={(e) => handleInputChange(e, setSearchData)}
      />
      <button onClick={searchReservation}>Search Reservation</button>

      <h3>Search Reservation</h3>

      <h5>config값을 JSON 형식으로 작성해서 넣어주세요:</h5>
      <pre
        style={{
          textAlign: "left",
        }}
      >
        {JSON.stringify(config, null, 2)}
      </pre>
      <input
        type="string"
        name="reservationFilter"
        placeholder="reservationFilter"
        value={searchData.reservationFilter}
        onChange={(e) => handleInputChange(e, setSearchData)}
      />
      <button onClick={searchReservation}>Search Reservation</button>

      <div>
        <h2>Fetched Item</h2>
        {/* {fetchedItem && <pre>{JSON.stringify(fetchedItem, null, 2)}</pre>} */}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}
