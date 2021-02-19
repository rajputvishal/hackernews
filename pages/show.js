import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Navbar from '../components/Navbar';
import { Card } from 'semantic-ui-react'
import PostCard from '../components/postcard'
import {MyPagination} from '../components/pagination';
import { useRouter } from 'next/router'
import { useState } from 'react';

let posts = [];
export default function Home(props) {
  const router = useRouter()
  let pages = Math.floor(props.total / props.count);
  let [start, setStart] = useState(props.active);
  let handleChange = (e,d) => {
    setStart(d.activePage);
    router.push(`/show?page=${d.activePage}`)
  }
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Navbar active="show"/>
      <MyPagination start={start} handleChange={handleChange} pages={pages}/>
      <Card.Group className="justify-center">
       {props.posts.map((post, i) => {
         return <PostCard key={i} {...post}/>
       })}
      </Card.Group>
      <MyPagination start={start} handleChange={handleChange} pages={pages}/>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  let page = context.query ? context.query.page || 1: 1;
  if(!posts.length) {
    let res = await fetch("https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty");
    posts = await res.json();
  }
  const data = [];
  const perPageCount = 10;
  let dynamicPosts = [...posts];
  let start = (page - 1)* perPageCount;
  for(let i = 0; i < perPageCount; i++) {
    let post = await fetch(` https://hacker-news.firebaseio.com/v0/item/${posts[start++]}.json?print=pretty`);
    let postData = await post.json();
    if(postData)
      data.push(postData);
    else
      dynamicPosts.splice(start - 1, 1)
  } 
  return {
    props: {
     active: page,
     posts: data,
     total: dynamicPosts.length,
     count: perPageCount
    }
  }
}