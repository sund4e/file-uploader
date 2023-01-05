import { ChangeEvent, memo, useCallback, useRef, useState } from 'react';
import { HorizontalBox, VerticalBox } from '../Spacing/Box';
import { VerticalSpace } from '../Spacing/Space';
import { BoldText, SmallText } from '../Text/Text';
import { uploadImage } from '../../lib/api';

export const FileUploader = memo(() => {
  const [active, setActive] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        await uploadImage(e.target.files[0]);
      }
    },
    []
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
      />
      <VerticalBox>
        <BoldText>Click to upload</BoldText>
        <VerticalSpace />
        <SmallText>PNG JPG or PDF</SmallText>
      </VerticalBox>
    </HorizontalBox>
  );
});
