import { gql } from "@apollo/client";

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

export default GET_CMS_PAGE;
