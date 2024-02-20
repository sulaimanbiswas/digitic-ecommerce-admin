import { Modal } from "antd";
import { RiErrorWarningFill } from "react-icons/ri";

const CustomModal = (props) => {
  const { open, hideModal, title, performAction } = props;
  return (
    <>
      <Modal
        title={
          <div className="d-flex align-items-center gap-2 ">
            <RiErrorWarningFill className="text-warning fs-5 " />
            <p className="mb-0">Confirm</p>
          </div>
        }
        open={open}
        onOk={performAction}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
      >
        <p>{title}</p>
      </Modal>
    </>
  );
};

export default CustomModal;
