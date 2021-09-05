import { TitleData } from "src/app/services/participant.service";
import { Certificate } from "./certificate";
import { Participant } from "./participant";

export interface Card {
  text: string
  isLink: boolean
  icon?: string
  image?: string
  linkURL?: string
  certificate?: Certificate
  participant?: Participant
  milestone?: TitleData
  runFunction?: () => boolean,
}
