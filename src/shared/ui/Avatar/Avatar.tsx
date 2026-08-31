interface AvatarProps {
  photo?: string;
  alt?: string;
  className?: string;
}

const defaultAvatar = '/default-user.png';

function Avatar({
  photo,
  alt = 'User avatar',
  className = 'h-12 w-12',
}: AvatarProps) {
  return (
    <img
      src={photo || defaultAvatar}
      alt={alt}
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = defaultAvatar;
      }}
      className={`rounded-full bg-bg-secondary object-cover ${className}`}
    />
  );
}

export { Avatar };
