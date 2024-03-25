import { useEffect, useState } from "react";
import FolderData from "./FolderData";
import { getFolderList, getLinks } from "../../apis/folderApi";
import CardList from "../../components/card/CardList";

import "./FolderListData.css";

function FolderListData() {
  const [cards, setCards] = useState([]);
  const [folderData, setFolderData] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("전체"); // 선택된 폴더 이름 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        const folderId =
          selectedFolder === "전체"
            ? null
            : folderData.find((folder) => folder.name === selectedFolder)?.id;
        const data = await getLinks(11, folderId);
        setCards(data);
      } catch (error) {
        console.error("Error fetching links:", error);
        setCards([]);
      }
    };

    const fetchFolderData = async () => {
      try {
        const data = await getFolderList(11); // 사용자 ID를 1로 지정
        setFolderData(data);
      } catch (error) {
        console.error("Error fetching folder data:", error);
        setFolderData([]);
      }
    };

    fetchData();
    fetchFolderData();
  }, [selectedFolder]);

  return (
    <>
      <article className="folderCardPage--content">
        <ul className="folderList">
          <li
            className={`folderData ${
              selectedFolder === "전체" ? "selected" : ""
            }`}
            onClick={() => setSelectedFolder("전체")}
          >
            전체
          </li>
          {folderData.map(({ id, name }) => (
            <FolderData
              key={id}
              name={name}
              onClick={() => setSelectedFolder(name)} // 이름 클릭 시 선택된 폴더로 업데이트
              selected={selectedFolder === name}
            />
          ))}
        </ul>
        <h1 className="folderCard--title">{selectedFolder}</h1>
        {cards.length > 0 ? (
          <CardList cards={cards} />
        ) : (
          <p>저장된 링크가 없습니다</p>
        )}
      </article>
    </>
  );
}

export default FolderListData;
