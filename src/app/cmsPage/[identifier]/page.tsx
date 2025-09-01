import { gql } from "@apollo/client";
import { getApolloClient } from "@/lib/apolloClient";
import { decode } from 'html-entities';

const GET_CMS_PAGE = gql`
  query GetCmsPage($identifier: String!) {
    cmsPage(identifier: $identifier) {
      identifier
      title
      content
      content_heading
    }
  }
`;

interface CmsPageData {
  cmsPage: {
    identifier: string;
    title: string;
    content: string;
  } | null;
}

export default async function CmsPage({ params }: { params: { identifier: string }; }) {
const { identifier } = await params;

  const client = getApolloClient();

  const { data } = await client.query<CmsPageData>({
    query: GET_CMS_PAGE,
    variables: { identifier },
  });

  const page = data.cmsPage;

  if (!page) return <p>Page not found.</p>;
  const decodedContent = decode(page.content);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{page.title}</h1>
      {page.content && (
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: decodedContent }} />
      )}
    </div>
  );
}
