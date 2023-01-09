import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { HorizontalBox, VerticalBox } from '../Spacing/Box';
import { VerticalSpace } from '../Spacing/Space';
import { BoldText, SmallText } from '../Text/Text';
import { FileData, uploadImage } from '../../lib/api';

export const FileUploader = ({
  addFiles,
}: {
  addFiles: (files: FileData[]) => void;
}) => {
  const [active, setActive] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        const result = await uploadImage(e.target.files);
        addFiles(result.files);
        if (input.current) {
          input.current.value = '';
        }
      }
    },
    [addFiles]
  );

  const onClick = useCallback(() => {
    input.current?.click();
  }, []);

  return (
    <HorizontalBox
      border
      active={active}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onClick={onClick}
    >
      <input
        ref={input}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        multiple
      />
      <VerticalBox>
        <BoldText>Click to upload</BoldText>
        <VerticalSpace />
        <SmallText>PNG JPG or PDF</SmallText>
      </VerticalBox>
    </HorizontalBox>
  );
};
