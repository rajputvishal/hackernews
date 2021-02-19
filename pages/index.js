import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Navbar from '../components/Navbar';
import { Card } from 'semantic-ui-react'
import {MyPagination} from '../components/pagination';
import PostCard from '../components/postcard'
import { useState } from 'react';
import { useRouter } from 'next/router'

let posts = [];
export default function Home(props) {
  const router = useRouter()
  let pages = props.total / props.count;
  let [start, setStart] = useState(props.active);
  let handleChange = (e,d) => {
    setStart(d.activePage);
    router.push(`/?page=${d.activePage}`)
  }
  return (
    <Layout home>
      <Head>
        <title>News</title>
      </Head>
      <Navbar active="new"/>

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
    let res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty");
    posts = await res.json();
  }
  
  const data = [];
  const perPageCount = 10;
  let start = (page - 1)* perPageCount;
  for(let i = 0; i < perPageCount; i++) {
    let post = await fetch(` https://hacker-news.firebaseio.com/v0/item/${posts[start++]}.json?print=pretty`);
    let postData = await post.json();
    if(postData)
    data.push(postData);
  } 
  return {
    props: {
     active: page,
     posts: data,
     total: posts.length,
     count: perPageCount
    }
  }
}