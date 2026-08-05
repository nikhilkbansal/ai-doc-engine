
type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  provider: 'github' | 'bitbucket'
};

type Integration = {
    id: string;
    token: string;
    refreshToken: string;
    userId: string; 
    provider: 'github' | 'bitbucket';
    workspaceId: string;
    createdAt: Date;
    active: boolean;
}

type Repository = {
  id: string;
  userId: string;
  integrationId: string;
  createdAt: Date;
  active: boolean;
  fullName: string;
  url: string;
};

type WebHookEvent = {
  id: string;
  type: "pr_merged" | "push" | "pr_created";
  repositoryId: string;
  createdAt: Date;
  eventProcessed: boolean;
  payload: Record<string, unknown>;
};

type Doc = {
  id: string;
  source: 'ai_generated' | 'manual';
  createdAt: Date;
  updatedAt: Date;
  isStale: boolean;
  repositoryId?: string;
  webHookEventId?: string;
  title: string;
  content: string;
};
type Embedding = {
    id: string;
    vector : number[];
    docId: string;
    createdAt: Date;

}