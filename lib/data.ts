export interface AuctionItem {
  id: string
  artist: string
  artistKo: string
  itemName: string
  itemNameKo: string
  dressedDate: string
  description: string
  descriptionKo: string
  facts: { label: string; value: string }[]
  images: string[]
  topOffer: number
  offeredPerson: number
  expirationDate: string
  category: "apparel" | "accessories" | "sneakers" | "artwork"
  isJustDropped: boolean
  eventName?: string
}

export const auctionItems: AuctionItem[] = [
  {
    id: "gd-rose-coat",
    artist: "G-Dragon",
    artistKo: "지드래곤",
    itemName: "Red Rose Half Coat - World Tour [Ubermensch]",
    itemNameKo: "레드로즈 하프코트 - 월드투어 [Ubermensch]",
    dressedDate: "2025-Jul-27",
    description:
      "This custom red rose half coat was worn by G-DRAGON during his 2025 World Tour. Fully covered with handcrafted faux roses, this piece embodies his theatrical stage presence and avant-garde fashion identity.",
    descriptionKo:
      "해당 아이템은 지드래곤이 2025년 월드투어 [Ubermensch] 쿠알라룸푸르에서 착용한 커스터마이징 레드로즈 코트입니다. 전면에 핸드메이드 인조 장미를 촘촘히 배치한 이 디자인은 그의 무대 연출력과 패션 정체성을 상징적으로 담아냈습니다.",
    facts: [
      { label: "colorway", value: "red black rose" },
      { label: "size", value: "custom" },
      { label: "season", value: "2025 World Tour" },
    ],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5hhg5i8brnPRs5re1fTMEmg1KTmoDR.png",
    ],
    topOffer: 1888888,
    offeredPerson: 3882,
    expirationDate: "2026-04-30",
    category: "apparel",
    isJustDropped: true,
    eventName: "G-DRAGON 2025 World Tour [Ubermensch] in Kuala Lumpur",
  },
  {
    id: "gd-pmo-cap",
    artist: "G-Dragon",
    artistKo: "지드래곤",
    itemName: "PEACEMINUSONE Daisy Cap - Jacob & Co.",
    itemNameKo: "피스마이너스원 데이지 캡 - 제이콥앤코",
    dressedDate: "2025-Aug-8",
    description:
      "When G-Dragon first met legendary jeweler Jacob & Co., he gifted him a PEACEMINUSONE daisy lapel pin, which Jacob then turned into jewelry in the magnificent way that only Jacob knows how.",
    descriptionKo:
      "지드래곤이 전설적인 보석 디자이너 Jacob & Co.를 처음 만났을 때, 그는 PEACEMINUSONE 데이지 라펠 핀을 선물했으며, Jacob은 이를 자신만의 화려한 방식으로 보석으로 변모시켰습니다.",
    facts: [
      { label: "colorway", value: "black" },
      { label: "size", value: "Free" },
      { label: "SKU", value: "99HAA26B WHITE" },
    ],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fNzbtG1zCxM5So9bOYrBAL6o2Qx2QQ.png",
    ],
    topOffer: 1888888,
    offeredPerson: 3882,
    expirationDate: "2026-04-30",
    category: "accessories",
    isJustDropped: true,
    eventName: "G-DRAGON 2025 World Tour [Ubermensch] in Hong Kong",
  },
  {
    id: "shm-uefa-kit",
    artist: "Son Heung Min",
    artistKo: "손흥민",
    itemName: "2025 UEFA Final Match-Worn Kit",
    itemNameKo: "2025 UEFA 결승전 실착 유니폼",
    dressedDate: "2025-May-21",
    description:
      'Tottenham Hotspur captain Son Heung Min wore this official uniform during the 2025 UEFA Final held in Bilbao, Spain. Featuring his signature green captain\'s armband and the iconic "AIA" sponsor print, the uniform represents a historic appearance in the European championship.',
    descriptionKo:
      "토트넘 홋스퍼 주장 손흥민이 2025 UEFA 결승전(스페인 빌바오)에서 실제 착용한 공식 유니폼은 유럽 챔피언십 결승 무대에서의 역사를 담고 있습니다.",
    facts: [
      { label: "type", value: "Official Match-Worn Kit" },
      { label: "club", value: "Tottenham Hotspur" },
      { label: "competition", value: "2025 UEFA Final" },
    ],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NYwUT3QiFn7CiMKrawiTWHugNcSOQF.png",
    ],
    topOffer: 77770000,
    offeredPerson: 4877,
    expirationDate: "2026-05-31",
    category: "apparel",
    isJustDropped: false,
    eventName: "2025 UEFA Champions League Final",
  },
  {
    id: "bp-jennie-jacket",
    artist: "JENNIE",
    artistKo: "제니",
    itemName: "BORN PINK World Tour Custom Leather Jacket",
    itemNameKo: "본 핑크 월드투어 커스텀 레더 재킷",
    dressedDate: "2025-Mar-15",
    description:
      "Custom leather jacket worn by JENNIE during BLACKPINK's BORN PINK World Tour Seoul finale. Embellished with hand-painted details and crystal accents.",
    descriptionKo:
      "블랙핑크 BORN PINK 월드투어 서울 피날레에서 제니가 착용한 커스텀 레더 재킷입니다. 핸드 페인팅 디테일과 크리스탈 악센트가 장식되어 있습니다.",
    facts: [
      { label: "colorway", value: "black / silver" },
      { label: "size", value: "S" },
      { label: "designer", value: "Custom" },
    ],
    images: [],
    topOffer: 55500000,
    offeredPerson: 6234,
    expirationDate: "2026-04-15",
    category: "apparel",
    isJustDropped: false,
    eventName: "BLACKPINK BORN PINK World Tour Seoul",
  },
  {
    id: "bts-jk-sneakers",
    artist: "Jung Kook",
    artistKo: "정국",
    itemName: "Seven MV Custom Nike Air Force 1",
    itemNameKo: "세븐 MV 커스텀 나이키 에어포스 1",
    dressedDate: "2025-Jan-20",
    description:
      "Custom Nike Air Force 1 worn by Jung Kook during the filming of 'Seven' music video. Features hand-painted floral motifs and his signature on the insole.",
    descriptionKo:
      "'Seven' 뮤직비디오 촬영 시 정국이 착용한 커스텀 나이키 에어포스 1입니다. 핸드 페인팅 플로럴 모티프와 인솔에 친필 사인이 들어있습니다.",
    facts: [
      { label: "colorway", value: "white / floral" },
      { label: "size", value: "270mm" },
      { label: "brand", value: "Nike" },
    ],
    images: [],
    topOffer: 42000000,
    offeredPerson: 8901,
    expirationDate: "2026-06-01",
    category: "sneakers",
    isJustDropped: false,
    eventName: "Seven Music Video Filming",
  },
  {
    id: "iu-brooch",
    artist: "IU",
    artistKo: "아이유",
    itemName: "HEREH Concert Custom Daisy Brooch",
    itemNameKo: "HEREH 콘서트 커스텀 데이지 브로치",
    dressedDate: "2025-Feb-10",
    description:
      "Handcrafted daisy brooch designed exclusively for IU's HEREH concert series. Made with 18K gold plating and Swarovski crystals.",
    descriptionKo:
      "아이유의 HEREH 콘서트 시리즈를 위해 독점 디자인된 핸드크래프트 데이지 브로치입니다. 18K 금도금과 스와로브스키 크리스탈로 제작되었습니다.",
    facts: [
      { label: "material", value: "18K gold / Swarovski" },
      { label: "size", value: "Free" },
      { label: "series", value: "HEREH Concert" },
    ],
    images: [],
    topOffer: 12500000,
    offeredPerson: 5670,
    expirationDate: "2026-05-15",
    category: "accessories",
    isJustDropped: true,
    eventName: "IU HEREH Concert Seoul",
  },
]

export function formatKRW(value: number): string {
  return new Intl.NumberFormat("ko-KR").format(value)
}

export function getTimeRemaining(expirationDate: string) {
  const total = new Date(expirationDate).getTime() - new Date().getTime()
  const seconds = Math.max(0, Math.floor((total / 1000) % 60))
  const minutes = Math.max(0, Math.floor((total / 1000 / 60) % 60))
  const hours = Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24))
  const days = Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24)))
  return { total, days, hours, minutes, seconds }
}
