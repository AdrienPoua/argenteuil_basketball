import { useQuery } from 'react-query';
import { SanityDocument } from 'next-sanity';
import { POST_HOME_LEFT_QUERY, POST_HOME_RIGHT_QUERY, POSTS_CLASSIC_QUERY } from '@/integrations/sanity/queries';
import { sanityFetch } from '@/integrations/sanity/fetch';

export const useSanity = () => {
  const { data: leftPostOnHomePage } = useQuery(['home', 'left'], () =>
    sanityFetch<SanityDocument>({ query: POST_HOME_LEFT_QUERY }),
  );
  const { data: rightPostOnHomePage } = useQuery(['home', 'right'], () =>
    sanityFetch<SanityDocument>({ query: POST_HOME_RIGHT_QUERY }),
  );
  const { data: postsOnHomePage } = useQuery(['home', 'posts'], () =>
    sanityFetch<SanityDocument>({ query: POSTS_CLASSIC_QUERY }),
  );

  return {
    leftPostOnHomePage,
    rightPostOnHomePage,
    postsOnHomePage,
  };
};
