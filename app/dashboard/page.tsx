import createDocument from '../../app/actions'
export default async function fetchUsers  ()  {
    await new Promise (resolve => setTimeout(resolve, 2000))
    const users = await fetch ("https://jsonplaceholder.typicode.com/users");
    const data = await users.json();

    return (
        <div>
        <form action={createDocument}>
            <input name="title" placeholder='enter title'></input>
            <input name="content" placeholder='enter content'></input>
            <button type='submit'> Submit </button>
        </form>
        <ul>
        {data.map((user : {id: number, name: string}) => <li key ={user.id}>{user.name}</li>)}
        </ul>
        </div>
    )
}