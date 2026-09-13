import styles from './Avatar.module.css';
interface AvatarProps {
  photo?: string;
  alt?: string;
  className?: string;
}

const defaultAvatar = '/default-user.png';

function Avatar({
  photo,
  alt = 'User avatar',
  className = styles.defaultSize,
}: AvatarProps) {
  return (
    <img
      src={photo || defaultAvatar}
      alt={alt}
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = defaultAvatar;
      }}
      className={`${styles.image} ${className}`}
    />
  );
}

export { Avatar };
