import { ThumbsUp, Trash } from 'phosphor-react';
import React, { useState } from 'react';

import { Avatar } from '../Avatar';
import { CommentData } from '../Post';
import styles from './Comment.module.css';

interface CommentProps {
  content: CommentData;
  onDeleteComment: (comment: CommentData) => void;
}

export const Comment = ({ content, onDeleteComment }: CommentProps) => {
  const [likeCount, setLikeCount] = useState(0);

  const handleDeleteComment = () => {
    onDeleteComment(content);
  };

  const handleLikeComment = () => {
    setLikeCount(oldState => oldState + 1);
  };

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/PedroZago.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Pedro Zago</strong>

              <time title="11 de maio às 08:13h" dateTime="2022-05-11 08:13:30">
                Publicado há 1h
              </time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash />
            </button>
          </header>

          <p>{content.text}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
