import React, { ImgHTMLAttributes } from 'react';

import styles from './Avatar.module.css';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}

export const Avatar = ({ hasBorder = true, alt, ...props }: AvatarProps) => {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      alt={alt}
      {...props}
    />
  );
};
