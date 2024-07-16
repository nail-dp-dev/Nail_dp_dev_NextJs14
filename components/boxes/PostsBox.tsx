'use client'

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import useAllPosts from '../../hooks/useAllPosts'
import PostBox from './PostBox'
import Loading from '../../app/loading'
import { useSelector } from 'react-redux'
import { selectNumberOfBoxes } from '../../store/slice/boxLayoutSlice'
import { usePathname } from 'next/navigation'
import { getArchivePath, getPostsNumber } from '../../constants'

export default function PostsBox() {
  const path = usePathname() as '/' | '/new' | '/trending'
  const category = getArchivePath[path].result
  let layoutNum = useSelector(selectNumberOfBoxes);
  let minNum = getPostsNumber[layoutNum].number
  const { postsData } = useAllPosts(category, minNum);

  return (
    <div className='outBox flex h-full flex-wrap items-center gap-[0.7%] overflow-auto overflow-y-scroll rounded-[20px] transition-all snap-mandatory snap-y'>
      <Suspense fallback={<Loading/>}>
        {
          postsData && 
          postsData.map((item:any, index:number) => (
            <PostBox key={index} layoutNum={layoutNum} postId={item.postId} photoId={item.photoId} photoUrl={item.photoUrl} like={item.like} saved={item.saved} createdDate={item.createdDate}/>
          ))
        }
      </Suspense>
    </div>
  )
}