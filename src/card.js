const Card = ({ face, id }) => {
  return (
    <div id={id}>
      <img src={face} alt="Card from deck" />
    </div>
  );
};

export default Card;
