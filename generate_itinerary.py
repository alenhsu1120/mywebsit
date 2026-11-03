from fpdf import FPDF

LATIN = "/tmp/dejavu-fonts-ttf-2.37/ttf/DejaVuSans.ttf"
CJK   = "/usr/share/fonts/google-droid-sans-fonts/DroidSansFallbackFull.ttf"
OUT   = "japan_itinerary_2026.pdf"

DAYS = [
    {
        "title": "DAY 1  名古屋市區探索",
        "date":  "2026 年 6 月 18 日（四）",
        "sections": [
            ("抵達名古屋 / 飯店 Check-in", [
                "抵達後前往飯店辦理 Check-in",
                "飯店：名古屋日航尚格酒店（名古屋站附近）",
                "休息整頓，輕裝準備出發",
            ]),
            ("前往榮商圈", [
                "搭地鐵東山線或名城線至「榮站」",
                "車程約 10 分鐘",
            ]),
            ("榮商圈  下午~晚上", [
                "綠洲21（Oasis 21）：玻璃水頂，夜間燈光秀，完全免費",
                "名古屋電視塔：MIRAI360 展望台 ¥900，夜景推薦",
                "松坂屋 / PARCO / LACHIC：購物選擇豐富",
                "久屋大通公園：寬敞綠地，適合散步拍照",
            ]),
            ("晚餐  名古屋名物", [
                "味噌豬排（矢場とん）",
                "台灣拉麵（元祖台灣拉麵 マウンテン）",
                "天むす（千寿）外帶",
            ]),
        ],
    },
    {
        "title": "DAY 2  三井 Outlet + 名古屋城 + 大須",
        "date":  "2026 年 6 月 19 日（五）",
        "sections": [
            ("名古屋三井 Outlet Park  10:00~15:00", [
                "9:00 從飯店出發，搭地鐵名港線至名古屋港站（約 30 分鐘）",
                "10:00 開門，超過 200 間品牌：Adidas、Nike、Coach 等",
                "15:00 離開，前往名古屋城",
                "提醒：Outlet 開門 10:00，若提早可在附近名古屋港水族館外等候",
            ]),
            ("Outlet → 名古屋城  15:00 出發", [
                "名古屋港站 → 金山站（名港線）→ 市役所站（名城線）",
                "全程約 30 分鐘，約 15:30 抵達",
            ]),
            ("名古屋城  15:30~17:00", [
                "本丸御殿：江戶時代豪華御殿，金碧裝飾（必看）",
                "城牆與外苑：宏偉石垣，拍照絕佳",
                "注意：天守閣整修中無法入內；16:30 最後入場，17:00 關閉",
                "入場費 ¥500",
            ]),
            ("名古屋城 → 大須商店街  17:00 出發", [
                "市役所站 → 上前津站（名城線），約 15 分鐘，約 17:30 抵達",
            ]),
            ("大須商店街 + 晚餐  17:30~20:30", [
                "大須觀音 / 萬松寺（機器人表演）",
                "電器街 + 二手動漫店 / 扭蛋店",
                "美食：唐揚雞 / 章魚燒 / 鯛魚燒",
            ]),
        ],
    },
    {
        "title": "DAY 3  AEON + 犬山城下町",
        "date":  "2026 年 6 月 20 日（六）",
        "sections": [
            ("AEON MALL Nagoya Noritake Garden  10:00~12:45", [
                "飯店步行約 10~15 分鐘（名古屋站西口方向）",
                "早午餐：Starbucks（面對庭園）/ 日式定食 / 甜點",
                "輕鬆逛：MUJI / UNIQLO / 藥妝",
                "12:45 前務必離開，否則犬山會變得很趕",
            ]),
            ("AEON → 犬山  12:45 出發", [
                "步行至名古屋站，搭名鐵犬山線特急",
                "車程約 25~30 分鐘，含等車共約 1 小時",
                "約 13:50 抵達犬山",
            ]),
            ("犬山城  13:50~15:00", [
                "日本國寶城堡，現存最古老木造天守之一",
                "天守頂部 360 度俯瞰木曾川",
                "注意：樓梯極陡請穿防滑鞋；入場費 ¥550",
                "16:30 最後入場，17:00 關閉",
            ]),
            ("城下町散策 + 美食  15:00~17:30", [
                "飛驒牛握壽司（必吃，現握現食）",
                "五平餅（串烤米餅，傳統小吃）",
                "抹茶霜淇淋 / 抹茶大福",
                "古民家老街散步、和風雜貨採購",
                "15:00 後是最熱鬧時段，不要提早離開",
            ]),
            ("收尾散步  17:30~18:00", [
                "沿木曾川河邊散步，看傍晚夕陽",
                "咖啡廳休息補充體力",
            ]),
            ("犬山 → 名古屋  18:00 出發", [
                "犬山站搭名鐵犬山線，約 30~40 分鐘",
                "約 19:00 抵達名古屋站，回飯店 or 榮商圈晚餐",
            ]),
        ],
    },
    {
        "title": "DAY 4  名古屋 → 大阪",
        "date":  "2026 年 6 月 21 日（日）",
        "sections": [
            ("飯店早餐 + 整理行李 & 退房  11:00 退房", [
                "早上在飯店享用早餐，悠閒開始這天",
                "餐後整理行李，確認不遺漏任何物品",
                "11:00 辦理退房，步行約 6 分鐘前往名古屋站",
            ]),
            ("名古屋 → 新大阪  11:30 出發（東海道新幹線 Nozomi）", [
                "車程約 50 分鐘，約 12:50 抵達新大阪",
                "新幹線費用：¥4,000~6,000",
                "新大阪轉地下鐵御堂筋線 → 難波（約 20 分鐘，¥280）",
            ]),
            ("抵達難波 / 飯店寄放行李  約 13:00", [
                "飯店：難波京阪格蘭德飯店（Hotel Keihan Namba Grande）",
                "地址：大阪府大阪市浪速區難波中 2-3-33",
                "南海電鐵難波站步行 6 分鐘",
                "Check-in 時間未到可先寄放行李，輕裝前往梅田",
            ]),
            ("難波 → 梅田  14:00（地下鐵御堂筋線，約 10 分鐘）", []),
            ("梅田自由活動  14:30~17:30", [
                "Grand Front Osaka：UNIQLO / MUJI / 設計雜貨",
                "LUCUA Osaka：年輕潮流品牌",
                "阪急百貨：伴手禮首選",
                "梅田藍天大廈（可選）：俯瞰大阪市景",
            ]),
            ("晚餐  17:30~19:00", [
                "A. 燒肉：Yakiniku M Hozenji Yokocho（法善寺橫丁）",
                "B. 壽喜燒：Harijyu Dotonbori（道頓堀老牌）",
                "C. 大阪燒：Mizuno（道頓堀名店，建議提前預約）",
            ]),
            ("心齋橋 & 道頓堀夜遊  19:15~22:00", [
                "心齋橋筋商店街：藥妝 / 服飾 / 美食",
                "道頓堀運河夜景：必拍固力果跑跑人",
                "藥妝採買：松本清 / 科摩斯 COSMOS",
                "唐吉軻德道頓堀店：零食 / 雜貨 / 電器",
                "22:00 後步行回難波飯店約 15~20 分鐘",
            ]),
        ],
    },
    {
        "title": "DAY 5  難波 → 關西機場  回程",
        "date":  "2026 年 6 月 22 日（一）",
        "sections": [
            ("飯店 Check-out", [
                "退房前整理行李，確認不遺漏",
                "提早確認班機時間，預留機場報到時間（建議提前 2~2.5 小時）",
            ]),
            ("前往關西機場", [
                "南海電鐵 Rapi:t 特急（難波 → 關西機場）約 38 分鐘，¥1,430",
                "JR 關空快速（難波 → 關西機場）約 65 分鐘，¥1,210",
            ]),
            ("回程備忘", [
                "確認護照 / 機票 / 行李重量",
                "藥妝 / 食品注意海關規定",
                "剩餘日圓可在機場兌換或留存",
                "IC 卡餘額可退款（Suica 在東京站，TOICA 在名古屋站）",
            ]),
        ],
    },
    {
        "title": "EXTRA  備用景點 & 加碼行程",
        "date":  "有空就去，沒空就跳過",
        "sections": [
            ("ASUNAL 金山（第二天大須逛完後，約 20:30~21:30）", [
                "從大須搭地鐵名城線至金山站，約 5 分鐘",
                "金山站旁半開放式商場，在地人氛圍，輕鬆愜意",
                "商場大部分店鋪營業至 21:00~21:30，餐廳多到 22:00",
                "大須逛得盡興的話不一定要去",
                "比榮商圈少觀光客，適合當天收尾散步",
            ]),
        ],
    },
]

# ── Colour palette ──────────────────────────────────────────
DARK_BROWN   = (50, 35, 12)
MID_BROWN    = (110, 80, 35)
LIGHT_GOLD   = (200, 165, 70)
BG_HEADER    = (55, 38, 14)
BG_SECTION   = (250, 244, 228)
TEXT_MAIN    = (45, 32, 12)
TEXT_MUTED   = (120, 95, 50)
LINE_COLOR   = (210, 185, 110)

class PDF(FPDF):
    def header(self): pass
    def footer(self):
        self.set_y(-11)
        self.set_font("body")
        self.set_text_color(*TEXT_MUTED)
        self.cell(0, 6, f"Japan Trip 2026  |  {self.page_no()} / {{nb}}", align="C")

pdf = PDF(orientation="P", unit="mm", format="A4")
pdf.alias_nb_pages()
pdf.set_auto_page_break(auto=True, margin=16)
pdf.add_font("body",   "", LATIN)
pdf.add_font("cjk",    "", CJK)
pdf.set_fallback_fonts(["cjk"])

W = 190   # usable width (10mm margins each side)

for day in DAYS:
    pdf.add_page()
    pdf.set_left_margin(10)
    pdf.set_right_margin(10)

    # ── Title bar ──────────────────────────────────────────
    pdf.set_fill_color(*BG_HEADER)
    pdf.rect(10, 10, W, 13, style="F")
    pdf.set_xy(10, 10)
    pdf.set_font("body", size=13)
    pdf.set_text_color(*LIGHT_GOLD)
    pdf.cell(W, 13, f"  {day['title']}", align="L")

    # ── Date sub-line ───────────────────────────────────────
    pdf.set_xy(10, 24)
    pdf.set_font("body", size=9)
    pdf.set_text_color(*TEXT_MUTED)
    pdf.cell(W, 6, f"  {day['date']}")
    pdf.ln(5)

    for sec_title, items in day["sections"]:
        # Section header band
        pdf.set_x(10)
        pdf.set_font("body", size=10)
        pdf.set_text_color(*MID_BROWN)
        pdf.set_fill_color(*BG_SECTION)
        pdf.set_draw_color(*LINE_COLOR)
        pdf.cell(W, 7, f"  {sec_title}", border="B", fill=True,
                 new_x="LMARGIN", new_y="NEXT")

        # Bullet items
        if items:
            pdf.set_font("body", size=9)
            pdf.set_text_color(*TEXT_MAIN)
            for item in items:
                pdf.set_x(13)
                pdf.cell(5, 5.5, "-")
                pdf.set_x(18)
                pdf.multi_cell(W - 9, 5.5, item, new_x="LMARGIN", new_y="NEXT")

        pdf.ln(2)

pdf.output(OUT)
print(f"PDF saved → {OUT}")
