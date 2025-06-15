import { Booth } from "../interface/Booth";
type BoothType = Booth & {
  members: string[];
  booth_id: string;
  s3_path: string;
  logo: string;
};

export const boothsData: BoothType[] = [
  {
    name: "누토",
    type: ["웹사이트", "앱"],
    img: "/images/booths/nutoIntroduce.svg",
    developer: ["오지은", "이소리", "장하영"],
    designer: ["조혜원", "박새봄"],
    comment:
      "이번 프로젝트는 졸업 전시를 더욱 특별하게 기록하고, 학생들의 배움과 성장을 관객들과 소통할 수 있도록 기획되었습니다. 각 부스에는 학생들의 열정과 창의성이 담겨 있으며, 이를 응원하고 기억할 수 있도록 디지털 응원 메시지 시스템을 도입했습니다. 🔗 QR 코드로 간편하게 접속하여, 각 부스를 둘러보고 응원의 한마디를 남길 수 있습니다. 🍅 '토마토 텃밭'이라는 컨셉을 활용해, 한 마디 한 마디가 씨앗이 되어 성장하는 의미를 담았습니다. 관람객들은 학생들에게 따뜻한 격려를 전하고, 남겨진 메시지는 마치 정성껏 가꾼 텃밭처럼 쌓여갑니다.",
    members: ["오지은", "이소리", "장하영", "조혜원", "박새봄"],
    booth_id: "nuto",
    s3_path: "nuto",
    logo: "/images/boothName.svg",
  },
  {
    name: "미림취뽀",
    type: ["게임"],
    img: "/images/booths/미림취뽀.png",
    developer: ["최여은", "이민서"],
    designer: ["김민서", "박서정"],
    comment:
      "[미림취뽀]는 미림마이스터고 학생들이 학교에 입학하고 나서 취업까지 성공하는 루트를 게임으로 재미있게 풀어냈습니다. 취업을 하는 과정이 쉽지는 않지만 그럼에도 학생들이 끊임없이 도전하고 성장해 나가는 모습을 게임 속 여정에 녹여냈습니다.",
    members: ["최여은", "이민서", "김민서", "박서정"],
    booth_id: "미림취뽀",
    s3_path: "미림취뽀",
    logo: "/images/boothName.svg",
  },
  {
    name: "",
    type: ["웹사이트"],
    img: "/images/booths/미림마법고민해결.png",
    developer: ["김이레", "한지연", "윤성연", "이세현", "송민채"],
    designer: ["박솔하"],
    comment:
      "선생님의 목소리를 닮은 AI가 담긴 마법의 수정구슬 . 고민을 말하면 조용히 듣고, 차분하고 따뜻한 조언을 건넵니다. 진로, 인간관계, 감정 등 다양한 고민을 함께 나눌 수 있어요. 언제든 꺼내어 대화할 수 있는 나만의 작은 상담 도구입니다. 혼자일 때도, 이 구슬은 당신의 이야기를 기다리고 있어요.",
    members: ["김이레", "한지연", "윤성연", "이세현", "송민채", "박솔하"],
    booth_id: "미림마법고민해결",
    s3_path: "미림마법고민해결",
    logo: "/images/boothName.svg",
  },
  {
    name: "Soft Whisper",
    type: ["웹사이트"],
    img: "/images/booths/softwhisper.png",
    developer: ["김서연", "이서윤"],
    designer: ["김서연", "이서윤"],
    comment:
      "다양한 운세를 만나볼 수 있으며, 애니메이션과 함께 오늘의 운세를 즐길 수 있습니다. 마음에 드는 운세는 이메일로 공유할 수 있어 소중한 기억으로 간직할 수 있습니다. 당신의 하루를 특별하게 만들어 줄 경험이 기다리고 있습니다.",
    members: ["김서연", "이서윤"],
    booth_id: "softwhisper",
    s3_path: "softwhisper",
    logo: "/images/boothName.svg",
  },
  {
    name: "Ozmate",
    type: ["앱"],
    img: "https://drive.google.com/open?id=1X_qQN5TTUm6319lJ7BPCCr4IqN_i78_a",
    developer: ["배주연"],
    designer: ["윤한설"],
    comment:
      "이 앱은 호주 이민자들을 위한 정보 플랫폼입니다. 비자 정보, 현지 생활 팁, 환율 계산기, 날씨 확인, 챗봇 상담, 영어 해석 연습, 문화 퀴즈 등 실질적으로 필요한 기능을 한곳에 통합하여,사용자가 앱 하나만으로도 정보 탐색, 학습, 실생활 활용까지 가능하도록 다양한 기능을 담았습니다.",
    members: ["배주연", "윤한설"],
    booth_id: "ozmate",
    s3_path: "ozmate",
    logo: "/images/boothName.svg",
  },
  {
    name: "워클리",
    type: ["웹"],
    img: "https://drive.google.com/open?id=1xCAVF--sYiy2MQDwAyfaHlotzrfCKusr",
    developer: ["배주연", "박수민", "이성미"],
    designer: ["양현서"],
    comment:
      "일정관리, 게시판, 직무별 팁을 제공합니다. 사회초년생에게 필요한 단어와 팁을 알려주고, 게시판 질문으로 회사 생활을 돕습니다. 사회초년생들이 회사에 잘 적응하도록 지원합니다.",
    members: ["배주연", "박수민", "이성미", "양현서"],
    booth_id: "workly",
    s3_path: "workly",
    logo: "/images/boothName.svg",
  },
  {
    name: "InterYou",
    type: ["웹"],
    img: "https://drive.google.com/open?id=1UiJPnF1QD-Kg8BQyyX1eZBAj17Bwi_n7",
    developer: ["전유림", "육준성", "신채은", "조현진", "정다운", "이상희"],
    designer: ["전유림"],
    comment:
      "InterYou는 즉흥적인 면접 상황을 연습하고, AI 기반 분석으로 자신의 답변을 평가하기 위해 만들어졌습니다. InterYou를 통해 순발력과 사고력을 키우고, 실전 인터뷰 대응 능력을 강화할 수 있습니다. 창의적인 질문이 주어지면, 제한 시간 동안 생각하고 답변합니다. AI는 논리성과 창의성을 기준으로 답변을 평가합니다. 랭킹 기능을 제공하여 사용자 간 경쟁과 성장을 유도합니다.당신에게 질문합니다, InterYou 🎤",
    members: ["전유림", "육준성", "신채은", "조현진", "정다운", "이상희"],
    booth_id: "interyou",
    s3_path: "interyou",
    logo: "/images/boothName.svg",
  },
  {
    name: "미림 페이",
    type: ["앱", "키오스크"],
    img: "https://drive.google.com/open?id=1L3v2dcBWtHTIRU8vPdmiiviBogV5-xB3",
    developer: ["지수민", "유성윤", "이효은", "강재호"],
    designer: ["송지아", "이서현"],
    comment:
      "MIRIM PAY는 교내 매점 무인 결제 시스템 및 통합 모바일 서비스입니다. 지갑을 두고 와 결제를 하지 못했던 경험이나 매점에 원하는 물품이 없어 발길을 돌렸던 순간처럼, 학생들이 일상 속에서 겪는 작지만 반복되는 불편함을 해결하고자 MIRIM PAY를 만들게 되었습니다. 복잡한 절차 없이 학교 이메일로 간편하게 로그인하고 개인 카드를 앱에서 등록한다면, QR 코드 스캔 또는 얼굴 인식만으로 지갑 없이도 즉시 안전하고 간편하게 결제할 수 있습니다. 또한 MIRIM PAY는 단순히 결제 도구를 제공할 뿐만 아니라 앱 내에서 매점의 실시간 재고를 확인하고, 필요한 문의 사항도 간편하게 전달할 수 있는 기능을 제공해 학생들의 매점 이용을 한층 더 편리하고 유연하게 만들어 줍니다. MIRIM PAY를 통해 보다 편리하고 효율적으로 매점을 이용할 수 있습니다!",
    members: ["지수민", "유성윤", "이효은", "강재호", "송지아", "이서현"],
    booth_id: "mirimpay",
    s3_path: "mirimpay",
    logo: "/images/boothName.svg",
  },
  {
    name: "Dearpal",
    type: ["웹"],
    img: "https://drive.google.com/open?id=1HJdpqVsNuF_gyNw2TV_Kk3saAe3RjQ2F",
    developer: ["최여은"],
    designer: ["최여은"],
    comment:
      "회원가입 후, 사용자끼리 익명의 사용자끼리 서로 편지를 주고받을 수 있는 웹 플랫폼입니다. 편지는 사용자가 직접 선택해서 확인하고 답장할 수 있으며, 텍스트와 스티커를 활용해 편지를 꾸밀 수 있는 기능도 포함되어 있습니다. 가입부터 편지 작성, 교류까지 간단한 플로우로 누구나 쉽게 사용할 수 있습니다.",
    members: ["최여은"],
    booth_id: "dearpal",
    s3_path: "dearpal",
    logo: "/images/boothName.svg",
  },
  {
    name: "Harugo",
    type: ["앱"],
    img: "https://drive.google.com/open?id=1JJNqkLl_FbmhJxzRFSBFSJKP-eswaUn4",
    developer: ["이성미", "정민경"],
    designer: ["서유미"],
    comment:
      "상황에 맞는 표현을 배우고 퀴즈를 통해 다양한 포코로를 획득해 도감을 완성하며 재미를 느낄 수 있습니다.",
    members: ["이성미", "정민경", "서유미"],
    booth_id: "harugo",
    s3_path: "harugo",
    logo: "https://drive.google.com/open?id=1fer4ApqMaNvG3yVH-aBYZ5mE6RWSJukM",
  },
  {
    name: "짤메이커",
    type: ["웹"],
    img: "https://drive.google.com/open?id=1Ay4T63CIMlLWExFX-LY1SizliHMM7keC",
    developer: ["박가빈"],
    designer: ["박가빈"],
    comment:
      "인스타, 유튜브 쇼츠에서 쉽게 접할 수 있는 컨텐츠인 짤을  나도 쉽게 만들 수 있다면 어떨까요?  자신이 평소 좋아하던 캐릭터나 재밌는 사진에  말풍선과 자막을 추가해서 생동감을 더할 수 있는 사이트를 만들고 싶었습니다. 그렇게 기획한 짤메이커는 짤을 만들기 위한 편집 기능과 템플릿을 제공하는 웹서비스입니다. 자신이 가지고 있는 사진을 업로드하거나 제공된 템플릿을 선택하고 말풍선이나 자막을 추가해서 짤을 만들 수 있습니다. 완성된 짤로 여러 SNS에서 활용할 수 있습니다.",
    members: ["이성미", "정민경", "서유미"],
    booth_id: "harugo",
    s3_path: "harugo",
    logo: "https://drive.google.com/open?id=1-PHEnM6LUOA1s-RO8TEuu-DJFAvvWaAA",
  },
];
