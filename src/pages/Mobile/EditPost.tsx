import { useImage } from "../../context/ImageContext";
import def from "../../styles/Default.module.css";
import { useRef, useEffect, useState, useCallback } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import style from "../../styles/EditPost.module.css";
import { usePolariod } from "../../context/PostContext";
import * as fabric from "fabric";
import { usePostInfo } from "../../context/PostInfoContext";
import { useNavigate } from "react-router-dom";

function EditPost() {
  const { image } = useImage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [_, setFramedPhoto] = useState<string | null>(null);
  const { setPolariodFile } = usePolariod();
  const { name, setName } = usePostInfo();

  const deleteIcon = "/images/Delete.png";
  var deleteImg = document.createElement("img");
  deleteImg.src = deleteIcon;

  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = "black";
  fabric.Object.prototype.cornerStyle = "circle";

  const stickers = [
    "/images/물주전자.png",
    "/images/꽃.png",
    "/images/해.png",
    "/images/구름캐릭.png",
    "/images/풀떼기.png",
    "/images/무당벌레.png",
    "/images/나무.png",
    "/images/아이디어.png",
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const isWideScreen = window.innerWidth <= 500;

    if (!isWideScreen) {
      navigate("/nuto-garden"); // 태블릿/데스크톱은 즉시 이동
    }
  }, [navigate]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 358,
      height: 420,
    });

    const rect = new fabric.Rect({
      left: 0,
      top: 0,
      fill: "white",
      width: 358,
      height: 420,
      selectable: false,
    });

    newCanvas.add(rect);

    if (image) {
      const img = new Image();
      img.src = image;

      img.onload = () => {
        const scaleX = 314 / img.width;
        const scaleY = 314 / img.height;

        const imgObj = new fabric.FabricImage(img, {
          left: 22,
          top: 22,
          selectable: false,
        });

        imgObj.set({
          scaleX: scaleX,
          scaleY: scaleY,
          width: img.width,
          height: img.height,
        });

        imgObj.controls.deleteControl = new fabric.Control({
          x: 0.5,
          y: -0.5,
          offsetY: 16,
          cursorStyle: "pointer",
          mouseUpHandler: deleteObject,
          render: renderIcon,
        });

        newCanvas.add(imgObj);
        newCanvas.renderAll();
      };
    }
    const date = `${new Date().getFullYear()}.${
      new Date().getMonth() + 1
    }.${new Date().getDate()}`;
    const dateText = new fabric.FabricText(date, {
      fontSize: 18,
      fontFamily: "Ownglyph",
      fill: "#656565",
      top: 345,
      left: 22,
      selectable: false,
    });

    const canvasWidth = newCanvas.width;
    const nameText = new fabric.Text(name, {
      fontSize: 18,
      fontFamily: "Ownglyph",
      fill: "#656565",
      top: 345,
      textAlign: "right", // 텍스트 정렬을 오른쪽으로 설정
      selectable: false,
    });
    nameText.left = canvasWidth - nameText.width - 20;

    newCanvas.add(dateText);
    newCanvas.add(nameText);

    setFabricCanvas(newCanvas);

    return () => {
      newCanvas.dispose();
    };
  }, [image]);

  const add = (idx: number) => {
    const stickerImg = new Image();
    stickerImg.src = stickers[idx];
    stickerImg.onload = () => {
      const scaleX = 70 / stickerImg.width;
      const scaleY = 70 / stickerImg.height;
      if (fabricCanvas) {
        const imgObj = new fabric.Image(stickerImg, {
          left: 50,
          top: 50,
          selectable: true,
        });

        imgObj.set({
          scaleX: scaleX,
          scaleY: scaleY,
          width: stickerImg.width,
          height: stickerImg.height,
        });

        imgObj.controls.deleteControl = new fabric.Control({
          x: 0.5,
          y: -0.7,
          offsetY: 16,
          cursorStyle: "pointer",
          mouseUpHandler: deleteObject,
          render: renderIcon,
        });

        fabricCanvas.add(imgObj);
        fabricCanvas.renderAll();
        setFramedPhoto(
          fabricCanvas.toDataURL({ format: "png", multiplier: 10 })
        );
      }
    };
  };

  function deleteObject(_eventData: any, transform: any) {
    const canvas = transform.target.canvas;
    canvas.remove(transform.target);
    canvas.requestRenderAll();
  }

  function renderIcon(
    ctx: any,
    left: any,
    top: any,
    _styleOverride: any,
    fabricObject: any
  ) {
    const size = 24;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  const dataURLtoFile = (dataURL: string, filename: string) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const setPolariodImage = () => {
    if (fabricCanvas) {
      const dataURL = fabricCanvas.toDataURL({ format: "png", multiplier: 4 });
      const file = dataURLtoFile(dataURL, "polariod.png");
      setPolariodFile(file);
    }
  };

  return (
    <div className={def.Body}>
      <Header prevSrc="-1" nextSrc="/nuto" saveImage={setPolariodImage} />
      <div className={style.EditPostContainer}>
        <p>폴라로이드를 취향에 맞게 꾸며주세요!</p>
        <div className={style.canvasContainer}>
          <canvas ref={canvasRef} id="canvas" style={{ zIndex: 10 }} />
        </div>
        <div className={style.stickerContainer}>
          {stickers.map((sticker: string, idx: number) => {
            return (
              <button key={idx} onClick={() => add(idx)}>
                <img src={sticker} alt={sticker} />
              </button>
            );
          })}
        </div>

        {/* <button onClick={downloadFile}>다운로드</button> */}
      </div>
      {/* <div className={style.background}></div> */}

      <Footer />
    </div>
  );
}

export default EditPost;
