
export default async function fetchUsers  ()  {
    await new Promise (resolve => setTimeout(resolve, 2000))
    const users = await fetch ("https://jsonplaceholder.typicode.com/users");
    const data = await users.json();

    return (
        <ul>
        {data.map((user : {id: number, name: string}) => <li key ={user.id}>{user.name}</li>)}
        </ul>
    )
}