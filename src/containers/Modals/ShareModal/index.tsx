import React from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { Modal, ModalProps } from "src/components/Modal";
import { Button } from "src/components/Button";
import { BiErrorAlt } from "react-icons/bi";
import { compress } from "compress-json";
import useConfig from "src/hooks/store/useConfig";
import { Input } from "src/components/Input";
import packageJson from "package.json";

const StyledWarning = styled.p``;

const StyledErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.TEXT_DANGER};
  font-weight: 600;
`;

const StyledFlex = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 0;
  border-top: 1px solid ${({ theme }) => theme.BACKGROUND_MODIFIER_ACCENT};
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.INTERACTIVE_NORMAL};

  &:first-of-type {
    padding-top: 0;
    border: none;
  }
`;

export const ShareModal: React.FC<ModalProps> = ({ visible, setVisible }) => {
  const json = useConfig((state) => state.json);
  const [encodedJson, setEncodedJson] = React.useState("");

  const embedText = `<iframe src="${packageJson.homepage}/widget?json=${encodedJson}" width="512" height="384" style="border: 2px solid #b9bbbe; border-radius: 6px;"></iframe>`;
  const shareURL = `${packageJson.homepage}/editor?json=${encodedJson}`;

  React.useEffect(() => {
    const jsonEncode = compress(JSON.parse(json));
    const jsonString = JSON.stringify(jsonEncode);

    setEncodedJson(encodeURIComponent(jsonString));
  }, [json]);

  const handleShare = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`Link copied to clipboard.`);
    setVisible(false);
  };

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <Modal.Header>创建分享链接</Modal.Header>
      <Modal.Content>
        {encodedJson.length > 5000 ? (
          <StyledErrorWrapper>
            <BiErrorAlt size={60} />
            <StyledWarning>
              链接大小已超出5000个字符，无法生成链接
            </StyledWarning>
          </StyledErrorWrapper>
        ) : (
          <>
            <StyledContainer>
              分享链接
              <StyledFlex>
                <Input value={shareURL} type="url" readOnly />
                <Button
                  status="SECONDARY"
                  onClick={() => handleShare(shareURL)}
                >
                  复制
                </Button>
              </StyledFlex>
            </StyledContainer>
            <StyledContainer>
              嵌入到您的网站
              <StyledFlex>
                <Input value={embedText} type="url" readOnly />
                <Button
                  status="SECONDARY"
                  onClick={() => handleShare(embedText)}
                >
                  复制
                </Button>
              </StyledFlex>
            </StyledContainer>
          </>
        )}
      </Modal.Content>
      <Modal.Controls setVisible={setVisible}></Modal.Controls>
    </Modal>
  );
};
