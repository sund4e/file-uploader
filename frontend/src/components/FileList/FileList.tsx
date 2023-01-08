import { useEffect, useState, useRef } from 'react';
import { FileData, getFiles } from '../../lib/api';

export const FileList = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const listInnerRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);
  const [scrolledToBottom, setScrolledToBottom] = useState(true);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setScrolledToBottom(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const lastFile = files[files.length - 1];
      const nextFiles = await getFiles(lastFile?.id);
      if (!nextFiles.length) {
        setHasMore(false);
      } else {
        setFiles([...files, ...nextFiles]);
      }
      setScrolledToBottom(false);
    };

    if (hasMore && scrolledToBottom) {
      fetchData();
    }
  }, [hasMore, files, scrolledToBottom]);

  return (
    <div onScroll={onScroll} ref={listInnerRef}>
      {files.map((file) => (
        // <Text key={file.id}>{file.name}</Text>
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}files/${file.name}.${file.extension}`}
          alt="filevain"
          key={file.id}
        ></img>
      ))}
    </div>
  );
};
