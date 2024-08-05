import './App.css';
import { useState } from 'react';

function App() {

    const [person, setPerson] = useState({ fname: "", email: "", address: "", phoneno: "", birthdate: "", city: "", gender: "" });
    console.log(person);

    const [myArray, setArray] = useState(JSON.parse(localStorage.getItem("data")) || []);
    console.log(myArray);

    const [isEdit, setIsEdit] = useState(-1)

    const [search, setsearch] = useState('');

    const handleOnChange = (e) => {
        console.log(e.target.name);
        setPerson({ ...person, [e.target.name]: e.target.value })
    }
    console.log(person);

    const handleSubmit = () => {
        if (isEdit === -1) {
            setArray([...myArray, person]);
            localStorage.setItem("data", JSON.stringify([...myArray, person]))
        }
        else {
            const updated = myArray?.map((item, index) => {
                if (index === isEdit) {
                    return person
                }
                else return item
            })
            setArray(updated);
        }
    }
    const handleEdit = (idx, record) => {
        setPerson(record);
        setIsEdit(idx)
    }

    function sortTable1() {
        const abc = myArray.sort((a, b) => { return (a.fname > b.fname ? 1 : -1) });
        setArray([...abc])
    }

    const deleteByIndex = (index) => {
        setArray(myArray.filter((Item, i) => index !== i)
        )
    }

    function handlesearch() {
        if (search) {
            const filtereddata = myArray.filter((item) => { return item.fname.toLocaleLowerCase() === search.toLocaleLowerCase() });
            setArray(filtereddata)
        }
    }

    return (
        <>
            <div className="App">
                <h1>Application Form</h1>
                <div>
                    <label htmlFor="fname">Full name:</label>
                    <input type="text" id="fname" name="fname" value={person.fname} onChange={(e) => handleOnChange(e)} />
                </div>
                <div>
                    <label>Email address:</label>
                    <input type="email" id="email" name="email" value={person.email} onChange={(f) => handleOnChange(f)} />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input type="address" id="address" name="address" value={person.address} onChange={(g) => handleOnChange(g)} />
                </div>
                <div>
                    <label htmlFor="phone">Phone no.:</label>
                    <input type="tel" id="phone" name="phoneno" value={person.phoneno} onChange={(h) => handleOnChange(h)} />
                </div>
                <div>
                    <label htmlFor="birthdate">Birthdate:</label>
                    <input type="date" id="bdate" name="birthdate" value={person.birthdate} onChange={(i) => handleOnChange(i)} />
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" id="age" name="age" value={person.age} onChange={(g) => handleOnChange(g)} />
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                    <select id="city" name="city" value={person.city} onChange={(h) => handleOnChange(h)}>
                        <option value="Rajkot">Rajkot</option>
                        <option value="Morbi" >Morbi</option>
                        <option value="Surat">Surat</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="gender">Gender:</label>
                    <input type="radio" id="male" name="gender" value="male" onChange={(i) => handleOnChange(i)} />Male
                    <input type="radio" id="female" name="gender" value="female" onChange={(i) => handleOnChange(i)} />Female
                </div>
                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>

            </div>
            <div>
                <input type="text" onChange={(gi) => setsearch(gi.target.value)} value={search} id="myInput" placeholder="Search for names.." />
                <button onClick={handlesearch}>Search</button>
                <button onClick={sortTable1}>Sort</button>
            </div>
            <table className='table table-striped ' >
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Email Address</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>phone No.</th>
                        <th>Birthdate</th>
                        <th>City</th>
                        <th>Gender</th>
                        <th>Button</th>
                    </tr>
                </thead>
                <tbody>
                    {myArray?.map((item, index) => {
                        return (
                            <tr>
                                <td>
                                    {item.fname}
                                </td>
                                <td>
                                    {item.email}
                                </td>
                                <td>
                                    {item.age}
                                </td>
                                <td>
                                    {item.address}
                                </td>
                                <td>
                                    {item.phoneno}
                                </td>
                                <td>
                                    {item.birthdate}
                                </td>
                                <td>
                                    {item.city}
                                </td>
                                <td>
                                    {item.gender}
                                </td>
                                <td>
                                    <button onClick={() => handleEdit(index, item)}>Edit</button>
                                    <button onClick={(e) => deleteByIndex(index)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}

export default App;
