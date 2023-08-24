import "../styles/Modal.scss";

export const Modal = () => {
  return (
    <div id="modal">
      <div id="confirmation-modal">
        <h1>Delete product from collection?</h1>
        <div id="line"></div>
        <div id="buttons">
          <button>Yes</button>
          <button>No</button>
        </div>
      </div>
    </div>
  );
};
