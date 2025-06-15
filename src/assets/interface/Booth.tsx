export interface Booth {
  name: string;
  type: ("웹사이트" | "게임" | "앱" | "웹" | "키오스크")[];
  img: string;
  developer: string[];
  designer: string[];
  comment: string;
}
