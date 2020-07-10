import React from "react";
import { Helmet } from "rl-react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";

const FEED_QUERY = gql`
{
    seeFeed {
        id
        location
        caption
        creator {
            id
            avatar
            username
        }
        files {
            id
            url
            createdAt
        }
        likeCount
        isLiked
        comments {
            id
            text 
						user {
                id
                username
            }
        }
        createdAt
    }
}
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 80vh;
`;

export default () => {
    const { data , loading } = useQuery(FEED_QUERY);
    return ( 
    <Wrapper>
        <Helmet>
            <title>Feed | Dgram</title>
        </Helmet>
        {loading && <Loader/> }
        {!loading && data && data.seeFeed && data.seeFeed.map(post => (
            <Post 
                key={post.id} 
                id={post.id} 
                location={post.location}
                caption={post.caption}
                creator={post.creator} 
                files={post.files}
                likeCount={post.likeCount}
                isLiked={post.isLiked}
                comments={post.comments}
                createdAt={post.createdAt}
            />
        ))}
    </Wrapper>
    );
};