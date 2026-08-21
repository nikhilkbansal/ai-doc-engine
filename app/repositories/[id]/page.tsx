import CreateWebhookForm from "./CreateWebhookForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function repositoryPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <div>
      <h1>RepositoryId: {id}</h1>
      <CreateWebhookForm repositoryId={id} />
    </div>
  );
}
