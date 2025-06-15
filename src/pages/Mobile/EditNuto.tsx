import def from "../../styles/Default.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import style from "../../styles/EditNuto.module.css";
import { useRef, useState, useEffect } from "react";
import * as fabric from "fabric";
import { usePolariod } from "../../context/PostContext";
import { usePostInfo } from "../../context/PostInfoContext";
import { useImage } from "../../context/ImageContext";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputModal from "../../components/InputModal";

function EditNuto() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textObjectRef = useRef<fabric.IText | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("/images/redTomato.png");
  const { location, setLocation } = usePostInfo();
  const { name, setName } = usePostInfo();
  const { setNutoFile } = usePolariod();
  const { polariodFile, setPolariodFile } = usePolariod();
  const { setImage } = useImage();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showInput, setShowInput] = useState(false);

  const tomatos = [
    { src: "/images/redTomato.png", comment: "최고였다는 극찬" },
    { src: "/images/orangeTomato.png", comment: "신선한 아이디어" },
    { src: "/images/greenTomato.png", comment: "따뜻한 응원" },
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    if (!fabricCanvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        width: 358,
        height: 343,
      });

      const fabricCanvas = fabricCanvasRef.current;

      const backgroundImage = new Image();
      backgroundImage.src = imgSrc;
      backgroundImage.onload = () => {
        const scaleX = 358 / backgroundImage.width;
        const scaleY = 278 / backgroundImage.height;

        const imgObj = new fabric.FabricImage(backgroundImage, {
          top: 36,
          left: 0,
          selectable: false,
        });

        imgObj.set({
          scaleX: scaleX,
          scaleY: scaleY,
          width: backgroundImage.width,
          height: backgroundImage.height,
        });

        fabricCanvas.add(imgObj);
        fabricCanvas.sendObjectToBack(imgObj);
      };

      const canvasHeight = fabricCanvasRef.current.height;
      const canvasWidth = fabricCanvasRef.current.width;
      const textBox = new fabric.IText("응원글을\n입력해 주세요.", {
        fontSize: 22,
        fontFamily: "Ownglyph",
        fill: "white",
        textAlign: "center",
      });
      textBox.left = (canvasWidth - textBox.width) / 2;
      textBox.top = (canvasHeight - textBox.height) / 2;
      textObjectRef.current = textBox;
      let clickCount = 0;
      let clickTimer: NodeJS.Timeout | null = null;

      textBox.on("selected", () => {
        clickCount++;

        if (clickTimer) clearTimeout(clickTimer);

        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 400);

        console.log(clickCount);

        if (clickCount === 1) {
          textBox.enterEditing();
          textBox.selectAll();
        } else if (clickCount === 2) {
          textBox.enterEditing();
          // selectAll() 안 하면 커서 깜빡임
        }
      });
      fabricCanvas?.add(textBox);
    }

    const fabricCanvas = fabricCanvasRef.current;
    const image = new Image();
    image.src = imgSrc;
    image.onload = () => {
      const scaleX = 358 / image.width;
      const scaleY = 278 / image.height;
      const imgObj = new fabric.FabricImage(image, {
        top: 36,
        left: 0,
        selectable: false,
      });

      imgObj.set({
        scaleX: scaleX,
        scaleY: scaleY,
        width: image.width,
        height: image.height,
      });

      const existingBg = fabricCanvas
        ?.getObjects()
        .find((obj) => obj.type === "image");
      if (existingBg) fabricCanvas?.remove(existingBg);

      fabricCanvas?.add(imgObj);
      fabricCanvas?.sendObjectToBack(imgObj);
      fabricCanvas.renderAll();
    };
  }, [imgSrc, textObjectRef]);

  const changeFrame = (idx: number) => {
    setImgSrc(tomatos[idx]["src"]);
  };

  const chkText = async (text: string) => {
    text = text.replace(/\n/g, " ");

    const response = await axios.post("https://nuto.mirim-it-show.site/check", {
      text: text,
    });

    console.log(response);

    return response.data.label;
  };

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

  const hashing = async (password: string) => {
    const salt = process.env.REACT_APP_SALT_VALUE;
    return await bcrypt.hash(password, salt);
  };

  const setPolariodImage = async () => {
    if (!fabricCanvasRef.current) return;

    const fabricCanvas = fabricCanvasRef.current;

    const dataURL = fabricCanvas.toDataURL({ format: "png", multiplier: 4 });
    const file = dataURLtoFile(dataURL, "nuto.png");

    const objects = fabricCanvas.getObjects();
    const textObject = objects.find((obj) => obj.type === "i-text");
    const text = (textObject as fabric.IText).text || "";

    const label = await chkText(text);

    console.log(label);

    const negativeEmotions = [
      "anger",
      "annoyance",
      "confusion",
      "disappointment",
      "disapproval",
      "disgust",
      "embarrassment",
      "fear",
      "grief",
      "nervousness",
      "realization",
      "remorse",
      "sadness",
      "surprise",
    ];

    if (negativeEmotions.includes(label.label)) {
      alert("부정적인 문장은 금지되어 있습니다.");
      return;
    } else {
      if (password.trim() === "") {
        console.log(password);
        alert("비밀번호를 입력해야 합니다.");
        return;
      }

      const hashedPassword = await hashing(password);

      const formData = new FormData();
      formData.append("nutoImage", file);
      if (polariodFile) {
        formData.append("polariodImage", polariodFile);
      }

      formData.append("name", name);
      formData.append("location", location);
      formData.append("password", hashedPassword);

      try {
        await axios.post("https://nuto.mirim-it-show.site/post", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setLocation("");
        setName("");
        setNutoFile(null);
        setPolariodFile(null);
        setImage("");

        sessionStorage.setItem("name", "");
        sessionStorage.setItem("image", "");
        sessionStorage.setItem("nutoFile", "");
        sessionStorage.setItem("polariodFile", "");
        sessionStorage.setItem("location", "");

        console.log(
          location,
          name,
          sessionStorage.getItem("location"),
          sessionStorage.getItem("name")
        );

        navigate("/");
      } catch (err) {
        console.error("업로드 실패:", err);
      }
    }
  };

  useEffect(() => {
    if (password.trim() === "") return;
    setPolariodImage();
  }, [password]);

  const getPassword = () => {
    setShowInput(true);
  };

  return (
    <div className={def.Body}>
      <Header prevSrc="-1" nextSrc="" saveImage={getPassword} />
      <div className={style.NutoContainer}>
        <p>토마토를 선택해 주세요.</p>
        <div className={style.ChooseTomatoContainer}>
          {tomatos.map((tomato, idx: number) => {
            return (
              <div
                className={style.TomatoDiv}
                onClick={() => changeFrame(idx)}
                key={idx}
              >
                <img
                  src={tomato.src}
                  alt={tomato.comment}
                  style={{ width: 98, height: 76 }}
                />
                <p>{tomato.comment}</p>
              </div>
            );
          })}
        </div>
        <input />
        <div className={style.canvasContainer}>
          <canvas ref={canvasRef} id="canvas" className={style.NutoCanvas} />
        </div>
      </div>
      <Footer />
      {showInput && (
        <InputModal
          q="비밀번호를 입력하세요."
          setState={setPassword}
          setShowInput={setShowInput}
        />
      )}
    </div>
  );
}

export default EditNuto;
