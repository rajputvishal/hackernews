import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { Card } from 'semantic-ui-react'
import {MyPagination} from '../components/pagination';
import PostCard from '../components/postcard'
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router'
import { useState } from 'react';

let posts = [];
export default function Home(props) {
  const router = useRouter()
  let pages = props.total / props.count;
  let [start, setStart] = useState(props.active);
  let handleChange = (e,d) => {
    setStart(d.activePage);
    router.push(`/ask?page=${d.activePage}`)
  }
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Navbar active="ask"/>
      <MyPagination start={start} handleChange={handleChange} pages={pages}/>
      <div className="content">
        <Card.Group itemsPerRow={4} stackable={true} className="justify-center">
        {props.posts.map((post, i) => {
          return <PostCard key={i} {...post}/>
        })}
        </Card.Group>
      </div>
      <MyPagination start={start} handleChange={handleChange} pages={pages}/>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  let page = context.query ? context.query.page || 1: 1;
  if(!posts.length) {
    let res = await fetch("https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty");
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