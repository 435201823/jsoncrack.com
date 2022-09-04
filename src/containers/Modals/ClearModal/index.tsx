import React from "react";
import toast from "react-hot-toast";
import { Button } from "src/components/Button";
import { Modal, ModalProps } from "src/components/Modal";
import useConfig from "src/hooks/store/useConfig";

export const ClearModal: React.FC<ModalProps> = ({ visible, setVisible }) => {
  const setJson = useConfig((state) => state.setJson);

  const handleClear = () => {
    setJson("{}");
    toast.success(`已清空JSON数据并从内存中删除.`);
    setVisible(false);
  };

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <Modal.Header>清空JSON</Modal.Header>
      <Modal.Content>是否确定要清空JSON?</Modal.Content>
      <Modal.Controls setVisible={setVisible}>
        <Button status="DANGER" onClick={handleClear}>
          确定
        </Button>
      </Modal.Controls>
    </Modal>
  );
};
