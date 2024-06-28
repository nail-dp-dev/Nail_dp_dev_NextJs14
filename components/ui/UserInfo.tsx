import React from 'react';

type UserInfoProps = {
  nickname: string;
  postsCount: number;
  saveCount: number;
  followerCount: number;
  followCount?: number;
  hoverStyle?: string;
  nicknameStyle?: string;
  statsStyle?: string;
  children?: React.ReactNode;
};

export default function UserInfo({
  nickname,
  postsCount,
  saveCount,
  followerCount,
  followCount,
  hoverStyle,
  nicknameStyle,
  statsStyle,
  children,
}: UserInfoProps) {
  return (
    <div className="flex flex-col items-start">
      <p className={`${nicknameStyle} ${hoverStyle}`}>{nickname}</p>
      {children}
      <div
        className={`flex flex-wrap gap-2 text-darkPurple  ${statsStyle} ${hoverStyle}`}
      >
        <span>게시물 {postsCount}</span>
        <span>저장됨 {saveCount}</span>
        <span>팔로워 {followerCount}</span>
        {followCount !== undefined && <span>팔로우 {followCount}</span>}
      </div>
    </div>
  );
}
