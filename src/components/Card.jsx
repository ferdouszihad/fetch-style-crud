const Card = (props = {}) => {
  const { comment, handleDelete } = props || {};
  return (
    <div className="p-5 bg-green-100">
      <p>{comment.comment}</p>
      <button
        onClick={() => handleDelete(comment._id)}
        className="bg-red-400 text-white text-sm px-2 rounded-full"
      >
        remove
      </button>
    </div>
  );
};

export default Card;
