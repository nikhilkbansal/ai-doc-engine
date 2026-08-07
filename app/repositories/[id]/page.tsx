
type PageProps = {
    params: Promise<{id : string}>
}

export default async function pageParams ({ params } : PageProps ){
    const {id} = await params;
    return (<h1>params for this repo url {id}</h1>)
}