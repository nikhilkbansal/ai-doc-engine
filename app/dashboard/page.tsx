import CreateDocumentForm from "./CreateDocumentForm";
import { getActiveDocs } from "@/lib/queries";

export default async function fetchUsers() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //   const users = await fetch("https://jsonplaceholder.typicode.com/users");
  //   const data = await users.json();
const allDocs = await getActiveDocs();
  return (
    <div>
      <CreateDocumentForm />
      <ul>
        {allDocs.map((doc) => (
          <li key={doc.id}>
            {doc.content}
            {doc.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
