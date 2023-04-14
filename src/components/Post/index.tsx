import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from '../Avatar';
import { Comment } from '../Comment';
import styles from './Post.module.css';

type Author = {
  name: string;
  role: string;
  avatarUrl: string;
};

export type CommentData = {
  id: number;
  text: string;
};

type Content = {
  type: 'paragraph' | 'link';
  content: string;
};

export type PostData = {
  id: number;
  author: Author;
  content: Content[];
  publishedAt: Date;
};

interface PostProps {
  post: PostData;
}

export const Post = ({ post }: PostProps) => {
  const { author, content, publishedAt } = post;

  const [comments, setComments] = useState<CommentData[]>([
    { id: 1, text: 'Post muito bacana!!' },
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const handleCreateNewComment = (event: FormEvent) => {
    event.preventDefault();

    setComments([
      ...comments,
      { id: comments.length + 1, text: newCommentText },
    ]);
    setNewCommentText('');
  };

  const handleNewCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  };

  const handleNewCommentInvalid = (
    event: InvalidEvent<HTMLTextAreaElement>
  ) => {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  };

  const deleteComment = (commentToDelete: CommentData) => {
    const commentsWithoutDeletedOne = comments.filter(
      comment => comment.id !== commentToDelete.id
    );
    setComments(commentsWithoutDeletedOne);
  };

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>

            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(item => {
          if (item.type === 'paragraph') {
            return <p key={item.content}>{item.content}</p>;
          }

          if (item.type === 'link') {
            return (
              <p key={item.content}>
                <a href="#">{item.content}</a>
              </p>
            );
          }

          return <p key={item.content}>{item.content}</p>;
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          onChange={handleNewCommentChange}
          value={newCommentText}
          placeholder="Deixe um comentário"
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(item => (
          <Comment
            key={item.id}
            content={item}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
};
