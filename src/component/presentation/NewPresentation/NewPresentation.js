import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./NewPresentationStyle";

const NewPresentation = () => {
  const [title, setTitle] = useState(""); // 제목
  const [outline, setOutline] = useState(""); // 개요
  const [checkpoint, setCheckpoint] = useState(""); // 잘 하고싶은 부분
  const navigate = useNavigate();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeOutline = (e) => {
    setOutline(e.target.value);
  };
  const onChangeCheckpoint = (e) => {
    setCheckpoint(e.target.value);
  };

  const createPresentation = () => {
    // 새 프레젠테이션 생성 api로 정보 넘겨주기
    console.log({
      accountUid: "string",
      presentation: { title: title, outline: outline, checkpoint: checkpoint },
    });

    navigate("/presentation/new/practice");
  };
  return (
    <>
      <s.Container>
        <s.Title> 프레젠테이션 생성 </s.Title>
        <s.InputContainer>
          <s.InputBox
            height="24px"
            onChange={onChangeTitle}
            placeholder={"제목을 입력하세요."}
            maxLength={20}
          />
          <s.InputBox
            height="200px"
            onChange={onChangeOutline}
            placeholder={
              "스피치 개요를 작성하세요. ex) 암호학에 관한 발표입니다."
            }
            maxLength={8000}
          />
          <s.InputBox
            height="200px"
            onChange={onChangeCheckpoint}
            placeholder={
              "잘 하고 싶은 부분을 작성하세요. ex) 전문적인 분위기로 발표하고 싶어요."
            }
            maxLength={8000}
          />
        </s.InputContainer>
        <s.Button onClick={createPresentation}>스피치 시작하기</s.Button>
      </s.Container>
    </>
  );
};

export default NewPresentation;
