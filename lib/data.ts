/** D-Day 값 (메인 페이지 배지). 이 변수만 바꾸면 됨. 두 자리 표시 (D-10, D-09...) */
export const DEMO_D_DAY = 10

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
  showJustDroppedBadge?: boolean
  imageObjectFit?: "cover" | "contain"
  imageScale?: number
  imageTranslateY?: string
  imageObjectPosition?: string
  /** 메인 D-Day 배지. 없으면 DEMO_D_DAY 사용. 각 아이템마다 다르게 설정 */
  demoDDay?: number
  eventName?: string
}

export const auctionItems: AuctionItem[] = [
  {
    id: "v-bts-veautiful-days",
    artist: "V - BTS",
    artistKo: "뷔",
    itemName: "Photo Folio 'Veautiful Days'",
    itemNameKo: "포토 폴리오 '뷰티풀 데이즈'",
    dressedDate: "2024-Sep",
    description:
      "Brown velvet suit ensemble from V's BTS Photo Folio 'Veautiful Days'. Features a two-button blazer, matching trousers, and houndstooth-patterned accessory. The luxurious velvet captures V's sophisticated and dreamy aesthetic.",
    descriptionKo:
      "뷰의 BTS 포토 폴리오 '뷰티풀 데이즈'에 등장한 브라운 벨벳 수트 세트입니다. 투버튼 블레이저, 매칭 트라우저, 하운드스투스 패턴 악세서리로 구성된 이 의상은 뷰의 세련되고 몽환적인 에스테틱을 담아냅니다.",
    facts: [
      { label: "colorway", value: "brown velvet" },
      { label: "design", value: "blazer / trousers / houndstooth accessory" },
      { label: "series", value: "Veautiful Days Photo Folio" },
    ],
    images: ["/v-bts-veautiful-days-suit.png", "/v-bts-veautiful-days.png"],
    topOffer: 12500000,
    offeredPerson: 3420,
    expirationDate: "2025-03-16",
    category: "apparel",
    isJustDropped: true,
    showJustDroppedBadge: false,
    imageObjectFit: "contain",
    imageScale: 0.9,
    demoDDay: 9,
    eventName: "BTS Photo Folio 'Veautiful Days'",
  },
  {
    id: "jiwoo-rude",
    artist: "Jiwoo - Hearts2Hearts",
    artistKo: "지우 - Hearts2Hearts",
    itemName: "RUDE! - MV & Fanmeeting",
    itemNameKo: "RUDE! - 뮤직비디오 & 팬미팅",
    dressedDate: "2025-Jan",
    description:
      "Black sleeveless dress with white number and crest logo, worn by Jiwoo during RUDE! music video and fanmeeting activities. Features a fitted bodice, pleated flared skirt, and white stripe accents.",
    descriptionKo:
      "Hearts2Hearts 지우가 RUDE! 뮤직비디오 및 팬미팅에서 착용한 블랙 소매없는 드레스입니다. 화이트 넘버와 크레스트 로고, 피티드 보디스와 플리츠 플레어 스커트, 화이트 스트라이프 악센트가 특징입니다.",
    facts: [
      { label: "colorway", value: "black / white" },
      { label: "design", value: "sleeveless dress, pleated skirt" },
      { label: "event", value: "RUDE! MV & Fanmeeting" },
    ],
    images: ["/jiwoo-rude-dress.png", "/jiwoo-rude-stage.png"],
    topOffer: 8900000,
    offeredPerson: 2156,
    expirationDate: "2025-03-16",
    category: "apparel",
    isJustDropped: true,
    showJustDroppedBadge: false,
    imageObjectFit: "contain",
    imageScale: 1.25,
    imageTranslateY: "7%",
    imageObjectPosition: "center bottom",
    demoDDay: 8,
    eventName: "RUDE! - MV & Fanmeeting",
  },
  {
    id: "taemin-veil",
    artist: "Taemin - SHINee",
    artistKo: "태민 - 샤이니",
    itemName: "Veil in Las Vegas",
    itemNameKo: "베일 인 라스베가스",
    dressedDate: "2025-Jan",
    description:
      "Navy blue leather biker jacket with white piping worn by Taemin during his Veil performances in Las Vegas. Features asymmetrical zipper, silver hardware, and contrasting satin lining.",
    descriptionKo:
      "태민이 라스베가스 베일 공연에서 착용한 네이비 블루 가죽 바이커 재킷입니다. 화이트 파이핑, 실버 하드웨어, 대비되는 새틴 안감이 특징입니다.",
    facts: [
      { label: "colorway", value: "navy blue / white piping" },
      { label: "style", value: "biker jacket" },
      { label: "event", value: "Veil in Las Vegas" },
    ],
    images: ["/taemin-veil-jacket.png", "/taemin-veil-stage.png"],
    topOffer: 15800000,
    offeredPerson: 2341,
    expirationDate: "2025-03-16",
    category: "apparel",
    isJustDropped: false,
    imageObjectFit: "contain",
    demoDDay: 5,
    eventName: "Veil in Las Vegas",
  },
  {
    id: "juun-focus",
    artist: "JUUN - Hearts2Hearts",
    artistKo: "준 - Hearts2Hearts",
    itemName: "FOCUS - Jacket Image [1st mini album]",
    itemNameKo: "FOCUS - 재킷 이미지 [1st mini album]",
    dressedDate: "2025-Oct",
    description:
      "Black satin dress with light blue bow accent worn by JUUN from Hearts2Hearts during FOCUS promotions. Features square neckline, puffed short sleeves, and a large waist bow with cascading ribbons.",
    descriptionKo:
      "Hearts2Hearts 준이 FOCUS 활동 시 착용한 블랙 새틴 드레스입니다. 스퀘어 넥라인, 퍼프 소매, 라이트 블루 리본으로 된 웨스트 보우가 특징입니다.",
    facts: [
      { label: "album", value: "1st mini album" },
      { label: "track", value: "FOCUS" },
      { label: "design", value: "black / light blue bow" },
    ],
    images: ["/juun-focus-dress.png", "/juun-focus-stage.png"],
    topOffer: 5200000,
    offeredPerson: 980,
    expirationDate: "2025-03-16",
    category: "apparel",
    isJustDropped: false,
    imageObjectFit: "contain",
    demoDDay: 4,
    eventName: "FOCUS - 1st mini album",
  },
  {
    id: "yuha-focus",
    artist: "YUHA - Hearts2Hearts",
    artistKo: "유하 - Hearts2Hearts",
    itemName: "FOCUS - Jacket Image [1st mini album]",
    itemNameKo: "FOCUS - 재킷 이미지 [1st mini album]",
    dressedDate: "2025-Oct",
    description:
      "Light pink satin two-piece set worn by YUHA from Hearts2Hearts during FOCUS promotions. Features a sleeveless camisole top with spaghetti straps and an A-line wrap skirt with soft sheen.",
    descriptionKo:
      "Hearts2Hearts 유하가 FOCUS 활동 시 착용한 라이트 핑크 새틴 투피스입니다. 스파게티 스트랩 캐미솔 탑과 A라인 랩 스커트가 특징입니다.",
    facts: [
      { label: "album", value: "1st mini album" },
      { label: "track", value: "FOCUS" },
      { label: "design", value: "light pink satin two-piece" },
    ],
    images: ["/yuha-focus-outfit.png", "/yuha-focus-stage.png"],
    topOffer: 4800000,
    offeredPerson: 756,
    expirationDate: "2025-03-16",
    category: "apparel",
    isJustDropped: false,
    imageObjectFit: "contain",
    demoDDay: 12,
    eventName: "FOCUS - 1st mini album",
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
    expirationDate: "2025-03-16",
    category: "apparel",
    isJustDropped: false,
    demoDDay: 2,
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
    expirationDate: "2025-03-16",
    category: "sneakers",
    isJustDropped: false,
    demoDDay: 1,
    eventName: "Seven Music Video Filming",
  },
  {
    id: "ian-focus",
    artist: "IAN - Hearts2Hearts",
    artistKo: "이안 - Hearts2Hearts",
    itemName: "FOCUS - Jacket Image [1st mini album]",
    itemNameKo: "FOCUS - 재킷 이미지 [1st mini album]",
    dressedDate: "2025-Oct",
    description:
      "Sleeveless dress worn by IAN from Hearts2Hearts during FOCUS promotions. Features white and light blue woven design with distinctive bow detail.",
    descriptionKo:
      "Hearts2Hearts 이안이 FOCUS 활동 시 착용한 소매 없는 드레스입니다. 화이트와 라이트 블루 직물 디자인과 독특한 리본 디테일이 특징입니다.",
    facts: [
      { label: "album", value: "1st mini album" },
      { label: "track", value: "FOCUS" },
      { label: "design", value: "white / light blue woven" },
    ],
    images: ["/banner-ian.png", "/ian-jacket.png"],
    topOffer: 6500000,
    offeredPerson: 1890,
    expirationDate: "2025-03-16",
    category: "apparel",
    isJustDropped: true,
    demoDDay: 10,
    eventName: "FOCUS - 1st mini album",
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
    expirationDate: "2025-03-16",
    category: "accessories",
    isJustDropped: true,
    demoDDay: 11,
    eventName: "IU HEREH Concert Seoul",
  },
]

export function formatKRW(value: number): string {
  return new Intl.NumberFormat("ko-KR").format(value)
}

/** Returns a date string N days from now (for demo D-Day display). DEMO_D_DAY 사용. */
export function getDaysFromNow(days: number = DEMO_D_DAY): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export function getTimeRemaining(expirationDate: string) {
  const total = new Date(expirationDate).getTime() - new Date().getTime()
  const seconds = Math.max(0, Math.floor((total / 1000) % 60))
  const minutes = Math.max(0, Math.floor((total / 1000 / 60) % 60))
  const hours = Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24))
  const days = Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24)))
  return { total, days, hours, minutes, seconds }
}
