import { Container, Grid } from "@mui/material";
import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/fetch";
import { POST_HOME_LEFT_QUERY, POST_HOME_RIGHT_QUERY } from "@/lib/sanity/queries";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";

const NewsCard = dynamic(() => import("@/components/Cards").then((mod) => mod.PostCard), { ssr: false });

const NewsContainer = () => {
  const { data: leftPostOnHomePage } = useQuery(['home', 'left'], () =>
    sanityFetch<SanityDocument>({ query: POST_HOME_LEFT_QUERY })
  );
  const { data: rightPostOnHomePage } = useQuery(['home', 'right'], () =>
    sanityFetch<SanityDocument>({ query: POST_HOME_RIGHT_QUERY })
  );
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={5}
        className="mb-10">
        <Grid
          item
          xs={12}
          md={6}>
          {leftPostOnHomePage && (
            <NewsCard
              post={leftPostOnHomePage}
              sticky
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}>
          <Grid
            item
            xs={12}
            className="mb-2">
            {rightPostOnHomePage && <NewsCard post={rightPostOnHomePage} />}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewsContainer;
