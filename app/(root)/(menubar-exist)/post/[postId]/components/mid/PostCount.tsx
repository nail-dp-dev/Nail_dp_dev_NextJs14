import React, { useState, useEffect, useRef } from 'react';
import PostHeartIcon from '../icons/PostHeartIcon';
import PostChatIcon from '../icons/PostChatIcon';
import PostShareIcon from '../icons/PostShareIcon';
import { PostsDetailData } from '../../../../../../../types/dataType';
import PostHeartFillIcon from '../icons/PostHeartFillIcon';
import PostShareButton from '../../../../../../../components/buttons/PostShareButton';
import { deleteUnlikePost } from '../../../../../../../api/post/deleteUnlikePost';
import { postLikePost } from '../../../../../../../api/post/postLikePost';
import { getPostLikeCount } from '../../../../../../../api/post/getPostLikeCount';

interface PostCountProps {
  post: PostsDetailData['data'];
  postId: number; 
  toggleScroll: () => void;
}

export default function PostCount({ post, toggleScroll ,postId}: PostCountProps) {
  const [isHeartStatus, setIsHeartStatus] = useState(post.liked);
  const [heartCount, setHeartCount] = useState(post.likeCount);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sharedCount, setSharedCount] = useState(post.sharedCount);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (postId) {
      const fetchLikeCount = async () => {
        try {
          const data = await getPostLikeCount(postId);
          setHeartCount(data.likeCount);
        } catch (error) {
          console.error('Failed to fetch like count', error);
        }
      };

      fetchLikeCount();
    } else {
      console.error('postId is undefined');
    }
  }, [postId]);

  const handleFollowToggle = async () => {
    try {
      if (isHeartStatus) {
        await deleteUnlikePost(postId);
      } else {
        await postLikePost(postId);
      }

      const data = await getPostLikeCount(postId);
      setHeartCount(data.likeCount);
      setIsHeartStatus(!isHeartStatus);
    } catch (error) {
      console.error('Failed to toggle like status', error);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  const handleShareClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (message: string) => {
    alert(message);
    setSharedCount(sharedCount + 1);
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="flex justify-between py-4">
      <div className="flex gap-[44px] pr-[54px] text-[0.8125rem] font-bold text-darkPurple">
        <div className="flex items-center">
          <button onClick={handleFollowToggle}>
            {isHeartStatus ? (
              <PostHeartFillIcon className="mr-2 fill-red" />
            ) : (
              <PostHeartIcon className="mr-2 fill-darkPurple hover:fill-red" />
            )}
          </button>
          {heartCount}
        </div>
        <div className="flex items-center">
          <PostChatIcon
            className="mr-2 fill-darkPurple hover:fill-purple active:fill-darkPurple"
            onClick={toggleScroll}
          />
          {post.commentCount}
        </div>
        <div className="relative flex items-center" ref={menuRef}>
          <PostShareIcon
            className={`mr-2 fill-darkPurple hover:fill-purple active:fill-darkPurple ${isMenuOpen ? 'fill-purple' : ''}`}
            onClick={handleShareClick}
          />
          {sharedCount}
          {isMenuOpen && <PostShareButton onClick={handleMenuClick} />}
        </div>
      </div>
    </div>
  );
}
