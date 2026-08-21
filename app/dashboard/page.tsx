import CreateDocumentForm from "./CreateDocumentForm";
import { getActiveDocs } from "@/lib/queries";

export default async function DashBoardPage() {
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
