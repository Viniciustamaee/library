import { Datepicker, Card, Label, Select, Button } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function Edit() {

    return (
        <>
            <Button color="gray" onClick={handleSubmit}>Profile</Button>
            <h1>DataAlugado: {rentedDate}</h1>
            <h1>DataEntrga:{dueDate}</h1>
            <h1>Book:{id}</h1>
            <h1>User:{userData.id}</h1>
        </>
    )
}