import React, { useState, useRef, useEffect } from 'react';
import { CommentData } from '../../../../../../types/dataType';
import { useAppDispatch } from '../../../../../../store/store';
import { setReplyUser } from '../../../../../../store/slice/replyUserSlice';
import UserImage from '../../../../../../components/ui/UserImage';
import ThumbsUpCount from './ThumbsUpCount';
import ReplyIcon from '../icons/ReplyIcon';
import Toggle from '../../../../../../components/buttons/Toggle';
import CommentOptions from '../CommentOptions';
import DeleteModal from '../DeleteModal';
import { formatTimeAgo } from '../../../../../../lib/formatTimeAgo';
import { setCommonModal } from '../../../../../../store/slice/modalSlice';

interface ReplyItemProps {
  item: CommentData['data'][number];
  parentId: number;
  onLike: (commentId: number, increment: number) => void;
  onReply: (id: number, name: string) => void;
  onSaveEdit: (
    commentId: number,
    parentId: number | null,
    newContent: string,
  ) => void;
  onDelete: (commentId: number, parentId: number | null) => void;
}

export default function ReplyItem({
  item,
  parentId,
  onLike,
  onReply,
  onSaveEdit,
  onDelete,
}: ReplyItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(item.commentContent);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useAppDispatch();
  const textarea = useRef<HTMLTextAreaElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleResizeHeight();
  }, [isEditing, editedContent]);

  // 텍스트 영역 높이 자동 조정
  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
  };

  // 대댓글로 스크롤 이동
  const handleReplyClick = () => {
    dispatch(setReplyUser({ id: parentId, name: item.commentUserNickname }));
    onReply(parentId, item.commentUserNickname);
  };

  // 좋아요 증가/감소
  const handleLike = (commentId: number, increment: number) => {
    onLike(commentId, increment);
  };

  // 댓글 수정
  const handleEditClick = () => {
    setIsEditing(true);
    setShowOptions(false);
  };

  // 삭제 모달 표시
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setShowOptions(false);
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(item.commentContent);
  };

  // 수정 댓글 저장
  const handleSaveEdit = () => {
    if (editedContent.trim() === '') {
      setShowDeleteModal(true); // 빈 값이면 삭제 모달 표시
    } else {
      onSaveEdit(item.commentId, parentId, editedContent);
      setIsEditing(false);
    }
  };

  // 댓글 수정 취소, 저장
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancelEdit();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    }
  };

  // 댓글 삭제 처리
  const handleDeleteConfirm = () => {
    onDelete(item.commentId, parentId);
    setShowDeleteModal(false);
  };

  // 신고 버튼 (일단 옵션 닫기로 설정)
  const handleReportClick = () => {
    setShowOptions(false);
  };

  // 사용자 차단 버튼 (일단 옵션 닫기로 설정)
  const handleBlockUserClick = () => {
    setShowOptions(false);
  };

  return (
    <div
      className="reply-item button-tr mx-2 mb-4 mt-[10px] 
        rounded-xl transition-all duration-300"
    >
      <div
        className={`reply-box button-tr group/toggle2 flex justify-between rounded-xl pb-[10px] pl-[10px] 
          pt-[10px] hover:bg-darkPurple hover:bg-opacity-20`}
      >
        <div className="flex">
          <div className="mr-3">
            <UserImage
              src={item.profileUrl}
              alt="임시이미지"
              width={40}
              height={40}
            />
          </div>
          <div className="leading-4">
            <div className="flex">
              {item.commentUserNickname}
              <p className="commentDate text-14px-normal-dP ml-3">
                {formatTimeAgo(item.commentDate)}
              </p>
            </div>
            {isEditing ? (
              <div>
                <textarea
                  ref={textarea}
                  rows={1}
                  onInput={handleResizeHeight}
                  className="comment-edit  hide-scrollbar mt-[5px] w-full min-w-[800px] resize-none
                    overflow-hidden rounded-lg bg-white bg-opacity-70 px-[10px] py-[5px] text-sm 
                    font-normal outline-none"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="text-[0.6875rem]">
                  <span className="mr-2">
                    Esc로
                    <button
                      className="ml-1 text-purple hover:underline active:text-darkPurple"
                      onClick={handleCancelEdit}
                    >
                      취소
                    </button>
                  </span>
                  <span>
                    Enter키로
                    <button
                      className="ml-1 text-purple hover:underline 
                      active:text-darkPurple"
                      onClick={handleSaveEdit}
                    >
                      저장
                    </button>
                  </span>
                </div>
              </div>
            ) : (
              <p className="comment w-full max-w-[800px] text-sm font-normal">
                {item.commentContent}
              </p>
            )}
            <div className="mt-[8.5px] flex items-center">
              <ThumbsUpCount item={item} onLike={handleLike} />
              <ReplyIcon
                className="ml-[10px] mr-[2px] fill-darkPurple hover:fill-purple"
                onClick={handleReplyClick}
              />
            </div>
          </div>
        </div>
        <div className="relative mr-3 hidden h-full group-hover/toggle2:block ">
          <Toggle onClick={() => setShowOptions(!showOptions)} />
          {showOptions && (
            <CommentOptions
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              onReportClick={handleReportClick}
              onBlockUserClick={handleBlockUserClick}
              onClose={() => setShowOptions(false)}
              commentUserNickname={item.commentUserNickname}
            />
          )}
        </div>
      </div>
      {showDeleteModal && (
        <DeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
          commentId={item.commentId}
        />
      )}
    </div>
  );
}