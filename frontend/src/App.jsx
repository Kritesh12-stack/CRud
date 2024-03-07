import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function App() {
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [data,setData] = useState([])
    
    useEffect(()=>{
        async function fetchData(){
            try{const response = await axios.get("http://localhost:3000/getClients")
            if(response){
                setData(response.data)
            }}
            catch(err){
                setError(err.message)
            }
        }
        fetchData()
    })

    const submit = async (data) => {
        setError("")
        try {
            const response = await axios.post("http://localhost:3000/addClient", data)
        }
        catch (err) {
            setError("Something Went wrong")
        }
    }

    const edit = async (data) => {
        
        setError("")
        try {
            const response = await axios.post("http://localhost:3000/updateClient", data)
        } catch (error) {
            setError(error)
        }
    }

    const deleteClient = async (data) => {
        setError("")
        try {
            const response = await axios.post("http://localhost:3000/delete", {email : data})
        } catch (error) {
            setError(error)
        }
    }



    // dummy data
    // const data = [
    //     {
    //         name: "Carl",
    //         lastName: "Smith",
    //         email: "example@gmail.com",
    //         mobile: 1234567890,
    //         project: "Anything"
    //     }
    // ]

    

    return (
        <section>
            <div className="w-full flex items-center p-4 gap-5 bg-slate-800 text-white">
                <div className="text-3xl">Clients Panel</div>
                <div className="text-gray-200" >Clients</div>
            </div>
        <section className="w-full flex p-4">
            
            {error && <div>{error}</div>}
            <div className="w-[80%]">
                <h1 className="text-4xl">Clients</h1>
                <div className="grid grid-cols-1">
                    <div className="grid grid-cols-6 p-4 bg-slate-300">
                        <div>Name</div>
                        <div>Last Name</div>
                        <div>Email</div>
                        <div>Mobile No.</div>
                        <div>Projects</div>
                        <div>Operations</div>
                        </div>

                    {data.map((i) => (
                        <div className="grid grid-cols-6 gap-4 p-4">
                            <div>{i.name}</div>
                            <div>{i.lastName}</div>
                            <div className="p-2">{i.email}</div>
                            <div>{i.mobile}</div>
                            <div>{i.project}</div>
                            <div><button onClick={()=>edit()} className="text-blue-300">Edit</button> | <button onClick={()=>deleteClient(i.email)} className="text-blue-300">Delete</button></div>
                        </div>
                    ))}
                    </div>
            </div>
            <form className="flex flex-col p-2 gap-2" onSubmit={handleSubmit(submit)}>
                <h1 className="text-2xl">Create Clients</h1>
                <label>Name</label>
                <input
                    className="border border-gray-200"
                    type="text"
                    {...register("name", { required: true })}
                />
                <label>Last Name</label>
                <input
                    className="border border-gray-200"
                    type="text"
                    {...register("lastName", { required: true })}
                />
                <label>Email</label>
                <input
                    className="border border-gray-200"
                    type="text"
                    {...register("email", { required: true })}
                />
                <label>Mobile No.</label>
                <input
                    className="border border-gray-200"
                    type="number"
                    {...register("mobile", { required: true, maxLength: 12, minLength: 9 })}
                />
                <label>Project</label>
                <input
                    className="border border-gray-200"
                    type="text"
                    {...register("project", { required: true })}
                />
                <button className="text-white bg-blue-400 rounded-md " type="submit">Create Client</button>
            </form>

        </section>
        </section>
    )
}