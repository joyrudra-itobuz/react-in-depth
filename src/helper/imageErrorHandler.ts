const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  const img = event.target as HTMLImageElement;
  img.src =
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
};

export default handleImageError;
